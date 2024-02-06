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
import { dvtSidebarAlertsSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import { StyledAlerts, StyledAlertsButton } from './dvt-alerts.module';

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
        click: () => {},
        popperLabel: t('Edit'),
      },
      {
        icon: 'share',
        click: () => {},
        popperLabel: t('Export'),
      },
      {
        icon: 'trash',
        click: () => {},
        popperLabel: t('Delete'),
      },
    ],
  },
];

function AlertList() {
  const dispatch = useDispatch();
  const alertsSelector = useAppSelector(state => state.dvtSidebar.alerts);
  const alertTabsSelector = useAppSelector(state => state.dvtNavbar.alert.tabs);
  const [data, setData] = useState([]);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const alertData = useFetch({
    url: `report/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'type',
          opr: 'eq',
          value: alertTabsSelector.value,
        },
      ],
      page,
    })}`,
  });

  useEffect(() => {
    if (alertData) {
      const getData = alertData.result.map((item: any) => ({
        ...item,
        lastRun: new Date(item.last_eval_dttm).toLocaleString('tr-TR'),
        schedule: new Date(item.created_on).toLocaleString('tr-TR'),
        createdBy: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
        owners: `${item.owners[0].first_name} ${item.owners[0].last_name}`,
        modified: `${item.changed_by.first_name} ${item.changed_by.last_name}`,
        status: item.last_state,
        active: item.active.toString(),
      }));
      setData(getData);
      setCount(alertData.count);
      setSelectedRows([]);
    }
  }, [alertData]);

  const clearAlerts = () => {
    dispatch(
      dvtSidebarAlertsSetProperty({
        alerts: {
          ...alertsSelector,
          createdBy: '',
          owner: '',
          status: '',
          search: '',
        },
      }),
    );
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  return data.length ? (
    <StyledAlerts>
      <div>
        <DvtButton
          label={t('Deselect All')}
          bold
          colour="primary"
          typeColour="outline"
          size="medium"
          onClick={handleDeselectAll}
        />
      </div>
      <DvtTable
        data={data}
        header={headerData}
        selected={selectedRows}
        setSelected={setSelectedRows}
        checkboxActiveField="id"
      />
      <StyledAlertsButton>
        <DvtButton
          label={t('Create a New Alert')}
          onClick={() => {}}
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
        buttonLabel={data.length === 0 ? 'Alert' : 'Clear All Filter'}
        buttonClick={() => {
          if (data.length > 0) {
            clearAlerts();
          }
        }}
      />
    </StyledAlerts>
  );
}

export default withToasts(AlertList);
