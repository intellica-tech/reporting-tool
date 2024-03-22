/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import {
  styled,
  css,
  ChartMetadata,
  SupersetTheme,
  useTheme,
  t,
} from '@superset-ui/core';
import { usePluginContext } from 'src/components/DynamicPlugins';
import { nativeFilterGate } from 'src/dashboard/components/nativeFilters/utils';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import { useDispatch } from 'react-redux';
import { dvtSidebarChartAddSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';

interface VizTypeGalleryProps {
  onChange: (vizType: string | null) => void;
  onDoubleClick: () => void;
  selectedViz: string | null;
  className?: string;
  denyList: string[];
}

type VizEntry = {
  key: string;
  value: ChartMetadata;
};

const DEFAULT_ORDER = [
  'line',
  'big_number',
  'big_number_total',
  'table',
  'pivot_table_v2',
  'echarts_timeseries_line',
  'echarts_area',
  'echarts_timeseries_bar',
  'echarts_timeseries_scatter',
  'pie',
  'mixed_timeseries',
  'filter_box',
  'dist_bar',
  'area',
  'bar',
  'deck_polygon',
  'time_table',
  'histogram',
  'deck_scatter',
  'deck_hex',
  'time_pivot',
  'deck_arc',
  'heatmap',
  'deck_grid',
  'deck_screengrid',
  'treemap_v2',
  'box_plot',
  'sunburst',
  'sankey',
  'word_cloud',
  'mapbox',
  'kepler',
  'cal_heatmap',
  'rose',
  'bubble',
  'bubble_v2',
  'deck_geojson',
  'horizon',
  'deck_multi',
  'compare',
  'partition',
  'event_flow',
  'deck_path',
  'graph_chart',
  'world_map',
  'paired_ttest',
  'para',
  'country_map',
];

const typesWithDefaultOrder = new Set(DEFAULT_ORDER);

const THUMBNAIL_GRID_UNITS = 100;

export const MAX_ADVISABLE_VIZ_GALLERY_WIDTH = 1090;

export const VIZ_TYPE_CONTROL_TEST_ID = 'viz-type-control';

const VizPickerLayout = styled.div`
  display: grid;
  min-height: 100%;
`;

const IconsPane = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px 20px;
  padding: 20px;
`;

// overflow hidden on the details pane and overflow auto on the description
// (plus grid layout) enables the description to scroll while the header stays in place.

const thumbnailContainerCss = (theme: SupersetTheme) => css`
  cursor: pointer;
  width: ${theme.gridUnit * THUMBNAIL_GRID_UNITS}px;
  position: relative;
  width: 100%;

  img {
    border: 1px solid ${theme.colors.grayscale.light2};
    border-radius: ${theme.gridUnit}px;
    transition: border-color ${theme.transitionTiming};
    background-color: transparent;
  }

  &.selected img {
    border: 2px solid ${theme.colors.primary.light2};
  }

  &:hover:not(.selected) img {
    border: 1px solid ${theme.colors.grayscale.light1};
  }

  .viztype-label {
    font-size: 14px;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 0.2px;
    padding-bottom: 18px;
  }
`;

function vizSortFactor(entry: VizEntry) {
  if (typesWithDefaultOrder.has(entry.key)) {
    return DEFAULT_ORDER.indexOf(entry.key);
  }
  return DEFAULT_ORDER.length;
}

interface ThumbnailProps {
  entry: VizEntry;
  selectedViz: string | null;
  setSelectedViz: (viz: string) => void;
  onDoubleClick: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  entry,
  selectedViz,
  setSelectedViz,
  onDoubleClick,
}) => {
  const theme = useTheme();
  const { key, value: type } = entry;
  const isSelected = selectedViz === entry.key;

  return (
    <div
      role="button"
      // using css instead of a styled component to preserve
      // the data-test attribute
      css={thumbnailContainerCss(theme)}
      tabIndex={0}
      className={isSelected ? 'selected' : ''}
      onClick={() => setSelectedViz(key)}
      onDoubleClick={onDoubleClick}
      data-test="viztype-selector-container"
    >
      <div
        className="viztype-label"
        data-test={`${VIZ_TYPE_CONTROL_TEST_ID}__viztype-label`}
      >
        {type.name}
      </div>
      <img
        alt={type.name}
        width="100%"
        className={`viztype-selector ${isSelected ? 'selected' : ''}`}
        src={type.thumbnail}
      />
    </div>
  );
};

interface ThumbnailGalleryProps {
  vizEntries: VizEntry[];
  selectedViz: string | null;
  setSelectedViz: (viz: string) => void;
  onDoubleClick: () => void;
}

/** A list of viz thumbnails, used within the viz picker modal */
const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  vizEntries,
  ...props
}) => (
  <IconsPane data-test={`${VIZ_TYPE_CONTROL_TEST_ID}__viz-row`}>
    {vizEntries.map(entry => (
      <Thumbnail key={entry.key} {...props} entry={entry} />
    ))}
  </IconsPane>
);

export default function VizTypeGallery(props: VizTypeGalleryProps) {
  const { selectedViz, onChange, onDoubleClick, className } = props;
  const { mountedPluginMetadata } = usePluginContext();

  const chartMetadata: VizEntry[] = useMemo(() => {
    const result = Object.entries(mountedPluginMetadata)
      .map(([key, value]) => ({ key, value }))
      .filter(({ key }) => !props.denyList.includes(key))
      .filter(
        ({ value }) =>
          nativeFilterGate(value.behaviors || []) && !value.deprecated,
      );
    result.sort((a, b) => vizSortFactor(a) - vizSortFactor(b));
    return result;
  }, [mountedPluginMetadata]);

  const chartAddSelector = useAppSelector(state => state.dvtSidebar.chartAdd);
  const chartAddSearchSelector = useAppSelector(
    state => state.dvtNavbar.chartAdd.search,
  );
  const sortedMetadata = useMemo(
    () => chartMetadata.sort((a, b) => a.key.localeCompare(b.key)),
    [chartMetadata],
  );
  const [editedData, setEditedData] = useState<any[]>(sortedMetadata);
  const dispatch = useDispatch();

  const clearAlerts = () => {
    dispatch(
      dvtSidebarChartAddSetProperty({
        chartAdd: {
          dataset: '',
          recommended_tags: '',
          category: '',
          tags: '',
        },
      }),
    );
  };

  const chartsByTags = useMemo(() => {
    const result: Record<string, VizEntry[]> = {};
    chartMetadata.forEach(entry => {
      const tags = entry.value.tags || [];
      tags.forEach(tag => {
        if (!result[tag]) {
          result[tag] = [];
        }
        result[tag].push(entry);
      });
    });
    return result;
  }, [chartMetadata]);

  const chartsByCategory = useMemo(() => {
    const result: Record<string, VizEntry[]> = {};
    chartMetadata.forEach(entry => {
      const category = entry.value.category || t('Other');
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(entry);
    });
    return result;
  }, [chartMetadata]);

  useEffect(() => {
    let filteredData: React.SetStateAction<any[]> = [];

    if (chartAddSelector.recommended_tags?.label) {
      filteredData = chartsByTags[chartAddSelector.recommended_tags.label];
    } else if (chartAddSelector.category?.label) {
      filteredData = chartsByCategory[chartAddSelector.category.label];
    } else if (chartAddSelector.tags?.label) {
      filteredData = chartsByTags[chartAddSelector.tags.label];
    } else {
      filteredData = chartMetadata;
    }
    setEditedData(filteredData);
  }, [chartAddSelector]);

  const searchEditedData = editedData.filter(
    (item: any) =>
      item.value.name
        .toLowerCase()
        .indexOf(chartAddSearchSelector.toLowerCase()) > -1,
  );

  return searchEditedData.length > 0 ? (
    <VizPickerLayout className={className}>
      <ThumbnailGallery
        vizEntries={searchEditedData}
        selectedViz={selectedViz}
        setSelectedViz={onChange}
        onDoubleClick={onDoubleClick}
      />
    </VizPickerLayout>
  ) : (
    <DvtIconDataLabel
      label="No results match your filter criteria"
      buttonLabel="Clear All Filter"
      buttonClick={() => {
        clearAlerts();
      }}
    />
  );
}
