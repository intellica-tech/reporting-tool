import React from 'react';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { useDispatch } from 'react-redux';
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
  const item = meta.item.id;
  const types = meta.type;

  const handleDelete = async () => {
    const deleteType = types;
    try {
      const response = await fetch(`/api/v1/${types}/${item}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(dvtHomeDeleteSuccessStatus(deleteType));
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            onClick={handleDelete}
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
