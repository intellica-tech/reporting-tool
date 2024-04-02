import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import useOnClickOutside from '../dvt-hooks/useOnClickOutsite';
import { useAppSelector } from '../dvt-hooks/useAppSelector';
import { closeModal } from '../dvt-redux/dvt-modalReducer';
import DvtDashboardEdit from './body/dashboard-edit';
import DvtChartEdit from './body/chart-edit';
import DvtDeleteModal from './body/delete-modal';
import DvtConnectionAdd from './body/connection-add';
import DvtAlertAdd from './body/alert-add';
import DvtReportAdd from './body/report-add';
import DvtRowLevelSecurityAdd from './body/rowLevelSecurity-add';
import DvtQueryPreview from './body/query-preview';
import DvtSaveQuery from './body/save-query';
import DvtSaveDataset from './body/save-dataset';
import DvtTimeRange from './body/time-range';
import DvtDashoardFilterModal from './body/dashboard-filter';
import DvtDatasetEdit from './body/dataset-edit';
import {
  StyledModal,
  StyledModalCard,
  StyledModalCardBody,
} from './dvt-modal.module';
import DvtSaveChartModal from './body/save-chart';
import DvtViewAllCharts from './body/view-all-charts';

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
    case 'dataset-edit-modal':
      return <DvtDatasetEdit meta={meta} onClose={onClose} />;
    case 'time-range':
      return <DvtTimeRange meta={meta} onClose={onClose} />;
    case 'dashboard-filter':
      return <DvtDashoardFilterModal meta={meta} onClose={onClose} />;
    case 'save-chart':
      return <DvtSaveChartModal meta={meta} onClose={onClose} />;
    case 'view-all-charts':
      return <DvtViewAllCharts meta={meta} onClose={onClose} />;
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
      case 'delete-modal':
        return 'xsmall';
      case 'alert-add-modal':
      case 'report-add-modal':
        return 'medium';
      case 'save-query':
      case 'save-dataset':
      case 'time-range':
      case 'save-chart':
        return 'custom';
      case 'connection-add-modal':
      case 'edit-connection':
      case 'rowlevelsecurity-add-modal':
        return 'large';
      case 'dashboard-filter':
      case 'view-all-charts':
        return 'xlarge';
      default:
        return 'small';
    }
  })();

  return component ? (
    <StyledModal>
      <StyledModalCard size={size} ref={ref}>
        {/* <StyledModalCardClose onClick={() => handleCloseModal()} /> */}

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
