/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useDispatch } from 'react-redux';
import { dvtChartSetTimeRange } from 'src/dvt-redux/dvt-chartReducer';
import moment from 'moment';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
// import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import DvtModalHeader from 'src/components/DvtModalHeader';
import DvtRadioList from 'src/components/DvtRadioList';
import DvtTimeRangeData from './dvtTimeRangeData';
import {
  StyledTimeRangeCenter,
  StyledTimeRangeCenterTop,
  StyledTimeRangeCenterBottom,
  StyledTimeRangeCenterLabel,
  ButtonContainer,
} from './time-range.module';

const DvtTimeRange = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState<any>({
    label: t('No filter'),
    value: 'no_filter',
  });
  const [selected, setSelected] = useState<string>('day');
  const [updateAfterReady, setUpdateAfterReady] = useState<boolean>(false);

  useEffect(() => {
    if (meta?.addTimeRange?.range) {
      setRange(
        DvtTimeRangeData.rangeType.find(
          v => v.value === meta.addTimeRange.range,
        ),
      );
      setSelected(meta?.addTimeRange?.selected);
    }
  }, [meta?.addTimeRange]);

  useEffect(() => {
    if (updateAfterReady) {
      if (range.value === 'last') {
        setSelected('day');
      } else if (range.value === 'previous') {
        setSelected('week');
      }
    }
  }, [range.value]);

  const lastTimeFormation = (amount: any, unit: any, name: string) =>
    `${moment()
      .subtract(amount, unit)
      .format('YYYY-MM-DD')} ≤ ${name} < ${moment().format('YYYY-MM-DD')}`;

  const lastSwitch = (slct: string, name: string) => {
    switch (slct) {
      case 'day':
        return lastTimeFormation(1, 'days', name);
      case 'week':
        return lastTimeFormation(1, 'week', name);
      case 'month':
        return lastTimeFormation(1, 'month', name);
      case 'quarter':
        return lastTimeFormation(3, 'month', name);
      case 'year':
        return lastTimeFormation(1, 'year', name);
      default:
        return `≤ ${name} <`;
    }
  };

  const previousSwitch = (slct: string, name: string) => {
    switch (slct) {
      case 'week':
        return `${moment()
          .day('Monday')
          .subtract(1, 'week')
          .format('YYYY-MM-DD')} ≤ ${name} < ${moment()
          .day('Monday')
          .format('YYYY-MM-DD')}`;
      case 'month':
        return `${moment()
          .startOf('month')
          .subtract(1, 'month')
          .format('YYYY-MM-DD')} ≤ ${name} < ${moment()
          .startOf('month')
          .format('YYYY-MM-DD')}`;
      case 'year':
        return `${moment()
          .startOf('year')
          .subtract(1, 'year')
          .format('YYYY-MM-DD')} ≤ ${name} < ${moment()
          .startOf('year')
          .format('YYYY-MM-DD')}`;
      default:
        return `≤ ${name} <`;
    }
  };

  const rangeSwitch = (range: string, slct: string, name: string) => {
    switch (range) {
      case 'no_filter':
        return `${name} (No filter)`;
      case 'last':
        return lastSwitch(slct, name);
      case 'previous':
        return previousSwitch(slct, name);
      default:
        return '';
    }
  };

  const menuLabelSwitch = (range: string, slct: string, findObject: string) => {
    switch (range) {
      case 'no_filter':
        return 'No filter';
      case 'last':
        return DvtTimeRangeData.radioLast.find(v => v.value === slct)?.[
          findObject
        ];
      case 'previous':
        return DvtTimeRangeData.radioPrevious.find(v => v.value === slct)?.[
          findObject
        ];
      default:
        return '';
    }
  };

  const handleApply = () => {
    dispatch(
      dvtChartSetTimeRange({
        label: rangeSwitch(range.value, selected, meta?.column?.column_name),
        menuLabel: menuLabelSwitch(range.value, selected, 'label'),
        range: range.value,
        selected: range.value === 'no_filter' ? '' : selected,
        comparator: menuLabelSwitch(range.value, selected, 'comparator'),
      }),
    );
    onClose();
  };

  return (
    <>
      <DvtModalHeader title={t('Edit time range')} onClose={onClose} />
      <DvtSelect
        label={t('RANGE TYPE')}
        data={DvtTimeRangeData.rangeType}
        selectedValue={range}
        setSelectedValue={v => {
          setRange(v);
          setUpdateAfterReady(true);
        }}
        typeDesign="navbar"
      />
      <StyledTimeRangeCenter>
        {range.value !== 'no_filter' && (
          <StyledTimeRangeCenterTop>
            <StyledTimeRangeCenterLabel>
              {range.value === 'last' || range.value === 'previous'
                ? `${t('Configure Time Range')}: ${range.label}...`
                : `${t('Configure')} ${range.label} ${t('Time Range')}`}
            </StyledTimeRangeCenterLabel>
            {(range.value === 'last' || range.value === 'previous') && (
              <DvtRadioList
                data={
                  range.value === 'last'
                    ? DvtTimeRangeData.radioLast
                    : DvtTimeRangeData.radioPrevious
                }
                active={selected}
                setActive={setSelected}
              />
            )}
          </StyledTimeRangeCenterTop>
        )}
        <StyledTimeRangeCenterBottom>
          <StyledTimeRangeCenterLabel>
            {t('Actual time range')}
          </StyledTimeRangeCenterLabel>
          <p>
            {range.value === 'no_filter'
              ? 'No filter'
              : rangeSwitch(range.value, selected, 'col')}
          </p>
        </StyledTimeRangeCenterBottom>
      </StyledTimeRangeCenter>
      <ButtonContainer>
        <DvtButton
          bold
          typeColour="powder"
          label={t('CANCEL')}
          onClick={onClose}
        />
        <DvtButton bold label={t('APPLY')} onClick={handleApply} />
      </ButtonContainer>
    </>
  );
};

export default DvtTimeRange;