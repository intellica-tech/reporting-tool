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
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import { useDispatch } from 'react-redux';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtSidebarSetPropertyClear } from 'src/dvt-redux/dvt-sidebarReducer';
import { useHistory } from 'react-router-dom';
import handleResourceExport from 'src/utils/export';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtTitleCardList from 'src/components/DvtTitleCardList';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import {
  StyledDashboardBottom,
  StyledDashboardCreateDashboard,
  StyledDashboardList,
  StyledDashboardPagination,
  StyledDashboardTable,
} from './dvtdashboardlist.module';

function DvtDashboardList() {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const activeTab = useAppSelector(
    state => state.dvtNavbar.viewlist.dashboard.value,
  );
  const dashboardSelector = useAppSelector(state => state.dvtSidebar.dashboard);
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'changed_on_delta_humanized',
    direction: 'desc',
  });
  const [count, setCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const searchApiUrls = (gPage: number) =>
    `dashboard/${fetchQueryParamsSearch({
      filters: [
        { col: 'dashboard_title', opr: 'title_or_slug', value: '' },
        {
          col: 'owners',
          opr: 'rel_m_m',
          value: dashboardSelector.owner?.value,
        },
        {
          col: 'created_by',
          opr: 'rel_o_m',
          value: dashboardSelector.createdBy?.value,
        },
        { col: 'published', opr: 'eq', value: dashboardSelector.status?.value },
        {
          col: 'id',
          opr: 'dashboard_is_favorite',
          value: dashboardSelector.favorite?.value,
        },
        {
          col: 'id',
          opr: 'dashboard_is_certified',
          value: dashboardSelector.certified?.value,
        },
      ],
      page: gPage,
      orderColumn: sort.column,
      orderDirection: sort.direction,
    })}`;

  const [dashboardApiUrl, setDashboardApiUrl] = useState<string>('');
  const [dashboardAddApiUrl, setDashboardAddApiUrl] = useState<string>('');

  const dashboardAdd = useFetch({
    url: dashboardAddApiUrl,
    method: 'POST',
    body: {
      certification_details: '',
      certified_by: '',
      css: '',
      dashboard_title: '',
      external_url: '',
      is_managed_externally: true,
      json_metadata: '{}',
      owners: [1],
      position_json: '{}',
      published: true,
      roles: [1],
      slug: null,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (dashboardAdd.data?.id) {
      history.push(`/dashboard/${dashboardAdd.data.id}/?edit=true`);
    }
  }, [dashboardAdd.data]);

  const dashboardApi = useFetch({
    url: dashboardApiUrl,
  });

  useEffect(() => {
    if (dashboardApi.data) {
      setData(
        dashboardApi.data.result.map((item: any) => ({
          ...item,
          published: item.status,
          owners: item.owners.length
            ? item.owners
                .map(
                  (item: { first_name: string; last_name: string }) =>
                    `${item.first_name} ${item.last_name}`,
                )
                .join(',')
            : '',
          createdbyName: item.changed_by
            ? `${item.changed_by?.first_name} ${item.changed_by?.last_name}`
            : '',
          urlEdit: `/dashboard/${item.id}/?edit=true`,
        })),
      );
      setCount(dashboardApi.data.count);
      setSelectedRows([]);
    }
  }, [dashboardApi.data]);

  useEffect(() => {
    if (!dashboardApi.loading) {
      setDashboardApiUrl('');
    }
  }, [dashboardApi.loading]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    setDashboardApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setDashboardApiUrl(searchApiUrls(page));
    }
  }, [dashboardSelector]);

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleEditDashboards = (item: any) => {
    dispatch(
      openModal({
        component: 'edit-dashboard',
        meta: { id: item.id },
      }),
    );
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'dashboard', title: 'dashboard' },
      }),
    );
    setDashboardApiUrl(''); // sen bu yapmıştın delete sonra otomatik api gelsin bi tane bu ama
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('dashboard', [id], () => {});
  };

  const handleBulkExport = () => {
    const selectedIds = selectedRows.map(item => item.id);
    handleResourceExport('dashboard', selectedIds, () => {});
  };

  const [favoriteUrl, setFavoriteUrl] = useState<{
    url: string;
    title: string;
    id: number;
    isFavorite: boolean;
  }>({ url: '', title: '', id: 0, isFavorite: false });

  const favoritePromise = useFetch({
    url: favoriteUrl.url,
    method: favoriteUrl.isFavorite ? 'DELETE' : 'POST',
  });

  useEffect(() => {
    if (favoritePromise.data?.result === 'OK') {
      setData(state => {
        const itemRemovedData = state.filter(
          item => item.id !== favoriteUrl.id,
        );
        const findItem = state.find(item => item.id === favoriteUrl.id);

        return [
          ...itemRemovedData,
          { ...findItem, isFavorite: !findItem.isFavorite },
        ].sort((a, b) => a.id - b.id);
      });
    }
  }, [favoritePromise.data]);

  const handleSetFavorites = (
    id: number,
    title: string,
    isFavorite: boolean,
  ) => {
    setFavoriteUrl({
      url: `${title}/${id}/favorites/`,
      title,
      id,
      isFavorite,
    });
  };

  const headerData = [
    {
      id: 1,
      title: t('Title'),
      field: 'dashboard_title',
      flex: 3,
      checkbox: true,
      urlField: 'urlEdit',
      sort: true,
    },
    { id: 2, title: t('Status'), field: 'published', sort: true },
    {
      id: 3,
      title: t('Modified'),
      field: 'changed_on_delta_humanized',
      sort: true,
    },
    { id: 4, title: t('Created By'), field: 'createdbyName' },
    { id: 5, title: t('Owners'), field: 'owners' },
    {
      id: 6,
      title: t('Action'),
      showHover: true,
      clicks: [
        {
          icon: 'edit_alt',
          click: (item: any) => handleEditDashboards(item),
          popperLabel: t('Edit'),
        },
        {
          icon: 'share',
          click: (item: any) => handleSingleExport(item.id),
          popperLabel: t('Export'),
        },
        {
          icon: 'trash',
          click: (item: any) => handleModalDelete(item),
          popperLabel: t('Delete'),
        },
      ],
    },
  ];

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('dashboard'));
      setData([]);
      setSelectedRows([]);
    },
    [],
  );

  return (
    <StyledDashboardList>
      {activeTab === 'Table' && (
        <DvtDeselectDeleteExport
          count={selectedRows.length}
          handleDeselectAll={handleDeselectAll}
          handleDelete={() => handleModalDelete(selectedRows)}
          handleExport={handleBulkExport}
        />
      )}
      <StyledDashboardTable>
        {activeTab === 'Table' ? (
          <DvtTable
            data={data}
            header={headerData}
            selected={selectedRows}
            setSelected={setSelectedRows}
            checkboxActiveField="id"
            sort={sort}
            setSort={setSort}
          />
        ) : (
          <DvtTitleCardList
            data={data.map((item: any) => ({
              id: item.id,
              title: item.dashboard_title,
              label: item.changed_by_name,
              description: `Modified ${item.created_on_delta_humanized}`,
              isFavorite: item.isFavorite,
              link: item.url,
              paramUrl: 'dashboard',
            }))}
            title="Data"
            setFavorites={handleSetFavorites}
            dropdown={[
              {
                label: t('Edit'),
                icon: 'edit_alt',
                onClick: (item: any) => handleEditDashboards(item),
              },
              {
                label: t('Export'),
                icon: 'share',
                onClick: (item: any) => handleSingleExport(item.id),
              },
              {
                label: t('Delete'),
                icon: 'trash',
                onClick: (item: any) => handleModalDelete(item),
              },
            ]}
          />
        )}
      </StyledDashboardTable>
      <StyledDashboardBottom>
        <StyledDashboardCreateDashboard>
          <DvtButton
            label={t('Create a New Dashboard')}
            colour="grayscale"
            bold
            typeColour="basic"
            onClick={() => setDashboardAddApiUrl('dashboard/')}
          />
        </StyledDashboardCreateDashboard>
        <StyledDashboardPagination>
          <DvtPagination
            page={page}
            setPage={setPage}
            itemSize={count}
            pageItemSize={10}
          />
        </StyledDashboardPagination>
      </StyledDashboardBottom>
    </StyledDashboardList>
  );
}

export default withToasts(DvtDashboardList);
