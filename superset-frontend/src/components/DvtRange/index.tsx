import React, { useRef, useState, ChangeEvent, useEffect } from 'react';
import {
  StyledRangeInput,
  StyledPopper,
  StyledPopperBody,
  StyledPopperGroup,
  StyledPopperAbsolute,
} from './dvt-range.module';

export interface DvtRangeProps {
  min: number;
  max: number;
  step: number;
  value: number | undefined;
  setValue: (newValue: number) => void;
}

const DvtRange: React.FC<DvtRangeProps> = ({
  min,
  max,
  value,
  setValue,
  step,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const absoluteRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const left =
    ((Math.max(min, Math.min(value || min, max)) - min) / (max - min)) * 100;

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
  );
};

export default DvtRange;
