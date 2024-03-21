/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtTable from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDvtNewTainedTable,
  StyledNewTainedTableButtons,
  StyledNewTainedTableIconLabel,
} from './dvt-new-trained-table.module';

const header = [
  {
    id: 1,
    title: t('Column Name'),
    field: 'name',
  },
  { id: 2, title: t('Datatype'), field: 'type' },
];

function DvtNewTainedTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const newTainedTableAddSelector = useAppSelector(
    state => state.dvtSidebar.newTrainedTable,
  );
  const [getSchemaDataApiUrl, setGetSchemaDataApiUrl] = useState({
    url: '',
    key: '',
  });
  const [getSchemaDataApiAlreadyUrl, setGetSchemaDataApiAlreadyUrl] =
    useState('');
  const [getTableDataApiUrl, setGetTableDataApiUrl] = useState('');
  const [postDataSetUrl, setPostDataSetUrl] = useState('');
  const [postSegmentationDataSetUrl, setPostSegmentationDataSetUrl] =
    useState('');
  const [data, setData] = useState([]);
  const [dataSchema, setDataSchema] = useState<any[]>([]);

  const getSchemaAlreadyFiltersUrl = (page: number) =>
    `dataset/?q=(filters:!((col:database,opr:rel_o_m,value:${newTainedTableAddSelector.database.value}),(col:schema,opr:eq,value:${newTainedTableAddSelector.schema.value}),(col:sql,opr:dataset_is_null_or_empty,value:!t)),page:${page})`;

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getSchemaDataAlready = useFetch({ url: getSchemaDataApiAlreadyUrl });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
  });
  const postDataset = useFetch({
    url: postDataSetUrl,
    method: 'POST',
    body:
      newTainedTableAddSelector.algorithm_name?.value === 'lstm'
        ? {
            source_table_name: newTainedTableAddSelector.selectDatabase?.value,
            target_column_name:
              newTainedTableAddSelector.targetColumnName?.value,
            time_column_name: newTainedTableAddSelector.timeColumnName?.value,
          }
        : {
            algorithm_name: newTainedTableAddSelector.algorithm_name?.value,
            table_name: newTainedTableAddSelector.selectDatabase?.value,
          },
  });

  const postSegmentationDataset = useFetch({
    url: postSegmentationDataSetUrl,
    method: 'POST',
    body: {
      algorithmName: newTainedTableAddSelector.algorithm_name?.label,
      modelInput: {
        tableName: newTainedTableAddSelector.selectDatabase?.value,
        ...(newTainedTableAddSelector.algorithm_name?.label === 'DBSCAN'
          ? { epsilon: 100, minPoints: 10 }
          : { clusterSize: 10 }),
      },
    },
  });

  useEffect(() => {
    if (newTainedTableAddSelector.database?.value) {
      setGetSchemaDataApiUrl({
        url: `database/${newTainedTableAddSelector.database.value}/schemas/?q=(force:!f)`,
        key: 'database',
      });
    }
  }, [newTainedTableAddSelector.database]);

  useEffect(() => {
    if (newTainedTableAddSelector.schema?.value) {
      setGetSchemaDataApiUrl({
        url: `database/${newTainedTableAddSelector.database?.value}/tables/?q=(force:!f,schema_name:${newTainedTableAddSelector.schema.value})`,
        key: 'schema',
      });
    }
  }, [newTainedTableAddSelector.schema]);

  useEffect(() => {
    if (getSchemaData.data) {
      if (getSchemaDataApiUrl.key === 'database') {
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'newTrainedTable',
            key: 'schema',
            value: getSchemaData.data.result.map((s: string) => ({
              value: s,
              label: s,
            })),
          }),
        );
      }
      if (getSchemaDataApiUrl.key === 'schema') {
        setDataSchema(getSchemaData.data.result);
        setGetSchemaDataApiAlreadyUrl(getSchemaAlreadyFiltersUrl(0));
      }
    }
  }, [getSchemaData.data]);

  useEffect(() => {
    if (getSchemaDataAlready.data) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'newTrainedTable',
          key: 'selectDatabase',
          value: dataSchema.map((item: any) => {
            const findItem = getSchemaDataAlready.data.result.find(
              (ar: { table_name: string }) => ar.table_name === item.value,
            );
            return {
              ...item,
              explore_url: findItem ? findItem.explore_url : '',
            };
          }),
        }),
      );
    }
  }, [getSchemaDataAlready.data]);

  useEffect(() => {
    if (newTainedTableAddSelector.selectDatabase?.value) {
      setGetTableDataApiUrl(
        `database/${newTainedTableAddSelector.database?.value}/table/${newTainedTableAddSelector.selectDatabase.value}/${newTainedTableAddSelector.schema.value}/`,
      );
    }
  }, [newTainedTableAddSelector.selectDatabase]);

  useEffect(() => {
    if (getTableData.data) {
      setData(getTableData.data.columns);
    }
  }, [getTableData.data]);

  const handleCreateDataset = () => {
    if (newTainedTableAddSelector.selectCategory.label === 'Segmentation') {
      setPostSegmentationDataSetUrl('algorithms/run-ml-algorithm');
      setTimeout(() => {
        setPostSegmentationDataSetUrl('');
      }, 200);
    } else if (newTainedTableAddSelector.algorithm_name?.value === 'lstm') {
      setPostDataSetUrl('lstm');
      setTimeout(() => {
        setPostDataSetUrl('');
      }, 200);
    } else {
      setPostDataSetUrl('ml_and_insert/');
      setTimeout(() => {
        setPostDataSetUrl('');
      }, 200);
    }
  };

  useEffect(() => {
    if (postDataset.data || postSegmentationDataset.data) {
      history.push('/traindata');
    }
  }, [postDataset.data, postSegmentationDataset.data]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('datasetAdd'));
      setData([]);
      setDataSchema([]);
    },
    [],
  );

  return (
    <StyledDvtNewTainedTable>
      {data.length > 0 ? (
        <DvtTable header={header} data={data} />
      ) : (
        <StyledNewTainedTableIconLabel>
          <DvtIconDataLabel
            label={t('Select table source')}
            description={t(
              'You can create an output table from existing table from the panel on the left.',
            )}
            icon="square"
          />
        </StyledNewTainedTableIconLabel>
      )}
      <StyledNewTainedTableButtons>
        <DvtButton
          label={t('Cancel')}
          size="small"
          colour="primary"
          onClick={() => history.push('/tablemodelview/list/')}
        />
        <DvtButton
          label={t('Create Output Table')}
          size="small"
          colour="grayscale"
          typeColour={
            newTainedTableAddSelector.selectDatabase?.value &&
            !newTainedTableAddSelector.selectDatabase?.explore_url
              ? 'basic'
              : 'basic'
          }
          onClick={() =>
            newTainedTableAddSelector.selectDatabase?.value &&
            newTainedTableAddSelector.algorithm_name?.value &&
            handleCreateDataset()
          }
        />
      </StyledNewTainedTableButtons>
    </StyledDvtNewTainedTable>
  );
}

export default DvtNewTainedTable;
