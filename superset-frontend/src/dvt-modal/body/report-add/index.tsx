/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtSwitch from 'src/components/DvtSwitch';
import { dvtAlertAddStatus } from 'src/dvt-redux/dvt-alertReducer';
import DvtSelect from 'src/components/DvtSelect';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtRadioList from 'src/components/DvtRadioList';
import DvtInput from 'src/components/DvtInput';
import DvtConditionSchedule from 'src/components/DvtConditionSchedule';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtModalHeader from 'src/components/DvtModalHeader';
import DvtInputSelect from 'src/components/DvtInputSelect';
import { DvtTimezoneData, DvtAlertReportData } from '../../alert-reportData';
import {
  StyledAlertAdd,
  StyledAlertAddBody,
  StyledAlertAddLeftMenu,
  StyledAlertAddSelectGroup,
  StyledAlertAddLine,
  StyledAlertAddItemGroup,
  StyledAlertAddScheduleSettings,
  StyledAlertAddTitle,
  StyledAlertAddReportSchedule,
  StyledAlertAddMessageContent,
  StyledAlertAddButtonGroup,
  StyledAlertAddInputFlex,
} from './report-add-modal.module';

interface InputProps {
  timezone: { label: string; value: string };
  logRetention: { label: string; value: number };
  workingTimeout: number;
  messageContent: { label: string; value: string };
  owners: { label: string; value: number }[];
  reportName: string;
  description: string;
  ignore: boolean;
  schedule: string;
  email: string;
  active: boolean;
}

const DvtReportAdd = ({ meta, onClose }: ModalProps) => {
  const [input, setInput] = useState<InputProps>({
    timezone: {
      label: t('GMT +03:00 (Antarctica/Syowa)'),
      value: t('Antarctica/Syowa'),
    },
    logRetention: {
      label: t('90 days'),
      value: 90,
    },
    workingTimeout: 3600,
    messageContent: { label: '', value: '' },
    owners: [],
    reportName: '',
    description: '',
    ignore: false,
    schedule: '',
    email: '',
    active: false,
  });

  const dispatch = useDispatch();
  const [value, setValue] = useState('Dashboard');
  const [chartType, setChartType] = useState('PNG');
  const [apiUrl, setApiUrl] = useState<string>('');

  useEffect(() => {
    setInput({ ...input, messageContent: { label: '', value: '' } });
  }, [value]);

  const alertAddData = useFetch({
    url: apiUrl,
    method: meta?.isEdit ? 'PUT' : 'POST',
    body: {
      active: input.active,
      chart: value === 'Chart' ? input.messageContent.value : null,
      context_markdown: 'string',
      creation_method: 'alerts_reports',
      crontab: input.schedule,
      dashboard: value === 'Dashboard' ? input.messageContent.value : null,
      description: input.description,
      force_screenshot: input.ignore,
      log_retention: input.logRetention.value,
      name: input.reportName,
      owners: input.owners,
      recipients: [
        {
          recipient_config_json: {
            target: input.email,
          },
          type: 'Email',
        },
      ],
      report_format: chartType,
      sql: '',
      timezone: input.timezone.value,
      type: 'Report',
      validator_type: 'operator',
      working_timeout: input.workingTimeout,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (alertAddData.data?.id) {
      dispatch(dvtAlertAddStatus('Success'));
      onClose();
    }
  }, [alertAddData.data]);

  const ownersData = useFetch({
    url: '/report/related/created_by?q=(filter:%27%27,page:0,page_size:100)',
  });

  const chartData = useFetch({
    url: '/report/related/chart?q=(filter:%27%27,page:0,page_size:100)',
  });

  const dashboardData = useFetch({
    url: '/report/related/dashboard?q=(filter:%27%27,page:0,page_size:100)',
  });

  const ownersOptions: { label: string; value: number }[] =
    ownersData.data?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    })) || [];

  const chartOptions: { label: string; value: string }[] =
    chartData.data?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  const dashboardOptions: { label: string; value: string }[] =
    dashboardData.data?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    }));

  useEffect(() => {
    if (!alertAddData.loading) {
      setApiUrl('');
    }
  }, [alertAddData.loading]);

  useEffect(() => {
    if (meta?.isEdit) {
      const timezoneLabel =
        DvtTimezoneData.find(
          item => item.value === meta.editedAlertReportData.result.timezone,
        )?.label || '';
      const alertType = meta.editedAlertReportData.result.dashboard
        ? 'Dashboard'
        : 'Chart';

      const logRetention =
        DvtAlertReportData.find(
          item => item.name === 'scheduleSettings',
        )?.data.find(
          item =>
            item.value === meta.editedAlertReportData.result.log_retention,
        )?.label || '';

      const owner: { label: string; value: number }[] =
        meta.editedAlertReportData.result.owners.map((item: any) => ({
          label: item.text,
          value: item.value,
        })) || [];

      setValue(alertType);
      setInput(prevState => ({
        ...prevState,
        timezone: {
          value: meta.editedAlertReportData.result.timezone,
          label: timezoneLabel,
        },
        logRetention: {
          value: meta.editedAlertReportData.result.log_retention,
          label: logRetention,
        },
        workingTimeout: meta.editedAlertReportData.result.working_timeout,
        owners: owner,
        reportName: meta.editedAlertReportData.result.name,
        description: meta.editedAlertReportData.result.description,
        schedule: meta.editedAlertReportData.result.crontab,
        ignore: meta.editedAlertReportData.result.force_screenshot,
        email: JSON.parse(
          meta.editedAlertReportData.result.recipients[0].recipient_config_json,
        ).target,
        active: meta.editedAlertReportData.result.active,
        messageContent:
          alertType === 'Dashboard'
            ? {
                value: meta.editedAlertReportData.result.dashboard.id,
                label:
                  meta.editedAlertReportData.result.dashboard.dashboard_title,
              }
            : {
                value: meta.editedAlertReportData.result.chart.id,
                label: meta.editedAlertReportData.result.chart.slice_name,
              },
      }));
      setChartType(meta.editedAlertReportData.result.report_format);
    }
  }, [meta]);

  useEffect(() => {
    if (ownersData.data?.result) {
      const ownersValues = ownersData.data.result.map(
        (item: any) => item.value,
      );
      setInput(prevState => ({
        ...prevState,
        owners: ownersValues,
      }));
    }
  }, [ownersData.data]);

  return (
    <StyledAlertAdd>
      <DvtModalHeader
        buttonIcon="dvt-add_square"
        buttonLabel={t('Add Report')}
        onClick={() => {}}
        onClose={onClose}
      />
      <StyledAlertAddBody>
        <div>
          <StyledAlertAddLeftMenu>
            <DvtSwitch
              label={t('Active')}
              checked={input.active}
              onChange={bol => {
                setInput({ ...input, active: bol });
              }}
            />
            <StyledAlertAddLine />
            <StyledAlertAddSelectGroup>
              <DvtInput
                label={t('Report Name')}
                placeholder={t('Report Name')}
                value={input.reportName}
                onChange={selected => {
                  setInput({ ...input, reportName: selected });
                }}
                typeDesign="chartsForm"
              />
              <DvtInputSelect
                data={ownersOptions}
                label={t('Owners')}
                placeholder={t('Select...')}
                selectedValues={input.owners}
                setSelectedValues={selected => {
                  setInput({ ...input, owners: selected });
                }}
                typeDesign="chartsForm"
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
            <StyledAlertAddReportSchedule>
              <StyledAlertAddTitle>{t('Report Schedule')}</StyledAlertAddTitle>
              <DvtConditionSchedule
                schedule={input.schedule}
                setSchedule={(selected: string) => {
                  const newValue =
                    selected === '' ? '0 * * * *' : String(selected);
                  setInput({ ...input, schedule: newValue });
                }}
              />
              <DvtSelect
                data={DvtTimezoneData}
                label={t('Timezone')}
                placeholder="GMT +03:00 (Antarctica)"
                selectedValue={input.timezone}
                setSelectedValue={selected => {
                  setInput({ ...input, timezone: selected });
                }}
                typeDesign="form"
              />
            </StyledAlertAddReportSchedule>
            <StyledAlertAddScheduleSettings>
              <StyledAlertAddTitle>
                {t('Schedule Settings')}
              </StyledAlertAddTitle>
              <div style={{ display: 'flex' }}>
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
                    value={input.workingTimeout.toString()}
                    onChange={selected => {
                      setInput({
                        ...input,
                        workingTimeout: parseInt(selected, 10),
                      });
                    }}
                    typeDesign="chartsForm"
                  />
                </StyledAlertAddInputFlex>
              </div>
            </StyledAlertAddScheduleSettings>
            <StyledAlertAddMessageContent>
              <StyledAlertAddTitle>{t('Message Content')}</StyledAlertAddTitle>
              <div style={{ display: 'flex', gap: '40px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '10px',
                  }}
                >
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
                        DvtAlertReportData.find(
                          item => item.name === 'pngOrSvg',
                        )?.data || []
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
                </div>
                <div>
                  <StyledAlertAddButtonGroup>
                    <DvtButton bold label={t('Cancel')} onClick={onClose} />
                    <DvtButton
                      bold
                      colour="grayscale"
                      label={meta?.isEdit ? t('Save') : t('Add')}
                      onClick={() =>
                        meta?.isEdit
                          ? setApiUrl(`report/${meta.editedAlertReportData.id}`)
                          : setApiUrl('/report/')
                      }
                      loading={alertAddData.loading}
                    />
                  </StyledAlertAddButtonGroup>
                </div>
              </div>
            </StyledAlertAddMessageContent>
          </StyledAlertAddItemGroup>
        </div>
      </StyledAlertAddBody>
    </StyledAlertAdd>
  );
};

export default DvtReportAdd;
