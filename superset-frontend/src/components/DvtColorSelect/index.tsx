import React from 'react';
import {
  StyledColorSelect,
  StyledColorSelectInput,
} from './dvt-color-select.module';

export interface DvtColorSelectProps {
  value: { r: number; g: number; b: number; a: number };
  setValue: (newValue: { r: number; g: number; b: number; a: number }) => void;
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

const DvtColorSelect: React.FC<DvtColorSelectProps> = ({ value, setValue }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    const rgbaColor = hexToRgba(hexColor);
    setValue(rgbaColor);
  };

  const hexToRgba = (hex: string) => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const a = 1;
    return { r, g, b, a };
  };

  const hexValue = rgbaToHex(value);
  return (
    <StyledColorSelect>
      <StyledColorSelectInput
        type="color"
        value={hexValue}
        onChange={handleInputChange}
      />
    </StyledColorSelect>
  );
};

export default DvtColorSelect;
