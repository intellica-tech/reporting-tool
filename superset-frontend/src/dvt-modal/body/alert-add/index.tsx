import React, { useEffect, useState } from 'react';
import { SupersetTheme, t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import { Switch } from 'antd';
import DvtSelect from 'src/components/DvtSelect';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtRadioList from 'src/components/DvtRadioList';
import DvtInput from 'src/components/DvtInput';
import DvtCheckbox from 'src/components/DvtCheckbox';
import Icon from 'src/components/Icons/Icon';
import { DvtTimezoneData } from '../../timezoneData';
import {
  StyledAlertAdd,
  StyledAlertAddHeader,
  StyledAlertAddBody,
  StyledAlertAddLeftMenu,
  StyledAlertAddLabel,
  StyledAlertAddSwitchGroup,
  StyledAlertAddSelectGroup,
  StyledAlertAddLine,
  StyledAlertAddItemGroup,
  StyledAlertAddAlertConition,
  StyledAlertAddTitle,
  StyledAlertAddAlertConditionSchedule,
  StyledAlertAddSelectFlex,
  StyledAlertAddMessageContent,
  StyledAlertAddIconGroup,
  StyledAlertAddButtonGroup,
  StyledAlertAddInputFlex,
} from './alert-add-modal.module';

const DvtAlertAdd = ({ meta, onClose }: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<{
    database: { label: string; value: string };
    sqlQuery: string;
    trigger: { label: string; value: string };
    value: number | undefined;
    hour: { label: string; value: string };
    minute: { label: string; value: string };
    timezone: { label: string; value: string };
    logRetention: { label: string; value: string };
    workingTimeout: string;
    gracePeriod: string;
    messageContent: { label: string; value: string };
    selectedMethod: { label: string; value: string };
    owners: { label: string; value: number | undefined };
    alertName: string;
    description: string;
    ignore: boolean;
    schedule: string;
    year: string;
    month: string;
    week: string;
    day: string;
    email: string;
    timeSelected: { label: string; value: string };
    active: boolean;
  }>({
    database: { label: '', value: '' },
    sqlQuery: '',
    trigger: { label: '', value: '' },
    value: undefined,
    hour: { label: '', value: '' },
    minute: { label: '', value: '' },
    timezone: { label: '', value: '' },
    logRetention: { label: '', value: '' },
    workingTimeout: '',
    gracePeriod: '',
    messageContent: { label: '', value: '' },
    selectedMethod: { label: '', value: '' },
    owners: { label: '', value: undefined },
    alertName: '',
    description: '',
    ignore: false,
    schedule: '',
    year: '',
    month: '',
    week: '',
    day: '',
    timeSelected: { label: 'Hour', value: 'hour' },
    email: '',
    active: false,
  });

  const [value, setValue] = useState('Dashboard');
  const [chartType, setChartType] = useState('PNG');
  const [timeSchedule, setTimeSchedule] = useState('Every');
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    setInput({ ...input, messageContent: { label: '', value: '' } });
  }, [value]);

  const alertAddData = useFetch({
    url: apiUrl,
    method: 'POST',
    body: {
      active: input.active,
      chart: value === 'Chart' ? input.messageContent.value : null,
      context_markdown: 'string',
      creation_method: 'alerts_reports',
      crontab: timeSchedule === 'Cron' ? input.schedule : '* * * * *',
      dashboard: value === 'Dashboard' ? input.messageContent.value : null,
      database: input.database.value,
      description: input.description,
      force_screenshot: input.ignore,
      grace_period: input.gracePeriod,
      log_retention: input.logRetention.value,
      name: input.alertName,
      owners: [input.owners.value],
      recipients: [
        {
          recipient_config_json: {
            target: input.email,
          },
          type: 'Email',
        },
      ],
      report_format: chartType,
      sql: input.sqlQuery,
      timezone: input.timezone.value,
      type: 'Alert',
      validator_config_json: {
        op: input.trigger.value,
        threshold: input.value,
      },
      validator_type: 'operator',
      working_timeout: input.workingTimeout,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (alertAddData?.id) {
      onClose();
    }
  }, [onClose, alertAddData]);

  const datasetData = useFetch({
    url: '/report/related/database?q=(filter:%27%27,page:0,page_size:100)',
  });

  const ownersData = useFetch({
    url: '/report/related/created_by?q=(filter:%27%27,page:0,page_size:100)',
  });

  const chartData = useFetch({
    url: '/report/related/chart?q=(filter:%27%27,page:0,page_size:100)',
  });

  const dashboardData = useFetch({
    url: '/report/related/dashboard?q=(filter:%27%27,page:0,page_size:100)',
  });

  const datasetOptions: { label: string; value: string }[] =
    datasetData?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  const ownersOptions: { label: string; value: string }[] =
    ownersData?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  const chartOptions: { label: string; value: string }[] =
    chartData?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  const dashboardOptions: { label: string; value: string }[] =
    dashboardData?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  const dayOptions = [];
  let dayIndex = 0;

  while (dayIndex < 31) {
    dayIndex += 1;
    dayOptions.push({
      label: `Day ${dayIndex}`,
      value: `${dayIndex}`,
    });
  }

  const hourOptions = [];
  let hourIndex = 0;

  while (hourIndex < 24) {
    hourOptions.push({
      label: `Hour ${hourIndex}`,
      value: `${hourIndex}`,
    });
    hourIndex += 1;
  }

  const minuteOptions = [];
  let minuteIndex = 0;

  while (minuteIndex < 60) {
    minuteOptions.push({
      label: `Minute ${minuteIndex}`,
      value: `${minuteIndex}`,
    });
    minuteIndex += 1;
  }

  return (
    <StyledAlertAdd>
      <StyledAlertAddHeader>
        <DvtButton
          bold
          colour="primary"
          icon="dvt-add_square"
          label={t('Add Alert')}
          onClick={() => {}}
          size="small"
          typeColour="powder"
        />
      </StyledAlertAddHeader>
      <StyledAlertAddBody>
        <StyledAlertAddLeftMenu>
          <StyledAlertAddSwitchGroup>
            <StyledAlertAddLabel>{t('Active')}</StyledAlertAddLabel>
            <Switch
              checked={input.active}
              onChange={bol => {
                setInput({ ...input, active: bol });
              }}
              css={(theme: SupersetTheme) => ({
                backgroundColor: theme.colors.dvt.primary.base,
              })}
            />
          </StyledAlertAddSwitchGroup>
          <StyledAlertAddLine />
          <StyledAlertAddSelectGroup>
            <DvtInput
              label="Alert Name"
              placeholder="Alert Name"
              value={input.alertName}
              onChange={selected => {
                setInput({ ...input, alertName: selected });
              }}
              typeDesign="chartsForm"
            />
            <DvtSelect
              data={ownersOptions}
              label="Owners"
              placeholder="Select..."
              selectedValue={input.owners}
              setSelectedValue={selected => {
                setInput({ ...input, owners: selected });
              }}
            />
            <DvtInput
              label="Description"
              placeholder="Description"
              value={input.description}
              onChange={selected => {
                setInput({ ...input, description: selected });
              }}
              typeDesign="chartsForm"
            />
          </StyledAlertAddSelectGroup>
        </StyledAlertAddLeftMenu>
        <StyledAlertAddItemGroup>
          <StyledAlertAddAlertConition>
            <StyledAlertAddTitle>{t('Alert Condition')}</StyledAlertAddTitle>
            <DvtSelect
              data={datasetOptions}
              label="Database"
              placeholder="Select "
              selectedValue={input.database}
              setSelectedValue={selected => {
                setInput({ ...input, database: selected });
              }}
              typeDesign="form"
            />
            <DvtJsonEditor
              value={input.sqlQuery}
              onChange={selected => {
                setInput({ ...input, sqlQuery: selected });
              }}
              label="SQL QUERY"
            />
            <DvtSelect
              data={[
                {
                  label: t('< (Smaller than)'),
                  value: '<',
                },
                {
                  label: t('> (Larger than)'),
                  value: '>',
                },
                {
                  label: t('<= (Smaller or equal)'),
                  value: '<=',
                },
                {
                  label: t('>= (Larger or equal)'),
                  value: '>=',
                },
                {
                  label: t('== (Is equal)'),
                  value: '==',
                },
                {
                  label: t('!= (Is not equal)'),
                  value: '!=',
                },
                {
                  label: t('Not null'),
                  value: 'not null',
                },
              ]}
              label="Trigger Alert If..."
              placeholder="Condition "
              selectedValue={input.trigger}
              setSelectedValue={selected => {
                setInput({ ...input, trigger: selected });
              }}
              typeDesign="form"
            />
            <DvtInput
              label="Value"
              placeholder="Value "
              value={input.value === undefined ? '' : input.value.toString()}
              onChange={selected => {
                const newValue =
                  selected === '' ? undefined : parseInt(selected, 10);
                setInput({ ...input, value: newValue });
              }}
              typeDesign="chartsForm"
            />
          </StyledAlertAddAlertConition>
          <StyledAlertAddAlertConditionSchedule>
            <StyledAlertAddTitle>
              {t('Alert Condition Schedule')}
            </StyledAlertAddTitle>
            <DvtRadioList
              data={[
                { label: 'Every', value: 'Every' },
                { label: 'Cron', value: 'Cron' },
              ]}
              active={timeSchedule}
              setActive={setTimeSchedule}
            />
            {timeSchedule === 'Every' && (
              <>
                <StyledAlertAddSelectFlex>
                  <DvtSelect
                    data={[
                      { value: 'year', label: 'Year' },
                      { value: 'month', label: 'Month' },
                      { value: 'week', label: 'Week' },
                      { value: 'day', label: 'Day' },
                      { value: 'hour', label: 'Hour' },
                      { value: 'minute', label: 'Minute' },
                    ]}
                    selectedValue={input.timeSelected}
                    setSelectedValue={selected => {
                      setInput({ ...input, timeSelected: selected });
                    }}
                    typeDesign="form"
                    width={110}
                  />
                  {input.timeSelected.value === 'year' && (
                    <DvtSelect
                      data={[
                        {
                          label: t('January'),
                          value: 'january',
                        },
                        {
                          label: t('February'),
                          value: 'February',
                        },
                        {
                          label: t('March'),
                          value: 'March',
                        },
                        {
                          label: t('April'),
                          value: 'April',
                        },
                        {
                          label: t('May'),
                          value: 'May',
                        },
                        {
                          label: t('June'),
                          value: 'June',
                        },
                        {
                          label: t('July'),
                          value: 'July',
                        },
                        {
                          label: t('August'),
                          value: 'August',
                        },
                        {
                          label: t('September'),
                          value: 'September',
                        },
                        {
                          label: t('October'),
                          value: 'October',
                        },
                        {
                          label: t('November'),
                          value: 'November',
                        },
                        {
                          label: t('December'),
                          value: 'December',
                        },
                      ]}
                      selectedValue={input.month}
                      placeholder="month"
                      setSelectedValue={selected => {
                        setInput({ ...input, month: selected });
                      }}
                      typeDesign="form"
                      width={110}
                    />
                  )}
                  {['year', 'month'].includes(input.timeSelected.value) && (
                    <DvtSelect
                      data={dayOptions}
                      placeholder="day"
                      selectedValue={input.day}
                      setSelectedValue={selected => {
                        setInput({ ...input, day: selected });
                      }}
                      typeDesign="form"
                      width={110}
                    />
                  )}
                  {['year', 'month', 'week'].includes(
                    input.timeSelected.value,
                  ) && (
                    <DvtSelect
                      data={[
                        {
                          label: t('Sunday'),
                          value: 'Sunday',
                        },
                        {
                          label: t('Monday'),
                          value: 'Monday',
                        },
                        {
                          label: t('Tuesday'),
                          value: 'Tuesday',
                        },
                        {
                          label: t('Wednesday'),
                          value: 'Wednesday',
                        },
                        {
                          label: t('Thursday'),
                          value: 'Thursday',
                        },
                        {
                          label: t('Friday'),
                          value: 'Friday',
                        },
                        {
                          label: t('Saturday'),
                          value: 'Saturday',
                        },
                      ]}
                      placeholder="week"
                      selectedValue={input.week}
                      setSelectedValue={selected => {
                        setInput({ ...input, week: selected });
                      }}
                      typeDesign="form"
                      width={110}
                    />
                  )}
                  {['year', 'month', 'week', 'day'].includes(
                    input.timeSelected.value,
                  ) && (
                    <DvtSelect
                      data={hourOptions}
                      placeholder="hour"
                      selectedValue={input.hour}
                      setSelectedValue={selected => {
                        setInput({ ...input, hour: selected });
                      }}
                      typeDesign="form"
                      width={110}
                    />
                  )}
                  {['year', 'month', 'week', 'day', 'hour'].includes(
                    input.timeSelected.value,
                  ) && (
                    <DvtSelect
                      data={minuteOptions}
                      placeholder="minute"
                      selectedValue={input.minute}
                      setSelectedValue={selected => {
                        setInput({ ...input, minute: selected });
                      }}
                      typeDesign="form"
                      width={110}
                    />
                  )}
                </StyledAlertAddSelectFlex>
              </>
            )}
            {timeSchedule === 'Cron' && (
              <DvtInput
                placeholder="0 * * * * *"
                value={input.schedule}
                onChange={selected => {
                  setInput({ ...input, schedule: selected });
                }}
                typeDesign="chartsForm"
              />
            )}
            <DvtSelect
              data={DvtTimezoneData}
              label="Timezone"
              placeholder="GMT +03:00 (Antarctica)"
              selectedValue={input.timezone}
              setSelectedValue={selected => {
                setInput({ ...input, timezone: selected });
              }}
              typeDesign="form"
            />
            <StyledAlertAddTitle>{t('Schedule Settings')}</StyledAlertAddTitle>
            <DvtSelect
              data={[
                {
                  label: t('None'),
                  value: 1,
                },
                {
                  label: t('30 days'),
                  value: 30,
                },
                {
                  label: t('60 days'),
                  value: 60,
                },
                {
                  label: t('90 days'),
                  value: 90,
                },
              ]}
              label="Log Retention"
              placeholder="90 Days"
              selectedValue={input.logRetention}
              setSelectedValue={selected => {
                setInput({ ...input, logRetention: selected });
              }}
              typeDesign="form"
            />
            <StyledAlertAddInputFlex>
              <DvtInput
                label="Working Timeout"
                placeholder="3600"
                value={input.workingTimeout}
                onChange={selected => {
                  setInput({ ...input, workingTimeout: selected });
                }}
                typeDesign="chartsForm"
              />
              <DvtInput
                label="Grace Period"
                placeholder="Seconds"
                value={input.gracePeriod}
                onChange={selected => {
                  setInput({ ...input, gracePeriod: selected });
                }}
                typeDesign="chartsForm"
              />
            </StyledAlertAddInputFlex>
          </StyledAlertAddAlertConditionSchedule>
          <StyledAlertAddMessageContent>
            <StyledAlertAddTitle>{t('Message Content')}</StyledAlertAddTitle>
            <DvtRadioList
              data={[
                { label: 'Chart', value: 'Chart' },
                { label: 'Dashboard', value: 'Dashboard' },
              ]}
              active={value}
              setActive={setValue}
            />
            <DvtSelect
              data={
                value === 'Chart'
                  ? chartOptions
                  : value === 'Dashboard'
                  ? dashboardOptions
                  : []
              }
              selectedValue={input.messageContent}
              setSelectedValue={selected => {
                setInput({ ...input, messageContent: selected });
              }}
              typeDesign="form"
            />
            {value === 'Chart' && (
              <DvtRadioList
                data={[
                  { label: 'Send as PNG', value: 'PNG' },
                  { label: 'Send as SVG', value: 'SVG' },
                ]}
                active={chartType}
                setActive={setChartType}
              />
            )}
            {value === 'Dashboard' && (
              <DvtCheckbox
                label="Ignore cache when generating screenshot"
                checked={input.ignore}
                onChange={selected => {
                  setInput({ ...input, ignore: selected });
                }}
              />
            )}
            <StyledAlertAddTitle>
              {t('Notification Method')}
            </StyledAlertAddTitle>
            {!isOpen && (
              <StyledAlertAddIconGroup onClick={() => setIsOpen(!isOpen)}>
                <Icon
                  fileName="dvt-add_square"
                  css={(theme: SupersetTheme) => ({
                    color: theme.colors.dvt.primary.base,
                  })}
                />
                {t('Add notification method')}
              </StyledAlertAddIconGroup>
            )}
            {isOpen && (
              <div>
                <DvtSelect
                  data={[
                    {
                      label: 'Email',
                      value: 'email',
                    },
                  ]}
                  placeholder="Select Delivery Method"
                  selectedValue={input.selectedMethod}
                  setSelectedValue={selected => {
                    setInput({ ...input, selectedMethod: selected });
                  }}
                  typeDesign="form"
                  maxWidth
                />
                {input.selectedMethod.value === 'email' && (
                  <DvtInput
                    label="EMAIL"
                    value={input.email}
                    onChange={selected => {
                      setInput({ ...input, email: selected });
                    }}
                    typeDesign="chartsForm"
                    type="email"
                  />
                )}
              </div>
            )}
            <StyledAlertAddButtonGroup>
              <DvtButton bold label="Cancel" onClick={onClose} />
              <DvtButton
                bold
                colour="grayscale"
                label="Add"
                onClick={() => setApiUrl('/report/')}
              />
            </StyledAlertAddButtonGroup>
          </StyledAlertAddMessageContent>
        </StyledAlertAddItemGroup>
      </StyledAlertAddBody>
    </StyledAlertAdd>
  );
};

export default DvtAlertAdd;
