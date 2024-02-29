import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import {
  StyledConditionSchedule,
  StyledConditionScheduleSelectDate,
} from './dvt-select.module';
import DvtRadioList from '../DvtRadioList';
import DvtSelect from '../DvtSelect';
import DvtInput from '../DvtInput';
import { DvtAlertReportData } from '../../dvt-modal/alert-reportData';
import DvtInputSelect from '../DvtInputSelect';
import { DvtConditionScheduleProps } from '.';

export const DvtConditionSchedule: React.FC<DvtConditionScheduleProps> = ({
  schedule,
  setSchedule,
}) => {
  const [selectedRadio, setSelectedRadio] = useState<string>('Every');
  const [selecet, setSelect] = useState({
    timeSelected: [] as number[],
    month: [] as number[],
    day: [] as number[],
    week: [] as number[],
    hour: [] as number[],
    minute: [] as number[],
  });

  const generateCronExpression = () => {
    const sortAndCombine = (arr: any[]) => {
      if (arr.length === 0) {
        return '*';
      }

      const sortedArr = arr.sort((a, b) => a - b);
      const result = [];
      let start = sortedArr[0];
      let end = sortedArr[0];

      for (let i = 1; i < sortedArr.length; i += 1) {
        if (sortedArr[i] === end + 1) {
          end = sortedArr[i];
        } else {
          result.push(start === end ? start : `${start}-${end}`);
          start = end = sortedArr[i];
        }
      }

      result.push(start === end ? start : `${start}-${end}`);
      return result.join(',');
    };
    const minuteExpression =
      selecet.minute.length > 0 ? sortAndCombine(selecet.minute) : '*';
    const hourExpression = selecethour.length > 0 ? sortAndCombine(hour) : '*';
    const dayExpression = day.length > 0 ? sortAndCombine(day) : '*';
    const monthExpression = month.length > 0 ? sortAndCombine(month) : '*';
    const weekExpression = week.length > 0 ? sortAndCombine(week) : '*';

    return `${minuteExpression} ${hourExpression} ${dayExpression} ${monthExpression} ${weekExpression}`;
  };

  useEffect(() => {
    setSchedule(generateCronExpression());
    console.log('minute', minute);
  }, [minute, hour, day, month, week]);

  const parseCronExpression = (cronExpression: string) => {
    const parseSegment = (segment: string) => {
      const values = segment.split(',');

      const expandedValues = values.flatMap(value => {
        if (value.includes('-')) {
          const [start, end] = value.split('-').map(Number);
          return Array.from(
            { length: end - start + 1 },
            (_, index) => start + index,
          );
        }

        return Number(value);
      });

      return expandedValues;
    };
    const [
      minuteExpression,
      hourExpression,
      dayExpression,
      monthExpression,
      weekExpression,
    ] = cronExpression.split(' ');

    const minuteValues = parseSegment(minuteExpression);
    const hourValues = parseSegment(hourExpression);
    const dayValues = parseSegment(dayExpression);
    const monthValues = parseSegment(monthExpression);
    const weekValues = parseSegment(weekExpression);

    return {
      minute: minuteValues,
      hour: hourValues,
      day: dayValues,
      month: monthValues,
      week: weekValues,
    };
  };

  const arrayNumbersFormationData = (numbers: any[]) => {
    const fixedData = [];
    for (let i = 0; i < numbers.length; i += 1) {
      const element = numbers[i];
      fixedData.push({
        label: element.toString(),
        value: element,
      });
    }
    console.log('fix', fixedData);
    return fixedData;
  };

  useEffect(() => {
    console.log('schedule', schedule);
    if (schedule) {
      const parsedSchedule = parseCronExpression(schedule);
      console.log('parsed', parsedSchedule);
      if (parsedSchedule.day.length) {
        setDay(parsedSchedule.day);
      }
      if (parsedSchedule.minute.length) {
        setMinute(parsedSchedule.minute);
      }
      if (parsedSchedule.month.length) {
        setMonth(parsedSchedule.month);
      }
      if (parsedSchedule.week.length) {
        setWeek(parsedSchedule.week);
      }
    }
  }, [schedule]);

  return (
    <StyledConditionSchedule>
      <DvtRadioList
        data={
          DvtAlertReportData.find(item => item.name === 'everyOrCron')?.data ||
          []
        }
        active={selectedRadio}
        setActive={setSelectedRadio}
      />
      {selectedRadio === 'Every' && (
        <StyledConditionScheduleSelectDate>
          <DvtSelect
            data={
              DvtAlertReportData.find(item => item.name === 'time')?.data || []
            }
            selectedValue={timeSelected}
            setSelectedValue={setTimeSelected}
            typeDesign="form"
            width={110}
          />
          {timeSelected.value === 'year' && (
            <DvtInputSelect
              data={
                DvtAlertReportData.find(item => item.name === 'month')?.data ||
                []
              }
              selectedValues={month}
              placeholder={t('month')}
              setSelectedValues={setMonth}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month'].includes(timeSelected.value) && (
            <DvtInputSelect
              data={[]}
              startNumber={1}
              endNumber={31}
              placeholder={t('day')}
              selectedValues={day}
              setSelectedValues={setDay}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week'].includes(timeSelected.value) && (
            <DvtInputSelect
              data={
                DvtAlertReportData.find(item => item.name === 'day')?.data || []
              }
              placeholder={t('week')}
              selectedValues={week}
              setSelectedValues={setWeek}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week', 'day'].includes(timeSelected.value) && (
            <DvtInputSelect
              data={[]}
              startNumber={0}
              endNumber={23}
              placeholder={t('hour')}
              selectedValues={
                DvtAlertReportData.find(item => item.name === hour)?.data || []
              }
              setSelectedValues={setHour}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week', 'day', 'hour'].includes(
            timeSelected.value,
          ) && (
            <DvtInputSelect
              data={[]}
              startNumber={0}
              endNumber={59}
              placeholder={t('minute')}
              selectedValues={minute}
              setSelectedValues={setMinute}
              typeDesign="chartsForm"
            />
          )}
        </StyledConditionScheduleSelectDate>
      )}
      {selectedRadio === 'Cron' && (
        <DvtInput
          placeholder="0 * * * * *"
          value={schedule}
          onChange={setSchedule}
          typeDesign="chartsForm"
        />
      )}
    </StyledConditionSchedule>
  );
};
