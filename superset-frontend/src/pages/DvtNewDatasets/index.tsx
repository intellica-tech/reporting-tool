/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import useFetch from 'src/hooks/useFetch';
import DvtTable from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDatasetsIconLabel,
  StyledDvtNewDatasets,
  StyledNewDatasetsButtons,
  StyledAlertInfo,
  StyledAlertInfoLink,
} from './dvt-new-datasets.module';

const header = [
  {
    id: 1,
    title: t('Column Name'),
    field: 'name',
  },
  { id: 2, title: t('Datatype'), field: 'type' },
];

function DvtNewDatasets() {
  const dispatch = useDispatch();
  const history = useHistory();
  const datasetAddSelector = useAppSelector(
    state => state.dvtSidebar.datasetAdd,
  );

  const [getSchemaDataApiUrl, setGetSchemaDataApiUrl] = useState({
    url: '',
    key: '',
  });
  const [getSchemaDataApiAlreadyUrl, setGetSchemaDataApiAlreadyUrl] =
    useState('');
  const [getTableDataApiUrl, setGetTableDataApiUrl] = useState('');
  const [postDataSetUrl, setPostDataSetUrl] = useState('');
  const [data, setData] = useState([]);
  const [dataSchema, setDataSchema] = useState<any[]>([]);

  const getSchemaAlreadyFiltersUrl = (page: number) =>
    `dataset/?q=(filters:!((col:database,opr:rel_o_m,value:${datasetAddSelector.database.value}),(col:schema,opr:eq,value:${datasetAddSelector.schema.value}),(col:sql,opr:dataset_is_null_or_empty,value:!t)),page:${page})`;

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getSchemaDataAlready = useFetch({ url: getSchemaDataApiAlreadyUrl });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
  });
  const postDataset = useFetch({
    url: postDataSetUrl,
    method: 'POST',
    body: {
      database: datasetAddSelector.database?.value,
      schema: datasetAddSelector.schema?.value,
      table_name: datasetAddSelector.selectDatabase?.value,
    },
  });

  useEffect(() => {
    if (datasetAddSelector.database?.value) {
      setGetSchemaDataApiUrl({
        url: `database/${datasetAddSelector.database.value}/schemas/?q=(force:!f)`,
        key: 'database',
      });
    }
  }, [datasetAddSelector.database]);

  useEffect(() => {
    if (datasetAddSelector.schema?.value) {
      setGetSchemaDataApiUrl({
        url: `database/1/tables/?q=(force:!f,schema_name:${datasetAddSelector.schema.value})`,
        key: 'schema',
      });
    }
  }, [datasetAddSelector.schema]);

  useEffect(() => {
    if (getSchemaData) {
      if (getSchemaDataApiUrl.key === 'database') {
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'datasetAdd',
            key: 'schema',
            value: getSchemaData.result.map((s: string) => ({
              value: s,
              label: s,
            })),
          }),
        );
      }
      if (getSchemaDataApiUrl.key === 'schema') {
        setDataSchema(getSchemaData.result);
        setGetSchemaDataApiAlreadyUrl(getSchemaAlreadyFiltersUrl(0));
      }
    }
  }, [getSchemaData]);

  useEffect(() => {
    if (getSchemaDataAlready) {
      // if (getSchemaDataAlready.count > 20) {
      //   setGetSchemaDataApiAlreadyUrl(getSchemaAlreadyFiltersUrl(1));
      // }

      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'datasetAdd',
          key: 'selectDatabase',
          value: dataSchema.map((item: any) => {
            const findItem = getSchemaDataAlready.result.find(
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
  }, [getSchemaDataAlready]);

  useEffect(() => {
    if (datasetAddSelector.selectDatabase?.value) {
      setGetTableDataApiUrl(
        `database/1/table/${datasetAddSelector.selectDatabase.value}/${datasetAddSelector.schema.value}/`,
      );
    }
  }, [datasetAddSelector.selectDatabase]);

  useEffect(() => {
    if (getTableData) {
      setData(getTableData.columns);
    }
  }, [getTableData]);

  const handleCreateDataset = () => {
    setPostDataSetUrl('');
    setTimeout(() => {
      setPostDataSetUrl('dataset/');
    }, 200);
  };

  useEffect(() => {
    if (postDataset?.id) {
      dispatch(
        dvtSidebarSetProperty({
          pageKey: 'chartAdd',
          key: 'dataset',
          value: {
            id: postDataset.id,
            value: postDataset.result.table_name,
            label: postDataset.result.table_name,
          },
        }),
      );
      history.push('/chart/add');
    }
  }, [postDataset]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('datasetAdd'));
      setData([]);
      setDataSchema([]);
    },
    [],
  );

  return (
    <StyledDvtNewDatasets>
      {data.length > 0 ? (
        <>
          {datasetAddSelector.selectDatabase?.explore_url && (
            <StyledAlertInfo
              closable={false}
              type="warning"
              showIcon
              message={t('This table already has a dataset')}
              description={
                <>
                  {t(
                    'This table already has a dataset associated with it. You can only associate one dataset with a table.',
                  )}
                  <StyledAlertInfoLink
                    role="button"
                    onClick={() =>
                      history.push(
                        datasetAddSelector.selectDatabase.explore_url,
                      )
                    }
                    tabIndex={0}
                  >
                    {t('View Dataset')}
                  </StyledAlertInfoLink>
                </>
              }
            />
          )}
          <DvtTable header={header} data={data} />
        </>
      ) : (
        <StyledDatasetsIconLabel>
          <DvtIconDataLabel
            label={t('Select dataset source')}
            description={t(
              'You can create a new chart or use existing ones from the panel on the right.',
            )}
            icon="square"
          />
        </StyledDatasetsIconLabel>
      )}
      <StyledNewDatasetsButtons>
        <DvtButton
          label={t('Cancel')}
          size="small"
          colour="primary"
          onClick={() => history.push('/tablemodelview/list/')}
        />
        <DvtButton
          label={t('Create Dataset and Create Chart')}
          size="small"
          colour="grayscale"
          typeColour={
            datasetAddSelector.selectDatabase?.value &&
            !datasetAddSelector.selectDatabase?.explore_url
              ? 'basic'
              : 'powder'
          }
          onClick={() =>
            datasetAddSelector.selectDatabase?.value &&
            !datasetAddSelector.selectDatabase?.explore_url &&
            handleCreateDataset()
          }
        />
      </StyledNewDatasetsButtons>
    </StyledDvtNewDatasets>
  );
}

export default DvtNewDatasets;
