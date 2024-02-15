import { t } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import DvtProfileInformation from 'src/components/DvtProfileInformation';
import DvtTable from 'src/components/DvtTable';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { StyledDvtProfile, StyledDvtTable } from './dvt-profile.module';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';

const formatFavoriteDashboardData = (data: any[]) =>
  data.map(item => ({
    id: item.id,
    title: item.dashboard_title,
    modifiedDate: `Modified ${item.created_on_delta_humanized}`,
    link: item.url,
    paramUrl: 'dashboard',
  }));

const formatFavoriteChartData = (data: any[]) =>
  data.map(item => ({
    id: item.id,
    title: item.title,
    creator: item.creator,
    creatorUrl: item.creator_url,
    dttm: item.dttm,
    link: item.url,
    vizType: item.viz_type,
    paramUrl: 'chart',
  }));

const formatRecentActivityData = (data: any[]) =>
  data.map(item => ({
    action: item.action,
    title: item.item_title,
    type: item.item_type,
    url: item.item_url,
    time: item.time,
    modifiedDate: `Modified ${item.time_delta_humanized}`,
  }));

function DvtProfile() {
  const [favoritesDashboardData, setFavoritesDashboardData] = useState<any[]>(
    [],
  );
  const [favoritesChartData, setFavoritesChartData] = useState<any[]>([]);
  const [createdContentDashboardData, setCreatedContentDashboardData] =
    useState<any[]>([]);
  const [createdContentChartData, setCreatedContentChartData] = useState<any[]>(
    [],
  );
  const [recentActivityData, setRecentActivityData] = useState<any[]>([]);
  const activeSideTab = useAppSelector(
    state => state.dvtSidebar.profile.tabs.label,
  );
  const profileSelector = useAppSelector(state => state.dvtSidebar.profile);
  const joinedDate = new Date('2024-02-13T00:00:00');

  const dashboardPromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({ pageSize: 10 })}`,
  });
  const chartPromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({ pageSize: 10 })}`,
  });
  const recentActivityPromise = useFetch({ url: 'log/recent_activity' });

  const dashboardFavoritePromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'dashboard_is_favorite', value: 't' }],
    })}`,
  });
  const chartFavoritePromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'chart_is_favorite', value: 't' }],
    })}`,
  });

  useEffect(() => {
    if (dashboardFavoritePromise) {
      setFavoritesDashboardData(state => [
        ...state,
        ...formatFavoriteDashboardData(dashboardPromise.result),
      ]);
    }
  }, [dashboardPromise]);

  useEffect(() => {
    if (chartFavoritePromise) {
      setFavoritesChartData(state => [
        ...state,
        ...formatFavoriteChartData(chartPromise.result),
      ]);
    }
  }, [chartPromise]);

  useEffect(() => {
    if (recentActivityPromise) {
      setRecentActivityData(state => [
        ...state,
        ...formatRecentActivityData(recentActivityPromise.result),
      ]);
    }
  }, [recentActivityPromise]);

  // '/api/v1/dashboard/{pk}/favorites/'
  // '/api/v1/chart/{pk}/favorites/'

  // useEffect(() => {
  //   if (dashboardFavouritePromise) {
  //     console.log(dashboardFavouritePromise.result);
  //     // setDashboardFavoriteData(
  //     //   (dashboardFavouritePromise.result),
  //     // );
  //   }
  // }, [dashboardFavouritePromise]);

  // useEffect(() => {
  //   const createdContentDashboardApiUrl =
  //     '/api/v1/dashboard/?q=(columns:!(created_on_delta_humanized,dashboard_title,url),filters:!((col:created_by,opr:dashboard_created_by_me,value:me)),keys:!(none),order_column:changed_on,order_direction:desc,page:0,page_size:100)';
  //   const fetchCreatedContentDashboardApi = async () => {
  //     try {
  //       const response = await fetch(createdContentDashboardApiUrl);
  //       const data = await response.json();
  //       setCreatedContentDashboardData(
  //         data.result.map((item: any) => ({
  //           id: item.id,
  //           created_on_delta_humanized: item.created_on_delta_humanized,
  //           dashboard_title: item.dashboard_title,
  //           url: item.url,
  //         })),
  //       );
  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   fetchCreatedContentDashboardApi();
  // }, []);

  // useEffect(() => {
  //   const createdContentChartApiUrl =
  //     '/api/v1/chart/?q=(columns:!(created_on_delta_humanized,slice_name,url),filters:!((col:created_by,opr:chart_created_by_me,value:me)),keys:!(none),order_column:changed_on_delta_humanized,order_direction:desc,page:0,page_size:100)';
  //   const fetchCreatedContentChartApi = async () => {
  //     try {
  //       const response = await fetch(createdContentChartApiUrl);
  //       const data = await response.json();
  //       setCreatedContentChartData(
  //         data.result.map((item: any) => ({
  //           id: item.id,
  //           created_on_delta_humanized: item.created_on_delta_humanized,
  //           dashboard_title: item.dashboard_title,
  //           url: item.url,
  //         })),
  //       );
  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   fetchCreatedContentChartApi();
  // }, []);

  // useEffect(() => {
  //   const recentActivityApiUrl =
  //     '/api/v1/log/recent_activity/1/?q=(page_size:50)';
  //   const fetchRecentActivityApi = async () => {
  //     try {
  //       const response = await fetch(recentActivityApiUrl);
  //       const data = await response.json();
  //       setRecentActivityData(
  //         data.result.map((item: any) => ({
  //           id: item.id,
  //           action: item.action,
  //           item_title: item.item_title,
  //           item_type: item.item_type,
  //           url: item.item_url,
  //           time: item.time,
  //           time_delta_humanized: item.time_delta_humanized,
  //         })),
  //       );
  //     } catch (error) {
  //       console.log('Error', error);
  //     }
  //   };
  //   fetchRecentActivityApi();
  // }, []);

  const tablesHeaderData = {
    dashboardHeader: [
      { id: 1, title: t('Dashboard'), field: 'dashboard_title' },
      { id: 2, title: t('Creator'), field: '' },
      { id: 3, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    chartHeader: [
      { id: 1, title: t('Slice'), field: 'title' },
      { id: 2, title: t('Creator'), field: 'creator' },
      { id: 3, title: t('Favorited'), field: 'url' },
    ],
    createdContentDashboardHeader: [
      { id: 1, title: t('Dashboard'), field: 'dashboard_title' },
      { id: 2, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    createdContentChartHeader: [
      { id: 1, title: t('Slice'), field: 'title' },
      { id: 2, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    recentActivityHeader: [
      { id: 1, title: t('Name'), field: 'item_title' },
      { id: 2, title: t('Type'), field: 'item_type' },
      { id: 3, title: t('Time'), field: 'time_delta_humanized' },
    ],
  };

  return (
    <StyledDvtProfile>
      <DvtProfileInformation
        header={profileSelector.header}
        location={profileSelector.location}
        title={profileSelector.title}
        test={profileSelector.test}
        image={profileSelector.image}
        joinedDate={joinedDate}
      />
      {activeSideTab === 'Favorites' && (
        <StyledDvtTable>
          <h1>Dashboards</h1>
          <DvtTable
            data={favoritesDashboardData.map(item => ({ ...item }))}
            header={tablesHeaderData.dashboardHeader}
          />
          <h1>Charts</h1>
          <DvtTable
            data={favoritesChartData.map(item => ({ ...item }))}
            header={tablesHeaderData.chartHeader}
          />
        </StyledDvtTable>
      )}
      {activeSideTab === 'Created Content' && (
        <StyledDvtTable>
          <h1>Dashboards</h1>
          <DvtTable
            data={createdContentDashboardData.map(item => ({ ...item }))}
            header={tablesHeaderData.dashboardHeader}
          />
          <h1>Charts</h1>
          <DvtTable
            data={createdContentChartData.map(item => ({ ...item }))}
            header={tablesHeaderData.chartHeader}
          />
        </StyledDvtTable>
      )}
      {activeSideTab === 'Recent Activity' && (
        <StyledDvtTable>
          <h1>Dashboards</h1>
          <DvtTable
            data={recentActivityData.map(item => ({ ...item }))}
            header={tablesHeaderData.dashboardHeader}
          />
          <h1>Charts</h1>
          <DvtTable
            data={recentActivityData.map(item => ({ ...item }))}
            header={tablesHeaderData.chartHeader}
          />
        </StyledDvtTable>
      )}
    </StyledDvtProfile>
  );
}

export default DvtProfile;
