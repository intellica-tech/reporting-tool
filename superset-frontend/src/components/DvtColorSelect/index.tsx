import React from 'react';
import { SupersetTheme } from '@superset-ui/core';
import DvtPopper from '../DvtPopper';
import Icon from '../Icons/Icon';
import {
  StyledColorSelect,
  StyledColorSelectInput,
  StyledColorSelectLabel,
  StyledColorSelectPopover,
} from './dvt-color-select.module';

export interface DvtColorSelectProps {
  value: { r: number; g: number; b: number; a: number };
  setValue: (newValue: { r: number; g: number; b: number; a: number }) => void;
  label?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  important?: boolean;
  importantLabel?: string;
}

function rgbaToHex(rgba: {
  r: number;
  g: number;
  b: number;
  a: number;
}): string {
  const { r, g, b } = rgba;
  const toHex = (x: number) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const DvtColorSelect: React.FC<DvtColorSelectProps> = ({
  value,
  setValue,
  label,
  popoverDirection = 'top',
  popoverLabel,
  important,
  importantLabel = 'Cannot be empty',
}) => {
  const hexToRgba = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const a = 1;
    return { r, g, b, a };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbaColor = hexToRgba(hexColor);
    setValue(rgbaColor);
  };

  const hexValue = rgbaToHex(value);

  return (
    <StyledColorSelect>
      <StyledColorSelectPopover>
        {label && <StyledColorSelectLabel>{label}</StyledColorSelectLabel>}
        {important && !value && (
          <DvtPopper
            size="small"
            label={importantLabel}
            direction={popoverDirection}
          >
            <Icon
              fileName="warning"
              css={(theme: SupersetTheme) => ({
                color: theme.colors.alert.base,
              })}
              iconSize="l"
            />
          </DvtPopper>
        )}
        {popoverLabel && (
          <DvtPopper
            size="small"
            label={popoverLabel}
            direction={popoverDirection}
          >
            <Icon
              fileName="warning"
              css={(theme: SupersetTheme) => ({
                color: theme.colors.dvt.primary.base,
              })}
              iconSize="l"
            />
          </DvtPopper>
        )}
      </StyledColorSelectPopover>
      <StyledColorSelectInput
        type="color"
        value={hexValue}
        onChange={handleInputChange}
      />
    </StyledColorSelect>
  );
};

export default DvtColorSelect;
