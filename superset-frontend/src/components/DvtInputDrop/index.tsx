import React from 'react';
import Icon from '../Icons/Icon';
import {
  StyledInputDrop,
  StyledInputDropField,
  StyledInputDropIcon,
} from './dvt-input-drop.module';

export interface DvtInputDropProps {
  placeholder?: string;
  onDrop?: (data: any) => void;
  addIconClick: () => void;
}

const DvtInputDrop = ({
  placeholder,
  onDrop,
  addIconClick,
}: DvtInputDropProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <StyledInputDrop>
      <StyledInputDropField
        onDragOver={handleDragOver}
        onDrop={e => {
          const droppedDataString = e.dataTransfer.getData('text/plain');
          const droppedData = JSON.parse(droppedDataString);
          onDrop?.(droppedData);
        }}
        placeholder={placeholder}
        type="text"
        readOnly
      ></StyledInputDropField>
      <StyledInputDropIcon onClick={addIconClick}>
        <Icon fileName="dvt-add_square" iconSize="xl" />
      </StyledInputDropIcon>
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
