/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { dvtSidebarSetDataProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import useFetch from 'src/hooks/useFetch';
import DvtTable from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDatasetsIconLabel,
  StyledDvtNewDatasets,
  StyledNewDatasetsButtons,
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
  const [getTableDataApiUrl, setGetTableDataApiUrl] = useState('');
  const [data, setData] = useState([]);

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });
  const getTableData = useFetch({
    url: getTableDataApiUrl,
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
        dispatch(
          dvtSidebarSetDataProperty({
            pageKey: 'datasetAdd',
            key: 'selectDatabase',
            value: getSchemaData.result,
          }),
        );
      }
    }
  }, [getSchemaData]);

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

  return (
    <StyledDvtNewDatasets>
      {data.length > 0 ? (
        <DvtTable header={header} data={data} />
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
          typeColour="basic"
          onClick={() => history.push('/tablemodelview/list/')}
        />
        <DvtButton
          label={t('Create Dataset and Create Chart')}
          size="small"
          colour="grayscale"
          typeColour="basic"
          onClick={() => {}}
        />
      </StyledNewDatasetsButtons>
    </StyledDvtNewDatasets>
  );
}

export default DvtNewDatasets;
