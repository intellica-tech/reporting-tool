/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { SupersetTheme } from '@superset-ui/core';
import useFetch from 'src/hooks/useFetch';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import moment from 'moment';
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
  expressionType: 'SIMPLE',
  clause: 'WHERE',
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
  type: 'normal' | 'aggregates' | 'filters';
  savedType: 'metric' | 'expressions';
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
  type = 'normal',
  savedType = 'metric',
  savedData = [],
  columnData = [],
  datasourceApi = '',
}: DvtInputDropProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  const [windowScreen, setWindowScreen] = useState({
    top: 0,
    left: 0,
  });
  const [menuRight, setMenuRight] = useState(0);
  const [menuTopCalc, setMenuTopCalc] = useState('null');
  const [menuTopCalcArrow, setMenuTopCalcArrow] = useState('null');
  const [optionData, setOptionData] = useState<OptionDataProps[]>([]);
  const [optionApiUrl, setOptionApiUrl] = useState<string>('');
  const [values, setValues] = useState<any>(initialValues);
  const [getId, setGetId] = useState<number | null>(null);
  const [tab, setTab] = useState<'SAVED' | 'SIMPLE' | 'SQL'>('SIMPLE');
  const [clause, setClause] = useState<'WHERE' | 'HAVING'>('WHERE');
  const [tabFetched, setTabFetched] = useState<boolean>(false);

  const openMenuHeight = 360;
  const inputHeight = 50;
  const borderHeight = 16;
  // const itemHeight = 28.8;
  const arrowTop = 25;
  const topMaxHeight = (window.innerHeight - openMenuHeight) / 2 + 50;
  const bottomMaxHeight =
    window.innerHeight - (window.innerHeight - openMenuHeight) / 2 - 50;

  const handleAddClickPositionTop = (
    index: number | null,
    bounding: any,
    leftAdd: number,
  ) => {
    // const droppedDataLength = droppedData?.length ? droppedData.length : 0;
    // const indexItemTotal = index === null ? null : droppedDataLength - index;

    // const itemPixels = multiple
    //   ? `${
    //       indexItemTotal === null
    //         ? '0px'
    //         : `${indexItemTotal * itemHeight}px + 5px`
    //     }`
    //   : '0px';

    // if (windowScreen.top < topMaxHeight) {
    //   setMenuTopCalc(
    //     `calc(-${openMenuHeight}px + ${inputHeight}px + ${itemPixels})`,
    //   );
    //   setMenuTopCalcArrow(`${inputHeight / 2 - borderHeight / 2}px`);
    // } else if (windowScreen.top > bottomMaxHeight) {
    //   setMenuTopCalc(`calc(0px + ${itemPixels})`);
    //   setMenuTopCalcArrow(
    //     `${openMenuHeight - (inputHeight / 2 + borderHeight / 2)}px`,
    //   );
    // } else {
    //   setMenuTopCalc(
    //     `calc(-${openMenuHeight}px / 2 + ${inputHeight}px / 2 + ${itemPixels})`,
    //   );
    //   setMenuTopCalcArrow(`${openMenuHeight / 2 - borderHeight / 2}px`);
    // }

    setMenuRight(bounding.right + leftAdd);

    if (windowScreen.top < topMaxHeight) {
      setMenuTopCalc(
        `calc(${bounding.bottom}px - ${bounding.height / 2}px - ${arrowTop}px)`,
      );
      setMenuTopCalcArrow(`${inputHeight / 2 - borderHeight / 2}px`);
    } else if (windowScreen.top > bottomMaxHeight) {
      setMenuTopCalc(
        `calc(${bounding.bottom}px - ${openMenuHeight}px - ${
          bounding.height / 2
        }px + ${arrowTop}px)`,
      );
      setMenuTopCalcArrow(
        `${openMenuHeight - (inputHeight / 2 + borderHeight / 2)}px`,
      );
    } else {
      setMenuTopCalc(
        `calc(${bounding.bottom}px - ${
          openMenuHeight / 2 + bounding.height / 2
        }px)`,
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

    const onExpression = jsonDropData?.expression
      ? {
          saved: {
            label: jsonDropData.expression,
            value: jsonDropData.metric_name,
          },
          expressionType: 'SAVED',
        }
      : {
          column: {
            label: jsonDropData.column_name,
            value: jsonDropData.column_name,
          },
          sql: jsonDropData.column_name,
        };

    const getValues = {
      ...initialValues,
      ...onExpression,
    };

    const frmtDropData = {
      id: moment().unix(),
      label: jsonDropData?.expression
        ? jsonDropData.expression
        : jsonDropData.column_name,
      values: getValues,
      getColumn: jsonDropData,
    };

    if (jsonDropData) {
      const newData = multiple
        ? [...droppedData, frmtDropData]
        : [frmtDropData];
      setDroppedData(
        newData.sort((a: { id: number }, b: { id: number }) => a.id - b.id),
      );

      onDrop?.([frmtDropData]);
      setValues(getValues);
      // handleAddClickPositionTop(multiple ? droppedData.length - 1 : null);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newData = [...droppedData];
    newData.splice(index, 1);
    setDroppedData(
      newData.sort((a: { id: number }, b: { id: number }) => a.id - b.id),
    );
  };

  // useEffect(() => {
  //   if (ref.current) {
  //     setMenuRight(ref.current.clientWidth);
  //   }
  // }, [ref.current]);

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

  const handleSaveClick = (args: any) => {
    const onlyCountDistinct = values.saved?.label
      ? values.saved.label
      : values.aggregate?.value === 'COUNT_DISTINCT'
      ? `${values.aggregate.value}(${values.column?.value})`
      : values.sql;
    const newAddItem = {
      id: getId === null ? moment().unix() : getId,
      label: onlyCountDistinct,
      values: { ...values, ...args },
    };
    const selectedItem =
      getId === null
        ? droppedData
        : droppedData.filter((it: { id: number }) => it.id !== getId);
    const newData = multiple ? [...selectedItem, newAddItem] : [newAddItem];
    setDroppedData(
      newData.sort((a: { id: number }, b: { id: number }) => a.id - b.id),
    );
    setIsOpen(false);
    setValues(initialValues);
    setGetId(null);
  };

  useEffect(() => {
    if (tabFetched) {
      setTabFetched(false);
    }
  }, [tabFetched]);

  return (
    <StyledInputDrop
      ref={ref}
      onMouseMove={e => {
        setWindowScreen({
          top: e.clientY,
          left: e.clientX,
        });
      }}
    >
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
              onClick={(e: any) => {
                setGetId(item.id);
                setValues(item.values);
                setTabFetched(true);
                setTab(item.values.expressionType);
                setClause(item.values.clause);
                handleAddClickPositionTop(
                  index,
                  e.target.getBoundingClientRect(),
                  0,
                );
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
              onClick={(e: any) => {
                setValues(initialValues);
                setGetId(null);
                handleAddClickPositionTop(
                  null,
                  e.target.getBoundingClientRect(),
                  21,
                );
              }}
            >
              {placeholder}
            </StyledInputDropGroupItemLabel>
            <StyledInputDropIcon
              onClick={(e: any) => {
                setValues(initialValues);
                setGetId(null);
                handleAddClickPositionTop(
                  null,
                  e.target.getBoundingClientRect(),
                  0,
                );
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
      {isOpen && !tabFetched && (
        <StyledInputDropMenu
          menuRight={menuRight}
          menuTopCalc={menuTopCalc}
          menuTopCalcArrow={menuTopCalcArrow}
        >
          <DvtOpenSelectMenu
            type={type}
            savedType={savedType}
            values={values}
            setValues={setValues}
            savedData={savedData}
            columnData={columnData}
            optionData={optionData}
            closeOnClick={() => setIsOpen(false)}
            saveOnClick={handleSaveClick}
            tab={tab}
            clause={clause}
          />
        </StyledInputDropMenu>
      )}
      {error && <StyledError>{error}</StyledError>}
    </StyledInputDrop>
  );
};

export default DvtInputDrop;
