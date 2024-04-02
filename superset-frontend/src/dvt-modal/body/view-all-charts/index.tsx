/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { t, ChartMetadata } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtVizTypeGallery from 'src/explore/components/controls/VizTypeControl/DvtVizTypeGallery';
import { findPermission } from 'src/utils/findPermission';
import DvtModalHeader from 'src/components/DvtModalHeader';
import getBootstrapData from 'src/utils/getBootstrapData';
import DvtSelect from 'src/components/DvtSelect';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import {
  dvtSidebarChartAddSetProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import { usePluginContext } from 'src/components/DynamicPlugins';
import { DefaultOrder } from 'src/components/DvtSidebar/dvtSidebarData';
import { nativeFilterGate } from 'src/dashboard/components/nativeFilters/utils';
import DvtInput from 'src/components/DvtInput';
import DvtButton from 'src/components/DvtButton';
import {
  dvtNavbarChartAddSetVizType,
  dvtNavbarChartSearchVizType,
} from 'src/dvt-redux/dvt-navbarReducer';
import {
  StyledButtonGrup,
  StyledInputGrup,
  StyledViewAllChart,
  StyledViewAllChartBody,
  StyledVizTypeGallery,
} from './view-all-charts.module';

interface ChartCreationState {
  datasource?: { label: string; value: string };
  datasetName?: string | string[] | null;
  vizType: string | null;
  canCreateDataset: boolean;
}

const denyList: string[] = ['filter_box'];
type VizEntry = {
  key: string;
  value: ChartMetadata;
};
const DvtViewAllCharts = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const chartAddSelector = useAppSelector(state => state.dvtSidebar.chartAdd);

  const bootstrapData = getBootstrapData();
  const [chart, setChart] = useState<ChartCreationState>({
    vizType: null,
    canCreateDataset: findPermission(
      'can_write',
      'Dataset',
      bootstrapData.user?.roles,
    ),
  });

  const changeVizType = (vizType: string | null) => {
    setChart(prevState => ({ ...prevState, vizType }));
  };

  const updateChartAddProperty = (value: string, propertyName: string) => {
    const changesOneItem = ['recommended_tags', 'category', 'tags'];
    if (chartAddSelector[propertyName] !== value) {
      if (changesOneItem.includes(propertyName)) {
        const oneSelectedItem = changesOneItem.reduce((acc, item) => {
          acc[item] = propertyName === item ? value : '';
          return acc;
        }, {});
        dispatch(
          dvtSidebarChartAddSetProperty({
            chartAdd: {
              ...chartAddSelector,
              ...oneSelectedItem,
            },
          }),
        );
      } else {
        dispatch(
          dvtSidebarChartAddSetProperty({
            chartAdd: {
              ...chartAddSelector,
              [propertyName]: value,
            },
          }),
        );
      }
    }
  };

  const { mountedPluginMetadata } = usePluginContext();
  const typesWithDefaultOrder = new Set(DefaultOrder);
  const RECOMMENDED_TAGS = [
    t('Popular'),
    t('ECharts'),
    t('Advanced-Analytics'),
  ];
  const OTHER_CATEGORY = 'Other';

  function vizSortFactor(entry: VizEntry) {
    if (typesWithDefaultOrder.has(entry.key)) {
      return DefaultOrder.indexOf(entry.key);
    }
    return DefaultOrder.length;
  }
  const chartMetadata: VizEntry[] = useMemo(() => {
    const result = Object.entries(mountedPluginMetadata)
      .map(([key, value]) => ({ key, value }))
      .filter(
        ({ value }) =>
          nativeFilterGate(value.behaviors || []) && !value.deprecated,
      );
    result.sort((a, b) => vizSortFactor(a) - vizSortFactor(b));
    return result;
  }, [mountedPluginMetadata]);

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

  const tags = useMemo(
    () =>
      Object.keys(chartsByTags)
        .sort((a, b) => a.localeCompare(b))
        .filter(tag => RECOMMENDED_TAGS.indexOf(tag) === -1),
    [chartsByTags],
  );

  const chartsByCategory = useMemo(() => {
    const result: Record<string, VizEntry[]> = {};
    chartMetadata.forEach(entry => {
      const category = entry.value.category || OTHER_CATEGORY;
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(entry);
    });
    return result;
  }, [chartMetadata]);

  const categories = useMemo(
    () =>
      Object.keys(chartsByCategory).sort((a, b) => {
        // make sure Other goes at the end
        if (a === OTHER_CATEGORY) return 1;
        if (b === OTHER_CATEGORY) return -1;
        // sort alphabetically
        return a.localeCompare(b);
      }),
    [chartsByCategory],
  );

  const tag: { value: string; label: string }[] = tags.map(tag => ({
    value: tag,
    label: tag,
  }));

  const category: { value: string; label: string }[] = categories.map(
    categories => ({ value: categories, label: categories }),
  );

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('chartAdd'));
    },
    [],
  );

  const handleApply = () => {
    if (chart.vizType) {
      dispatch(dvtNavbarChartAddSetVizType(chart.vizType));
    }
    onClose();
  };

  return (
    <StyledViewAllChart>
      <DvtModalHeader
        title={t('Select a visualization type')}
        onClose={onClose}
      />

      <StyledViewAllChartBody>
        <StyledInputGrup>
          <DvtSelect
            data={[
              { label: t('Popular'), value: 'popular' },
              { label: t('ECharts'), value: 'echarts' },
              { label: t('Advanced-Analytics'), value: 'advanced_analytics' },
            ]}
            selectedValue={chartAddSelector.recommended_tags}
            setSelectedValue={value =>
              updateChartAddProperty(value, 'recommended_tags')
            }
            label={t('Recommended Tags')}
            placeholder={t('Recommended Tags')}
            onShowClear
          />
          <DvtSelect
            data={category}
            selectedValue={chartAddSelector.category}
            setSelectedValue={value =>
              updateChartAddProperty(value, 'category')
            }
            label={t('Category')}
            placeholder={t('Category')}
            onShowClear
          />
          <DvtSelect
            data={tag}
            selectedValue={chartAddSelector.tags}
            setSelectedValue={value => updateChartAddProperty(value, 'tags')}
            label={t('Tags')}
            placeholder={t('Tags')}
            onShowClear
          />
          <DvtInput
            type="search"
            label={t('Search')}
            placeholder={t('Search')}
            value={chartAddSelector.search}
            onChange={v => dispatch(dvtNavbarChartSearchVizType(v))}
            onShowClear
          />
        </StyledInputGrup>
        <StyledVizTypeGallery>
          <DvtVizTypeGallery
            denyList={denyList}
            className="viz-gallery"
            onChange={changeVizType}
            onDoubleClick={() => {}}
            selectedViz={chart.vizType}
          />
        </StyledVizTypeGallery>
        <StyledButtonGrup>
          <DvtButton
            bold
            typeColour="powder"
            label={t('CANCEL')}
            onClick={onClose}
          />
          <DvtButton bold label={t('SAVE')} onClick={handleApply} />
        </StyledButtonGrup>
      </StyledViewAllChartBody>
    </StyledViewAllChart>
  );
};

export default DvtViewAllCharts;
