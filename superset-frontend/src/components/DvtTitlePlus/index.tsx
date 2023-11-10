import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { StyledDvtTitlePlus, DvtTitlePlusTitle } from './dvt-title-plus.module';
import { supersetTheme } from '@superset-ui/core';

export interface DvtTitlePlusProps {
  title: string;
  plus: boolean;
}

const DvtTitlePlus: React.FC<DvtTitlePlusProps> = ({
  title = '',
  plus = false,
}) => (
  <StyledDvtTitlePlus>
    <DvtTitlePlusTitle>{title}</DvtTitlePlusTitle>
    {plus && (
      <PlusOutlined style={{ color: supersetTheme.colors.dvt.text.label }} />
    )}
  </StyledDvtTitlePlus>
);

export default DvtTitlePlus;
