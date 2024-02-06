/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { StyledSqlPagination } from './dvt-sql.module';

const SavedQueriesHeader = [
  { id: 1, title: t('Name'), field: 'label', flex: 3 },
  { id: 2, title: t('Database'), field: 'database_name' },
  { id: 3, title: t('Schema'), field: 'schema' },
  { id: 4, title: t('Tables'), field: 'table' },
  { id: 5, title: t('Created on'), field: 'id' },
  { id: 6, title: t('Modified'), field: 'changed_on_delta_humanized' },
  {
    id: 7,
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
    field: 'sql',
  },
  {
    id: 9,
    title: t('Actions'),
    clicks: [
      {
        icon: 'edit_alt',
        click: () => {},
        popperLabel: t('Edit'),
      },
    ],
  },
];

function DvtSql() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);
  const sqlTabValue = useAppSelector(state => state.dvtNavbar.sql.tabs.value);

  const [tabsAndPage, setTabsAndPage] = useState({
    tab: sqlTabValue,
    page: 1,
  });

  const sqlData = useFetch({
    url:
      tabsAndPage.tab === 'Query History'
        ? `query/${fetchQueryParamsSearch({
            orderColumn: 'start_time',
            page: page || tabsAndPage.page,
          })}`
        : `saved_query/${fetchQueryParamsSearch({
            page: page || tabsAndPage.page,
          })}`,
  });

  useEffect(() => {
    setTabsAndPage({ tab: sqlTabValue, page: 1 });
    setPage(1);
  }, [sqlTabValue]);

  useEffect(() => {
    if (sqlData) {
      const transformedData = sqlData.result.map((item: any) => {
        if (sqlTabValue === 'Query History') {
          return {
            ...item,
            database_name: item.database.database_name,
            table: item.sql_tables.table,
            user: `${item.user.first_name} ${item.user.last_name}`,
            sql: '',
          };
        }
        if (sqlTabValue === 'Saved Queries') {
          return {
            ...item,
            database_name: item.database.database_name,
            table: item.sql_tables.table,
            user: `${item.created_by.first_name} ${item.created_by.last_name}`,
          };
        }
        return item;
      });
      setData(transformedData);
      setCount(sqlData.count);
    }
  }, [sqlData]);

  return (
    <div>
      <div>
        {sqlTabValue === 'Query History' && (
          <DvtTable data={data} header={QueryHistoryHeader} />
        )}
        {sqlTabValue === 'Saved Queries' && (
          <DvtTable data={data} header={SavedQueriesHeader} />
        )}
      </div>
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

export default DvtSql;
