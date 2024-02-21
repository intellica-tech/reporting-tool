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
import { dvtSidebarSetPropertyClear } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtAlertAddStatus } from 'src/dvt-redux/dvt-alertReducer';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import { StyledAlerts, StyledAlertsButton } from './dvt-alerts.module';

function AlertList() {
  const dispatch = useDispatch();
  const alertsSelector = useAppSelector(state => state.dvtSidebar.alerts);
  const alertTabsSelector = useAppSelector(state => state.dvtNavbar.alert.tabs);
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const alertAddStatus = useAppSelector(state => state.dvtAlert.alertAddStatus);
  const [data, setData] = useState([]);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const searchApiUrls = (gPage: number) =>
    `report/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'type',
          opr: 'eq',
          value: alertTabsSelector.value,
        },
        {
          col: 'owners',
          opr: 'rel_m_m',
          value: alertsSelector.owner?.value,
        },
        {
          col: 'created_by',
          opr: 'rel_o_m',
          value: alertsSelector.createdBy?.value,
        },
        {
          col: 'last_state',
          opr: 'eq',
          value: alertsSelector.status?.value,
        },
        {
          col: 'name',
          opr: 'ct',
          value: alertsSelector.search,
        },
      ],
      page: gPage,
      orderColumn: 'name',
    })}`;

  const [alertApiUrl, setAlertApiUrl] = useState<string>('');

  const alertApi = useFetch({
    url: alertApiUrl,
  });

  useEffect(() => {
    if (alertApi) {
      const getData = alertApi.result.map((item: any) => ({
        ...item,
        lastRun: new Date(item.last_eval_dttm).toLocaleString('tr-TR'),
        schedule: new Date(item.created_on).toLocaleString('tr-TR'),
        createdBy: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
        owners: item.owners.length
          ? `${item.owners[0].first_name} ${item.owners[0].last_name}`
          : '',
        modified: `${item.changed_by.first_name} ${item.changed_by.last_name}`,
        status: item.last_state,
        active: item.active.toString(),
      }));
      setData(getData);
      setCount(alertApi.count);
      setSelectedRows([]);
      setAlertApiUrl('');
    }
  }, [alertApi]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    if (alertAddStatus) {
      dispatch(dvtAlertAddStatus(''));
    }
    setAlertApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, page, alertAddStatus]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setAlertApiUrl(searchApiUrls(page));
    }
  }, [alertsSelector, alertTabsSelector.value]);

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'report', title: 'report' },
      }),
    );
    setAlertApiUrl('');
  };

  const clearAlerts = () => {
    dispatch(dvtSidebarSetPropertyClear('alerts'));
  };

  const handleAlertAdd = () => {
    dispatch(
      openModal({
        component: 'alert-add-modal',
      }),
    );
  };

  const handleReportAdd = () => {
    dispatch(
      openModal({
        component: 'report-add-modal',
      }),
    );
  };

  const headerData = [
    { id: 1, title: t('Last Run'), field: 'lastRun', checkbox: true },
    { id: 2, title: t('Name'), field: 'name' },
    { id: 3, title: t('Schedule'), field: 'schedule' },
    { id: 4, title: t('Notification Method'), field: 'crontab_humanized' },
    { id: 5, title: t('Created By'), field: 'createdBy' },
    { id: 6, title: t('Owners'), field: 'owners' },
    { id: 7, title: t('Modified'), field: 'modified' },
    { id: 8, title: t('Active'), field: 'active' },
    {
      id: 9,
      title: t('Action'),
      clicks: [
        {
          icon: 'edit_alt',
          click: (item: any) => {
            handleEditConnection(item);
          },
          popperLabel: t('Edit'),
        },
        {
          icon: 'share',
          click: () => {},
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
      clearAlerts();
      setData([]);
      setSelectedRows([]);
    },
    [],
  );

  const handleEditConnection = async (item: any) => {
    try {
      const response = await fetch(`/api/v1/report/${item.id}`);
      const editedAlertReportData = await response.json();

      const type =
        editedAlertReportData.result.type === 'Alert'
          ? 'alert-add-modal'
          : 'report-add-modal';

      dispatch(
        openModal({
          component: type,
          meta: { editedAlertReportData, isEdit: true },
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return data.length ? (
    <StyledAlerts>
      <DvtDeselectDeleteExport
        count={selectedRows.length}
        handleDeselectAll={handleDeselectAll}
        handleDelete={() => handleModalDelete(selectedRows)}
      />
      <DvtTable
        data={data}
        header={headerData}
        selected={selectedRows}
        setSelected={setSelectedRows}
        checkboxActiveField="id"
      />
      <StyledAlertsButton>
        <DvtButton
          label={
            alertTabsSelector.value === 'Alert'
              ? t('Create a New Alert')
              : alertTabsSelector.value === 'Report'
              ? t('Create a New Report')
              : ''
          }
          onClick={() => {
            if (alertTabsSelector.value === 'Alert') {
              handleAlertAdd();
            } else if (alertTabsSelector.value === 'Report') {
              handleReportAdd();
            }
          }}
          colour="grayscale"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledAlertsButton>
    </StyledAlerts>
  ) : (
    <StyledAlerts>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? 'No Alerts Yet'
            : 'No results match your filter criteria'
        }
        buttonLabel={
          data.length === 0
            ? alertTabsSelector.value === 'Alert'
              ? t('Create a New Alert')
              : alertTabsSelector.value === 'Report'
              ? t('Create a New Report')
              : ''
            : t('Clear All Filter')
        }
        buttonClick={() => {
          if (data.length > 0) {
            clearAlerts();
          } else if (alertTabsSelector.value === 'Alert') {
            handleAlertAdd();
          } else if (alertTabsSelector.value === 'Report') {
            handleReportAdd();
          }
        }}
      />
    </StyledAlerts>
  );
}

export default withToasts(AlertList);
