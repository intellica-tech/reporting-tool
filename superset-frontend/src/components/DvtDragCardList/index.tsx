import React from 'react';
import DvtDargCard from '../DvtDragCard';
import {
  StyledDvtDragCardList,
  StyledDvtDragCardListSize,
  StyledDvtDragCard,
} from './dvt-drag-card.module';

interface CardProps {
  label: string;
  value: any;
  icon: string;
}

export interface DvtDragCardListProps {
  data: CardProps[];
}

const DvtDargCardList = ({ data }: DvtDragCardListProps) => {
  return (
    <StyledDvtDragCardList>
      <StyledDvtDragCardListSize>
        Showing {data.length} of {data.length}
      </StyledDvtDragCardListSize>
      <StyledDvtDragCard>
        {data.map((item, index) => (
          <DvtDargCard
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}{' '}
      </StyledDvtDragCard>
    </StyledDvtDragCardList>
  );
};

export default DvtDargCardList;
