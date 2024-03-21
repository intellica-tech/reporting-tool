import React from 'react';
import { t } from '@superset-ui/core';
import {
  StyledDvtCardDetailChart,
  StyledDvtCardDetailChartTitle,
  StyledDvtCardDetails,
  StyledDvtCardLink,
  StyledDvtCardP,
  StyledDvtCardDetailAdded,
} from './dvt-card-detail-chart.module';

export interface DvtCardDetailChartProps {
  slice_name: string;
  viz_type: string;
  datasource_name_text: string;
  datasource_url: string;
  changed_on_delta_humanized: string;
  added: boolean;
}

const DvtCardDetailChart: React.FC<DvtCardDetailChartProps> = ({
  slice_name,
  viz_type,
  datasource_name_text,
  datasource_url = '',
  changed_on_delta_humanized,
  added = false,
}) => (
  <StyledDvtCardDetailChart added={added}>
    <StyledDvtCardDetailChartTitle>
      {slice_name}
      {added && (
        <StyledDvtCardDetailAdded>{t('ADDED')}</StyledDvtCardDetailAdded>
      )}
    </StyledDvtCardDetailChartTitle>
    <StyledDvtCardDetails>
      <StyledDvtCardP>{t('Viz type')}</StyledDvtCardP>
      <StyledDvtCardP>{viz_type}</StyledDvtCardP>
    </StyledDvtCardDetails>
    <StyledDvtCardDetails>
      <StyledDvtCardP>{t('Dataset')}</StyledDvtCardP>
      <StyledDvtCardLink to={datasource_url}>
        {datasource_name_text}
      </StyledDvtCardLink>
    </StyledDvtCardDetails>
    <StyledDvtCardDetails>
      <StyledDvtCardP>{t('Modified')}</StyledDvtCardP>
      <StyledDvtCardP>{changed_on_delta_humanized}</StyledDvtCardP>
    </StyledDvtCardDetails>
  </StyledDvtCardDetailChart>
);

export default DvtCardDetailChart;
