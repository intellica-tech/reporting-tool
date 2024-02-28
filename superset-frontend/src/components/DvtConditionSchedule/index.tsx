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
  const [timeSelected, setTimeSelected] = useState<{
    label: string;
    value: string;
  }>({ value: 'hour', label: 'Hour' });
  const [month, setMonth] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [day, setDay] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [week, setWeek] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [hour, setHour] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);
  const [minute, setMinute] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

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

    const minuteExpression = minute.length > 0 ? sortAndCombine(minute) : '*';
    const hourExpression = hour.length > 0 ? sortAndCombine(hour) : '*';
    const dayExpression = day.length > 0 ? sortAndCombine(day) : '*';
    const monthExpression = month.length > 0 ? sortAndCombine(month) : '*';
    const weekExpression = week.length > 0 ? sortAndCombine(week) : '*';

    return `${minuteExpression} ${hourExpression} ${dayExpression} ${monthExpression} ${weekExpression}`;
  };

  useEffect(() => {
    setSchedule(generateCronExpression());
  }, [minute, hour, day, month, week]);

  const parseCronExpression = (cronExpression: string) => {
    const [minuteExp, hourExp, dayExp, monthExp, weekExp] =
      cronExpression.split(' ');

    // Parse minute
    const parsedMinute =
      minuteExp === '*' ? [] : parseRangeExpression(minuteExp);

    // Parse hour
    const parsedHour = hourExp === '*' ? [] : parseRangeExpression(hourExp);

    // Parse day
    const parsedDay = dayExp === '*' ? [] : parseRangeExpression(dayExp);

    // Parse month
    const parsedMonth = monthExp === '*' ? [] : parseRangeExpression(monthExp);

    // Parse week
    const parsedWeek = weekExp === '*' ? [] : parseRangeExpression(weekExp);

    // Update state
    setMinute(parsedMinute);
    setHour(parsedHour);
    setDay(parsedDay);
    setMonth(parsedMonth);
    setWeek(parsedWeek);
  };

  const parseRangeExpression = (expression: string) => {
    const result: any[] = [];
    const ranges = expression.split(',');

    ranges.forEach(range => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(item => item);
        for (let i = start; i <= end; i += 1) {
          result.push(i);
        }
      } else {
        result.push(range);
      }
    });

    return result;
  };

  useEffect(() => {
    if (schedule && selectedRadio === 'Cron') {
      parseCronExpression(schedule);
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
              selectedValues={hour}
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

export default DvtConditionSchedule;
