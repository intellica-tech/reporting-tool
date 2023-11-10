import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { StyledDvtTitlePlus, DvtTitlePlusTitle } from './dvt-title-plus.module';
import { SupersetTheme } from '@superset-ui/core';

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
      <PlusOutlined
        css={(theme: SupersetTheme) => ({
          color: theme.colors.dvt.text.label,
        })}
      />
    )}
  </StyledDvtTitlePlus>
);

export default DvtTitlePlus;
