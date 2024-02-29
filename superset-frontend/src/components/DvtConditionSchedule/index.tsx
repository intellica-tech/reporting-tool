/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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

export interface DvtConditionScheduleProps {
  schedule: string;
  setSchedule: (newData: string) => void;
}

const DvtConditionSchedule: React.FC<DvtConditionScheduleProps> = ({
  schedule,
  setSchedule,
}) => {
  const [selectedRadio, setSelectedRadio] = useState<string>('Every');
  const [select, setSelect] = useState({
    timeSelected: '' as string,
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
      select.minute.length > 0 ? sortAndCombine(select.minute) : '*';
    const hourExpression =
      select.hour.length > 0 ? sortAndCombine(select.hour) : '*';
    const dayExpression =
      select.day.length > 0 ? sortAndCombine(select.day) : '*';
    const monthExpression =
      select.month.length > 0 ? sortAndCombine(select.month) : '*';
    const weekExpression =
      select.week.length > 0 ? sortAndCombine(select.week) : '*';

    return `${minuteExpression} ${hourExpression} ${dayExpression} ${monthExpression} ${weekExpression}`;
  };

  useEffect(() => {
    setSchedule(generateCronExpression());
  }, [select.minute, select.hour, select.day, select.month, select.week]);

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
        setSelect(prevSelect => ({
          ...prevSelect,
          day: parsedSchedule.day,
        }));
      }
      if (parsedSchedule.minute.length) {
        setSelect(prevSelect => ({
          ...prevSelect,
          minute: parsedSchedule.minute,
        }));
      }
      if (parsedSchedule.month.length) {
        setSelect(prevSelect => ({
          ...prevSelect,
          month: parsedSchedule.month,
        }));
      }
      if (parsedSchedule.week.length) {
        setSelect(prevSelect => ({
          ...prevSelect,
          week: parsedSchedule.week,
        }));
      }
      if (parsedSchedule.hour.length) {
        setSelect(prevSelect => ({
          ...prevSelect,
          hour: parsedSchedule.hour,
        }));
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
            selectedValue={select.timeSelected}
            setSelectedValue={selected => {
              setSelect(prevSelect => ({
                ...prevSelect,
                timeSelected: selected,
              }));
            }}
            typeDesign="form"
            width={110}
          />
          {select.timeSelected === 'year' && (
            <DvtInputSelect
              data={
                DvtAlertReportData.find(item => item.name === 'month')?.data ||
                []
              }
              selectedValues={select.month}
              placeholder={t('month')}
              setSelectedValues={selected => {
                setSelect(prevSelect => ({
                  ...prevSelect,
                  month: selected,
                }));
              }}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month'].includes(select.timeSelected) && (
            <DvtInputSelect
              data={[]}
              startNumber={1}
              endNumber={31}
              placeholder={t('day')}
              selectedValues={select.day}
              setSelectedValues={selected => {
                setSelect(prevSelect => ({
                  ...prevSelect,
                  day: selected,
                }));
              }}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week'].includes(select.timeSelected) && (
            <DvtInputSelect
              data={
                DvtAlertReportData.find(item => item.name === 'day')?.data || []
              }
              placeholder={t('week')}
              selectedValues={select.week}
              setSelectedValues={selected => {
                setSelect(prevSelect => ({
                  ...prevSelect,
                  week: selected,
                }));
              }}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week', 'day'].includes(select.timeSelected) && (
            <DvtInputSelect
              data={[]}
              startNumber={0}
              endNumber={23}
              placeholder={t('hour')}
              selectedValues={select.hour}
              setSelectedValues={selected => {
                setSelect(prevSelect => ({
                  ...prevSelect,
                  hour: selected,
                }));
              }}
              typeDesign="chartsForm"
            />
          )}
          {['year', 'month', 'week', 'day', 'hour'].includes(
            select.timeSelected,
          ) && (
            <DvtInputSelect
              data={[]}
              startNumber={0}
              endNumber={59}
              placeholder={t('minute')}
              selectedValues={select.minute}
              setSelectedValues={selected => {
                setSelect(prevSelect => ({
                  ...prevSelect,
                  minute: selected,
                }));
              }}
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

export default DvtConditionSchedule;
