import React, { useEffect, useState } from 'react';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { useDispatch } from 'react-redux';
import useFetch from 'src/hooks/useFetch';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import {
  StyledDeleteModal,
  StyledDeleteModalHeader,
  StyledDeleteModalBody,
  StyledDeleteModalLabel,
  StyledDeleteModalButton,
} from './delete-modal.module';

const DvtDeleteModal = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [deleteUrlApi, setDeleteUrlApi] = useState('');
  const deleteApi = useFetch({ url: deleteUrlApi, method: 'DELETE' });
  const item = meta.item.id;
  const types = meta.type;

  useEffect(() => {
    if (deleteApi?.message === 'OK') {
      dispatch(dvtHomeDeleteSuccessStatus(types));
      onClose();
    }
  }, [deleteApi]);

  return (
    <StyledDeleteModal>
      <StyledDeleteModalHeader>{t('Please confirm')}</StyledDeleteModalHeader>
      <StyledDeleteModalBody>
        <StyledDeleteModalLabel>
          {t('Are you sure you want to delete ?')}
        </StyledDeleteModalLabel>
        <StyledDeleteModalButton>
          <DvtButton
            label={t('DELETE')}
            colour="error"
            onClick={() => setDeleteUrlApi(`${types}/${item}`)}
            size="small"
            bold
          />
          <DvtButton
            bold
            colour="grayscale"
            label={t('CANCEL')}
            onClick={onClose}
            size="small"
          />
        </StyledDeleteModalButton>
      </StyledDeleteModalBody>
    </StyledDeleteModal>
  );
};

export default DvtDeleteModal;
