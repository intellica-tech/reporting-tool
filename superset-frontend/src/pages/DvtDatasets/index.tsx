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
import { t } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/hooks/useFetch';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtSidebarSetPropertyClear } from 'src/dvt-redux/dvt-sidebarReducer';
import handleResourceExport from 'src/utils/export';
import DvtButton from 'src/components/DvtButton';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import { StyledButtons, StyledDvtDatasets } from './dvt-datasets.module';

function DvtDatasets() {
  const dispatch = useDispatch();
  const history = useHistory();
  const datasetsSelector = useAppSelector(state => state.dvtSidebar.datasets);
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const editSuccessStatus = useAppSelector(
    state => state.dvtHome.editSuccessStatus,
  );
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'changed_on_delta_humanized',
    direction: 'desc',
  });
  const [count, setCount] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const searchApiUrls = (gPage: number) =>
    `dataset/${fetchQueryParamsSearch({
      filters: [
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
      page: gPage,
      orderColumn: sort.column,
      orderDirection: sort.direction,
    })}`;

  const [datasetApiUrl, setDatasetApiUrl] = useState<string>('');
  const [datasetEditApiUrl, setDatasetEditApiUrl] = useState<string>('');

  const datasetApi = useFetch({
    url: datasetApiUrl,
  });

  const datasetEditPromise = useFetch({
    url: datasetEditApiUrl,
  });

  useEffect(() => {
    if (datasetApi) {
      setData(
        datasetApi.result.map((item: any) => ({
          ...item,
          'database.database_name': `${item.database.database_name}`,
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
      setCount(datasetApi.count);
      setSelectedRows([]);
      if (editSuccessStatus) {
        setData(datasetApi.result);
        setCount(datasetApi.count);
        setSelectedRows([]);
      }
    }
  }, [datasetApi, editSuccessStatus]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    setDatasetApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setDatasetApiUrl(searchApiUrls(page));
    }
  }, [datasetsSelector]);

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'dataset', title: 'dataset' },
      }),
    );
    setDatasetApiUrl('');
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('dataset', [id], () => {});
  };

  const handleSelectedExport = () => {
    const selectedIds = selectedRows.map(item => item.id);
    handleResourceExport('dataset', selectedIds, () => {});
  };

  const handleEditDataset = (item: any) => {
    setDatasetEditApiUrl(`dataset/${item.id}`);
    setTimeout(() => {
      setDatasetApiUrl('');
    }, 500);
  };

  const header = [
    {
      id: 1,
      title: t('Name'),
      field: 'table_name',
      flex: 3,
      checkbox: true,
      folderIcon: true,
      urlField: 'explore_url',
      sort: true,
    },
    { id: 2, title: t('Type'), field: 'kind' },
    {
      id: 3,
      title: t('Database'),
      field: 'database.database_name',
      sort: true,
    },
    { id: 4, title: t('Schema'), field: 'schema', sort: true },
    { id: 5, title: t('Owners'), field: 'owners' },
    {
      id: 6,
      title: t('Modified Date'),
      field: 'changed_on_delta_humanized',
      sort: true,
    },
    {
      id: 7,
      title: t('Actions'),
      clicks: [
        {
          icon: 'edit_alt',
          click: (item: any) => handleEditDataset(item),
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

  useEffect(() => {
    if (datasetEditPromise) {
      dispatch(
        openModal({
          component: 'dataset-edit-modal',
          meta: { ...datasetEditPromise, isEdit: true },
        }),
      );
    }
  }, [datasetEditPromise]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('datasets'));
      setData([]);
      setSelectedRows([]);
    },
    [],
  );

  return (
    <StyledDvtDatasets>
      <DvtDeselectDeleteExport
        count={selectedRows.length}
        handleDeselectAll={handleDeselectAll}
        handleDelete={() => handleModalDelete(selectedRows)}
        handleExport={handleSelectedExport}
      />
      <div>
        <DvtTable
          data={data}
          header={header}
          selected={selectedRows}
          setSelected={setSelectedRows}
          checkboxActiveField="id"
          sort={sort}
          setSort={setSort}
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
