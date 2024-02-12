/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';

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

function DvtSavedQuery() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState<number>(0);

  const sqlData = useFetch({
    url: `saved_query/${fetchQueryParamsSearch({
      page,
    })}`,
  });

  useEffect(() => {
    if (sqlData) {
      const transformedData = sqlData.result.map((item: any) => ({
        ...item,
        database_name: item.database.database_name,
        table: item.sql_tables.table,
        user: `${item.created_by.first_name} ${item.created_by.last_name}`,
      }));
      setData(transformedData);
      setCount(sqlData.count);
    }
  }, [sqlData]);

  return (
    <div>
      <DvtTable data={data} header={SavedQueriesHeader} />
      <DvtPagination
        page={page}
        setPage={setPage}
        itemSize={count}
        pageItemSize={10}
      />
    </div>
  );
}

export default DvtSavedQuery;
