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
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/hooks/useFetch';
import moment from 'moment';
import DvtButton from 'src/components/DvtButton';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import {
  StyledButtons,
  StyledDeselect,
  StyledDeselectButton,
  StyledDvtDatasets,
  StyledSelected,
} from './dvt-datasets.module';

const header = [
  {
    id: 1,
    title: t('Name'),
    field: 'table_name',
    flex: 3,
    checkbox: true,
    folderIcon: true,
    onLink: true,
  },
  { id: 2, title: t('Type'), field: 'kind' },
  { id: 3, title: t('Database'), field: 'database' },
  { id: 4, title: t('Schema'), field: 'schema' },
  { id: 5, title: t('Modified Date'), field: 'changed_on_utc' },
  { id: 6, title: t('Modified by'), field: 'changed_by_name' },
  { id: 7, title: t('Owners'), field: 'owners' },
  {
    id: 8,
    title: t('Actions'),
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

function DvtDatasets() {
  const datasetsSelector = useAppSelector(state => state.dvtSidebar.datasets);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const searchApiUrls = fetchQueryParamsSearch({
    filterData: [
      {
        col: 'owners',
        opr: 'rel_m_m',
        value: datasetsSelector.owner?.value,
      },
      {
        col: 'database',
        opr: 'rel_o_m',
        value: datasetsSelector.database?.value,
      },
      {
        col: 'schema',
        opr: 'eq',
        value: datasetsSelector.schema?.value,
      },
      {
        col: 'sql',
        opr: 'dataset_is_null_or_empty',
        value: datasetsSelector.type?.value,
      },
      {
        col: 'id',
        opr: 'dataset_is_certified',
        value: datasetsSelector.certified?.value,
      },
      {
        col: 'table_name',
        opr: 'ct',
        value: datasetsSelector.search,
      },
    ],
    page,
  });

  const connectionApi = useFetch({
    url: `/api/v1/dataset/${searchApiUrls}`,
  });

  useEffect(() => {
    if (connectionApi) {
      setData(
        connectionApi.result.map((item: any) => ({
          ...item,
          database: `${item.database.database_name}`,
          changed_on_utc: moment(item.changed_on_utc).fromNow(),
          owners: item.owners.length
            ? item.owners
                .map(
                  (item: { first_name: string; last_name: string }) =>
                    `${item.first_name} ${item.last_name}`,
                )
                .join(',')
            : '',
        })),
      );
      setCount(connectionApi.count);
      setSelectedRows([]);
    }
  }, [connectionApi]);

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  return (
    <StyledDvtDatasets>
      <StyledDeselectButton>
        <StyledSelected>
          <span>{`${selectedRows.length} Selected`}</span>
        </StyledSelected>
        <StyledDeselect>
          <DvtButton
            label={t('Deselect All')}
            bold
            colour="primary"
            typeColour="outline"
            size="medium"
            onClick={handleDeselectAll}
          />
        </StyledDeselect>
      </StyledDeselectButton>
      <div>
        <DvtTable
          data={data}
          header={header}
          selected={selectedRows}
          setSelected={setSelectedRows}
          checkboxActiveField="id"
        />
      </div>
      <StyledButtons>
        <DvtButton
          label={t('Create a New Dataset')}
          onClick={() => history.push('/dataset/add/')}
          colour="grayscale"
          typeColour="basic"
          size="small"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledButtons>
    </StyledDvtDatasets>
  );
}

export default DvtDatasets;
