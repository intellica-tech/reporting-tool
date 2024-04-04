import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import { SupersetTheme } from '@superset-ui/core';
import DvtPopper from '../DvtPopper';
import Icon from '../Icons/Icon';
import {
  StyledRangeInput,
  StyledPopper,
  StyledPopperBody,
  StyledPopperGroup,
  StyledPopperAbsolute,
  StyledRangePopover,
  StyledRangeLabel,
  StyledRange,
} from './dvt-range.module';

export interface DvtRangeProps {
  min: number;
  max: number;
  step: number;
  value: number | undefined;
  setValue: (newValue: number) => void;
  label?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  important?: boolean;
  importantLabel?: string;
}

const DvtRange: React.FC<DvtRangeProps> = ({
  min,
  max,
  value,
  setValue,
  step,
  label,
  popoverDirection,
  popoverLabel,
  important,
  importantLabel = 'Cannot be empty',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const absoluteRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const normalizedValue =
    ((Math.max(min, Math.min(value || min, max)) - min) / (max - min)) * 100;
  let left;

  if (normalizedValue <= 50) {
    left = normalizedValue + 1.5 - normalizedValue / 100;
  } else {
    left = normalizedValue - normalizedValue / 100;
  }

  useEffect(() => {
    const wheelHandler = () => {
      setIsHovered(false);
    };

    if (isHovered) {
      window.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (isHovered) {
        window.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [isHovered]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
  };

  return (
    <StyledRange>
      <StyledRangePopover>
        {label && <StyledRangeLabel>{label}</StyledRangeLabel>}
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
      </StyledRangePopover>
      <StyledPopperGroup
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <StyledPopper ref={ref}>
          <StyledRangeInput
            type="range"
            max={max}
            min={min}
            step={step}
            value={value || min}
            onChange={handleChange}
          />
        </StyledPopper>
        {isHovered && (
          <StyledPopperAbsolute ref={absoluteRef} left={left}>
            <StyledPopperBody>{value || min}</StyledPopperBody>
          </StyledPopperAbsolute>
        )}
      </StyledPopperGroup>
    </StyledRange>
  );
};

export default DvtRange;
