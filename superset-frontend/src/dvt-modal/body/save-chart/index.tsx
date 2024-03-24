/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
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
import {
  StyledSaveChart,
  StyledSaveChartButtonContainer,
} from './save-chart.module';

const DvtSaveChartModal = ({ onClose }: ModalProps) => {
  const { addSuccessToast } = useToasts();
  const chartSelector = useAppSelector(state => state.dvtChart);
  const [active, setActive] = useState('save_as');
  const [values, setValues] = useState({
    chartName: '',
    addToDashboard: '',
  });
  const [chartUrl, setChartUrl] = useState('');

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

  const { queryContext } = chartSelector;

  const chartPromise = useFetch({
    url: chartUrl,
    method: 'POST',
    body: {
      dashboards: values.addToDashboard ? [] : [],
      datasource_id: queryContext?.datasource?.id,
      datasource_type: queryContext?.datasource?.type,
      params: JSON.stringify({
        ...paramsRemoveObjects(queryContext?.form_data, paramsRemoveObject),
        dashboards: [],
      }),
      query_context: JSON.stringify({
        ...queryContext,
        form_data: {
          ...paramsRemoveObjects(queryContext?.form_data, queryRemoveObject),
          dashboards: [],
        },
      }),
      slice_name: values.chartName,
      viz_type: queryContext?.form_data?.viz_type,
    },
  });

  useEffect(() => {
    if (chartPromise.data) {
      // slice id add
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
    setChartUrl('chart');
  };

  return (
    <>
      <DvtModalHeader title={t('Save chart')} onClose={onClose} />
      <StyledSaveChart>
        <DvtRadioList
          data={[
            { label: t('Save (Overwrite)'), value: 'save', disabled: true },
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
          data={[]}
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
