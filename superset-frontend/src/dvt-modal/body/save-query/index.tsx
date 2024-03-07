import React, { useEffect, useState } from 'react';
import useFetch from 'src/hooks/useFetch';
import { t } from '@superset-ui/core';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtTextarea from 'src/components/DvtTextarea';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledSaveQuery,
  StyledSaveQueryBody,
  StyledSaveQueryButton,
} from './save-query.module';

const DvtSaveQuery = ({ meta, onClose }: ModalProps) => {
  const { addDangerToast } = useToasts();
  const [apiUrl, setApiUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [label, setLabel] = useState<string>('');

  const saveQuery = useFetch({
    url: apiUrl,
    method: 'POST',
    body: {
      db_id: meta.db_id,
      description,
      label,
      schema: meta.schema,
      sql: meta.query,
    },
  });

  useEffect(() => {
    if (saveQuery?.id) {
      onClose();
      addDangerToast(t('Saved Success'));
    }
  }, [saveQuery]);

  return (
    <StyledSaveQuery>
      <DvtModalHeader title={t('SAVE QUERY')} onClose={onClose} />
      <StyledSaveQueryBody>
        <DvtInput label={t('NAME')} onChange={setLabel} value={label} />
        <DvtTextarea
          label={t('DESCRIPTION')}
          value={description}
          onChange={setDescription}
          typeDesign="border"
        />
        <StyledSaveQueryButton>
          <DvtButton bold label={t('CANCEL')} onClick={onClose} />
          <DvtButton
            bold
            colour="grayscale"
            label={t('SAVE')}
            onClick={() => {
              setApiUrl('saved_query/');
            }}
          />
        </StyledSaveQueryButton>
      </StyledSaveQueryBody>
    </StyledSaveQuery>
  );
};

export default DvtSaveQuery;
