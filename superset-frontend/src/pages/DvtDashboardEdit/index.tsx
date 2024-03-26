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
import useFetch from 'src/dvt-hooks/useFetch';
import rison from 'rison';
import { useHistory } from 'react-router-dom';
import { dvtChartGetDashboardEdit } from 'src/dvt-redux/dvt-dashboardEditReducer';
import { useDispatch } from 'react-redux';
// import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtCardDetailChartList from 'src/components/DvtCardDetailChartList';
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
import useResizeDetectorByObserver from 'src/dvt-hooks/useResizeDetectorByObserver';
import ChartContainer from 'src/components/Chart/ChartContainer';
import DvtSpinner from 'src/components/DvtSpinner';
import Icon from 'src/components/Icons/Icon';
import {
  StyledTab,
  StyledDashboard,
  StyledDashboardEdit,
  StyledTabs,
  StyledTabsGroup,
  StyledChartList,
  StyledChartFilter,
  StyledDashboardDroppedList,
  StyledDashboardDroppedListItem,
  StyledDashboardDroppedListItemTitle,
  StyledDashboardDroppedListItemChart,
} from './dvtDashboardEdit.module';

function DvtDashboardList() {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  // const dashboardEditSelector = useAppSelector(state => state.dvtDashboardEdit);
  const [activeTab, setActiveTab] = useState<string>('charts');
  const [chartsApiUrl, setChartsApiUrl] = useState<string>('');
  const [droppedData, setDroppedData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [sortType, setsortType] = useState<{ value: string; label: string }>({
    label: t('Sort by name'),
    value: 'slice_name',
  });
  const [searchInput, setSearchInput] = useState<string>('');
  const [showMyOnlyChart, setShowMyOnlyChart] = useState<boolean>(false);
  const [dashboardApiUrl, setDashboardApiUrl] = useState<string>('');
  const [chartResultApiUrl, setChartResultApiUrl] = useState<string>('');
  const [chartRenderApiUrl, setChartRenderApiUrl] = useState<string>('');
  const [chartRenderApiBody, setChartRenderApiBody] = useState<any>(null);

  const getApiData = useFetch({
    url: chartsApiUrl,
  });

  const getDashboardPromise = useFetch({
    url: dashboardApiUrl,
  });

  const getChartResultData = useFetch({
    url: chartResultApiUrl,
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
    if (getApiData.data) {
      const sliceData = getApiData.data.result.map((item: any) => ({
        ...item,
        form_data: {
          ...JSON.parse(item.params),
          datasource: item.datasource_id
            ? `${item.datasource_id}__${item.datasource_type}`
            : JSON.parse(item.params).datasource,
        },
      }));
      setChartData(sliceData);
    }
  }, [getApiData.data]);

  useEffect(() => {
    const pathnameDashboardSplit =
      history.location.pathname.split('/dashboard/')[1];
    if (pathnameDashboardSplit) {
      setDashboardApiUrl(`dashboard/${pathnameDashboardSplit.split('/')[0]}`);
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (getDashboardPromise.data) {
      dispatch(dvtChartGetDashboardEdit(getDashboardPromise.data.result));
    }
  }, [getDashboardPromise.data]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const jsonDropItem = JSON.parse(droppedDataString);

    if (jsonDropItem && droppedData.length < 3) {
      setChartResultApiUrl(`chart/${jsonDropItem.id}`);
    }
  };

  const KEYS_TO_SORT = {
    slice_name: t('name'),
    viz_type: t('viz type'),
    datasource_name: t('dataset'),
    changed_on_delta_humanized: t('recent'),
  };

  const {
    ref: chartPanelRef,
    observerRef: resizeObserverRef,
    width: chartPanelWidth,
    height: chartPanelHeight,
  } = useResizeDetectorByObserver();

  useEffect(() => {
    if (getChartResultData.data) {
      const findChart = chartData.find(
        f => f.id === getChartResultData.data.id,
      );
      setDroppedData((prevData: any | any[]) => {
        const newData = Array.isArray(prevData)
          ? [
              ...prevData,
              {
                ...findChart,
                render: [],
                result: getChartResultData.data.result,
                chartStatus: 'loading',
              },
            ]
          : {
              ...findChart,
              render: [],
              result: getChartResultData.data.result,
              chartStatus: 'loading',
            };
        return newData;
      });
      setChartRenderApiBody({
        id: getChartResultData.data.id,
        queryContext: getChartResultData.data.result.query_context,
      });
      setChartRenderApiUrl('chart/data');
    }
  }, [getChartResultData.data]);

  const chartRenderPromise = useFetch({
    url: chartRenderApiUrl,
    method: 'POST',
    body: chartRenderApiBody ? JSON.parse(chartRenderApiBody.queryContext) : {},
  });

  useEffect(() => {
    const result: any = { status: '', chart: [] };
    if (chartRenderPromise.data) {
      result.chart = chartRenderPromise.data.result;
      result.status = 'rendered';
    }
    if (chartRenderPromise.error) {
      result.status = 'failed';
      if (chartRenderPromise.error?.errors) {
        result.chart = chartRenderPromise.error.errors;
      } else if (chartRenderPromise.error?.message) {
        result.chart = [
          {
            error: chartRenderPromise.error.message,
            message: chartRenderPromise.error.message,
          },
        ];
      }
    }
    if (chartRenderApiBody?.id && result.chart.length) {
      const findDataRemoveAndDroppedData = droppedData.filter(
        f => f.id !== chartRenderApiBody.id,
      );
      const findData = droppedData.find(f => f.id === chartRenderApiBody.id);
      setDroppedData([
        ...findDataRemoveAndDroppedData,
        { ...findData, render: result.chart, chartStatus: result.status },
      ]);
    }
  }, [chartRenderPromise.error, chartRenderPromise.data]);

  useEffect(() => {
    if (!chartRenderPromise.loading) {
      setChartRenderApiBody(null);
      setChartRenderApiUrl('');
    }
  }, [chartRenderPromise.loading]);

  return (
    <StyledDashboardEdit>
      <StyledDashboard onDragOver={handleDragOver} onDrop={handleDrop}>
        {droppedData.length === 0 ? (
          <DvtIconDataLabel
            description="You can create a new chart or use existinh ones from the panel on the right"
            icon="square"
            label="Drag and drop components and charts to the dashboard"
            buttonLabel="+ Create a New Chart"
            buttonClick={() => history.push('/chart/add')}
          />
        ) : (
          <StyledDashboardDroppedList>
            {droppedData.map(item => (
              <StyledDashboardDroppedListItem key={item.id}>
                <StyledDashboardDroppedListItemTitle>
                  <div>{item.slice_name}</div>
                  <Icon
                    style={{ cursor: 'pointer' }}
                    fileName="dvt-delete"
                    onClick={() =>
                      setDroppedData(droppedData.filter(f => f.id !== item.id))
                    }
                  />
                </StyledDashboardDroppedListItemTitle>
                <StyledDashboardDroppedListItemChart ref={resizeObserverRef}>
                  {item.chartStatus === 'loading' ? (
                    <DvtSpinner type="grow" size="xlarge" />
                  ) : (
                    <div
                      style={{ height: '100%', width: '100%' }}
                      ref={chartPanelRef}
                    >
                      <ChartContainer
                        width={chartPanelWidth}
                        height={chartPanelHeight}
                        ownState={undefined}
                        annotationData={undefined}
                        chartAlert={null}
                        chartStackTrace={null}
                        chartId={0}
                        chartStatus={item.chartStatus}
                        formData={JSON.parse(item.result.params)}
                        queriesResponse={item.render}
                        timeout={60}
                        vizType={item.viz_type}
                      />
                    </div>
                  )}
                </StyledDashboardDroppedListItemChart>
              </StyledDashboardDroppedListItem>
            ))}
          </StyledDashboardDroppedList>
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
            <DvtCardDetailChartList
              data={chartData}
              added={droppedData.map((v: { id: number }) => v.id)}
            />
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
