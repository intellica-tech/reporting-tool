import React from 'react';
import { StyledDvtLogo } from './dvt-logo.module';

export interface DvtCardProps {
  title: string;
}

const DvtLogo: React.FC<DvtCardProps> = ({ title }) => (
  <StyledDvtLogo>{title}</StyledDvtLogo>
);

export default DvtLogo;
