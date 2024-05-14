/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import DvtButton from 'src/components/DvtButton';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtTable from 'src/components/DvtTable';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDvtDataProcessIconButton,
  StyledDvtDataProcessIconLabel,
} from './dvt-data-process.module';

const header = [
  {
    id: 1,
    title: t('Column Name'),
    field: 'name',
    checkbox: true,
  },
  { id: 2, title: t('Datatype'), field: 'type' },
];

function DvtDataProcess() {
  const dispatch = useDispatch();
  const { addDangerToast } = useToasts();
  const dataProcessSelector = useAppSelector(
    state => state.dvtSidebar.dataProcess,
  );
  const [getSchemaDataApiUrl, setGetSchemaDataApiUrl] = useState({
    url: '',
    key: '',
  });
  const [getTableDataApiUrl, setGetTableDataApiUrl] = useState('');
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState<any[]>([]);
  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
  });
  const [apiUrl, setApiUrl] = useState('');

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

  const postDataset = useFetch({
    url: apiUrl,
    method: 'POST',
    body: {
      selected_columns: selected.map(selected => selected.name).join(','),
      table_name: dataProcessSelector.table.value,
    },
  });

  useEffect(() => {
    if (!postDataset.loading) {
      setApiUrl('');
    }
  }, [postDataset.loading]);

  useEffect(() => {
    if (postDataset.data?.success) {
      addDangerToast(t('Success'));
      setData([]);
      dispatch(dvtSidebarSetPropertyClear('dataProcess'));
    }
  }, [postDataset.data]);

  return (
    <>
      {data.length > 0 ? (
        <>
          <DvtTable
            header={header}
            data={data}
            selected={selected}
            setSelected={setSelected}
            checkboxActiveField="name"
          />
          <StyledDvtDataProcessIconButton>
            <DvtButton
              label={t('Create Output Table')}
              size="small"
              colour="primary"
              onClick={() => {
                setApiUrl(dataProcessSelector.dataProcessType.value);
              }}
              disabled={
                !(selected.length && dataProcessSelector.dataProcessType)
              }
              loading={postDataset.loading}
            />
          </StyledDvtDataProcessIconButton>
        </>
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
    </>
  );
}

export default DvtDataProcess;
