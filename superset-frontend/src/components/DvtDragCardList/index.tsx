import React from 'react';
import { t } from '@superset-ui/core';
import DvtDargCard from '../DvtDragCard';
import {
  StyledDvtDragCardList,
  StyledDvtDragCardListSize,
  StyledDvtDragCard,
} from './dvt-drag-card-list.module';

export interface DragCardDataProps {
  label: string;
  value: any;
  icon: 'question' | 'field_abc' | 'dvt-hashtag' | 'clock' | 'function_x';
}

export interface DvtDragCardListProps {
  data: DragCardDataProps[];
}

const DvtDargCardList = ({ data }: DvtDragCardListProps) => (
  <StyledDvtDragCardList>
    <StyledDvtDragCardListSize>
      {`${t('Showing')} ${data.length} ${t('of')} ${data.length}`}
    </StyledDvtDragCardListSize>
    <StyledDvtDragCard>
      {data.map((item, index) => (
        <DvtDargCard
          key={index}
          label={item.label}
          value={item.value}
          icon={item.icon}
        />
      ))}
    </StyledDvtDragCard>
  </StyledDvtDragCardList>
);

export default DvtDargCardList;
