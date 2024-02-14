import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SupersetTheme, t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import { dvtAlertAddStatus } from 'src/dvt-redux/dvt-alertReducer';
import { Switch } from 'antd';
import DvtSelect from 'src/components/DvtSelect';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtRadioList from 'src/components/DvtRadioList';
import DvtInput from 'src/components/DvtInput';
import DvtCheckbox from 'src/components/DvtCheckbox';
import { DvtTimezoneData, DvtAlertReportData } from '../../alert-reportData';
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
  StyledAlertAddButtonGroup,
  StyledAlertAddInputFlex,
} from './alert-add-modal.module';

const DvtAlertAdd = ({ onClose }: ModalProps) => {
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

  const dispatch = useDispatch();
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
      dispatch(dvtAlertAddStatus('Success'));
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

  useEffect(() => {
    if (apiUrl) {
      setTimeout(() => {
        setApiUrl('');
      }, 2000);
    }
  }, [apiUrl]);

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
              label={t('Alert Name')}
              placeholder={t('Alert Name')}
              value={input.alertName}
              onChange={selected => {
                setInput({ ...input, alertName: selected });
              }}
              typeDesign="chartsForm"
            />
            <DvtSelect
              data={ownersOptions}
              label={t('Owners')}
              placeholder={t('Select...')}
              selectedValue={input.owners}
              setSelectedValue={selected => {
                setInput({ ...input, owners: selected });
              }}
            />
            <DvtInput
              label={t('Description')}
              placeholder={t('Description')}
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
              label={t('Database')}
              placeholder={t('Select')}
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
              label={t('SQL QUERY')}
            />
            <DvtSelect
              data={
                DvtAlertReportData.find(item => item.name === 'condition')
                  ?.data || []
              }
              label={t('Trigger Alert If...')}
              placeholder={t('Condition')}
              selectedValue={input.trigger}
              setSelectedValue={selected => {
                setInput({ ...input, trigger: selected });
              }}
              typeDesign="form"
            />
            <DvtInput
              label={t('Value')}
              placeholder={t('Value')}
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
              data={
                DvtAlertReportData.find(item => item.name === 'everyOrCron')
                  ?.data || []
              }
              active={timeSchedule}
              setActive={setTimeSchedule}
            />
            {timeSchedule === 'Every' && (
              <>
                <StyledAlertAddSelectFlex>
                  <DvtSelect
                    data={
                      DvtAlertReportData.find(item => item.name === 'time')
                        ?.data || []
                    }
                    selectedValue={input.timeSelected}
                    setSelectedValue={selected => {
                      setInput({ ...input, timeSelected: selected });
                    }}
                    typeDesign="form"
                    width={110}
                  />
                  {input.timeSelected.value === 'year' && (
                    <DvtSelect
                      data={
                        DvtAlertReportData.find(item => item.name === 'month')
                          ?.data || []
                      }
                      selectedValue={input.month}
                      placeholder={t('month')}
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
                      placeholder={t('day')}
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
                      data={
                        DvtAlertReportData.find(item => item.name === 'day')
                          ?.data || []
                      }
                      placeholder={t('week')}
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
                      placeholder={t('hour')}
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
                      placeholder={t('minute')}
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
              label={t('Timezone')}
              placeholder={t('GMT +03:00 (Antarctica)')}
              selectedValue={input.timezone}
              setSelectedValue={selected => {
                setInput({ ...input, timezone: selected });
              }}
              typeDesign="form"
            />
            <StyledAlertAddTitle>{t('Schedule Settings')}</StyledAlertAddTitle>
            <DvtSelect
              data={
                DvtAlertReportData.find(
                  item => item.name === 'scheduleSettings',
                )?.data || []
              }
              label={t('Log Retention')}
              placeholder={t('90 Days')}
              selectedValue={input.logRetention}
              setSelectedValue={selected => {
                setInput({ ...input, logRetention: selected });
              }}
              typeDesign="form"
            />
            <StyledAlertAddInputFlex>
              <DvtInput
                label={t('Working Timeout')}
                placeholder="3600"
                value={input.workingTimeout}
                onChange={selected => {
                  setInput({ ...input, workingTimeout: selected });
                }}
                typeDesign="chartsForm"
              />
              <DvtInput
                label={t('Grace Period')}
                placeholder={t('Seconds')}
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
              data={
                DvtAlertReportData.find(
                  item => item.name === 'chartOrDashboard',
                )?.data || []
              }
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
                data={
                  DvtAlertReportData.find(item => item.name === 'pngOrSvg')
                    ?.data || []
                }
                active={chartType}
                setActive={setChartType}
              />
            )}
            {value === 'Dashboard' && (
              <DvtCheckbox
                label={t('Ignore cache when generating screenshot')}
                checked={input.ignore}
                onChange={selected => {
                  setInput({ ...input, ignore: selected });
                }}
              />
            )}
            <StyledAlertAddTitle>
              {t('Notification Method')}
            </StyledAlertAddTitle>
            <DvtInput
              label="EMAIL"
              value={input.email}
              onChange={selected => {
                setInput({ ...input, email: selected });
              }}
              typeDesign="chartsForm"
              type="email"
            />
            <StyledAlertAddButtonGroup>
              <DvtButton bold label={t('Cancel')} onClick={onClose} />
              <DvtButton
                bold
                colour="grayscale"
                label={t('Add')}
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
