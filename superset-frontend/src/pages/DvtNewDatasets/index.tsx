/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { dvtSidebarSetDataProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import {
  StyledDatasetsIconLabel,
  StyledDvtNewDatasets,
  StyledNewDatasetsButtons,
} from './dvt-new-datasets.module';

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

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl.url });

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

  return (
    <StyledDvtNewDatasets>
      <StyledDatasetsIconLabel>
        <DvtIconDataLabel
          label={t('Select dataset source')}
          description={t(
            'You can create a new chart or use existing ones from the panel on the right.',
          )}
          icon="square"
        />
      </StyledDatasetsIconLabel>
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
