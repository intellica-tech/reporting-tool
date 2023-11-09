import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { StyledDvtTitlePlus, DvtTitlePlusTitle } from './dvt-title-plus.module';

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
    {plus && <PlusOutlined />}
  </StyledDvtTitlePlus>
);

export default DvtTitlePlus;
