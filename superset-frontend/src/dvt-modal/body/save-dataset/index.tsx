/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from 'src/dvt-hooks/useFetch';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledSaveDataset,
  StyledSaveDatasetButton,
  StyledSaveDatasetBody,
} from './save-query.module';

const DvtSaveDataset = ({ meta, onClose }: ModalProps) => {
  const history = useHistory();
  const [apiUrl, setApiUrl] = useState<string>('');
  const [formUrl, setFormUrl] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const saveDataset = useFetch({
    url: apiUrl,
    method: 'POST',
    body: {
      database: meta.db_id,
      external_url: null,
      is_managed_externally: false,
      table_name: label,
      schema: meta.schema,
      sql: meta.query,
    },
  });

  const formData = useFetch({
    url: formUrl,
    method: 'POST',
    body: {
      datasource_id: saveDataset.data?.id,
      datasource_type: saveDataset.data?.data.type,
      form_data: JSON.stringify({
        metrics: [],
        groupby: [],
        time_range: 'No filter',
        row_limit: 1000,
        datasource: saveDataset.data?.data.uid,
        all_columns: saveDataset.data?.data.columns.map(
          (item: { column_name: string }) => item.column_name,
        ),
      }),
    },
  });

  useEffect(() => {
    if (saveDataset.data?.id) {
      setFormUrl('explore/form_data');
    }
  }, [saveDataset.data]);

  useEffect(() => {
    if (formData.data?.key) {
      history.push(`explore/?form_data_key=${formData.data.key}`);
    }
  }, [formData.data]);

  return (
    <StyledSaveDataset>
      <DvtModalHeader
        title={t('Save or Overwrite Dataset')}
        onClose={onClose}
      />
      <StyledSaveDatasetBody>
        <DvtInput label={t('NAME')} onChange={setLabel} value={label} />
        <StyledSaveDatasetButton>
          <DvtButton bold label={t('CANCEL')} onClick={onClose} />
          <DvtButton
            bold
            colour="grayscale"
            label={t('OVERWRITE & EXPLORE')}
            onClick={() => {
              setApiUrl('dataset/');
            }}
          />
        </StyledSaveDatasetButton>
      </StyledSaveDatasetBody>
    </StyledSaveDataset>
  );
};

export default DvtSaveDataset;
