/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarChartAddSetProperty,
  dvtSidebarProfileSetTabs,
  dvtSidebarSetDataProperty,
  dvtSidebarSetProperty,
  dvtSidebarSetPropertySelectedRemove,
} from 'src/dvt-redux/dvt-sidebarReducer';
import { dvtSqlhubSetSelectedTableRemove } from 'src/dvt-redux/dvt-sqlhubReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { nativeFilterGate } from 'src/dashboard/components/nativeFilters/utils';
import { ChartMetadata, t } from '@superset-ui/core';
import useFetch from 'src/hooks/useFetch';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import { DoubleRightOutlined } from '@ant-design/icons';
import DvtLogo from '../DvtLogo';
// import DvtDarkMode from '../DvtDarkMode';
import DvtTitlePlus from '../DvtTitlePlus';
import DvtNavigation from '../DvtNavigation';
import DvtPopper from '../DvtPopper';
// import DvtFolderNavigation from '../DvtFolderNavigation';
import DvtSelect from '../DvtSelect';
import DvtNavigationBar from '../DvtNavigationBar';
import { DvtSidebarData, DefaultOrder } from './dvtSidebarData';
import Icon from '../Icons/Icon';
import {
  StyledDvtSidebar,
  StyledDvtSidebarHeader,
  StyledDvtSidebarBody,
  StyledDvtSidebarBodyItem,
  StyledDvtSidebarBodySelect,
  // StyledDvtSidebarFooter,
  StyledDvtSidebarIconGroup,
  StyledDvtSidebarGroup,
  StyledDvtSidebarIcon,
  StyledDvtSidebarRotateIcon,
  StyledDvtSidebarLink,
} from './dvt-sidebar.module';
import DvtList from '../DvtList';
import DvtDatePicker from '../DvtDatepicker';
import { usePluginContext } from '../DynamicPlugins';
import DvtInput from '../DvtInput';
import DvtSelectDatabaseList from '../DvtSelectDatabaseList';
import DvtInputSelect from '../DvtInputSelect';

interface DvtSidebarProps {
  pathName: string;
  minWidth: number;
}

type VizEntry = {
  key: string;
  value: ChartMetadata;
};

const DvtSidebar: React.FC<DvtSidebarProps> = ({ pathName, minWidth }) => {
  const dispatch = useDispatch();
  const reportsSelector = useAppSelector(state => state.dvtSidebar.reports);
  const alertsSelector = useAppSelector(state => state.dvtSidebar.alerts);
  const datasetsSelector = useAppSelector(state => state.dvtSidebar.datasets);
  const datasetAddSelector = useAppSelector(
    state => state.dvtSidebar.datasetAdd,
  );
  const newTrainedTableSelector = useAppSelector(
    state => state.dvtSidebar.newTrainedTable,
  );
  const connectionSelector = useAppSelector(
    state => state.dvtSidebar.connection,
  );
  const chartAddSelector = useAppSelector(state => state.dvtSidebar.chartAdd);
  const dashboardSelector = useAppSelector(state => state.dvtSidebar.dashboard);
  const annotationLayerSelector = useAppSelector(
    state => state.dvtSidebar.annotationLayer,
  );
  const rolesListSelector = useAppSelector(state => state.dvtSidebar.rolesList);
  const sqlhubSelector = useAppSelector(state => state.dvtSidebar.sqlhub);
  const profileSelector = useAppSelector(state => state.dvtSidebar.profile);
  const dataSelector = useAppSelector(state => state.dvtSidebar.data);
  const pageSqlhubSelector = useAppSelector(state => state.dvtSqlhub);
  const fetchedSelector = useAppSelector(
    state => state.dvtSidebar.data.fetched,
  );
  // const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectCategories, setSelectCategories] =
    useState<{ value: string; label: string }>();
  const [selectAlgorithm, setSelectAlgorithm] =
    useState<{ value: string; label: string }>();
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const pathTitles = (pathname: string) => {
    switch (pathname) {
      case '/welcome/':
        return 'welcome';
      case '/dashboard/list/':
        return 'dashboard';
      case '/alert/list/':
        return 'alerts';
      case '/report/list/':
        return 'reports';
      case '/databaseview/list/':
        return 'connection';
      case '/sqlhub/':
        return 'sqlhub';
      case '/tablemodelview/list/':
        return 'datasets';
      case '/sqlhub/history/':
        return 'queryHistory';
      case '/savedqueryview/list/':
        return 'savedQuery';
      case '/profile/':
        return 'profile';
      case '/chart/add':
        return 'chartAdd';
      case '/explore/':
        return 'chart';
      case '/dataset/add/':
        return 'datasetAdd';
      case '/annotationlayer/list/':
        return 'annotationLayer';
      case '/traindata/':
        return 'newTrainedTable';
      case '/roles/list/':
        return 'rolesList';
      default:
        return '';
    }
  };

  const sidebarDataFindPathname = DvtSidebarData.find(
    (item: { pathname: string }) => item.pathname === pathName,
  );

  const updateProperty = (pageKey: string, key: string, value: any) => {
    dispatch(
      dvtSidebarSetProperty({
        pageKey,
        key,
        value,
      }),
    );
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

  const [getDataApiUrl, setGetDataApiUrl] = useState<{
    name: string;
    url: string | null;
  }>({ name: '', url: null });

  const getApiData = useFetch({ url: getDataApiUrl.url });

  useEffect(() => {
    const findedPathName = DvtSidebarData.find(p => p.pathname === pathName);
    if (findedPathName) {
      const { apiUrls } = findedPathName;
      if (apiUrls?.length) {
        apiUrls.forEach(item => {
          if (!fetchedSelector[findedPathName.key][item.name]) {
            setGetDataApiUrl({
              name: `${findedPathName.key}-${item.name}`,
              url: item.url,
            });
          }
        });
      }
    }
  }, [
    fetchedSelector.dashboard,
    fetchedSelector.datasets,
    fetchedSelector.reports,
    fetchedSelector.alerts,
    pathName,
  ]);

  useEffect(() => {
    const changeAlgorithmName = () => {
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'newTrainedTable',
          key: 'algorithm_name',
          value: selectAlgorithm,
        }),
      );
    };
    changeAlgorithmName();
  }, [selectAlgorithm]);

  useEffect(() => {
    if (
      pathTitles(pathName) === 'sqlhub' &&
      dataSelector.sqlhub.database.length
    ) {
      const firstGetId = dataSelector.sqlhub.database
        .map((a: any) => a.value)
        .sort()[0];
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'sqlhub',
          key: 'database',
          value: dataSelector.sqlhub.database.find(
            (f: any) => f.value === firstGetId,
          ),
        }),
      );
    }
  }, [pathName, dataSelector.sqlhub.database.length]);

  useEffect(() => {
    if (getApiData) {
      const data = getApiData?.result;
      const dataObjectKeys: any[] = [
        {
          key: 'dashboard',
          keyNames: ['owner', 'createdBy'],
        },
        {
          key: 'alerts',
          keyNames: ['owner', 'createdBy'],
        },
        {
          key: 'annotationLayer',
          keyNames: ['createdBy'],
        },
        {
          key: 'datasets',
          keyNames: ['owner', 'database', 'schema'],
        },
        {
          key: 'chartAdd',
          keyNames: ['dataset'],
        },
        {
          key: 'sqlhub',
          keyNames: ['database'],
        },
        {
          key: 'reports',
          keyNames: ['owner', 'createdBy', 'dataset', 'dashboards'],
        },
        {
          key: 'datasetAdd',
          keyNames: ['database'],
        },
        {
          key: 'newTrainedTable',
          keyNames: ['database'],
        },
      ];
      dataObjectKeys.forEach(item => {
        const getDataApiUrlKeys = getDataApiUrl.name.split('-');
        if (getDataApiUrlKeys[0] === item.key) {
          item.keyNames.forEach((twoItem: string) => {
            if (getDataApiUrlKeys[1] === twoItem) {
              const editedData = data.map((item: any) => {
                switch (getDataApiUrl.name) {
                  case 'chartAdd-dataset':
                    return {
                      id: item.id,
                      value: item.table_name,
                      label: item.table_name,
                    };
                  case 'sqlhub-database':
                    return {
                      value: item.explore_database_id,
                      label: item.database_name,
                    };
                  case 'reports-dataset':
                    return {
                      value: item.id,
                      label: item.table_name,
                    };
                  case 'reports-dashboards':
                    return {
                      value: item.id,
                      label: item.dashboard_title,
                    };
                  case 'datasetAdd-database':
                    return {
                      value: item.explore_database_id,
                      label: item.database_name,
                    };
                  case 'newTrainedTable-database':
                    return {
                      value: item.explore_database_id,
                      label: item.database_name,
                    };
                  default:
                    return {
                      value: item.value,
                      label: item.text,
                    };
                }
              });
              dispatch(
                dvtSidebarSetDataProperty({
                  pageKey: item.key,
                  key: twoItem,
                  value: editedData,
                  fetched: true,
                }),
              );
            }
          });
        }
      });
    }
  }, [getApiData]);

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

  const selectsData = (sData: any) => {
    let dValue = [];

    const selectionObjectKeys: any[] = [
      {
        key: 'alerts',
        keyNames: ['owner', 'createdBy'],
      },
      {
        key: 'reports',
        keyNames: ['owner', 'createdBy', 'dataset', 'dashboards'],
      },
      {
        key: 'datasetAdd',
        keyNames: ['database', 'schema'],
      },
      {
        key: 'newTrainedTable',
        keyNames: ['database', 'schema'],
      },
      {
        key: 'sqlhub',
        keyNames: ['database', 'schema', 'see_table_schema'],
      },
      {
        key: 'dashboard',
        keyNames: ['owner', 'createdBy'],
      },
      {
        key: 'datasets',
        keyNames: ['owner', 'database', 'schema'],
      },
      {
        key: 'annotationLayer',
        keyNames: ['createdBy'],
      },
    ];
    const findPathTitle = selectionObjectKeys.find(
      item => item.key === pathTitles(pathName),
    );
    const onlyKeyNames = findPathTitle?.keyNames;

    if (pathTitles(pathName) === 'chartAdd' && sData.name === 'dataset') {
      dValue = dataSelector.chartAdd.dataset;
    } else if (pathTitles(pathName) === 'chartAdd' && sData.name === 'tags') {
      dValue = tag;
    } else if (
      pathTitles(pathName) === 'chartAdd' &&
      sData.name === 'category'
    ) {
      dValue = category;
    } else if (findPathTitle && onlyKeyNames.includes(sData.name)) {
      dValue = dataSelector[findPathTitle.key][sData.name];
    } else {
      dValue = sData.values;
    }

    return dValue;
  };

  const withForms = [
    'datasets',
    'datasetAdd',
    'newTrainedTable',
    'dashboard',
    'annotationLayer',
    'alerts',
    'reports',
    'connection',
    'sqlhub',
    'chartAdd',
    'sqlhubHistory',
    'chart',
    'rolesList',
  ];

  const getAlgorithmOptions = () => {
    switch (selectCategories?.value) {
      case '1':
        return [{ value: 'lstm', label: 'LSTM' }];
      case '2':
        return [
          { value: 'cumulative_sum', label: 'Cumulative sum' },
          { value: 'mean', label: 'Mean' },
          { value: 'median', label: 'Median' },
          { value: 'min_max', label: 'Min Max' },
          { value: 'variance', label: 'Variance' },
          { value: 'percentile', label: 'Percentile' },
          { value: 'skewness', label: 'Skewness' },
          { value: 'kurtosis', label: 'Kurtosis' },
          { value: 'histogram', label: 'Histogram' },
          { value: 'correlation', label: 'Correlation' },
          { value: 't_test', label: 'T-test' },
          { value: 'z_test', label: 'Z-test' },
          { value: 'chi_square', label: 'Chi square' },
          { value: 'linear_regression', label: 'Linear regression' },
        ];
      case '3':
        return [
          { value: '13', label: 'kMeans' },
          { value: '14', label: 'GMM' },
          { value: '15', label: 'DBSCAN' },
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const changeAlgorithmName = () => {
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'newTrainedTable',
          key: 'selectCategory',
          value: selectCategories,
        }),
      );
    };
    changeAlgorithmName();
  }, [selectCategories]);

  return (
    <StyledDvtSidebar minWidth={minWidth}>
      <StyledDvtSidebarHeader>
        <DvtLogo title="DVT" />
      </StyledDvtSidebarHeader>
      {pathTitles(pathName) === 'welcome' && (
        <StyledDvtSidebarBody pathName={pathName}>
          {sidebarDataFindPathname?.data.map((data: any, index: number) => (
            <StyledDvtSidebarBodyItem key={index}>
              {data.titleMenu === 'folder navigation' && (
                <>
                  <DvtTitlePlus title={data.title} />
                  <DvtNavigation data={data.data} />
                </>
              )}
              {/* {data.titleMenu === 'folder' && (
                <>
                  <DvtTitlePlus title={data.title} onClick={() => {}} />
                  <DvtFolderNavigation data={data.data} />
                </>
              )}
              {data.titleMenu === 'shared folder' && (
                <DvtTitlePlus title={data.title} onClick={() => {}} />
              )} */}
            </StyledDvtSidebarBodyItem>
          ))}
        </StyledDvtSidebarBody>
      )}

      {withForms.includes(pathTitles(pathName)) && (
        <StyledDvtSidebarGroup>
          {DvtSidebarData.find(
            (item: { pathname: string }) => item.pathname === '/welcome/',
          )
            ?.data.filter((data: any) => data.titleMenu === 'folder navigation')
            .map((filteredData: any, index: number) => (
              <div key={index}>
                <StyledDvtSidebarIconGroup ref={ref} isOpen={isOpen}>
                  {filteredData.data.map((item: any, subIndex: number) =>
                    isOpen ? (
                      <StyledDvtSidebarLink to={item.url} key={subIndex}>
                        <StyledDvtSidebarIcon
                          isOpen={isOpen}
                          active={pathName === item.url}
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon fileName={item.fileName} />
                          {isOpen && item.title}
                        </StyledDvtSidebarIcon>
                      </StyledDvtSidebarLink>
                    ) : (
                      <DvtPopper
                        label={item.title}
                        direction="right"
                        size="small"
                        key={subIndex}
                      >
                        <StyledDvtSidebarLink to={item.url}>
                          <StyledDvtSidebarIcon
                            isOpen={isOpen}
                            active={pathName === item.url}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon fileName={item.fileName} />
                            {isOpen && item.title}
                          </StyledDvtSidebarIcon>{' '}
                        </StyledDvtSidebarLink>
                      </DvtPopper>
                    ),
                  )}

                  <StyledDvtSidebarRotateIcon
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <DoubleRightOutlined />
                  </StyledDvtSidebarRotateIcon>
                </StyledDvtSidebarIconGroup>
              </div>
            ))}

          <StyledDvtSidebarBody pathName={pathName}>
            {pathTitles(pathName) === 'newTrainedTable' && (
              <div>
                <DvtSelect
                  data={[
                    { value: '1', label: 'Time Series' },
                    { value: '2', label: 'Statistical' },
                    { value: '3', label: 'Segmentation' },
                  ]}
                  label="CATEGORY"
                  placeholder="CATEGORY"
                  selectedValue={selectCategories}
                  setSelectedValue={setSelectCategories}
                  maxWidth
                  onShowClear={pathTitles(pathName) !== 'sqlhub'}
                />
                <DvtSelect
                  data={getAlgorithmOptions()}
                  label="ALGORİTHM"
                  placeholder="ALGORİTHM"
                  selectedValue={selectAlgorithm}
                  setSelectedValue={setSelectAlgorithm}
                  maxWidth
                  onShowClear={pathTitles(pathName) !== 'sqlhub'}
                />
              </div>
            )}
            {!isOpen &&
              sidebarDataFindPathname?.data.map(
                (
                  data: {
                    label: string;
                    values: { label: string; value: string }[];
                    placeholder: string;
                    title: string;
                    datePicker?: boolean;
                    name: string;
                    status: string;
                  },
                  index: number,
                ) => (
                  <StyledDvtSidebarBodySelect key={index}>
                    {!data.datePicker && !data.status && (
                      <DvtSelect
                        data={selectsData(data)}
                        label={data.label}
                        placeholder={data.placeholder}
                        selectedValue={
                          pathTitles(pathName) === 'reports'
                            ? reportsSelector[data.name]
                            : pathTitles(pathName) === 'alerts'
                            ? alertsSelector[data.name]
                            : pathTitles(pathName) === 'connection'
                            ? connectionSelector[data.name]
                            : pathTitles(pathName) === 'datasets'
                            ? datasetsSelector[data.name]
                            : pathTitles(pathName) === 'chartAdd'
                            ? chartAddSelector[data.name]
                            : pathTitles(pathName) === 'dashboard'
                            ? dashboardSelector[data.name]
                            : pathTitles(pathName) === 'annotationLayer'
                            ? annotationLayerSelector[data.name]
                            : pathTitles(pathName) === 'sqlhub'
                            ? sqlhubSelector[data.name]
                            : pathTitles(pathName) === 'datasetAdd'
                            ? datasetAddSelector[data.name]
                            : pathTitles(pathName) === 'newTrainedTable'
                            ? newTrainedTableSelector[data.name]
                            : pathTitles(pathName) === 'rolesList'
                            ? rolesListSelector[data.name]
                            : undefined
                        }
                        setSelectedValue={value => {
                          if (pathTitles(pathName) === 'chartAdd') {
                            updateChartAddProperty(value, data.name);
                          } else if (sidebarDataFindPathname.key) {
                            updateProperty(
                              sidebarDataFindPathname.key,
                              data.name,
                              value,
                            );
                          }
                        }}
                        maxWidth
                        onShowClear={pathTitles(pathName) !== 'sqlhub'}
                      />
                    )}
                    {data.status === 'input' && (
                      <DvtInput
                        typeDesign="chartsForm"
                        label={data.label}
                        placeholder={data.placeholder}
                        value={
                          pathTitles(pathName) === 'reports'
                            ? reportsSelector[data.name]
                            : pathTitles(pathName) === 'alerts'
                            ? alertsSelector[data.name]
                            : pathTitles(pathName) === 'connection'
                            ? connectionSelector[data.name]
                            : pathTitles(pathName) === 'datasets'
                            ? datasetsSelector[data.name]
                            : pathTitles(pathName) === 'chartAdd'
                            ? chartAddSelector[data.name]
                            : pathTitles(pathName) === 'dashboard'
                            ? dashboardSelector[data.name]
                            : pathTitles(pathName) === 'annotationLayer'
                            ? annotationLayerSelector[data.name]
                            : pathTitles(pathName) === 'rolesList'
                            ? rolesListSelector[data.name]
                            : undefined
                        }
                        onChange={value => {
                          if (pathTitles(pathName) === 'chartAdd') {
                            updateChartAddProperty(value, data.name);
                          } else if (sidebarDataFindPathname.key) {
                            updateProperty(
                              sidebarDataFindPathname.key,
                              data.name,
                              value,
                            );
                          }
                        }}
                        onShowClear
                      />
                    )}
                    {data.status === 'select-input' && (
                      <DvtInputSelect
                        data={selectsData(data)}
                        label={data.label}
                        placeholder={data.placeholder}
                        selectedValues={
                          pathTitles(pathName) === 'sqlhub'
                            ? sqlhubSelector[data.name]
                            : undefined
                        }
                        setSelectedValues={selected => {
                          if (sidebarDataFindPathname.key) {
                            updateProperty(
                              sidebarDataFindPathname.key,
                              data.name,
                              selected,
                            );
                          }
                        }}
                        typeDesign="chartsForm"
                      />
                    )}
                    {data.status === 'datepicker' && (
                      <DvtDatePicker
                        isOpen
                        label={data.label}
                        placeholder={data.placeholder}
                        selectedDate={null}
                        setIsOpen={() => {}}
                        setSelectedDate={() => {}}
                        maxWidth
                      />
                    )}
                  </StyledDvtSidebarBodySelect>
                ),
              )}
            {pathTitles(pathName) === 'datasetAdd' &&
              dataSelector.datasetAdd.selectDatabase.length > 0 && (
                <DvtSelectDatabaseList
                  data={dataSelector.datasetAdd.selectDatabase}
                  active={datasetAddSelector.selectDatabase}
                  setActive={vItem =>
                    dispatch(
                      dvtSidebarSetProperty({
                        pageKey: 'datasetAdd',
                        key: 'selectDatabase',
                        value: vItem,
                      }),
                    )
                  }
                />
              )}
            {pathTitles(pathName) === 'newTrainedTable' &&
              dataSelector.newTrainedTable.selectDatabase.length > 0 && (
                <DvtSelectDatabaseList
                  data={dataSelector.newTrainedTable.selectDatabase}
                  active={newTrainedTableSelector.selectDatabase}
                  setActive={vItem =>
                    dispatch(
                      dvtSidebarSetProperty({
                        pageKey: 'newTrainedTable',
                        key: 'selectDatabase',
                        value: vItem,
                      }),
                    )
                  }
                />
              )}
            {pathTitles(pathName) === 'sqlhub' &&
              pageSqlhubSelector.selectedTables.length !== 0 && (
                <DvtList
                  data={pageSqlhubSelector.selectedTables}
                  deleteClick={ti => {
                    dispatch(dvtSqlhubSetSelectedTableRemove(ti.title));
                    dispatch(
                      dvtSidebarSetPropertySelectedRemove({
                        pageKey: 'sqlhub',
                        key: 'see_table_schema',
                        value: ti.title,
                      }),
                    );
                  }}
                />
              )}
          </StyledDvtSidebarBody>
        </StyledDvtSidebarGroup>
      )}

      {pathTitles(pathName) === 'profile' && (
        <StyledDvtSidebarBody pathName={pathName}>
          <StyledDvtSidebarBodyItem>
            <DvtNavigationBar
              active={profileSelector.tabs}
              data={sidebarDataFindPathname?.data || []}
              setActive={pItem => dispatch(dvtSidebarProfileSetTabs(pItem))}
            />
          </StyledDvtSidebarBodyItem>
        </StyledDvtSidebarBody>
      )}

      {/* {pathTitles(pathName) === 'welcome' && (
        <StyledDvtSidebarFooter>
          <DvtDarkMode
            title={t('Dark Mode')}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        </StyledDvtSidebarFooter>
      )} */}
    </StyledDvtSidebar>
  );
};

export default DvtSidebar;
