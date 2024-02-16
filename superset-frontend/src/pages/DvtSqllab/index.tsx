/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@superset-ui/core';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import { dvtSqlhubSetSelectedTables } from 'src/dvt-redux/dvt-sqlhubReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';
import DvtTable from 'src/components/DvtTable';
import DvtPagination from 'src/components/DvtPagination';
import { StyledSqlPagination, StyledSqlhub } from './dvt-sqlhub.module';

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

function DvtSqllab() {
  const dispatch = useDispatch();
  const sqlhubSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqlhub,
  );
  const [limit, setLimit] = useState(1000);
  const [value, setValue] = useState('');

  const [getSchemaApiUrl, setGetSchemaApiUrl] = useState('');
  const [getSeeTableSchemaApiUrl, setGetSeeTableSchemaApiUrl] = useState('');
  const [selectedSeeTableSchemaApiUrl, setSelectedSeeTableSchemaApiUrl] =
    useState('');

  const getSchemaApi = useFetch({ url: getSchemaApiUrl });
  const getSeeTableSchemaApi = useFetch({ url: getSeeTableSchemaApiUrl });
  const selectedSeeTableSchemaApi = useFetch({
    url: selectedSeeTableSchemaApiUrl,
  });
  const [page, setPage] = useState(1);
  const tabsSelector = useAppSelector(
    state => state.dvtNavbar.viewlist.sqlhub.value,
  );
  const [data, setData] = useState([]);
  const [tabsAndPage, setTabsAndPage] = useState({
    tab: tabsSelector,
    page: 1,
  });
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (sqlhubSidebarSelector.database?.value) {
      setGetSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/schemas/?q=(force:!f)`,
      );
    }
  }, [sqlhubSidebarSelector.database]);

  useEffect(() => {
    if (
      sqlhubSidebarSelector.database?.value &&
      sqlhubSidebarSelector.schema?.value
    ) {
      setGetSeeTableSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/tables/?q=(force:!f,schema_name:${sqlhubSidebarSelector.schema.value})`,
      );
    }
  }, [sqlhubSidebarSelector.database, sqlhubSidebarSelector.schema]);

  useEffect(() => {
    if (
      sqlhubSidebarSelector.database?.value &&
      sqlhubSidebarSelector.schema?.value &&
      sqlhubSidebarSelector.see_table_schema?.value
    ) {
      setSelectedSeeTableSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/table/${sqlhubSidebarSelector.see_table_schema.value}/${sqlhubSidebarSelector.schema.value}/`,
      );
    }
  }, [sqlhubSidebarSelector]);

  useEffect(() => {
    if (getSchemaApi) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'schema',
          value: getSchemaApi.result.map((v: string) => ({
            label: v,
            value: v,
          })),
        }),
      );
      setGetSchemaApiUrl('');
    }
  }, [getSchemaApi]);

  useEffect(() => {
    if (getSeeTableSchemaApi) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'see_table_schema',
          value: getSeeTableSchemaApi.result.map((v: any) => ({
            ...v,
            label: v.value,
          })),
        }),
      );
      setGetSeeTableSchemaApiUrl('');
    }
  }, [getSeeTableSchemaApi]);

  useEffect(() => {
    if (selectedSeeTableSchemaApi) {
      dispatch(dvtSqlhubSetSelectedTables(selectedSeeTableSchemaApi));
      setSelectedSeeTableSchemaApiUrl('');
    }
  }, [selectedSeeTableSchemaApi]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('sqlhub'));
      dispatch(dvtSqlhubSetSelectedTables([]));
      setValue('');
    },
    [],
  );

  useEffect(() => {
    setTabsAndPage({ tab: tabsSelector, page: 1 });
    setPage(1);
  }, [tabsSelector]);

  const sqlData = useFetch({
    url:
      tabsAndPage.tab === 'history'
        ? `query/${fetchQueryParamsSearch({
            orderColumn: 'start_time',
            page: page || tabsAndPage.page,
          })}`
        : `saved_query/${fetchQueryParamsSearch({
            page: page || tabsAndPage.page,
          })}`,
  });

  useEffect(() => {
    if (sqlData) {
      const transformedData = sqlData.result.map((item: any) => {
        if (tabsSelector === 'history') {
          return {
            ...item,
            database_name: item.database.database_name,
            table: item.sql_tables.table,
            user: `${item.user.first_name} ${item.user.last_name}`,
            sql: '',
          };
        }
        if (tabsSelector === 'saved') {
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
    <StyledSqlhub>
      {tabsSelector === 'sqlHub' && (
        <DvtTextareaSelectRun
          limit={limit}
          setLimit={setLimit}
          value={value}
          setValue={setValue}
          clickRun={() => {}}
        />
      )}
      {(tabsSelector === 'saved' || tabsSelector === 'history') && (
        <div>
          <div>
            {tabsSelector === 'history' && (
              <DvtTable data={data} header={QueryHistoryHeader} />
            )}
            {tabsSelector === 'saved' && (
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
      )}
    </StyledSqlhub>
  );
}

export default DvtSqllab;
