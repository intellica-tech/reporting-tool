import { PlusOutlined } from '@ant-design/icons';
import { StyledDvtTitlePlus, DvtTitlePlusTitle } from './dvt-title-plus.module';
import React from 'react';

export interface DvtTitlePlusProps {
  title: string;
  plusIcon: boolean;
}

const DvtTitlePlus: React.FC<DvtTitlePlusProps> = ({
  title = '',
  plusIcon = false,
}) => (
  <StyledDvtTitlePlus>
    <DvtTitlePlusTitle>{title}</DvtTitlePlusTitle>
    {plusIcon && <PlusOutlined />}
  </StyledDvtTitlePlus>
);

export default DvtTitlePlus;
