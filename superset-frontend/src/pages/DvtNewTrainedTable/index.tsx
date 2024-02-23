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
  StyledDvtNewTainedTable,
  StyledNewTainedTableButtons,
  StyledNewTainedTableIconLabel,
  StyledAlertInfo,
  StyledAlertInfoLink,
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
    body: {
      algoritmh_name: newTainedTableAddSelector.algorithm_name?.value,
      table_name: newTainedTableAddSelector.schema?.value,
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
        url: `database/1/tables/?q=(force:!f,schema_name:${newTainedTableAddSelector.schema.value})`,
        key: 'schema',
      });
    }
  }, [newTainedTableAddSelector.schema]);

  useEffect(() => {
    if (getSchemaData) {
      if (getSchemaDataApiUrl.key === 'database') {
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'newTrainedTable',
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
          pageKey: 'newTrainedTable',
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
    if (newTainedTableAddSelector.selectDatabase?.value) {
      setGetTableDataApiUrl(
        `database/1/table/${newTainedTableAddSelector.selectDatabase.value}/${newTainedTableAddSelector.schema.value}/`,
      );
    }
  }, [newTainedTableAddSelector.selectDatabase]);

  useEffect(() => {
    if (getTableData) {
      setData(getTableData.columns);
    }
  }, [getTableData]);

  const handleCreateDataset = () => {
    setPostDataSetUrl('ml_and_insert');
    setTimeout(() => {
      setPostDataSetUrl('');
    }, 200);
  };

  useEffect(() => {
    if (postDataset) {
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
    <StyledDvtNewTainedTable>
      {data.length > 0 ? (
        <>
          {newTainedTableAddSelector.selectDatabase?.explore_url && (
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
                        newTainedTableAddSelector.selectDatabase.explore_url,
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
        <StyledNewTainedTableIconLabel>
          <DvtIconDataLabel
            label={t('Select table source')}
            description={t(
              'You can create a new trained table from existing table from the panel on the left.',
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
          label={t('Create New Trained Table')}
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
