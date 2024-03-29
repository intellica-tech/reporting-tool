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
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import handleResourceExport from 'src/utils/export';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { useHistory } from 'react-router-dom';
import { dvtSidebarSetPropertyClear } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import useFetch from 'src/dvt-hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import DvtTitleCardList from 'src/components/DvtTitleCardList';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import { StyledReports, StyledReportsButton } from './dvt-reports.module';
import { dvtChartEditStatus } from 'src/dvt-redux/dvt-chartReducer';

function ReportList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const activeTab = useAppSelector(
    state => state.dvtNavbar.viewlist.reports.value,
  );
  const reportsSelector = useAppSelector(state => state.dvtSidebar.reports);
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const chartEditStatus = useAppSelector(
    state => state.dvtChart.chartEditStatus,
  );
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'changed_on_delta_humanized',
    direction: 'desc',
  });
  const [count, setCount] = useState(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [dataOnReady, setDataOnReady] = useState<boolean>(false);

  const searchApiUrls = (gPage: number) =>
    `chart/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'owners',
          opr: 'rel_m_m',
          value: reportsSelector.owner?.value,
        },
        {
          col: 'created_by',
          opr: 'rel_o_m',
          value: reportsSelector.createdBy?.value,
        },
        {
          col: 'viz_type',
          opr: 'eq',
          value: reportsSelector.chartType?.value,
        },
        {
          col: 'datasource_id',
          opr: 'eq',
          value: reportsSelector.dataset?.value,
        },
        {
          col: 'dashboards',
          opr: 'rel_m_m',
          value: reportsSelector.dashboards?.value,
        },
        {
          col: 'id',
          opr: 'chart_is_favorite',
          value: reportsSelector.favorite?.value,
        },
        {
          col: 'id',
          opr: 'chart_is_certified',
          value: reportsSelector.certified?.value,
        },
        {
          col: 'slice_name',
          opr: 'chart_all_text',
          value: reportsSelector.search,
        },
      ],
      page: gPage,
      orderColumn: sort.column,
      orderDirection: sort.direction,
    })}`;

  const [reportApiUrl, setReportApiUrl] = useState<string>('');
  const [reportApiFetched, setReportApiFetched] = useState<boolean>(false);
  const [reportApiEditUrl, setReportApiEditUrl] = useState<string>('');
  const [favoriteApiUrl, setFavoriteApiUrl] = useState<string>('');

  const reportData = useFetch({
    url: reportApiUrl,
  });
  const reportEditPromise = useFetch({
    url: reportApiEditUrl,
  });
  const favoriteData = useFetch({ url: favoriteApiUrl });

  useEffect(() => {
    if (reportData.data) {
      const editedDatas = reportData.data.result.map((item: any) => ({
        ...item,
        last_saved_at: new Date(item.changed_on_utc).toLocaleString('tr-TR'),
      }));
      setData(editedDatas);
      setCount(reportData.data.count);
      setDataOnReady(true);
      setSelectedRows([]);
      if (!reportApiFetched) {
        setReportApiFetched(true);
      }
    }
  }, [reportData.data]);

  useEffect(() => {
    if (!reportData.loading && reportApiFetched) {
      setReportApiUrl('');
    }
  }, [reportData.loading, reportApiFetched]);

  useEffect(() => {
    if (dataOnReady && data.length > 0) {
      const idGetData = data.map((item: { id: number }) => item.id);
      setFavoriteApiUrl(`chart/favorite_status/?q=!(${idGetData.join()})`);
      setDataOnReady(false);
    }
  }, [dataOnReady, data]);

  useEffect(() => {
    if (favoriteData.data?.result.length > 0) {
      const addedFavoriteData = [];
      const fvrArray = favoriteData.data.result;

      for (let i = 0; i < fvrArray.length; i += 1) {
        const favoriteItem = fvrArray[i];
        const editedItem = data.find(
          (item: any) => item.id === favoriteItem.id,
        );
        addedFavoriteData.push({
          ...editedItem,
          isFavorite: favoriteItem.value,
        });
      }

      setData(addedFavoriteData);
    }
  }, [favoriteData.data]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    if (chartEditStatus) {
      dispatch(dvtChartEditStatus(''));
    }
    setReportApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, chartEditStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setReportApiUrl(searchApiUrls(page));
    }
  }, [reportsSelector]);

  useEffect(() => {
    if (!reportEditPromise.loading) {
      setReportApiEditUrl('');
    }
  }, [reportEditPromise.loading]);

  useEffect(() => {
    if (!favoriteData.loading) {
      setFavoriteApiUrl('');
    }
  }, [favoriteData.loading]);

  const clearReports = () => {
    dispatch(dvtSidebarSetPropertyClear('reports'));
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
    if (!favoritePromise.loading) {
      setFavoriteUrl({ url: '', title: '', id: 0, isFavorite: false });
    }
  }, [favoritePromise.loading]);

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

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleEditCharts = (item: any) => {
    setReportApiEditUrl(`chart/${item.id}`);
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('chart', [id], () => {});
  };

  const handleBulkExport = () => {
    const selectedIds = selectedRows.map(item => item.id);
    handleResourceExport('chart', selectedIds, () => {});
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'chart', title: 'chart' },
      }),
    );
  };

  const modifiedData = {
    header: [
      {
        id: 1,
        title: t('Name'),
        field: 'slice_name',
        checkbox: true,
        urlField: 'url',
        sort: true,
      },
      { id: 2, title: t('Visualization Type'), field: 'viz_type', sort: true },
      {
        id: 3,
        title: t('Dataset'),
        field: 'datasource_name_text',
        urlField: 'datasource_url',
      },
      { id: 4, title: t('Modified date'), field: 'last_saved_at', sort: true },
      {
        id: 5,
        title: t('Actions'),
        clicks: [
          {
            icon: 'edit_alt',
            click: (item: any) => handleEditCharts(item),
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
    if (reportEditPromise.data) {
      dispatch(
        openModal({
          component: 'edit-chart',
          meta: reportEditPromise.data,
        }),
      );
    }
  }, [reportEditPromise.data]);

  useEffect(
    () => () => {
      clearReports();
      setData([]);
      setSelectedRows([]);
    },
    [],
  );

  return data.length > 0 ? (
    <StyledReports>
      {activeTab === 'Table' ? (
        <>
          <DvtDeselectDeleteExport
            count={selectedRows.length}
            handleDeselectAll={handleDeselectAll}
            handleDelete={() => handleModalDelete(selectedRows)}
            handleExport={handleBulkExport}
          />
          <div style={{ flex: 1 }}>
            <DvtTable
              data={data}
              header={modifiedData.header}
              selected={selectedRows}
              setSelected={setSelectedRows}
              checkboxActiveField="id"
              sort={sort}
              setSort={setSort}
            />
          </div>
        </>
      ) : (
        <div style={{ flex: 1 }}>
          <DvtTitleCardList
            data={data.map((item: any) => ({
              id: item.id,
              title: item.slice_name,
              label: item.changed_by_name,
              description: item.changed_on_delta_humanized,
              isFavorite: item.isFavorite,
              link: item.url,
              paramUrl: 'chart',
            }))}
            title={t('Data')}
            setFavorites={handleSetFavorites}
            dropdown={[
              {
                label: t('Edit'),
                icon: 'edit_alt',
                onClick: (item: any) => handleEditCharts(item),
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
        </div>
      )}
      <StyledReportsButton>
        <DvtButton
          label={t('Create a New Graph/Chart')}
          onClick={() => history.push('/chart/add')}
          colour="grayscale"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledReportsButton>
    </StyledReports>
  ) : (
    <StyledReports>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? t('No Reports Yet')
            : t('No results match your filter criteria')
        }
        buttonLabel={
          data.length === 0
            ? t('Create a New Graph/Chart')
            : t('Clear All Filter')
        }
        buttonClick={() => history.push('/chart/add')}
      />
    </StyledReports>
  );
}

export default withToasts(ReportList);
