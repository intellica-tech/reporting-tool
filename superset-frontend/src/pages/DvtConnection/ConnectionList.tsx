import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useDispatch } from 'react-redux';
import { dvtSidebarConnectionSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledConnection,
  StyledConnectionButton,
} from './dvt-connection.module';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { modifiedData } from '.';

export function ConnectionList() {
  const dispatch = useDispatch();
  const connectionSelector = useAppSelector(
    state => state.dvtSidebar.connection,
  );
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const searchApiUrl = () => {
    const filterData = [
      {
        col: 'expose_in_sqllab',
        opr: 'eq',
        value: connectionSelector.expose_in_sqllab?.value,
      },
      {
        col: 'allow_run_async',
        opr: 'eq',
        value: connectionSelector.allow_run_async?.value,
      },
      {
        col: 'database_name',
        opr: 'ct',
        value: connectionSelector.search,
      },
    ];

    let filters = '';
    const sort = 'order_column:changed_on_delta_humanized,order_direction:desc';

    const withoutValues = [undefined, null, ''];

    const filteredData = filterData
      .filter(item => !withoutValues.includes(item.value))
      .map(item => `(col:${item.col},opr:${item.opr},value:${item.value})`)
      .join(',');

    if (filterData.filter(item => !withoutValues.includes(item.value)).length) {
      filters = `filters:!(${filteredData}),`;
    }

    return `?q=(${filters}${sort},page:${page - 1},page_size:10)`;
  };

  const searchApiUrl = fetchQueryParamsSearch(
    [
      {
        col: 'expose_in_sqllab',
        opr: 'eq',
        value: connectionSelector.expose_in_sqllab?.value,
      },
      {
        col: 'allow_run_async',
        opr: 'eq',
        value: connectionSelector.allow_run_async?.value,
      },
      {
        col: 'database_name',
        opr: 'ct',
        value: connectionSelector.search,
      },
    ],
    'order_column:changed_on_delta_humanized,order_direction:desc',
    page,
    10,
  );

  const connectionApi = useFetch({
    url: `/api/v1/database/${searchApiUrl}`,
  });

  useEffect(() => {
    if (connectionApi) {
      setData(
        connectionApi.result.map((item: any) => ({
          ...item,
          admin: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
          date: new Date(item.changed_on).toLocaleString('tr-TR'),
        })),
      );
      setCount(connectionApi.count);
    }
  }, [connectionApi]);

  const clearConnection = () => {
    dispatch(
      dvtSidebarConnectionSetProperty({
        connection: {
          ...connectionSelector,
          expose_in_sqllab: '',
          allow_run_async: '',
          search: '',
        },
      }),
    );
  };

  return data.length > 0 ? (
    <StyledConnection>
      <DvtTable data={data} header={modifiedData.header} />
      <StyledConnectionButton>
        <DvtButton
          label={t('Create a New Connection')}
          onClick={() => {}}
          colour="grayscale"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledConnectionButton>
    </StyledConnection>
  ) : (
    <StyledConnection>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? t('No Connection Yet')
            : t('No results match your filter criteria')
        }
        buttonLabel={
          data.length === 0 ? t('Connection') : t('Clear All Filter')
        }
        buttonClick={() => {
          if (data.length > 0) {
            clearConnection();
          }
        }}
      />
    </StyledConnection>
  );
}
