/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { SupersetTheme } from '@superset-ui/core';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import Icon from '../Icons/Icon';
import DvtPopper from '../DvtPopper';
import {
  StyledInputDrop,
  StyledInputDropField,
  StyledInputDropFieldColumn,
  StyledInputDropFieldIcon,
  StyledInputDropIcon,
  StyledInputDropInputGroup,
  StyledInputDropLabel,
  StyledInputDropMenu,
  StyledError,
} from './dvt-input-drop.module';
import DvtOpenSelectMenu from '../DvtOpenSelectMenu';

export interface DvtInputDropProps {
  label?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  onDrop?: (data: any) => void;
  multiple?: boolean;
  droppedData: any[] | null;
  setDroppedData: (newDroppedData: any[] | any) => void;
  error?: string;
  type:
    | 'x-axis'
    | 'temporal_x-axis'
    | 'breakdowns'
    | 'metric'
    | 'metrics'
    | 'filters'
    | 'dimensions'
    | 'sort_by'
    | 'percentage_metrics'
    | 'soruce_target';
}

const DvtInputDrop = ({
  label,
  popoverLabel,
  popoverDirection = 'top',
  placeholder,
  onDrop,
  multiple,
  droppedData,
  setDroppedData,
  error,
  type = 'x-axis',
}: DvtInputDropProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [windowHeightTop, setWindowHeightTop] = useState(0);
  const [menuRight, setMenuRight] = useState(0);
  const [menuTopCalc, setMenuTopCalc] = useState('null');
  const [menuTopCalcArrow, setMenuTopCalcArrow] = useState('null');

  const [values, setValues] = useState({
    saved: '',
    column: '',
    operator: '',
    aggregate: '',
    option: '',
    sql: '',
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const droppedData = JSON.parse(droppedDataString);

    if (droppedData) {
      setDroppedData((prevData: any | any[]) => {
        const newData = multiple
          ? Array.isArray(prevData)
            ? [...prevData, droppedData]
            : [droppedData]
          : [droppedData];
        return newData;
      });

      onDrop?.([droppedData]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setDroppedData((prevData: any[]) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const openMenuHeight = type === 'filters' ? 328 : 315;
  const inputHeight = 47;
  const borderHeight = 16;
  const topMaxHeight = (window.innerHeight - openMenuHeight) / 2;
  const bottomMaxHeight =
    window.innerHeight - (window.innerHeight - openMenuHeight) / 2;

  const handleAddClickPositionTop = () => {
    if (windowHeightTop < topMaxHeight) {
      setMenuTopCalc(`calc(-${openMenuHeight}px + ${inputHeight}px)`);
      setMenuTopCalcArrow(`${inputHeight / 2 - borderHeight / 2}px`);
    } else if (windowHeightTop > bottomMaxHeight) {
      setMenuTopCalc('0px');
      setMenuTopCalcArrow(
        `${openMenuHeight - (inputHeight / 2 + borderHeight / 2)}px`,
      );
    } else {
      setMenuTopCalc(`calc(-${openMenuHeight}px / 2 + ${inputHeight}px / 2)`);
      setMenuTopCalcArrow(`${openMenuHeight / 2 - borderHeight / 2}px`);
    }
  };

  useEffect(() => {
    if (ref.current) {
      setMenuRight(ref.current.clientWidth);
    }
  }, [ref.current]);

  useEffect(() => {
    if (menuTopCalc !== 'null') {
      setIsOpen(true);
    }
  }, [menuTopCalc]);

  useEffect(() => {
    if (!isOpen && menuTopCalc !== 'null') {
      setMenuTopCalc('null');
    }
  }, [isOpen]);

  return (
    <StyledInputDrop ref={ref} onMouseMove={e => setWindowHeightTop(e.clientY)}>
      <StyledInputDropLabel>
        {label}
        {popoverLabel && (
          <DvtPopper
            label={popoverLabel}
            direction={popoverDirection}
            size="small"
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
      </StyledInputDropLabel>
      <StyledInputDropInputGroup
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <StyledInputDropFieldColumn>
          {droppedData?.map((item, index) => (
            <StyledInputDropFieldIcon key={index}>
              <StyledInputDropIcon
                onClick={() =>
                  multiple ? handleRemoveItem(index) : setDroppedData(null)
                }
              >
                <Icon fileName="close" iconSize="l" style={{ marginTop: 9 }} />
              </StyledInputDropIcon>
              <StyledInputDropField
                placeholder={placeholder}
                type="text"
                readOnly
                value={item?.name}
              />
            </StyledInputDropFieldIcon>
          ))}
          {multiple ? (
            <StyledInputDropFieldIcon>
              <StyledInputDropField
                placeholder={placeholder}
                type="text"
                readOnly
              />
              <StyledInputDropIcon onClick={handleAddClickPositionTop}>
                <Icon fileName="dvt-add_square" iconSize="xl" />
              </StyledInputDropIcon>
            </StyledInputDropFieldIcon>
          ) : (
            !droppedData && (
              <StyledInputDropFieldIcon>
                <StyledInputDropField
                  placeholder={placeholder}
                  type="text"
                  readOnly
                />
                <StyledInputDropIcon onClick={handleAddClickPositionTop}>
                  <Icon fileName="dvt-add_square" iconSize="xl" />
                </StyledInputDropIcon>
              </StyledInputDropFieldIcon>
            )
          )}
        </StyledInputDropFieldColumn>
      </StyledInputDropInputGroup>
      {isOpen && (
        <StyledInputDropMenu
          menuRight={menuRight}
          menuTopCalc={menuTopCalc}
          menuTopCalcArrow={menuTopCalcArrow}
        >
          <DvtOpenSelectMenu
            type={type}
            values={values}
            setValues={setValues}
            columnData={[]}
          />
        </StyledInputDropMenu>
      )}
      {error && <StyledError>{error}</StyledError>}
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
