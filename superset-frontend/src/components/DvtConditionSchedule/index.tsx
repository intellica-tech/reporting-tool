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

  const dayOptions: { label: string; value: number }[] = [];
  let dayIndex = 0;

  while (dayIndex < 31) {
    dayIndex += 1;
    dayOptions.push({
      label: `Day ${dayIndex}`,
      value: dayIndex,
    });
  }

  const hourOptions: { label: string; value: number }[] = [];
  let hourIndex = 0;

  while (hourIndex < 24) {
    hourOptions.push({
      label: `Hour ${hourIndex}`,
      value: hourIndex,
    });
    hourIndex += 1;
  }

  const minuteOptions: { label: string; value: number }[] = [];
  let minuteIndex = 0;

  while (minuteIndex < 60) {
    minuteOptions.push({
      label: `Minute ${minuteIndex}`,
      value: minuteIndex,
    });
    minuteIndex += 1;
  }

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
              data={dayOptions}
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
              data={hourOptions}
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
              data={minuteOptions}
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
