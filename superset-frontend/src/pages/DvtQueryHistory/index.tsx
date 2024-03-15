/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { StyledSqlPagination } from './dvt-query-history.module';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { dvtSqlhubSetSqlQuery } from 'src/dvt-redux/dvt-sqlhubReducer';
import { dvtSidebarSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { dvtNavbarViewlistTabs } from 'src/dvt-redux/dvt-navbarReducer';
import { useHistory } from 'react-router-dom';

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
      orderColumn: sort.column,
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
  }, [queryHistorySelector]);

  // const sqlData = useFetch({
  //   url: `query/${fetchQueryParamsSearch({
  //     orderColumn: 'start_time',
  //     page,
  //   })}`,
  // });

  useEffect(() => {
    if (sqlQueryHistoryData) {
      const transformedData = sqlQueryHistoryData.result.map((item: any) => ({
        ...item,
        database_name: item.database.database_name,
        table: item.sql_tables.table,
        user: `${item.user.first_name} ${item.user.last_name}`,
        selectSql: '',
      }));
      setData(transformedData);
      setCount(sqlQueryHistoryData.count);
    }
  }, [sqlQueryHistoryData]);

  const QueryHistoryHeader = [
    {
      id: 1,
      title: t('Time'),
      field: 'changed_on',
      flex: 3,
    },
    {
      id: 2,
      title: t('Tab Name'),
      field: 'tab_name',
    },
    {
      id: 3,
      title: t('Database'),
      field: 'database_name',
    },
    {
      id: 4,
      title: t('Schema'),
      field: 'schema',
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
    },
    {
      id: 7,
      title: t('Rows'),
      field: 'rows',
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

  return (
    <div>
      <DvtTable data={data} header={QueryHistoryHeader} setSort={setSort} />
      <StyledSqlPagination>
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledSqlPagination>
    </div>
  );
}

export default DvtQueryHistory;
