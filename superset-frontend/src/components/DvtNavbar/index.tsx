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
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useHistory } from 'react-router-dom';
import useFetch from 'src/hooks/useFetch';
// import { dvtAppSetSort } from 'src/dvt-redux/dvt-appReducer';
import { BellOutlined } from '@ant-design/icons';
import {
  dvtNavbarAlertSetTabs,
  dvtNavbarChartsSetTabs,
  dvtNavbarViewlistTabs,
} from 'src/dvt-redux/dvt-navbarReducer';
import { dvtChartSetSelectedChart } from 'src/dvt-redux/dvt-chartReducer';
import { t } from '@superset-ui/core';
import {
  sqlTabsData,
  DvtNavbarTabsData,
  WithNavbarBottom,
} from './dvt-navbar-tabs-data';
import ImageProfileAdmin from '../../assets/dvt-img/profile-admin.png';
import DvtButtonTabs, { ButtonTabsDataProps } from '../DvtButtonTabs';
import DvtButton from '../DvtButton';
import DvtDotTitle from '../DvtDotTitle';

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
} from './dvt-navbar.module';
import DvtDropdown from '../DvtDropdown';

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
  const viewListSelector = useAppSelector(state => state.dvtNavbar.viewlist);
  const [activeData, setActiveData] = useState<ButtonTabsDataProps[]>([]);
  const [languages, setLanguages] = useState<LanguagesProps[]>([]);
  const [sqlTab, setSqlTab] = useState<any>(
    sqlTabsData.find(item => item.value === pathName),
  );

  const pathTitles = (pathname: string) => {
    switch (pathname) {
      case '/superset/welcome/':
        return t('Welcome Page');
      case '/dashboard/list/':
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
      case '/superset/profile/admin/':
        return t('Profile');
      case '/chart/add':
        return t('Create New Chart');
      case '/explore/':
        return t('Charts');
      case '/dataset/add/':
        return t('New Dataset');
      case '/annotationlayer/list/':
        return t('Annotation Layers');
      case '/traindata/':
        return t('New Trained Table');
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
    if (getExploreApi) {
      dispatch(dvtChartSetSelectedChart(getExploreApi.result));
      history.push('/explore/');
      setGetExploreApiUrl('');
    }
  }, [getExploreApi]);

  const sqlPathname = ['/sqlhub/', '/sqlhub/history/', '/savedqueryview/list/'];

  useEffect(() => {
    if (sqlPathname.includes(pathName) && pathName !== sqlTab.value) {
      history.push(sqlTab.value);
    }
  }, [pathName, sqlTab]);

  return (
    <StyledDvtNavbar leftMove={leftMove}>
      <NavbarTop>
        {pathName !== '/superset/profile/admin/' ? (
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
      {WithNavbarBottom.includes(pathName) && (
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
              <div />
              <NavbarBottomRight>
                <DvtButton
                  typeColour="powder"
                  colour={
                    chartAddSelector.vizType &&
                    chartAddSidebarSelector.dataset?.id
                      ? 'primary'
                      : 'grayscale'
                  }
                  label="Create New Chart"
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
          {sqlPathname.includes(pathName) && (
            <DvtButtonTabs
              active={sqlTab}
              data={sqlTabsData}
              setActive={value => setSqlTab(value)}
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
                onClick={() => {}}
              />
            </>
          )}
          {pathName === '/sqlhub/' && (
            <DvtButtonTabs
              active={sqlTab}
              data={activeData}
              setActive={() => {}}
            />
          )}
        </NavbarBottom>
      )}
    </StyledDvtNavbar>
  );
};

export default DvtNavbar;
