/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { SupersetTheme } from '@superset-ui/core';
import useFetch from 'src/hooks/useFetch';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import Icon from '../Icons/Icon';
import DvtPopper from '../DvtPopper';
import {
  StyledInputDrop,
  StyledInputDropIcon,
  StyledInputDropGroup,
  StyledInputDropGroupItem,
  StyledInputDropGroupItemLabel,
  StyledInputDropGroupItemRemove,
  StyledInputDropLabel,
  StyledInputDropMenu,
  StyledError,
} from './dvt-input-drop.module';
import DvtOpenSelectMenu from '../DvtOpenSelectMenu';

interface DataProps {
  label: string;
  value: string;
}

interface OptionDataProps {
  label: string;
  value: number;
}

const initialValues = {
  saved: '',
  column: '',
  operator: '',
  aggregate: '',
  option: '',
  sql: '',
};

export interface DvtInputDropProps {
  label?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  onDrop?: (data: any) => void;
  multiple?: boolean;
  droppedData: any[];
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
    | 'soruce_target'
    | 'columns';
  savedData?: DataProps[];
  columnData: DataProps[];
  datasourceApi: string;
}

const DvtInputDrop = ({
  label,
  popoverLabel,
  popoverDirection = 'top',
  placeholder,
  onDrop,
  multiple,
  droppedData = [],
  setDroppedData,
  error,
  type = 'x-axis',
  savedData = [],
  columnData = [],
  datasourceApi = '',
}: DvtInputDropProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [windowHeightTop, setWindowHeightTop] = useState(0);
  const [menuRight, setMenuRight] = useState(0);
  const [menuTopCalc, setMenuTopCalc] = useState('null');
  const [menuTopCalcArrow, setMenuTopCalcArrow] = useState('null');
  const [optionData, setOptionData] = useState<OptionDataProps[]>([]);
  const [optionApiUrl, setOptionApiUrl] = useState<string>('');

  const [values, setValues] = useState<any>(initialValues);

  const openMenuHeight = 360;
  const inputHeight = 47;
  const borderHeight = 16;
  const itemHeight = 28;
  const topMaxHeight = (window.innerHeight - openMenuHeight) / 2 + 50;
  const bottomMaxHeight =
    window.innerHeight - (window.innerHeight - openMenuHeight) / 2 - 50;

  const handleAddClickPositionTop = (index: number | null) => {
    const droppedDataLength = droppedData?.length ? droppedData.length : 0;
    const indexItemTotal = index === null ? null : droppedDataLength - index;

    const itemPixels = multiple
      ? `${
          indexItemTotal === null
            ? '0px'
            : `${indexItemTotal * itemHeight}px + 5px`
        }`
      : '0px';

    if (windowHeightTop < topMaxHeight) {
      setMenuTopCalc(
        `calc(-${openMenuHeight}px + ${inputHeight}px + ${itemPixels})`,
      );
      setMenuTopCalcArrow(`${inputHeight / 2 - borderHeight / 2}px`);
    } else if (windowHeightTop > bottomMaxHeight) {
      setMenuTopCalc(`calc(0px + ${itemPixels})`);
      setMenuTopCalcArrow(
        `${openMenuHeight - (inputHeight / 2 + borderHeight / 2)}px`,
      );
    } else {
      setMenuTopCalc(
        `calc(-${openMenuHeight}px / 2 + ${inputHeight}px / 2 + ${itemPixels})`,
      );
      setMenuTopCalcArrow(`${openMenuHeight / 2 - borderHeight / 2}px`);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const jsonDropData = JSON.parse(droppedDataString);

    const getValues = {
      ...initialValues,
      column: { label: jsonDropData.label, value: jsonDropData.label },
      sql: jsonDropData.label,
    };

    const frmtDropData = {
      id: droppedData.length,
      ...jsonDropData,
      values: getValues,
    };

    if (jsonDropData) {
      setDroppedData((prevData: any | any[]) => {
        const newData = multiple ? [...prevData, frmtDropData] : [frmtDropData];
        return newData;
      });

      onDrop?.([frmtDropData]);
      setValues(getValues);
      handleAddClickPositionTop(multiple ? droppedData.length - 1 : null);
    }
  };

  const handleRemoveItem = (index: number) => {
    setDroppedData((prevData: any[]) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
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

  const optionDataPromise = useFetch({
    url: optionApiUrl,
  });

  useEffect(() => {
    if (optionDataPromise) {
      setOptionData(
        optionDataPromise.result.map((rv: string, ri: number) => ({
          label: rv,
          value: ri + 1,
        })),
      );
    }
  }, [optionDataPromise]);

  useEffect(() => {
    if (datasourceApi && values.column && type === 'filters') {
      setOptionApiUrl(`${datasourceApi}/column/${values.column?.value}/values`);
    }
  }, [datasourceApi, values.column]);

  const handleSaveClick = () => {
    const onlyCountDistinct =
      values.aggregate?.value === 'COUNT_DISTINCT'
        ? `${values.aggregate.value}(${values.column?.value})`
        : values.sql;
    const newAddItem = {
      id: droppedData.length,
      label: onlyCountDistinct,
      values,
    };
    setDroppedData((prevData: any | any[]) => {
      const newData = multiple ? [...prevData, newAddItem] : [newAddItem];
      return newData;
    });
    setIsOpen(false);
    setValues(initialValues);
  };

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
      <StyledInputDropGroup onDragOver={handleDragOver} onDrop={handleDrop}>
        {droppedData?.map((item, index) => (
          <StyledInputDropGroupItem key={index} bgOnItem>
            <StyledInputDropGroupItemRemove
              onClick={() => {
                if (multiple) {
                  handleRemoveItem(index);
                } else {
                  setDroppedData([]);
                }
                if (isOpen) {
                  setIsOpen(false);
                }
              }}
            />
            <StyledInputDropGroupItemLabel
              onClick={() => {
                setValues(item.values);
                handleAddClickPositionTop(index);
              }}
            >
              {item.label}
            </StyledInputDropGroupItemLabel>
          </StyledInputDropGroupItem>
        ))}
        {(multiple || droppedData.length === 0) && (
          <StyledInputDropGroupItem marginTop={!!droppedData?.length}>
            <StyledInputDropGroupItemLabel
              textOnPlaceholder
              onClick={() => {
                setValues(initialValues);
                handleAddClickPositionTop(null);
              }}
            >
              {placeholder}
            </StyledInputDropGroupItemLabel>
            <StyledInputDropIcon
              onClick={() => {
                setValues(initialValues);
                handleAddClickPositionTop(null);
              }}
            >
              <Icon
                fileName="dvt-add_square"
                iconSize="xl"
                style={{ marginTop: 2 }}
              />
            </StyledInputDropIcon>
          </StyledInputDropGroupItem>
        )}
      </StyledInputDropGroup>
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
            savedData={savedData}
            columnData={columnData}
            optionData={optionData}
            closeOnClick={() => setIsOpen(false)}
            saveOnClick={handleSaveClick}
          />
        </StyledInputDropMenu>
      )}
      {error && <StyledError>{error}</StyledError>}
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
