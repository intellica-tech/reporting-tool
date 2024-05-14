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
import { StyledDvtDataProcessIconLabel } from './dvt-data-process.module';

interface SelectedColumnsProps {
  url: string;
  selected: string;
}

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
  const [dataInSelected, setDataInSelected] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsProps>({
    url: '',
    selected: '',
  });

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
  });
  const postOutlierAnalysis = useFetch({
    url: selectedColumns.url,
    method: 'POST',
    body: {
      selected_columns: selectedColumns.selected,
      table_name: selectedColumns.selected,
    },
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
          value: getTableData.data.columns
            .slice(0, 1)
            .map((t: { name: string }) => t.name),
        }),
      );
    }
  }, [getTableData.data]);

  useEffect(() => {
    if (data.length) {
      setDataInSelected(dataProcessSelector.kolon);
      const onlyPostSelected = dataProcessSelector.kolon.filter(
        (v: string) => !dataInSelected.includes(v),
      );
      setSelectedColumns({
        url: 'data/outlier-analysis',
        selected: onlyPostSelected[0],
      });
    }
  }, [data, dataProcessSelector.kolon]);

  useEffect(() => {
    if (!getTableData.loading) {
      setGetTableDataApiUrl('');
    }
  }, [getTableData.loading]);

  useEffect(() => {
    if (!postOutlierAnalysis.loading) {
      setSelectedColumns({
        url: '',
        selected: '',
      });
    }
  }, [postOutlierAnalysis.loading]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('dataProcess'));
    },
    [],
  );

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
    <>
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
    </>
  );
}

export default DvtDataProcess;
