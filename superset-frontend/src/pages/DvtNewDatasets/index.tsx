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

  const [getSchemaDataApiUrl, setGetSchemaDataApiUrl] = useState('');

  const getSchemaData = useFetch({ url: getSchemaDataApiUrl });

  useEffect(() => {
    if (datasetAddSelector.database?.value) {
      setGetSchemaDataApiUrl(
        `database/${datasetAddSelector.database.value}/schemas/?q=(force:!f)`,
      );
    }
  }, [datasetAddSelector.database]);

  useEffect(() => {
    if (getSchemaData) {
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
