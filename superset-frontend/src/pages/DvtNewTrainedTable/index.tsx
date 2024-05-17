/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetProperty,
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
  const { addDangerToast } = useToasts();
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
      newTainedTableAddSelector.algorithm?.value === 'lstm'
        ? {
            source_table_name: newTainedTableAddSelector.selectDatabase?.value,
            target_column_name:
              newTainedTableAddSelector.targetColumnName?.value,
            time_column_name: newTainedTableAddSelector.timeColumnName?.value,
          }
        : newTainedTableAddSelector.algorithm?.value === 'lstm_forecast'
        ? {
            source_table_name: newTainedTableAddSelector.selectDatabase?.value,
            target_column_name:
              newTainedTableAddSelector.targetColumnName?.value,
            time_column_name: newTainedTableAddSelector.timeColumnName?.value,
            predictionNumber: newTainedTableAddSelector.predictionNumber
              ? newTainedTableAddSelector.predictionNumber
              : undefined,
          }
        : newTainedTableAddSelector.category?.value === 'statistical'
        ? {
            algorithm_name: newTainedTableAddSelector.algorithm?.value,
            table_name: newTainedTableAddSelector.selectDatabase?.value,
            extra_data: {
              percentile: newTainedTableAddSelector.percentile
                ? parseFloat(newTainedTableAddSelector.percentile)
                : undefined,
              feature_column: newTainedTableAddSelector.featureColumn?.value
                ? newTainedTableAddSelector.featureColumn?.value
                : undefined,
              group_column: newTainedTableAddSelector.groupColumn?.value
                ? newTainedTableAddSelector.groupColumn?.value
                : undefined,
              label_column: newTainedTableAddSelector.labelColumn?.value
                ? newTainedTableAddSelector.labelColumn?.value
                : undefined,
              training_data_ratio: newTainedTableAddSelector.training_data_ratio
                ? newTainedTableAddSelector.training_data_ratio
                : undefined,
            },
          }
        : {
            algorithm_name: newTainedTableAddSelector.algorithm?.value,
            table_name: newTainedTableAddSelector.selectDatabase?.value,
          },
  });

  const postSegmentationDataset = useFetch({
    url: postSegmentationDataSetUrl,
    method: 'POST',
    body: {
      algorithmName: newTainedTableAddSelector.algorithm?.label,
      modelInput: {
        tableName: newTainedTableAddSelector.selectDatabase?.value,
        ...(newTainedTableAddSelector.algorithm?.label === 'DBSCAN'
          ? {
              epsilon: newTainedTableAddSelector.epsilon,
              minPoints: newTainedTableAddSelector.minPoints,
            }
          : { clusterSize: newTainedTableAddSelector.clusterSize }),
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

  const keys = [
    { key: 'targetColumnName' },
    { key: 'timeColumnName' },
    { key: 'featureColumn' },
    { key: 'groupColumn' },
    { key: 'labelColumn' },
    { key: 'training_data_ratio' },
  ];

  useEffect(() => {
    dispatch(
      dvtSidebarSetProperty({
        pageKey: 'newTrainedTable',
        key: 'algorithm',
        value: '',
      }),
    );
  }, [newTainedTableAddSelector.category]);

  useEffect(() => {
    if (newTainedTableAddSelector.schema) {
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
  }, [getSchemaDataAlready.data, newTainedTableAddSelector.schema]);

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
      keys.forEach(({ key }) => {
        if (newTainedTableAddSelector.selectDatabase) {
          dispatch(
            dvtSidebarSetDataProperty({
              pageKey: 'newTrainedTable',
              key,
              value: getTableData.data.columns.map((item: any) => ({
                value: item.name,
                label: item.name,
              })),
            }),
          );
        }
      });
    }
  }, [getTableData.data]);

  useEffect(() => {
    setData([]);
  }, [newTainedTableAddSelector.schema]);

  useEffect(() => {
    if (getTableData.data) {
      keys.forEach(({ key }) => {
        if (newTainedTableAddSelector.selectDatabase) {
          dispatch(
            dvtSidebarSetProperty({
              pageKey: 'newTrainedTable',
              key,
              value: '',
            }),
          );
        }
      });
    }
  }, [getTableData.data, newTainedTableAddSelector.algorithm]);

  const handleCreateDataset = () => {
    if (newTainedTableAddSelector.category.label === 'Segmentation') {
      setPostSegmentationDataSetUrl('algorithms/run-ml-algorithm');
    } else if (newTainedTableAddSelector.algorithm?.value === 'lstm') {
      setPostDataSetUrl('lstm');
    } else if (newTainedTableAddSelector.algorithm?.value === 'lstm_forecast') {
      setPostDataSetUrl('lstm_forecast');
    } else {
      setPostDataSetUrl('ml_and_insert/');
    }
  };

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('newTrainedTable'));
    },
    [],
  );

  useEffect(() => {
    if (newTainedTableAddSelector.category?.value === 'timeSeries') {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'newTrainedTable',
          key: 'algorithm',
          value: [
            { value: 'lstm', label: 'LSTM' },
            { value: 'lstm_forecast', label: 'LSTM Forecast' },
          ],
        }),
      );
    } else if (newTainedTableAddSelector.category?.value === 'statistical') {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'newTrainedTable',
          key: 'algorithm',
          value: [
            { value: 'cumulative_sum', label: 'Cumulative sum' },
            { value: 'mean', label: 'Mean' },
            { value: 'median', label: 'Median' },
            { value: 'min_max', label: 'Min Max' },
            { value: 'variance', label: 'Variance' },
            { value: 'percentile', label: 'Percentile' },
            { value: 'skewness', label: 'Skewness' },
            { value: 'kurtosis', label: 'Kurtosis' },
            { value: 'histogram', label: 'Histogram' },
            { value: 'correlation', label: 'Correlation' },
            { value: 't_test', label: 'T-test' },
            { value: 'z_test', label: 'Z-test' },
            { value: 'chi_square', label: 'Chi square' },
            { value: 'linear_regression', label: 'Linear regression' },
          ],
        }),
      );
    } else if (newTainedTableAddSelector.category?.value === 'segmentation') {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'newTrainedTable',
          key: 'algorithm',
          value: [
            { value: 'kmeans', label: 'KMeans' },
            { value: 'gmm', label: 'GMM' },
            { value: 'dbscan', label: 'DBSCAN' },
          ],
        }),
      );
    }
  }, [newTainedTableAddSelector.category]);

  useEffect(() => {
    if (postSegmentationDataset.data?.success) {
      addDangerToast(t('Process initiated, results loading...'));
      setData([]);
      dispatch(dvtSidebarSetPropertyClear('newTrainedTable'));
    }
  }, [postSegmentationDataset.data]);

  useEffect(() => {
    if (postDataset.data?.success) {
      addDangerToast(t('Process initiated, results loading...'));
      setData([]);
      dispatch(dvtSidebarSetPropertyClear('newTrainedTable'));
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'newTrainedTable',
          key: 'selectDatabase',
          value: '',
        }),
      );
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'newTrainedTable',
          key: 'schema',
          value: '',
        }),
      );
    }
  }, [postDataset.data]);

  useEffect(() => {
    if (!postDataset.loading) {
      setPostDataSetUrl('');
    }
  }, [postDataset.loading]);

  useEffect(() => {
    if (!postSegmentationDataset.loading) {
      setPostSegmentationDataSetUrl('');
    }
  }, [postSegmentationDataset.loading]);

  useEffect(() => {
    if (!getTableData.loading) {
      setGetTableDataApiUrl('');
    }
  }, [getTableData.loading]);

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
            newTainedTableAddSelector.algorithm?.value &&
            handleCreateDataset()
          }
          loading={postDataset.loading || postSegmentationDataset.loading}
        />
      </StyledNewTainedTableButtons>
    </StyledDvtNewTainedTable>
  );
}

export default DvtNewTainedTable;
