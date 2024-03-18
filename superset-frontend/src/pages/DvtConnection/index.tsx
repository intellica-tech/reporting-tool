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
import { useDispatch } from 'react-redux';
import handleResourceExport from 'src/utils/export';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtSidebarSetPropertyClear } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import { dvtConnectionEditSuccessStatus } from 'src/dvt-redux/dvt-connectionReducer';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledConnection,
  StyledConnectionButton,
} from './dvt-connection.module';

function DvtConnection() {
  const dispatch = useDispatch();
  const connectionSelector = useAppSelector(
    state => state.dvtSidebar.connection,
  );
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const editSuccessStatus = useAppSelector(
    state => state.dvtConnection.editSuccessStatus,
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
    `database/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'expose_in_sqllab',
          opr: 'eq',
          value: connectionSelector.expose_in_sqllab?.value,
        },
        {
          col: 'allow_run_async',
          opr: 'eq',
          value: connectionSelector.allow_run_async?.value,
        },
        {
          col: 'database_name',
          opr: 'ct',
          value: connectionSelector.search,
        },
      ],
      page: gPage,
      orderColumn: sort.column,
      orderDirection: sort.direction,
    })}`;

  const [connectionApiUrl, setConnectionApiUrl] = useState<string>('');
  const [connectionEditApiUrl, setConnectionEditApiUrl] = useState<string>('');

  const connectionApi = useFetch({
    url: connectionApiUrl,
  });

  const connectionEditPromise = useFetch({
    url: connectionEditApiUrl,
  });

  useEffect(() => {
    if (connectionApi.data) {
      setData(
        connectionApi.data.result.map((item: any) => ({
          ...item,
          admin: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
          date: new Date(item.changed_on).toLocaleString('tr-TR'),
        })),
      );
      setCount(connectionApi.data.count);
      setSelectedRows([]);
    }
  }, [connectionApi.data]);

  useEffect(() => {
    if (!connectionApi.loading) {
      setConnectionApiUrl('');
    }
  }, [connectionApi.loading]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    if (editSuccessStatus) {
      dispatch(dvtConnectionEditSuccessStatus(''));
    }
    setConnectionApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, editSuccessStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setConnectionApiUrl(searchApiUrls(page));
    }
  }, [connectionSelector]);

  const clearConnection = () => {
    dispatch(dvtSidebarSetPropertyClear('connection'));
  };

  const handleConnectionAdd = () => {
    dispatch(
      openModal({
        component: 'connection-add-modal',
      }),
    );
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'database', title: 'database' },
      }),
    );
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('database', [id], () => {});
  };

  const handleBulkExport = () => {
    const selectedIds = selectedRows.map(item => item.id);
    handleResourceExport('database', selectedIds, () => {});
  };

  const handleEditConnection = (item: any) => {
    setConnectionEditApiUrl(`database/${item.id}/connection`);
    setTimeout(() => {
      setConnectionEditApiUrl('');
    }, 500);
  };

  const modifiedData = {
    header: [
      {
        id: 1,
        title: t('Database'),
        field: 'database_name',
        checkbox: true,
        heartIcon: true,
        sort: true,
      },
      { id: 2, title: t('Backend'), field: 'backend' },
      {
        id: 3,
        title: t('Last Modified'),
        field: 'changed_on_delta_humanized',
        sort: true,
      },
      {
        id: 4,
        title: t('Actions'),
        clicks: [
          {
            icon: 'edit_alt',
            click: (item: any) => handleEditConnection(item),
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
    ],
  };

  useEffect(() => {
    if (connectionEditPromise.data) {
      dispatch(
        openModal({
          component: 'connection-add-modal',
          meta: { ...connectionEditPromise.data, isEdit: true },
        }),
      );
    }
  }, [connectionEditPromise.data]);

  useEffect(
    () => () => {
      clearConnection();
      setData([]);
      setSelectedRows([]);
    },
    [],
  );

  return data.length > 0 ? (
    <StyledConnection>
      <DvtDeselectDeleteExport
        count={selectedRows.length}
        handleDeselectAll={handleDeselectAll}
        handleDelete={() => handleModalDelete(selectedRows)}
        handleExport={handleBulkExport}
      />
      <DvtTable
        data={data}
        header={modifiedData.header}
        selected={selectedRows}
        setSelected={setSelectedRows}
        checkboxActiveField="id"
        sort={sort}
        setSort={setSort}
      />
      <StyledConnectionButton>
        <DvtButton
          label={t('Create a New Connection')}
          onClick={handleConnectionAdd}
          colour="grayscale"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledConnectionButton>
    </StyledConnection>
  ) : (
    <StyledConnection>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? t('No Connection Yet')
            : t('No results match your filter criteria')
        }
        buttonLabel={
          data.length === 0 ? t('Connection') : t('Clear All Filter')
        }
        buttonClick={() => {
          if (data.length > 0) {
            clearConnection();
          }
        }}
      />
    </StyledConnection>
  );
}

export default withToasts(DvtConnection);
