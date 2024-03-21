/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { dvtSqlhubSetSqlQuery } from 'src/dvt-redux/dvt-sqlhubReducer';
import { dvtSidebarSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { dvtNavbarViewlistTabs } from 'src/dvt-redux/dvt-navbarReducer';
import { useHistory } from 'react-router-dom';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import useFetch from 'src/dvt-hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledEmptyQueryHistory,
  StyledSqlPagination,
} from './dvt-query-history.module';

function DvtQueryHistory() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);

  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'start_time',
    direction: 'desc',
  });
  const queryHistorySelector = useAppSelector(
    state => state.dvtSidebar.queryHistory,
  );

  const searchApiUrls = (gPage: number) =>
    `query/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'sql',
          opr: 'ct',
          value: queryHistorySelector.search,
        },
        {
          col: 'database',
          opr: 'rel_o_m',
          value: queryHistorySelector.database?.value,
        },
        {
          col: 'status',
          opr: 'eq',
          value: queryHistorySelector.state?.value,
        },
        {
          col: 'user',
          opr: 'rel_o_m',
          value: queryHistorySelector.user?.value,
        },
        {
          col: 'start_time',
          opr: 'lt',
          value: queryHistorySelector.start_time?.value,
        },
      ],
      page: gPage,
      orderColumn:
        sort.column === 'database_name'
          ? `database.${sort.column}`
          : sort.column === 'user'
          ? `${sort.column}.first_name`
          : sort.column,
      orderDirection: sort.direction,
    })}`;

  const [queryHistoryUrl, setQueryHistoryUrl] = useState<string>('');

  const sqlQueryHistoryData = useFetch({
    url: queryHistoryUrl,
  });

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setQueryHistoryUrl(searchApiUrls(page));
    }
  }, [queryHistorySelector, sort]);

  // const sqlData = useFetch({
  //   url: `query/${fetchQueryParamsSearch({
  //     orderColumn: 'start_time',
  //     page,
  //   })}`,
  // });

  useEffect(() => {
    if (sqlQueryHistoryData.data) {
      const transformedData = sqlQueryHistoryData.data.result.map(
        (item: any) => ({
          ...item,
          database_name: item.database.database_name,
          table: item.sql_tables.table,
          user: `${item.user.first_name} ${item.user.last_name}`,
          selectSql: '',
        }),
      );
      setData(transformedData);
      setCount(sqlQueryHistoryData.data.count);
    }
  }, [sqlQueryHistoryData.data]);

  const QueryHistoryHeader = [
    {
      id: 1,
      title: t('Time'),
      field: 'changed_on',
      flex: 3,
      sort: true,
    },
    {
      id: 2,
      title: t('Tab Name'),
      field: 'tab_name',
      sort: true,
    },
    {
      id: 3,
      title: t('Database'),
      field: 'database_name',
      sort: true,
    },
    {
      id: 4,
      title: t('Schema'),
      field: 'schema',
      sort: true,
    },
    {
      id: 5,
      title: t('Tables'),
      field: 'table',
    },
    {
      id: 6,
      title: t('User'),
      field: 'user',
      sort: true,
    },
    {
      id: 7,
      title: t('Rows'),
      field: 'rows',
      sort: true,
    },
    {
      id: 8,
      title: t('SQL'),
      field: 'selectSql',
      modal: 'query-preview',
    },
    {
      id: 9,
      title: t('Actions'),
      clicks: [
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
          popperLabel: t('Open query in SQL Hub'),
        },
      ],
    },
  ];

  return data.length > 0 ? (
    <div>
      <DvtTable
        data={data}
        header={QueryHistoryHeader}
        sort={sort}
        setSort={setSort}
      />
      <StyledSqlPagination>
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledSqlPagination>
    </div>
  ) : (
    <StyledEmptyQueryHistory>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? 'No Query History Yet'
            : t('No results match your filter criteria')
        }
      />
    </StyledEmptyQueryHistory>
  );
}

export default DvtQueryHistory;
