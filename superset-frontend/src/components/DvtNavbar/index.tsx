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
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { useHistory } from 'react-router-dom';
import useFetch from 'src/dvt-hooks/useFetch';
// import { dvtAppSetSort } from 'src/dvt-redux/dvt-appReducer';
import { BellOutlined } from '@ant-design/icons';
import {
  dvtNavbarAlertSetTabs,
  dvtNavbarChartAddSetVizType,
  dvtNavbarChartSearchVizType,
  dvtNavbarChartsSetTabs,
  dvtNavbarViewlistTabs,
} from 'src/dvt-redux/dvt-navbarReducer';
import { dvtChartGetDashboardEditSetValue } from 'src/dvt-redux/dvt-dashboardEditReducer';
import {
  dvtChartSetSelectedChart,
  dvtChartSetSlice,
} from 'src/dvt-redux/dvt-chartReducer';
import { t } from '@superset-ui/core';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import { extractIdPathname } from 'src/dvt-utils/extract-id-pathname';
import ImageProfileAdmin from '../../assets/dvt-img/profile-admin.png';
import DvtButtonTabs, { ButtonTabsDataProps } from '../DvtButtonTabs';
import DvtButton from '../DvtButton';
import DvtDotTitle from '../DvtDotTitle';
import DvtDropdown from '../DvtDropdown';
import {
  sqlTabsData,
  DvtNavbarTabsData,
  WithNavbarBottom,
  WithNavbarBottomOnlyPage,
} from './dvt-navbar-tabs-data';
// import DvtInput from '../DvtInput';
// import DvtSelect from '../DvtSelect';
import DvtProfileMenu from '../DvtProfileMenu';
import {
  StyledDvtNavbar,
  NavbarTop,
  NavbarBottom,
  NavbarBottomRight,
  // NavbarSearchInput,
  NavbarProfileMenu,
  NavbarSearchGroup,
  NavbarProfileIcon,
  NavbarProfileIconDot,
  StyledFlexCenter,
  StyledTransparentInput,
} from './dvt-navbar.module';
import DvtInput from '../DvtInput';
import DvtFavorite from '../DvtFavorite';

export interface DvtNavbarProps {
  pathName: string;
  data?: any;
  leftMove: number;
}

interface LanguagesProps {
  flag: string;
  name: string;
  url: string;
}

const DvtNavbar: React.FC<DvtNavbarProps> = ({ pathName, data, leftMove }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const sort = useAppSelector(state => state.dvtApp.sort);
  const alertSelector = useAppSelector(state => state.dvtNavbar.alert);
  const chartsSelector = useAppSelector(state => state.dvtNavbar.charts);
  const chartAddSelector = useAppSelector(state => state.dvtNavbar.chartAdd);
  const chartAddSidebarSelector = useAppSelector(
    state => state.dvtSidebar.chartAdd,
  );
  const saveDisabled = useAppSelector(state => state.dvtChart.saveDisabled);
  const sqlQuerySelector = useAppSelector(state => state.dvtSqlhub);
  const sqlLabSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqlhub,
  );
  const viewListSelector = useAppSelector(state => state.dvtNavbar.viewlist);
  const dashboardEditSelector = useAppSelector(
    state => state.dvtDashboardEdit.get,
  );
  const [activeData, setActiveData] = useState<ButtonTabsDataProps[]>([]);
  const [languages, setLanguages] = useState<LanguagesProps[]>([]);
  const [dashboardEditFavorite, setDashboardEditFavorite] =
    useState<boolean>(false);

  const pathTitles = (pathname: string) => {
    switch (pathname) {
      case '/welcome/':
        return t('Welcome Page');
      case '/dashboard/list/':
      case extractIdPathname(pathName, 'dashboard'):
        return t('Dashboards');
      case '/alert/list/':
        return t('Alerts');
      case '/report/list/':
        return t('Reports');
      case '/databaseview/list/':
        return t('Connection');
      case '/sqlhub/':
        return t('SQLHub');
      case '/tablemodelview/list/':
        return t('Datasets');
      case '/sqlhub/history/':
      case '/savedqueryview/list/':
        return t('SQL');
      case '/chart/add':
        return t('Create New Chart');
      case '/explore/':
        return t('Charts');
      case '/dataset/add/':
        return t('New Dataset');
      case '/annotationlayer/list/':
        return t('Annotation Layers');
      case '/rowlevelsecurity/list/':
        return t('Row Level Security');
      case '/traindata/':
        return t('New Output Table');
      case '/role/list/':
        return t('Roles List');
      case '/user/list/':
        return t('List Users');
      default:
        return '';
    }
  };

  const [getExploreApiUrl, setGetExploreApiUrl] = useState('');

  const getExploreApi = useFetch({ url: getExploreApiUrl, withoutJson: true });

  useEffect(() => {
    const tabsDataFindPathname = DvtNavbarTabsData.find(
      (item: { pathname: string }) => item.pathname === pathName,
    );

    if (tabsDataFindPathname?.pathname) {
      setActiveData(tabsDataFindPathname.data);
    }
  }, [pathName]);

  useEffect(() => {
    if (data?.navbar_right?.show_language_picker) {
      const languageObjs = data.navbar_right.languages;
      setLanguages(
        Object.keys(languageObjs).map(key => ({
          flag: key,
          name: t(languageObjs[key].name),
          url: languageObjs[key].url,
        })),
      );
    }
  }, [data?.navbar_right?.show_language_picker]);

  // const [searchText, setSearchText] = useState<string>('');

  const handleOpenExplore = () => {
    if (chartAddSelector.vizType && chartAddSidebarSelector.dataset?.id) {
      setGetExploreApiUrl(
        `explore/?viz_type=${chartAddSelector.vizType}&datasource_id=${chartAddSidebarSelector.dataset.id}&datasource_type=table`,
      );
    }
  };

  useEffect(() => {
    if (history.location.pathname === '/explore/' && history.location?.search) {
      setTimeout(() => {
        setGetExploreApiUrl(`explore/${history.location.search}`);
      }, 500);
    }
  }, [history.location]);

  useEffect(() => {
    if (getExploreApi.data) {
      const { result } = getExploreApi.data;
      const datasource = result.form_data.datasource.split('__');

      const urlParams = result.form_data.url_params?.datasource_id
        ? result.form_data.url_params
        : {
            ...result.form_data.url_params,
            datasource_id: datasource[0],
            datasource_type: datasource[1],
          };

      dispatch(
        dvtChartSetSelectedChart({
          ...result,
          form_data: {
            ...result.form_data,
            url_params: urlParams,
          },
        }),
      );
      if (result.slice) {
        dispatch(
          dvtChartSetSlice({
            id: result.slice.slice_id,
            name: result.slice.slice_name,
          }),
        );
      }
      if (!history.location?.search) {
        history.push('/explore/');
      }
    }
  }, [getExploreApi.data]);

  useEffect(() => {
    if (!getExploreApi.loading) {
      setGetExploreApiUrl('');
    }
  }, [getExploreApi.loading]);

  const sqlPathname = ['/sqlhub/', '/sqlhub/history/', '/savedqueryview/list/'];

  useEffect(() => {
    if (
      sqlPathname.includes(pathName) &&
      pathName !== viewListSelector.sqlhub.value
    ) {
      history.push(viewListSelector.sqlhub.value);
    }
  }, [pathName, viewListSelector]);

  const handleRowLevelSecurityOpenModal = () => {
    dispatch(
      openModal({
        component: 'rowlevelsecurity-add-modal',
      }),
    );
  };

  const handleSaveQuery = () => {
    dispatch(
      openModal({
        component: 'save-query',
        meta: {
          query: sqlQuerySelector.datasetQuery,
          db_id: sqlLabSidebarSelector.database.value,
          schema: sqlLabSidebarSelector.schema.value,
        },
      }),
    );
  };

  const handleSaveDataset = () => {
    dispatch(
      openModal({
        component: 'save-dataset',
        meta: {
          query: sqlQuerySelector.datasetQuery,
          db_id: sqlLabSidebarSelector.database.value,
          schema: sqlLabSidebarSelector.schema.value,
        },
      }),
    );
  };

  const [dashboardFavoriteGetUrl, setDashboardFavoriteGetUrl] = useState('');
  const [dashboardFavoriteUrl, setDashboardFavoriteUrl] = useState('');
  const [dashboardPublishedUrl, setDashboardPublishedUrl] = useState('');

  const dashboardGetFavoritePromise = useFetch({
    url: dashboardFavoriteGetUrl,
  });

  const dashboardFavoritePromise = useFetch({
    url: dashboardFavoriteUrl,
    method: dashboardEditFavorite ? 'DELETE' : 'POST',
  });

  const dashboardPublishedPromise = useFetch({
    url: dashboardPublishedUrl,
    method: 'PUT',
    body: {
      published: !dashboardEditSelector.published,
    },
  });

  useEffect(() => {
    if (dashboardEditSelector.id) {
      setDashboardFavoriteGetUrl(
        `dashboard/favorite_status/?q=!(${dashboardEditSelector.id})`,
      );
    }
  }, [dashboardEditSelector.id]);

  useEffect(() => {
    if (dashboardGetFavoritePromise.data) {
      setDashboardEditFavorite(
        dashboardGetFavoritePromise.data.result[0].value,
      );
    }
  }, [dashboardGetFavoritePromise.data]);

  useEffect(() => {
    if (!dashboardGetFavoritePromise.loading) {
      setDashboardFavoriteGetUrl('');
    }
  }, [dashboardGetFavoritePromise.loading]);

  useEffect(() => {
    if (dashboardFavoritePromise.data?.result === 'OK') {
      setDashboardEditFavorite(!dashboardEditFavorite);
    }
  }, [dashboardFavoritePromise.data]);

  useEffect(() => {
    if (!dashboardFavoritePromise.loading) {
      setDashboardFavoriteUrl('');
    }
  }, [dashboardFavoritePromise.loading]);

  useEffect(() => {
    if (dashboardPublishedPromise.data) {
      dispatch(
        dvtChartGetDashboardEditSetValue({
          key: 'published',
          value: dashboardPublishedPromise.data.result.published,
        }),
      );
    }
  }, [dashboardPublishedPromise.data]);

  useEffect(() => {
    if (!dashboardPublishedPromise.loading) {
      setDashboardPublishedUrl('');
    }
  }, [dashboardPublishedPromise.loading]);

  const [dashboardEditUrl, setDashboardEditUrl] = useState({
    url: '',
    body: {},
  });

  const dashboardEditPromise = useFetch({
    url: dashboardEditUrl.url,
    method: 'PUT',
    body: dashboardEditUrl.body,
  });

  useEffect(() => {
    if (dashboardEditPromise.data) {
      history.push(`/dashboard/${dashboardEditSelector.id}/`);
    }
  }, [dashboardEditPromise.data]);

  useEffect(() => {
    if (!dashboardEditPromise.loading) {
      setDashboardEditUrl({
        url: '',
        body: {},
      });
    }
  }, [dashboardEditPromise.loading]);

  const handleDashboardSave = () => {
    if (dashboardEditSelector.position_json !== '{}') {
      const chartIds = dashboardEditSelector.position_json
        ? Object.keys(dashboardEditSelector.position_json)
            .filter(o => !!o.split('CHART-')[1])
            .map(
              field => dashboardEditSelector.position_json[field].meta.chartId,
            )
        : [];

      const chartConfiguration = {};

      for (let i = 0; i < chartIds.length; i += 1) {
        const element = chartIds[i];
        chartConfiguration[String(element)] = {
          id: element,
          crossFilters: { scope: 'global', chartsInScope: [] },
        };
      }

      const jsonMetadata = {
        chart_configuration: chartConfiguration,
        global_chart_configuration: {
          scope: { rootPath: ['ROOT_ID'], excluded: [] },
          chartsInScope: chartIds,
        },
        color_scheme: '',
        positions: dashboardEditSelector.position_json,
        refresh_frequency: 0,
        shared_label_colors: {},
        color_scheme_domain: [],
        expanded_slices: {},
        label_colors: {},
        timed_refresh_immune_slices: [],
        cross_filters_enabled: true,
        default_filters: '{}',
        filter_scopes: {},
      };

      const dashboardPutBody = {
        certified_by: '',
        certification_details: '',
        css: '',
        dashboard_title: dashboardEditSelector.dashboard_title,
        slug: null,
        owners: [1],
        json_metadata: JSON.stringify(jsonMetadata),
      };

      setDashboardEditUrl({
        url: `dashboard/${dashboardEditSelector.id}`,
        body: dashboardPutBody,
      });
    }
  };

  useEffect(
    () => () => {
      if (history.location.pathname === '/chart/add') {
        dispatch(dvtNavbarChartAddSetVizType(''));
      }
    },
    [history.location],
  );

  return (
    <StyledDvtNavbar leftMove={leftMove}>
      <NavbarTop>
        {pathName !== '/profile/' ? (
          <>
            <DvtDotTitle label={pathTitles(pathName)} />
            <NavbarSearchGroup>
              {/* Search
              <DvtSelect
                data={[]}
                placeholder="All"
                selectedValue=""
                setSelectedValue={() => {}}
                typeDesign="navbar"
              />
              <NavbarSearchInput>
                <DvtInput
                  onChange={setSearchText}
                  type="search"
                  value={searchText}
                />
              </NavbarSearchInput> */}
            </NavbarSearchGroup>
          </>
        ) : (
          <NavbarProfileIcon>
            <BellOutlined style={{ fontSize: '24px' }} />
            <NavbarProfileIconDot />
          </NavbarProfileIcon>
        )}
        <NavbarProfileMenu>
          <DvtProfileMenu
            img={ImageProfileAdmin}
            version={data?.navbar_right?.version_string}
          />
        </NavbarProfileMenu>
        {languages.length > 0 && (
          <DvtDropdown
            label={languages
              .find(
                (item: LanguagesProps) =>
                  item.flag === data.navbar_right.locale,
              )
              ?.flag.toLocaleUpperCase()}
            direction="left"
            data={languages.map((item: any) => ({
              label: item.flag.toLocaleUpperCase(),
              onClick: () => {
                window.location.href = `${window.location.origin}${item.url}`;
              },
            }))}
          />
        )}
      </NavbarTop>
      {(WithNavbarBottom.includes(pathName) ||
        WithNavbarBottomOnlyPage.includes(pathName.split('/')[1])) && (
        <NavbarBottom>
          {pathName === '/alert/list/' && (
            <>
              <DvtButtonTabs
                active={alertSelector.tabs}
                setActive={v => dispatch(dvtNavbarAlertSetTabs(v))}
                data={activeData}
              />
              {/* <NavbarBottomRight>
                 <DvtButton
                  typeColour="powder"
                  label={`${sort ? 'Sorted' : 'Sort'}: Date Created`}
                  icon="dvt-sort"
                  onClick={() => dispatch(dvtAppSetSort(!sort))}
                />
              </NavbarBottomRight> */}
            </>
          )}
          {pathName === '/chart/add' && (
            <>
              <DvtInput
                type="search"
                placeholder="search"
                value={chartAddSelector.search}
                onChange={v => dispatch(dvtNavbarChartSearchVizType(v))}
              />
              <NavbarBottomRight>
                <DvtButton
                  typeColour="powder"
                  colour={
                    chartAddSelector.vizType &&
                    chartAddSidebarSelector.dataset?.id
                      ? 'primary'
                      : 'grayscale'
                  }
                  label={t('Create New Chart')}
                  onClick={() =>
                    chartAddSelector.vizType &&
                    chartAddSidebarSelector.dataset?.id &&
                    handleOpenExplore()
                  }
                  bold
                />
              </NavbarBottomRight>
            </>
          )}
          {pathName === '/rowlevelsecurity/list/' && (
            <>
              <div />
              <NavbarBottomRight>
                <DvtButton
                  label="Rule"
                  onClick={handleRowLevelSecurityOpenModal}
                  icon="dvt-add_square"
                />
              </NavbarBottomRight>
            </>
          )}
          {sqlPathname.includes(pathName) && (
            <DvtButtonTabs
              active={viewListSelector.sqlhub}
              data={sqlTabsData}
              setActive={value =>
                dispatch(dvtNavbarViewlistTabs({ value, key: 'sqlhub' }))
              }
            />
          )}
          {pathName === '/dashboard/list/' && (
            <DvtButtonTabs
              active={viewListSelector.dashboard}
              data={activeData}
              setActive={value =>
                dispatch(dvtNavbarViewlistTabs({ value, key: 'dashboard' }))
              }
            />
          )}
          {pathName === '/report/list/' && (
            <DvtButtonTabs
              active={viewListSelector.reports}
              data={activeData}
              setActive={value =>
                dispatch(dvtNavbarViewlistTabs({ value, key: 'reports' }))
              }
            />
          )}
          {pathName === '/explore/' && (
            <>
              <DvtButtonTabs
                active={chartsSelector.tabs}
                data={activeData}
                setActive={value => dispatch(dvtNavbarChartsSetTabs(value))}
              />
              <DvtButton
                label={t('Save')}
                typeColour="powder"
                onClick={() =>
                  dispatch(
                    openModal({
                      component: 'save-chart',
                    }),
                  )
                }
                disabled={saveDisabled}
              />
            </>
          )}
          {pathName === extractIdPathname(pathName, 'dashboard') && (
            <>
              <StyledFlexCenter>
                <StyledTransparentInput
                  disabled={history.location.search !== '?edit=true'}
                  value={dashboardEditSelector.dashboard_title}
                  placeholder={t('Add the name of the dashboard')}
                  onChange={e =>
                    dispatch(
                      dvtChartGetDashboardEditSetValue({
                        key: 'dashboard_title',
                        value: e.target.value,
                      }),
                    )
                  }
                />
                <DvtFavorite
                  active={dashboardEditFavorite}
                  setActive={() =>
                    setDashboardFavoriteUrl(
                      `dashboard/${dashboardEditSelector.id}/favorites/`,
                    )
                  }
                />
                {history.location.search !== '?edit=true' && (
                  <DvtButton
                    bold
                    colour="grayscale"
                    typeColour="powder"
                    size="small"
                    label={
                      dashboardEditSelector.published
                        ? t('Published')
                        : t('Draft')
                    }
                    onClick={() =>
                      setDashboardPublishedUrl(
                        `dashboard/${dashboardEditSelector.id}`,
                      )
                    }
                  />
                )}
              </StyledFlexCenter>
              <NavbarBottomRight>
                {history.location.search === '?edit=true' ? (
                  <>
                    <DvtButton
                      size="small"
                      bold
                      label="DISCARD"
                      onClick={() => {
                        history.push(history.location.pathname);
                      }}
                      typeColour="powder"
                    />
                    <DvtButton
                      size="small"
                      bold
                      label="SAVE"
                      onClick={handleDashboardSave}
                      loading={dashboardEditPromise.loading}
                    />
                  </>
                ) : (
                  <DvtButton
                    size="small"
                    bold
                    label={t('EDIT DASHBOARD')}
                    onClick={() =>
                      history.push(`${history.location.pathname}?edit=true`)
                    }
                  />
                )}
              </NavbarBottomRight>
            </>
          )}
          {pathName === '/sqlhub/' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <DvtButton
                label={t('Copy Link')}
                typeColour="powder"
                onClick={() => {}}
                icon="link"
              />
              <DvtButton
                label={t('Save')}
                typeColour="powder"
                onClick={handleSaveQuery}
              />
              <DvtDropdown
                data={[
                  {
                    label: 'Save dataset',
                    onClick: () => handleSaveDataset(),
                  },
                ]}
                icon="caret_down"
                direction="left"
              />
            </div>
          )}
        </NavbarBottom>
      )}
    </StyledDvtNavbar>
  );
};

export default DvtNavbar;
