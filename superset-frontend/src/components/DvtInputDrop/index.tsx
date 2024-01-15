import React, { useState } from 'react';
import Icon from '../Icons/Icon';
import {
  StyledInputDrop,
  StyledInputDropField,
  StyledInputDropIcon,
  StyledInputDropInputGroup,
  StyledInputDropLabel,
} from './dvt-input-drop.module';
import DvtPopper from '../DvtPopper';
import { SupersetTheme } from '@superset-ui/core';

export interface DvtInputDropProps {
  label?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  onDrop?: (data: any) => void;
  addIconClick: () => void;
}

const DvtInputDrop = ({
  label,
  popoverLabel,
  popoverDirection = 'top',
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

  return (
    <StyledInputDrop>
      <StyledInputDropLabel>
        {label}
        {popoverLabel && (
          <DvtPopper label={popoverLabel} direction={popoverDirection}>
            <Icon
              fileName="warning"
              css={(theme: SupersetTheme) => ({
                color: theme.colors.dvt.primary.base,
              })}
              iconSize="l"
            />
          </DvtPopper>
        )}
      </StyledInputDropLabel>
      <StyledInputDropInputGroup>
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
      </StyledInputDropInputGroup>
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
