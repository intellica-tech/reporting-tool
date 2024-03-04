import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '../hooks/useOnClickOutsite';
import { useAppSelector } from '../hooks/useAppSelector';
import { closeModal } from '../dvt-redux/dvt-modalReducer';
import DvtDashboardEdit from './body/dashboard-edit';
import DvtChartEdit from './body/chart-edit';
import DvtDeleteModal from './body/delete-modal';
import DvtConnectionAdd from './body/connection-add';
import DvtAlertAdd from './body/alert-add';
import DvtReportAdd from './body/report-add';
import {
  StyledModal,
  StyledModalCard,
  StyledModalCardBody,
  StyledModalCardClose,
} from './dvt-modal.module';
import DvtRowLevelSecurityAdd from './body/rowLevelSecurity-add';
import DvtQueryPreview from './body/query-preview';
import DvtSaveQuery from './body/save-query';
import DvtSaveDataset from './body/save-dataset';

export interface ModalProps {
  meta: any;
  onClose: () => void;
}

const getComponent = (cmpnt: string, meta: any, onClose: () => void) => {
  switch (cmpnt) {
    case 'edit-dashboard':
      return <DvtDashboardEdit meta={meta} onClose={onClose} />;
    case 'delete-modal':
      return <DvtDeleteModal meta={meta} onClose={onClose} />;
    case 'edit-chart':
      return <DvtChartEdit meta={meta} onClose={onClose} />;
    case 'connection-add-modal':
      return <DvtConnectionAdd meta={meta} onClose={onClose} />;
    case 'alert-add-modal':
      return <DvtAlertAdd meta={meta} onClose={onClose} />;
    case 'report-add-modal':
      return <DvtReportAdd meta={meta} onClose={onClose} />;
    case 'rowlevelsecurity-add-modal':
      return <DvtRowLevelSecurityAdd meta={meta} onClose={onClose} />;
    case 'query-preview':
      return <DvtQueryPreview meta={meta} onClose={onClose} />;
    case 'save-query':
      return <DvtSaveQuery meta={meta} onClose={onClose} />;
    case 'save-dataset':
      return <DvtSaveDataset meta={meta} onClose={onClose} />;
    default:
      return <></>;
  }
};

const DvtModal = () => {
  const dispatch = useDispatch();
  const component = useAppSelector(state => state.dvtModal.component);
  const meta = useAppSelector(state => state.dvtModal.meta);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleCloseModal = () => dispatch(closeModal());
  useOnClickOutside(ref, () => handleCloseModal());

  const size = (() => {
    switch (component) {
      case 'alert-add-modal':
        return 'medium';
      case 'report-add-modal':
        return 'medium';
      case 'delete-modal':
        return 'xsmall';
      case 'connection-add-modal':
        return 'large';
      case 'edit-connection':
        return 'large';
      case 'rowlevelsecurity-add-modal':
        return 'large';
      case 'save-query':
        return 'custom';
      case 'save-dataset':
        return 'custom';
      default:
        return 'small';
    }
  })();

  return component ? (
    <StyledModal>
      <StyledModalCard size={size} ref={ref}>
        <StyledModalCardClose onClick={() => handleCloseModal()} />

        <StyledModalCardBody>
          {getComponent(component, meta, handleCloseModal)}
        </StyledModalCardBody>
      </StyledModalCard>
    </StyledModal>
  ) : (
    <></>
  );
};

export default DvtModal;
