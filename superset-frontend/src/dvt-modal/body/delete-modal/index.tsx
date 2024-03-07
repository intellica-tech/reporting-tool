/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { useDispatch } from 'react-redux';
import useFetch from 'src/hooks/useFetch';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledDeleteModal,
  StyledDeleteModalBody,
  StyledDeleteModalLabel,
  StyledDeleteModalButton,
} from './delete-modal.module';

const DvtDeleteModal = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [deleteUrlApi, setDeleteUrlApi] = useState('');
  const deleteApi = useFetch({ url: deleteUrlApi, method: 'DELETE' });
  const item = meta.item.length
    ? meta.item.map(({ id }: { id: number }) => id).join(',')
    : meta.item.id;

  const types = meta.type;

  const itemMessage = meta.item.length
    ? `Deleted ${meta.item.length} ${meta.title}${
        meta.item.length > 1 ? 's' : ''
      }`
    : 'OK';

  const deleteUrl = meta.item.length
    ? `${types}/?q=!(${item})`
    : `${types}/${item}`;

  useEffect(() => {
    if (deleteApi?.message === itemMessage) {
      dispatch(dvtHomeDeleteSuccessStatus(types));
      onClose();
    }
  }, [deleteApi]);

  return (
    <StyledDeleteModal>
      <DvtModalHeader title={t('Please confirm')} onClose={onClose} />
      <StyledDeleteModalBody>
        <StyledDeleteModalLabel>
          {t('Are you sure you want to delete ?')}
        </StyledDeleteModalLabel>
        <StyledDeleteModalButton>
          <DvtButton
            label={t('DELETE')}
            colour="error"
            onClick={() => setDeleteUrlApi(deleteUrl)}
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
