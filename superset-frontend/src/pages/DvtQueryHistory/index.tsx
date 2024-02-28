/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { StyledSqlPagination } from './dvt-query-history.module';
import { useAppSelector } from 'src/hooks/useAppSelector';

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

function DvtQueryHistory() {
  const queryHistorySelector = useAppSelector(
    state => state.dvtSidebar.queryHistory,
  );
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);

  const sqlData = useFetch({
    url: `query/${fetchQueryParamsSearch({
      orderColumn: 'start_time',
      page,
    })}`,
  });

  useEffect(() => {
    if (sqlData) {
      const transformedData = sqlData.result.map((item: any) => ({
        ...item,
        database_name: item.database.database_name,
        table: item.sql_tables.table,
        user: `${item.user.first_name} ${item.user.last_name}`,
        sql: '',
      }));
      setData(transformedData);
      setCount(sqlData.count);
    }
  }, [sqlData]);

  return (
    <div>
      <DvtTable data={data} header={QueryHistoryHeader} />
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
