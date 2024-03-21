/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import DvtDeselectDeleteExport from 'src/components/DvtDeselectDeleteExport';
import handleResourceExport from 'src/utils/export';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtSqlhubSetSqlQuery } from 'src/dvt-redux/dvt-sqlhubReducer';
import { useHistory } from 'react-router-dom';
import { dvtNavbarViewlistTabs } from 'src/dvt-redux/dvt-navbarReducer';
import { dvtSidebarSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import useFetch from 'src/dvt-hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  SavedQueryPagination,
  StyledEmptyAlerts,
} from './dvt-saved-query.module';

function DvtSavedQuery() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addDangerToast } = useToasts();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const savedQuerySelector = useAppSelector(
    state => state.dvtSidebar.savedQuery,
  );
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const [selected, setSelected] = useState<any[]>([]);
  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'changed_on_delta_humanized',
    direction: 'desc',
  });
  const [count, setCount] = useState<number>(0);

  const searchApiUrls = (gPage: number) =>
    `saved_query/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'label',
          opr: 'all_text',
          value: savedQuerySelector.name,
        },
        {
          col: 'database',
          opr: 'rel_o_m',
          value: savedQuerySelector.database?.value,
        },
        {
          col: 'schema',
          opr: 'eq',
          value: savedQuerySelector.schema?.value,
        },
        {
          col: 'changed_by',
          opr: 'rel_o_m',
          value: savedQuerySelector.modifiedBy?.value,
        },
      ],
      page: gPage,
      orderColumn:
        sort.column === 'database_name'
          ? `database.${sort.column}`
          : sort.column,
      orderDirection: sort.direction,
    })}`;

  const [savedQueryApiUrl, setSavedQueryApiUrl] = useState<string>('');

  const sqlData = useFetch({
    url: savedQueryApiUrl,
  });

  useEffect(() => {
    if (sqlData.data) {
      const transformedData = sqlData.data.result.map((item: any) => ({
        ...item,
        database_name: item.database.database_name,
        table: item.sql_tables.table,
        user: `${item.created_by.first_name} ${item.created_by.last_name}`,
      }));
      setData(transformedData);
      setCount(sqlData.data.count);
    }
  }, [sqlData.data]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
      handleDeselectAll();
    }
    setSavedQueryApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setSavedQueryApiUrl(searchApiUrls(page));
    }
  }, [savedQuerySelector]);

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: {
          item,
          type: 'saved_query',
          title: selected.length > 1 ? 'saved querie' : 'saved query',
        },
      }),
    );
    setSavedQueryApiUrl('');
  };

  const handleSingleExport = (id: number) => {
    handleResourceExport('saved_query', [id], () => {});
  };

  const handleBulkExport = () => {
    const selectedIds = selected.map(item => item.id);
    handleResourceExport('dashboard', selectedIds, () => {});
  };

  const SavedQueriesHeader = [
    {
      id: 1,
      title: t('Name'),
      field: 'label',
      flex: 3,
      checkbox: true,
      sort: true,
    },
    { id: 2, title: t('Database'), field: 'database_name', sort: true },
    { id: 3, title: t('Schema'), field: 'schema', sort: true },
    { id: 4, title: t('Tables'), field: 'table' },
    { id: 5, title: t('Created on'), field: 'id' },
    {
      id: 6,
      title: t('Modified'),
      field: 'changed_on_delta_humanized',
      sort: true,
    },
    {
      id: 7,
      title: t('Actions'),
      clicks: [
        {
          icon: 'binoculars',
          click: (row: any) => {
            dispatch(
              openModal({
                component: 'query-preview',
                meta: { ...row, withoutTabs: true },
              }),
            );
          },
          popperLabel: t('Query Preview'),
        },
        {
          icon: 'edit_alt',
          click: (item: any) => {
            dispatch(dvtSqlhubSetSqlQuery(item.sql));
            dispatch(
              dvtSidebarSetProperty({
                pageKey: 'sqlhub',
                key: 'schema',
                value: { label: item.schema, value: item.schema },
              }),
            );
            dispatch(
              dvtNavbarViewlistTabs({
                key: 'sqlhub',
                value: {
                  label: 'SQL Hub',
                  value: '/sqlhub/',
                },
              }),
            );
            history.push('/sqlhub/');
          },
          popperLabel: t('Edit'),
        },
        {
          icon: 'file',
          click: (item: any) => {
            const url = `${window.location.origin}/sqllab?savedQueryId=${item.id}`;
            navigator.clipboard
              .writeText(url)
              .then(() => {
                addDangerToast(t('URL copied to clipboard.'));
              })
              .catch(error => {
                addDangerToast(`${t('Copy failed:')} ${error}`);
              });
          },
          popperLabel: t('Copy query URL'),
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

  return data.length > 0 ? (
    <div>
      <DvtDeselectDeleteExport
        count={selected.length}
        handleDeselectAll={handleDeselectAll}
        handleDelete={() => handleModalDelete(selected)}
        handleExport={handleBulkExport}
      />
      <DvtTable
        data={data}
        header={SavedQueriesHeader}
        checkboxActiveField="id"
        selected={selected}
        setSelected={setSelected}
        sort={sort}
        setSort={setSort}
      />
      <SavedQueryPagination>
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </SavedQueryPagination>
    </div>
  ) : (
    <StyledEmptyAlerts>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? t('No Alerts Yet')
            : t('No results match your filter criteria')
        }
      />
    </StyledEmptyAlerts>
  );
}

export default DvtSavedQuery;
