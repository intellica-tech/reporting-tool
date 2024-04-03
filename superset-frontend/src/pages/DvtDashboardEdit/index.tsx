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
import { useHistory, useLocation } from 'react-router-dom';
import {
  dvtChartGetDashboardEdit,
  dvtChartGetDashboardEditClear,
  dvtChartGetDashboardEditSetValue,
} from 'src/dvt-redux/dvt-dashboardEditReducer';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import withToasts, { useToasts } from 'src/components/MessageToasts/withToasts';
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
import {
  StyledTab,
  StyledDashboard,
  StyledDashboardEdit,
  StyledTabs,
  StyledTabsGroup,
  StyledChartList,
  StyledChartFilter,
  StyledDashboardDroppedList,
  StyledNewAddRow,
} from './dvtDashboardEdit.module';
import DvtDashboardEditChart from './components/DvtDashboardEditChart';
import DvtDashboardEditRow from './components/DvtDashboardEditRow';

function DvtDashboardList() {
  const dispatch = useDispatch();
  const { addDangerToast } = useToasts();
  const history = useHistory<{ from: string }>();
  const location = useLocation();
  const isEditPathname = location.search === '?edit=true';
  const dashboardEditSelector = useAppSelector(
    state => state.dvtDashboardEdit.get,
  );
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
  const [newAddRowHovered, setNewAddRowHovered] = useState<boolean>(false);

  const firstCreatePosition = {
    DASHBOARD_VERSION_KEY: 'v2',
    GRID_ID: {
      children: [],
      id: 'GRID_ID',
      parents: ['ROOT_ID'],
      type: 'GRID',
    },
    HEADER_ID: {
      id: 'HEADER_ID',
      meta: {
        text: dashboardEditSelector.dashboard_title,
      },
      type: 'HEADER',
    },
    ROOT_ID: {
      children: ['GRID_ID'],
      id: 'ROOT_ID',
      type: 'ROOT',
    },
  };

  const position = dashboardEditSelector.position_json;

  // const position = {
  //   'CHART-1gfndpe10o': {
  //     children: [],
  //     id: 'CHART-1gfndpe10o',
  //     meta: {
  //       chartId: 250,
  //       height: 50,
  //       sliceName: 'a',
  //       uuid: '4d416188-243a-492d-bfcf-6d0d31e1526c',
  //       width: 2,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-fg29jmsttq'],
  //     type: 'CHART',
  //   },
  //   DASHBOARD_VERSION_KEY: 'v2',
  //   GRID_ID: {
  //     children: ['ROW-fg29jmsttq', 'ROW-vvs4dre9xa', 'ROW-0nb7khqz2e'],
  //     id: 'GRID_ID',
  //     parents: ['ROOT_ID'],
  //     type: 'GRID',
  //   },
  //   HEADER_ID: {
  //     id: 'HEADER_ID',
  //     meta: {
  //       text: 'ddd',
  //     },
  //     type: 'HEADER',
  //   },
  //   ROOT_ID: {
  //     children: ['GRID_ID'],
  //     id: 'ROOT_ID',
  //     type: 'ROOT',
  //   },
  //   'ROW-fg29jmsttq': {
  //     children: ['CHART-1gfndpe10o', 'CHART-6ddj5c69yh', 'CHART-bg935pwqmc'],
  //     id: 'ROW-fg29jmsttq',
  //     meta: {
  //       background: 'BACKGROUND_TRANSPARENT',
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID'],
  //     type: 'ROW',
  //   },
  //   'ROW-vvs4dre9xa': {
  //     children: ['CHART-txoio6r4jr', 'CHART-9ru4m2d974'],
  //     id: 'ROW-vvs4dre9xa',
  //     meta: {
  //       background: 'BACKGROUND_TRANSPARENT',
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID'],
  //     type: 'ROW',
  //   },
  //   'CHART-txoio6r4jr': {
  //     children: [],
  //     id: 'CHART-txoio6r4jr',
  //     meta: {
  //       chartId: 243,
  //       height: 50,
  //       sliceName: 'iris_base_table_report',
  //       width: 5,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-vvs4dre9xa'],
  //     type: 'CHART',
  //   },
  //   'CHART-9ru4m2d974': {
  //     children: [],
  //     id: 'CHART-9ru4m2d974',
  //     meta: {
  //       chartId: 246,
  //       height: 50,
  //       sliceName: 'iris_statistical_histogram_report',
  //       width: 7,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-vvs4dre9xa'],
  //     type: 'CHART',
  //   },
  //   'CHART-6ddj5c69yh': {
  //     children: [],
  //     id: 'CHART-6ddj5c69yh',
  //     meta: {
  //       chartId: 244,
  //       height: 50,
  //       sliceName: 'iris_statistical_mean_report',
  //       width: 4,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-fg29jmsttq'],
  //     type: 'CHART',
  //   },
  //   'CHART-bg935pwqmc': {
  //     children: [],
  //     id: 'CHART-bg935pwqmc',
  //     meta: {
  //       chartId: 245,
  //       height: 50,
  //       sliceName: 'iris_statistical_skewness_report',
  //       width: 6,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-fg29jmsttq'],
  //     type: 'CHART',
  //   },
  //   'ROW-0nb7khqz2e': {
  //     children: ['CHART-ihkxgszx5w'],
  //     id: 'ROW-0nb7khqz2e',
  //     meta: {
  //       background: 'BACKGROUND_TRANSPARENT',
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID'],
  //     type: 'ROW',
  //   },
  //   'CHART-ihkxgszx5w': {
  //     children: [],
  //     id: 'CHART-ihkxgszx5w',
  //     meta: {
  //       chartId: 249,
  //       height: 50,
  //       sliceName: 'iris try',
  //       width: 12,
  //     },
  //     parents: ['ROOT_ID', 'GRID_ID', 'ROW-0nb7khqz2e'],
  //     type: 'CHART',
  //   },
  // };

  const setPosition = (positionObjectItem: any) => {
    dispatch(
      dvtChartGetDashboardEditSetValue({
        key: 'position_json',
        value: positionObjectItem,
      }),
    );
  };

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

  const generateUniqueID = (prefix: string) => {
    const randomString = Math.random().toString(36).substr(2, 10);
    const uniqueID = `${prefix}-${randomString}`;
    return uniqueID;
  };

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
      dispatch(
        dvtChartGetDashboardEdit({
          ...getDashboardPromise.data.result,
          position_json: JSON.parse(
            getDashboardPromise.data.result.position_json,
          ),
        }),
      );
    }
  }, [getDashboardPromise.data]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newRow?: boolean) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const jsonDropItem = JSON.parse(droppedDataString);

    const rowUnique = generateUniqueID('ROW');
    const chartUnique = generateUniqueID('CHART');

    const rowCreate = {
      [rowUnique]: {
        children: [chartUnique],
        id: rowUnique,
        meta: {
          background: 'BACKGROUND_TRANSPARENT',
        },
        parents: ['ROOT_ID', 'GRID_ID'],
        type: 'ROW',
      },
    };

    const chartCreate = {
      [chartUnique]: {
        children: [],
        id: chartUnique,
        meta: {
          chartId: jsonDropItem.id,
          height: 50,
          sliceName: jsonDropItem.slice_name,
          width: 4,
        },
        parents: ['ROOT_ID', 'GRID_ID', rowUnique],
        type: 'CHART',
      },
    };

    const firstOrThenAddPosition = newRow ? position : firstCreatePosition;

    setPosition({
      ...firstOrThenAddPosition,
      GRID_ID: {
        ...firstOrThenAddPosition.GRID_ID,
        children: newRow
          ? [...firstOrThenAddPosition.GRID_ID.children, rowUnique]
          : [rowUnique],
      },
      ...rowCreate,
      ...chartCreate,
    });
    setNewAddRowHovered(false);

    if (jsonDropItem) {
      setChartResultApiUrl(`chart/${jsonDropItem.id}`);
    }
  };

  const handleDropRow = (
    e: React.DragEvent<HTMLDivElement>,
    rowObjectName: string,
  ) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const jsonDropItem = JSON.parse(droppedDataString);

    const chartUnique = generateUniqueID('CHART');

    const chartCreate = {
      [chartUnique]: {
        children: [],
        id: chartUnique,
        meta: {
          chartId: jsonDropItem.id,
          height: 50,
          sliceName: jsonDropItem.slice_name,
          width: 4,
        },
        parents: ['ROOT_ID', 'GRID_ID', rowObjectName],
        type: 'CHART',
      },
    };

    const rowInItemsHowMuchWidth = Object.entries(position)
      .filter((f: any) => position[rowObjectName].children.includes(f[0]))
      .map((m: any) => m[1].meta?.width)
      .reduce((prev, current) => prev + current, 0);

    if (jsonDropItem && rowInItemsHowMuchWidth < 12) {
      setPosition({
        ...position,
        [rowObjectName]: {
          ...position[rowObjectName],
          children: [...position[rowObjectName].children, chartUnique],
        },
        ...chartCreate,
      });
      setChartResultApiUrl(`chart/${jsonDropItem.id}`);
    } else {
      addDangerToast(
        t(
          'There is not enough space for this component. Try decreasing its width, or increasing the destination width.',
        ),
      );
    }
  };

  const KEYS_TO_SORT = {
    slice_name: t('name'),
    viz_type: t('viz type'),
    datasource_name: t('dataset'),
    changed_on_delta_humanized: t('recent'),
  };

  const [firstOpenFetched, setFirstOpenFetched] = useState(true);
  const [getDroppedFetch, setGetDroppedFetch] = useState<any[]>([]);

  const chartIds: any = dashboardEditSelector.position_json
    ? Object.keys(dashboardEditSelector.position_json)
        .filter(o => !!o.split('CHART-')[1])
        .map(field => dashboardEditSelector.position_json[field].meta.chartId)
    : [];

  useEffect(() => {
    if (
      dashboardEditSelector.position_json !== null &&
      chartIds.length &&
      firstOpenFetched
    ) {
      setGetDroppedFetch(chartIds);
      setFirstOpenFetched(false);
    }
  }, [chartIds, firstOpenFetched, dashboardEditSelector.position_json]);

  useEffect(() => {
    if (getDroppedFetch.length && chartData.length) {
      const findItemId = getDroppedFetch.find((item: any) => item);
      setChartResultApiUrl(`chart/${findItemId}`);
    }
  }, [getDroppedFetch.length, chartData.length]);

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
      if (getDroppedFetch.length) {
        setGetDroppedFetch(
          getDroppedFetch.filter((item: any) => item !== chartRenderApiBody.id),
        );
      }
    }
  }, [chartRenderPromise.error, chartRenderPromise.data]);

  useEffect(() => {
    if (!chartRenderPromise.loading) {
      setChartRenderApiBody(null);
      setChartRenderApiUrl('');
    }
  }, [chartRenderPromise.loading]);

  const handleRemoveRow = (rowObjectName: string) => {
    const beforePosition = { ...position };
    const rowChildren = position[rowObjectName].children;

    const removeChidrenDroppedData = droppedData.filter(
      (f: any) =>
        !rowChildren.some((s: any) => position[s].meta.chartId === f.id),
    );

    for (let i = 0; i < rowChildren.length; i += 1) {
      const element = rowChildren[i];
      delete beforePosition[element];
    }

    delete beforePosition[rowObjectName];

    setPosition({
      ...beforePosition,
      GRID_ID: {
        ...position.GRID_ID,
        children: position.GRID_ID.children.filter(
          (f: string) => f !== rowObjectName,
        ),
      },
    });

    setDroppedData(removeChidrenDroppedData);
  };

  const handleRemoveChart = (
    rowObjectName: string,
    chartObjectName: string,
    id: number,
  ) => {
    const beforePosition = { ...position };
    const rowChildren = position[rowObjectName].children;

    delete beforePosition[chartObjectName];

    if (rowChildren.length === 1) {
      delete beforePosition[rowObjectName];
      beforePosition.GRID_ID = {
        ...position.GRID_ID,
        children: position.GRID_ID.children.filter(
          (f: string) => f !== rowObjectName,
        ),
      };
    } else {
      beforePosition[rowObjectName] = {
        ...position[rowObjectName],
        children: position[rowObjectName].children.filter(
          (f: string) => f !== chartObjectName,
        ),
      };
    }

    setPosition({
      ...beforePosition,
    });

    setDroppedData(droppedData.filter(f => f.id !== id));
  };

  useEffect(
    () => () => {
      dispatch(dvtChartGetDashboardEditClear());
    },
    [],
  );

  // console.log(position);

  return (
    <StyledDashboardEdit>
      <StyledDashboard>
        {droppedData.length === 0 ? (
          <div
            style={{ width: '100%', height: '100%' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <DvtIconDataLabel
              description={
                isEditPathname
                  ? t(
                      'You can create a new chart or use existinh ones from the panel on the right',
                    )
                  : t(
                      'Go to the edit mode to configure the dashboard and add charts',
                    )
              }
              icon="square"
              label={
                isEditPathname
                  ? t('Drag and drop components and charts to the dashboard')
                  : t('There are no charts added to this dashboard')
              }
              buttonLabel={
                isEditPathname
                  ? t('+ Create a new chart')
                  : t('Edit the dashboard')
              }
              buttonClick={() =>
                isEditPathname
                  ? history.push('/chart/add')
                  : history.push(`${location.pathname}?edit=true`)
              }
            />
          </div>
        ) : (
          <StyledDashboardDroppedList>
            {position.GRID_ID?.children.map((gRow: string) => (
              <DvtDashboardEditRow
                key={gRow}
                deleteClick={() => handleRemoveRow(gRow)}
                onDrop={e => handleDropRow(e, gRow)}
                isEdit={isEditPathname}
              >
                {position[gRow]?.children.map((rItem: string) => {
                  const findItem = droppedData.find(
                    dropItem => dropItem.id === position[rItem].meta.chartId,
                  );

                  return (
                    findItem?.id && (
                      <DvtDashboardEditChart
                        key={rItem}
                        item={findItem}
                        meta={position[rItem].meta}
                        totalWidth={position[gRow]?.children
                          .map((rm: string) => position[rm].meta.width)
                          .reduce(
                            (prev: number, curr: number) => prev + curr,
                            0,
                          )}
                        rowChildLength={position[gRow]?.children.length}
                        deleteClick={() =>
                          handleRemoveChart(gRow, rItem, findItem.id)
                        }
                        isEdit={isEditPathname}
                      />
                    )
                  );
                })}
              </DvtDashboardEditRow>
            ))}
            {isEditPathname && (
              <StyledNewAddRow
                hovered={newAddRowHovered}
                onDrop={e => handleDrop(e, true)}
                onDragOver={e => e.preventDefault()}
                onDragLeave={e => {
                  e.preventDefault();
                  setNewAddRowHovered(false);
                }}
                onDragEnter={e => {
                  e.preventDefault();
                  setNewAddRowHovered(true);
                }}
              />
            )}
          </StyledDashboardDroppedList>
        )}
      </StyledDashboard>
      {isEditPathname && (
        <StyledTab>
          <StyledTabsGroup>
            <StyledTabs
              activeTab={activeTab === 'charts'}
              onClick={() => setActiveTab('charts')}
            >
              {t('Charts')}
            </StyledTabs>
            <StyledTabs
              activeTab={activeTab === 'layoutElements'}
              onClick={() => setActiveTab('layoutElements')}
            >
              {t('Layout Elements')}
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
      )}
    </StyledDashboardEdit>
  );
}

export default withToasts(DvtDashboardList);
