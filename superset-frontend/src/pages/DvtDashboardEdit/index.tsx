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

import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/hooks/useFetch';
import rison from 'rison';
import { useHistory } from 'react-router-dom';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtCardDetailChartList, {
  DvtCardDetailChartListProps,
} from 'src/components/DvtCardDetailChartList';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import NewTabs from 'src/dashboard/components/gridComponents/new/NewTabs';
import NewRow from 'src/dashboard/components/gridComponents/new/NewRow';
import NewColumn from 'src/dashboard/components/gridComponents/new/NewColumn';
import NewHeader from 'src/dashboard/components/gridComponents/new/NewHeader';
import NewMarkdown from 'src/dashboard/components/gridComponents/new/NewMarkdown';
import NewDivider from 'src/dashboard/components/gridComponents/new/NewDivider';
import DvtCheckbox from 'src/components/DvtCheckbox';
import {
  StyledTab,
  StyledDashboard,
  StyledDashboardEdit,
  StyledTabs,
  StyledTabsGroup,
  StyledChartList,
  StyledChartFilter,
} from './dvtDashboardEdit.module';

function DvtDashboardList() {
  const history = useHistory<{ from: string }>();
  const [activeTab, setActiveTab] = useState<string>('charts');
  const [chartsApiUrl, setChartsApiUrl] = useState<string>('');
  const [droppedData, setDroppedData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<DvtCardDetailChartListProps>({
    data: [],
  });
  const [sortType, setsortType] = useState<{ value: string; label: string }>({
    label: t('Sort by name'),
    value: 'slice_name',
  });
  const [searchInput, setSearchInput] = useState<string>('');
  const [showMyOnlyChart, setShowMyOnlyChart] = useState<boolean>(false);

  const getApiData = useFetch({
    url: chartsApiUrl,
  });

  const searchApiUrls = () =>
    `chart/${fetchQueryParamsSearch({
      columns: [
        'changed_on_delta_humanized',
        'changed_on_utc',
        'datasource_id',
        'datasource_type',
        'datasource_url',
        'datasource_name_text',
        'description_markeddown',
        'description',
        'id',
        'params',
        'slice_name',
        'thumbnail_url',
        'url',
        'viz_type',
        'owners.id',
        'created_by.id',
      ],
      filters: [
        {
          col: 'slice_name',
          opr: 'chart_all_text',
          value: rison.encode(searchInput),
        },
        {
          col: 'viz_type',
          opr: 'neq',
          value: 'filter_box',
        },
        {
          col: 'owners',
          opr: 'rel_m_m',
          value: showMyOnlyChart ? '1' : '0',
        },
      ],
      pageSize: 200,
      orderColumn: sortType.value,
      orderDirection:
        sortType.value === 'changed_on_delta_humanized' ? 'desc' : 'asc',
    })}`;

  useEffect(() => {
    setChartsApiUrl(searchApiUrls);
  }, [searchInput, sortType, showMyOnlyChart]);

  useEffect(() => {
    if (getApiData) {
      const mappedData: DvtCardDetailChartListProps = {
        data: getApiData.result.map((item: any) => ({
          labelTitle: item.slice_name,
          vizTypeLabel: item.viz_type,
          datasetLabel: item.datasource_name_text,
          modified: new Date(item.changed_on_delta_humanized),
          datasetLink: `/explore/?datasource_type=${item.datasource_type}&datasource_id=${item.datasource_id}`,
        })),
      };
      setChartData(mappedData);
    }
  }, [getApiData]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const droppedData = JSON.parse(droppedDataString);

    if (droppedData) {
      setDroppedData((prevData: any | any[]) => {
        const newData = Array.isArray(prevData)
          ? [...prevData, droppedData]
          : [droppedData];
        return newData;
      });
    }
  };

  const KEYS_TO_SORT = {
    slice_name: t('name'),
    viz_type: t('viz type'),
    datasource_name: t('dataset'),
    changed_on_delta_humanized: t('recent'),
  };

  return (
    <StyledDashboardEdit>
      <StyledDashboard onDragOver={handleDragOver} onDrop={handleDrop}>
        {droppedData.length === 0 && (
          <DvtIconDataLabel
            description="You can create a new chart or use existinh ones from the panel on the right"
            icon="square"
            label="Drag and drop components and charts to the dashboard"
            buttonLabel="+ Create a New Chart"
            buttonClick={() => history.push('/chart/add')}
          />
        )}
      </StyledDashboard>
      <StyledTab>
        <StyledTabsGroup>
          <StyledTabs
            activeTab={activeTab === 'charts'}
            onClick={() => setActiveTab('charts')}
          >
            Charts
          </StyledTabs>
          <StyledTabs
            activeTab={activeTab === 'layoutElements'}
            onClick={() => setActiveTab('layoutElements')}
          >
            Layout Elements
          </StyledTabs>
        </StyledTabsGroup>

        {activeTab === 'charts' && (
          <StyledChartList>
            <DvtButton
              label="+ Create a New Chart"
              onClick={() => history.push('/chart/add')}
              size="small"
              typeColour="powder"
            />
            <StyledChartFilter>
              <DvtInput
                onChange={setSearchInput}
                placeholder="Filter your charts"
                size="small"
                type="text"
                typeDesign="chartsForm"
                value={searchInput}
              />
              <DvtSelect
                data={Object.entries(KEYS_TO_SORT).map(([key, label]) => ({
                  label: t('Sort by %s', label),
                  value: key,
                }))}
                placeholder="Short by recent"
                selectedValue={sortType}
                setSelectedValue={setsortType}
              />
            </StyledChartFilter>
            <DvtCheckbox
              label={t('Show only my charts')}
              checked={showMyOnlyChart}
              onChange={setShowMyOnlyChart}
            />
            <DvtCardDetailChartList data={chartData.data} />
          </StyledChartList>
        )}
        {activeTab === 'layoutElements' && (
          <>
            <NewTabs />
            <NewRow />
            <NewColumn />
            <NewHeader />
            <NewMarkdown />
            <NewDivider />
          </>
        )}
      </StyledTab>
    </StyledDashboardEdit>
  );
}

export default withToasts(DvtDashboardList);
