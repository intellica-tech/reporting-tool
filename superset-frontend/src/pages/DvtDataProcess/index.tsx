/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
// import { useToasts } from 'src/components/MessageToasts/withToasts';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetProperty,
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtTable from 'src/components/DvtTable';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDvtDataProcess,
  StyledDvtDataProcessIconLabel,
} from './dvt-data-process.module';

const header = [
  {
    id: 1,
    title: t('Column Name'),
    field: 'name',
  },
  { id: 2, title: t('Datatype'), field: 'type' },
];

function DvtDataProcess() {
  const dispatch = useDispatch();
  // const { addDangerToast } = useToasts();
  const dataProcessSelector = useAppSelector(
    state => state.dvtSidebar.dataProcess,
  );
  const [getSchemaDataApiUrl, setGetSchemaDataApiUrl] = useState({
    url: '',
    key: '',
  });
  const [getTableDataApiUrl, setGetTableDataApiUrl] = useState('');
  const [data, setData] = useState([]);

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
  });

  useEffect(() => {
    if (dataProcessSelector.database?.value) {
      setGetSchemaDataApiUrl({
        url: `database/${dataProcessSelector.database.value}/schemas/?q=(force:!f)`,
        key: 'database',
      });
    }
  }, [dataProcessSelector.database]);

  useEffect(() => {
    if (dataProcessSelector.schema?.value) {
      setGetSchemaDataApiUrl({
        url: `database/${dataProcessSelector.database?.value}/tables/?q=(force:!f,schema_name:${dataProcessSelector.schema.value})`,
        key: 'schema',
      });
    }
  }, [dataProcessSelector.schema]);

  useEffect(() => {
    if (getSchemaData.data) {
      if (getSchemaDataApiUrl.key === 'database') {
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'dataProcess',
            key: 'schema',
            value: getSchemaData.data.result.map((s: string) => ({
              value: s,
              label: s,
            })),
          }),
        );
      }
      if (getSchemaDataApiUrl.key === 'schema') {
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'dataProcess',
            key: 'table',
            value: getSchemaData.data.result.map((t: { value: string }) => ({
              value: t.value,
              label: t.value,
            })),
          }),
        );
      }
    }
  }, [getSchemaData.data]);

  useEffect(() => {
    if (dataProcessSelector.table?.value) {
      setGetTableDataApiUrl(
        `database/${dataProcessSelector.database?.value}/table/${dataProcessSelector.table.value}/${dataProcessSelector.schema.value}/`,
      );
    }
  }, [dataProcessSelector.table]);

  useEffect(() => {
    if (getTableData.data) {
      setData(getTableData.data.columns);
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'dataProcess',
          key: 'kolon',
          value: getTableData.data.columns.map((t: { name: string }) => ({
            ...t,
            value: t.name,
            label: t.name,
          })),
        }),
      );
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'dataProcess',
          key: 'kolon',
          value: getTableData.data.columns.map((t: { name: string }) => t.name),
        }),
      );
    }
  }, [getTableData.data]);

  useEffect(() => {
    if (!getTableData.loading) {
      setGetTableDataApiUrl('');
    }
  }, [getTableData.loading]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('dataProcess'));
    },
    [],
  );

  // useFetch({
  //   url: 'data/outlier-analysis',
  //   method: 'POST',
  //   body: {
  //     selecteeed_columns: '',
  //     table_name: '',
  //   },
  // });
  // useFetch({
  //   url: 'data/normalization',
  //   method: 'POST',
  //   body: {
  //     selected_columns: '',
  //     table_name: '',
  //   },
  // });
  // useFetch({
  //   url: 'data/missing-data-imputation',
  //   method: 'POST',
  //   body: {
  //     selected_columns: '',
  //     table_name: '',
  //   },
  // });

  const filteredData = data.filter((item: { name: string }) =>
    dataProcessSelector.kolon.includes(item.name),
  );

  return (
    <StyledDvtDataProcess>
      {data.length > 0 ? (
        <DvtTable header={header} data={filteredData} />
      ) : (
        <StyledDvtDataProcessIconLabel>
          <DvtIconDataLabel
            label={t('Select table source')}
            description={t(
              'You can create an output table from existing table from the panel on the left.',
            )}
            icon="square"
          />
        </StyledDvtDataProcessIconLabel>
      )}
    </StyledDvtDataProcess>
  );
}

export default DvtDataProcess;
