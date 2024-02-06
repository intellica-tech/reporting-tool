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
import { dvtSidebarConnectionSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/hooks/useFetch';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledConnection,
  StyledConnectionButton,
  StyledConnectionButtons,
  StyledConnectionListButtons,
  StyledConnectionsButtons,
  StyledSelectedItem,
  StyledSelectedItemCount,
} from './dvt-connection.module';

function DvtConnection() {
  const dispatch = useDispatch();
  const connectionSelector = useAppSelector(
    state => state.dvtSidebar.connection,
  );
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );

  const searchApiUrls = fetchQueryParamsSearch({
    filterData: [
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
    page,
  });

  const connectionPromiseUrl = `/api/v1/database/${searchApiUrls}`;

  const [connectionApiUrl, setConnectionApiUrl] = useState('');

  const connectionApi = useFetch({
    url: connectionApiUrl,
  });

  useEffect(() => {
    dispatch(dvtHomeDeleteSuccessStatus(''));
    setConnectionApiUrl(connectionPromiseUrl);
  }, [deleteSuccessStatus, connectionSelector]);

  useEffect(() => {
    if (connectionApi) {
      setData(
        connectionApi.result.map((item: any) => ({
          ...item,
          admin: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
          date: new Date(item.changed_on).toLocaleString('tr-TR'),
        })),
      );
      setCount(connectionApi.count);
      setConnectionApiUrl('');
    }
  }, [connectionApi]);

  const clearConnection = () => {
    dispatch(
      dvtSidebarConnectionSetProperty({
        connection: {
          ...connectionSelector,
          expose_in_sqllab: '',
          allow_run_async: '',
          search: '',
        },
      }),
    );
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('database', [id], () => {});
  };

  const handleBulkExport = () => {
    const selectedIds = selectedRows.map(item => item.id);
    handleResourceExport('chart', selectedIds, () => {});
  };

  const handleDelete = async (type: string, item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type, title: 'database' },
      }),
    );
  };

  const handleBulkDelete = async (type: string, item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type, title: 'chart' },
      }),
    );
    setSelectedRows([]);
  };

  const modifiedData = {
    header: [
      {
        id: 1,
        title: t('Database'),
        field: 'database_name',
        checkbox: true,
        heartIcon: true,
      },
      { id: 2, title: t('Admin'), field: 'admin' },
      { id: 3, title: t('Last Modified'), field: 'date' },
      {
        id: 4,
        title: t('Action'),
        clicks: [
          {
            icon: 'edit_alt',
            click: () => {},
            popperLabel: t('Edit'),
          },
          {
            icon: 'share',
            click: (item: any) => {
              handleSingleExport(item.id);
            },
            popperLabel: t('Export'),
          },
          {
            icon: 'trash',
            click: (item: any) => {
              handleDelete('database', item);
            },
            popperLabel: t('Delete'),
          },
        ],
      },
    ],
  };

  return data.length > 0 ? (
    <StyledConnection>
      <StyledConnectionListButtons>
        <StyledConnectionButtons>
          <StyledSelectedItem>
            <StyledSelectedItemCount>
              <span>{`${selectedRows.length} Selected`}</span>
            </StyledSelectedItemCount>
            <DvtButton
              label={t('Deselect All')}
              bold
              colour="primary"
              typeColour="outline"
              size="medium"
              onClick={handleDeselectAll}
            />
          </StyledSelectedItem>
        </StyledConnectionButtons>
        <StyledConnectionsButtons>
          <DvtButton
            label={t('Delete')}
            icon="dvt-delete"
            iconToRight
            colour="error"
            size="small"
            onClick={() => {
              handleBulkDelete('chart', selectedRows);
            }}
          />
          <DvtButton
            label={t('Export')}
            icon="dvt-export"
            iconToRight
            colour="primary"
            bold
            typeColour="powder"
            size="small"
            onClick={handleBulkExport}
          />
        </StyledConnectionsButtons>
      </StyledConnectionListButtons>
      <DvtTable
        data={data}
        header={modifiedData.header}
        selected={selectedRows}
        setSelected={setSelectedRows}
        checkboxActiveField="id"
      />
      <StyledConnectionButton>
        <DvtButton
          label={t('Create a New Connection')}
          onClick={() => {}}
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
