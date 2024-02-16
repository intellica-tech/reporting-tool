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
import { t } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtProfileInformation from 'src/components/DvtProfileInformation';
import DvtTable from 'src/components/DvtTable';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { StyledDvtProfile, StyledDvtTable } from './dvt-profile.module';

function DvtProfile() {
  const [dashboardFavoriteData, setDashboardFavoriteData] = useState<any[]>([]);
  const [chartFavoriteData, setChartFavoriteData] = useState<any[]>([]);
  const [createdContentDashboardData, setCreatedContentDashboardData] =
    useState<any[]>([]);
  const [createdContentChartData, setCreatedContentChartData] = useState<any[]>(
    [],
  );
  const [recentActivityData, setRecentActivityData] = useState<any[]>([]);
  const [rolesAndSecurityData, setRolesAndSecurityData] = useState<any[]>([]);
  const activeSideTab = useAppSelector(
    state => state.dvtSidebar.profile.tabs.label,
  );
  const profileSelector = useAppSelector(state => state.dvtSidebar.profile);
  // const roleSelector = useAppSelector(state => state.dvtApp.user);

  const recentActivityPromise = useFetch({ url: 'log/recent_activity' });
  const rolesAndSecurityPromise = useFetch({ url: '/me/roles' });

  const dashboardFavouritePromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'dashboard_is_favorite', value: '!t' }],
      pageSize: 100,
    })}`,
  });
  const chartFavouritePromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'chart_is_favorite', value: 't' }],
      pageSize: 100,
    })}`,
  });
  const createdContentDashboardPromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({
      filters: [
        { col: 'created_by', opr: 'dashboard_created_by_me', value: 'me' },
      ],
      pageSize: 100,
    })}`,
  });
  const createdContentChartPromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({
      filters: [{ col: 'created_by', opr: 'chart_created_by_me', value: 'me' }],
      pageSize: 100,
    })}`,
  });

  useEffect(() => {
    if (rolesAndSecurityPromise) {
      setRolesAndSecurityData(rolesAndSecurityPromise?.result);
    }
  }, [rolesAndSecurityPromise]);

  useEffect(() => {
    if (dashboardFavouritePromise) {
      setDashboardFavoriteData(dashboardFavouritePromise?.result);
    }
  }, [dashboardFavouritePromise]);

  useEffect(() => {
    if (chartFavouritePromise) {
      setChartFavoriteData(chartFavouritePromise?.result);
    }
  }, [chartFavouritePromise]);

  useEffect(() => {
    if (createdContentDashboardPromise) {
      setCreatedContentDashboardData(createdContentDashboardPromise?.result);
    }
  }, [createdContentDashboardPromise]);

  useEffect(() => {
    if (createdContentChartPromise) {
      setCreatedContentChartData(createdContentChartPromise?.result);
    }
  }, [createdContentChartPromise]);

  useEffect(() => {
    if (recentActivityPromise) {
      setRecentActivityData(recentActivityPromise.result);
    }
  }, [recentActivityPromise]);

  const tablesHeaderData = {
    dashboardHeader: [
      {
        id: 1,
        title: t('Dashboard'),
        field: 'dashboard_title',
        urlField: 'url',
      },
      { id: 2, title: t('Creator'), field: '' },
      { id: 3, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    chartHeader: [
      {
        id: 1,
        title: t('Slice'),
        field: 'datasource_name_text',
        urlField: 'url',
      },
      { id: 2, title: t('Creator'), field: 'created_by_name' },
      { id: 3, title: t('Favorited'), field: 'changed_on_delta_humanized' },
    ],
    createdContentDashboardHeader: [
      {
        id: 1,
        title: t('Dashboard'),
        field: 'dashboard_title',
        urlField: 'url',
      },
      { id: 2, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    createdContentChartHeader: [
      { id: 1, title: t('Chart'), field: 'slice_name', urlField: 'url' },
      { id: 2, title: t('Created'), field: 'created_on_delta_humanized' },
    ],
    recentActivityHeader: [
      { id: 1, title: t('Name'), field: 'item_title', urlField: 'item_url' },
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
        joinedDate={profileSelector.joinedDate}
      />
      {activeSideTab === 'Favorites' && (
        <StyledDvtTable>
          <h1>Dashboards</h1>
          <DvtTable
            data={[...dashboardFavoriteData].map(item => ({
              ...item,
              isFavorite: true,
            }))}
            header={tablesHeaderData.dashboardHeader}
          />
          <h1>Charts</h1>
          <DvtTable
            data={[...chartFavoriteData].map(item => ({
              ...item,
              isFavorite: true,
            }))}
            header={tablesHeaderData.chartHeader}
          />
        </StyledDvtTable>
      )}
      {activeSideTab === 'Created Content' && (
        <StyledDvtTable>
          <h1>Dashboards</h1>
          <DvtTable
            data={[...createdContentDashboardData].map(item => ({
              ...item,
            }))}
            header={tablesHeaderData.createdContentDashboardHeader}
          />
          <h1>Charts</h1>
          <DvtTable
            data={[...createdContentChartData].map(item => ({
              ...item,
            }))}
            header={tablesHeaderData.createdContentChartHeader}
          />
        </StyledDvtTable>
      )}
      {activeSideTab === 'Recent Activity' && (
        <StyledDvtTable>
          <DvtTable
            data={recentActivityData.map(item => ({ ...item }))}
            header={tablesHeaderData.recentActivityHeader}
          />
        </StyledDvtTable>
      )}
      {activeSideTab === 'Security and Access' && (
        <StyledDvtTable>
          <h1>Roles</h1>
          {rolesAndSecurityData}
        </StyledDvtTable>
      )}
    </StyledDvtProfile>
  );
}

export default DvtProfile;
