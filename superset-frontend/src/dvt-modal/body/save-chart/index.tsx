/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DvtModalHeader from 'src/components/DvtModalHeader';
import { t } from '@superset-ui/core';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import { ModalProps } from 'src/dvt-modal';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import DvtButton from 'src/components/DvtButton';
import DvtRadioList from 'src/components/DvtRadioList';
import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import useFetch from 'src/dvt-hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import {
  StyledSaveChart,
  StyledSaveChartButtonContainer,
} from './save-chart.module';

const DvtSaveChartModal = ({ onClose }: ModalProps) => {
  const history = useHistory();
  const { addSuccessToast } = useToasts();
  const chartSelector = useAppSelector(state => state.dvtChart);
  const { selectedChart, queryContext, slice } = chartSelector;
  const [active, setActive] = useState(slice.id ? 'save' : 'save_as');
  const [values, setValues] = useState<any>({
    chartName: slice.name ? slice.name : '',
    addToDashboard: '',
  });
  const [chartUrl, setChartUrl] = useState('');
  const [dashboardOption, setDashboardOption] = useState([]);

  const metaDataDashboards =
    active === 'save' && selectedChart.metadata
      ? selectedChart.metadata.dashboards
      : [];

  const searchApiUrls = `dashboard/${fetchQueryParamsSearch({
    columns: ['id', 'dashboard_title'],
    filters: [
      { col: 'dashboard_title', opr: 'ct', value: '' },
      {
        col: 'owners',
        opr: 'rel_m_m',
        value: '1',
      },
    ],
    pageSize: 100,
    orderColumn: 'dashboard_title',
  })}`;

  const dashboardDataPromise = useFetch({ url: searchApiUrls });

  useEffect(() => {
    if (dashboardDataPromise.data) {
      setDashboardOption(
        dashboardDataPromise.data.result
          .filter((f: any) => f.dashboard_title)
          .map((item: any) => ({
            label: item.dashboard_title,
            value: item.id,
          })),
      );
    }
  }, [dashboardDataPromise.data]);

  const paramsRemoveObject = [
    'force',
    'result_format',
    'result_type',
    'url_params',
  ];
  const queryRemoveObject = ['url_params'];

  const paramsRemoveObjects = (form: any, removeObject: any[]) => {
    const updatedForm = { ...form };
    removeObject.forEach(v => delete updatedForm[v]);
    return updatedForm;
  };

  const onDashboard = values.addToDashboard?.value
    ? [
        values.addToDashboard.value,
        ...metaDataDashboards
          .filter((d: { id: number }) => d.id !== values.addToDashboard.value)
          .map((d: { id: number }) => d.id),
      ]
    : metaDataDashboards.map((d: { id: number }) => d.id);

  const onOwners = active === 'save' ? { owners: [1] } : {};

  const chartPromise = useFetch({
    url: chartUrl,
    method: active === 'save' ? 'PUT' : 'POST',
    body: {
      dashboards: onDashboard,
      datasource_id: queryContext?.datasource?.id,
      datasource_type: queryContext?.datasource?.type,
      ...onOwners,
      params: JSON.stringify({
        ...paramsRemoveObjects(queryContext?.form_data, paramsRemoveObject),
        dashboards: onDashboard,
      }),
      query_context: JSON.stringify({
        ...queryContext,
        form_data: {
          ...paramsRemoveObjects(queryContext?.form_data, queryRemoveObject),
          dashboards: onDashboard,
        },
      }),
      slice_name: values.chartName,
      viz_type: queryContext?.form_data?.viz_type,
    },
  });

  useEffect(() => {
    if (chartPromise.data) {
      setTimeout(() => {
        history.push({
          pathname: '/explore/',
          search: `?slice_id=${chartPromise.data.id}`,
          state: {
            update: true,
          },
        });
      }, 200);
      addSuccessToast(t('Chart saved successfully'));
      onClose();
    }
  }, [chartPromise.data]);

  useEffect(() => {
    if (!chartPromise.loading) {
      setChartUrl('');
    }
  }, [chartPromise.loading]);

  const handleSave = () => {
    setChartUrl(active === 'save' ? `chart/${slice.id}` : 'chart/');
  };

  return (
    <>
      <DvtModalHeader title={t('Save chart')} onClose={onClose} />
      <StyledSaveChart>
        <DvtRadioList
          data={[
            {
              label: t('Save (Overwrite)'),
              value: 'save',
              disabled: !slice.id,
            },
            { label: t('Save as...'), value: 'save_as' },
          ]}
          active={active}
          setActive={setActive}
        />
        <DvtInput
          label={t('Chart name')}
          value={values.chartName}
          onChange={v => setValues({ ...values, chartName: v })}
        />
        <DvtSelect
          label={t('Add to dashboard')}
          selectedValue={values.addToDashboard}
          setSelectedValue={v => setValues({ ...values, addToDashboard: v })}
          typeDesign="navbar"
          data={dashboardOption}
          onShowClear
        />
        <StyledSaveChartButtonContainer>
          <DvtButton
            label={t('Cancel')}
            onClick={onClose}
            typeColour="powder"
          />
          <DvtButton
            label={t('Save & Go to dashboard')}
            onClick={() => {}}
            disabled={!(values.chartName && values.addToDashboard)}
          />
          <DvtButton
            label={t('Save')}
            onClick={handleSave}
            disabled={!values.chartName}
            loading={chartPromise.loading}
          />
        </StyledSaveChartButtonContainer>
      </StyledSaveChart>
    </>
  );
};

export default DvtSaveChartModal;
