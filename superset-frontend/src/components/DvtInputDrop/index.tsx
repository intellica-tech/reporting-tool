/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { SupersetTheme, t } from '@superset-ui/core';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { dvtChartSetTimeRange } from 'src/dvt-redux/dvt-chartReducer';
import useFetch from 'src/dvt-hooks/useFetch';
import useOnClickOutside from 'src/dvt-hooks/useOnClickOutsite';
import moment from 'moment';
import Icon from '../Icons/Icon';
import DvtPopper from '../DvtPopper';
import DvtOpenSelectMenu, {
  ColumnDataProps,
  MetricDataProps,
} from '../DvtOpenSelectMenu';
import openSelectMenuData from '../DvtOpenSelectMenu/dvtOpenSelectMenuData';
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

interface OptionDataProps {
  label: string;
  value: any;
}

const initialValues = {
  saved: '',
  column: '',
  operator: '',
  aggregate: '',
  option: '',
  comparator: '',
  sql: '',
  expressionType: 'SIMPLE',
  clause: 'WHERE',
};

export interface DvtInputDropProps {
  label?: string;
  popoverLabel?: string;
  popperError?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  onDrop?: (data: any) => void;
  multiple?: boolean;
  droppedData: any[];
  setDroppedData: (newDroppedData: any[] | any) => void;
  error?: string;
  type?: 'normal' | 'aggregates' | 'filters';
  savedType?: 'metric' | 'expressions';
  simpleType?: 'normal' | 'datasoruce';
  savedData?: MetricDataProps[];
  columnData: ColumnDataProps[];
  datasourceApi: string;
  anotherFormNoError?: boolean;
}

const DvtInputDrop = ({
  label,
  popoverLabel,
  popperError,
  popoverDirection = 'top',
  placeholder,
  onDrop,
  multiple,
  droppedData = [],
  setDroppedData,
  error,
  type = 'normal',
  savedType = 'metric',
  simpleType = 'normal',
  savedData = [],
  columnData = [],
  datasourceApi = '',
  anotherFormNoError = false,
}: DvtInputDropProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const modalComponent = useAppSelector(state => state.dvtModal?.component);
  const addTimeRange = useAppSelector(state => state.dvtChart?.addTimeRange);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(
    ref,
    () => modalComponent !== 'time-range' && setIsOpen(false),
  );
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
  const [firstDropAdd, setFirstDropAdd] = useState<boolean>(false);

  const clearAddTimeRange = () => {
    if (addTimeRange?.label) {
      dispatch(dvtChartSetTimeRange({}));
    }
  };

  const openMenuHeight = 360;
  const inputHeight = 50;
  const borderHeight = 16;
  // const itemHeight = 28.8;
  const arrowTop = 25;
  const topMaxHeight = (window.innerHeight - openMenuHeight) / 2 + 50;
  const bottomMaxHeight =
    window.innerHeight - (window.innerHeight - openMenuHeight) / 2 - 50;

  const handleAddClickPositionTop = (bounding: any, leftAdd: number) => {
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
    clearAddTimeRange();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const jsonDropData = JSON.parse(droppedDataString);

    if (
      (simpleType === 'datasoruce' &&
        !(
          jsonDropData.type === 'TIMESTAMP WITHOUT TIME ZONE' ||
          jsonDropData.python_date_format ||
          jsonDropData.expression
        )) ||
      (savedType === 'expressions' && jsonDropData.metric_name)
    ) {
      return;
    }

    const aggregateSwitch = (type: string) => {
      let aggregate = 'AVG';
      const sums = ['BIGINT', 'FLOAT64', 'DOUBLE PRECISION'];

      if (sums.includes(type)) {
        aggregate = 'SUM';
      }

      return aggregate;
    };

    const aggregateOnlyCountDistinctTypes = [
      'STRING',
      'VARCHAR',
      'VARCHAR(255)',
      'TEXT',
    ];
    const aggregateOnlyCountDistinct =
      jsonDropData.python_date_format ||
      aggregateOnlyCountDistinctTypes.includes(jsonDropData.type);

    const onColumnAndAggregateAddSql = aggregateOnlyCountDistinct
      ? `COUNT(DISTINCT ${jsonDropData.column_name})`
      : `${aggregateSwitch(jsonDropData.type)}(${jsonDropData.column_name})`;

    const onAggregate =
      type === 'aggregates'
        ? {
            aggregate: !jsonDropData.type
              ? ''
              : openSelectMenuData.aggregate.find(f =>
                  aggregateOnlyCountDistinct
                    ? f.value === 'COUNT_DISTINCT'
                    : f.value === aggregateSwitch(jsonDropData.type),
                ),
            column: jsonDropData,
            sql: !jsonDropData.type
              ? jsonDropData.column_name
              : onColumnAndAggregateAddSql,
          }
        : {
            column: jsonDropData,
            sql: jsonDropData.column_name,
          };

    const onExpression = jsonDropData?.expression
      ? {
          saved: jsonDropData,
          expressionType: 'SAVED',
          sql: savedType === 'expressions' ? jsonDropData.expression : '',
        }
      : onAggregate;

    const onlyFilterNoFilter =
      type === 'filters' &&
      (jsonDropData?.python_date_format ||
        jsonDropData.type === 'TIMESTAMP WITHOUT TIME ZONE' ||
        !jsonDropData.type) &&
      !jsonDropData.expression;

    const onFilterAndClock = onlyFilterNoFilter
      ? {
          column: jsonDropData,
          operator: { label: t('No filter'), value: 'TEMPORAL_RANGE' },
          comparator: 'No filter',
          filterType: 'time_range',
          sql: jsonDropData.column_name,
        }
      : type === 'filters'
      ? jsonDropData.expression
        ? {
            clause: 'HAVING',
            sql: jsonDropData.expression,
            expressionType: 'SQL',
          }
        : {
            column: jsonDropData,
            operator: {
              label: t('In'),
              value: 'IN',
            },
          }
      : onExpression;

    const getValues = {
      ...initialValues,
      ...onFilterAndClock,
    };

    const frmtDropData = {
      id: moment().unix(),
      label: onlyFilterNoFilter
        ? `${jsonDropData.column_name} (No filter)`
        : jsonDropData?.expression
        ? savedType === 'expressions'
          ? jsonDropData.column_name
          : jsonDropData.expression
        : type === 'aggregates'
        ? onColumnAndAggregateAddSql
        : type === 'filters'
        ? `${jsonDropData.column_name} IN`
        : jsonDropData.column_name,
      values: getValues,
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
      // handleAddClickPositionTop();
    }
  };

  const handleRemoveItem = (index: number) => {
    const newData = [...droppedData];
    newData.splice(index, 1);
    setDroppedData(
      newData.sort((a: { id: number }, b: { id: number }) => a.id - b.id),
    );
  };

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
    if (optionDataPromise.data) {
      setOptionData(
        optionDataPromise.data.result.map((rv: string) => ({
          label: rv === null ? '<NULL>' : rv,
          value: rv,
        })),
      );
    }
  }, [optionDataPromise.data]);

  useEffect(() => {
    if (
      isOpen &&
      datasourceApi &&
      values.column &&
      !values.column.python_date_format &&
      values.column.type !== 'TIMESTAMP WITHOUT TIME ZONE' &&
      type === 'filters'
    ) {
      setOptionApiUrl(
        `${datasourceApi}/column/${values.column?.column_name}/values/`,
      );
    }
  }, [datasourceApi, values.column, isOpen]);

  useEffect(() => {
    if (
      (values.column.python_date_format ||
        values.column.type === 'TIMESTAMP WITHOUT TIME ZONE') &&
      type === 'filters' &&
      addTimeRange?.label
    ) {
      setValues({
        ...values,
        comparator: addTimeRange.comparator,
        operator: { label: addTimeRange.menuLabel, value: 'TEMPORAL_RANGE' },
        addTimeRange,
      });
    }
  }, [addTimeRange]);

  const handleSaveClick = (args: any) => {
    const onlyCountDistinct = values.saved?.metric_name
      ? values.saved.metric_name
      : values.aggregate?.value === 'COUNT_DISTINCT'
      ? `${values.aggregate.value}(${values.column?.column_name})`
      : values.sql;
    const onlyFilterTimeRange =
      values.filterType === 'time_range'
        ? `${values.column?.column_name} (${values.comparator})`
        : onlyCountDistinct;
    const newAddItem = {
      id: getId === null ? moment().unix() : getId,
      label:
        (values.column.python_date_format ||
          values.column.type === 'TIMESTAMP WITHOUT TIME ZONE') &&
        type === 'filters' &&
        addTimeRange?.label
          ? addTimeRange?.label
          : onlyFilterTimeRange,
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
    clearAddTimeRange();
  };

  useEffect(() => {
    if (tabFetched) {
      setTabFetched(false);
    }
  }, [tabFetched]);

  useEffect(() => {
    if (droppedData.length && !firstDropAdd) {
      setFirstDropAdd(true);
    }
  }, [droppedData]);

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
        {popperError && (anotherFormNoError ? false : !droppedData.length) && (
          <DvtPopper
            label={popperError}
            direction={popoverDirection}
            size="small"
          >
            <Icon
              fileName="warning"
              css={(theme: SupersetTheme) => ({
                color: firstDropAdd
                  ? theme.colors.dvt.error.base
                  : theme.colors.dvt.warning.base,
              })}
              iconSize="l"
            />
          </DvtPopper>
        )}
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
                handleAddClickPositionTop(e.target.getBoundingClientRect(), 0);
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
                handleAddClickPositionTop(e.target.getBoundingClientRect(), 21);
                if (optionData.length) {
                  setOptionData([]);
                }
              }}
            >
              {placeholder}
            </StyledInputDropGroupItemLabel>
            <StyledInputDropIcon
              onClick={(e: any) => {
                setValues(initialValues);
                setGetId(null);
                handleAddClickPositionTop(e.target.getBoundingClientRect(), 0);
                if (optionData.length) {
                  setOptionData([]);
                }
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
            simpleType={simpleType}
            values={values}
            setValues={setValues}
            savedData={savedData}
            columnData={columnData}
            optionData={optionData}
            closeOnClick={() => {
              setIsOpen(false);
              clearAddTimeRange();
            }}
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
