import React, { useState } from 'react';
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
  const [droppedData, setDroppedData] = useState<any | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const droppedData = JSON.parse(droppedDataString);

    if (droppedData) {
      setDroppedData(droppedData);
    }

    onDrop?.(droppedData);
  };

  const handleIconClick = () => {
    setDroppedData(null);
  };

  return (
    <StyledInputDrop>
      <StyledInputDropField
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        placeholder={placeholder}
        type="text"
        readOnly
        value={droppedData?.name}
      />
      <StyledInputDropIcon onClick={addIconClick}>
        <Icon fileName="dvt-add_square" iconSize="xl" />
      </StyledInputDropIcon>
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
