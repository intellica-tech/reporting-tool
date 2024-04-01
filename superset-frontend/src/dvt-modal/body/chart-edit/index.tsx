import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import { useDispatch } from 'react-redux';
import useFetch from 'src/dvt-hooks/useFetch';
import { dvtChartEditStatus } from 'src/dvt-redux/dvt-chartReducer';
import DvtInput from 'src/components/DvtInput';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledChartEdit,
  StyledChartEditBody,
  StyledChartEditGroup,
  StyledChartEditInput,
} from './chart-edit.module';

const DvtChartEdit = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState<any>({
    title: '',
    description: '',
    url: '',
    owners: [],
    cacheTimeout: '',
    certifiedBy: '',
    certificationDetails: '',
  });
  const [chartApi, setChartApi] = useState<string>('');

  useEffect(() => {
    if (meta) {
      const { result } = meta;
      const ownersFixed = result.owners.map((item: any) => item.id);

      setValues({
        title: result.slice_name || '',
        description: result.description || '',
        url: result.url || '',
        owners: ownersFixed,
        cacheTimeout: result.cache_timeout || '',
        certifiedBy: result.certified_by || '',
        certificationDetails: result.certification_details || '',
      });
    }
  }, [meta]);

  const updateChartData = useFetch({
    url: chartApi,
    method: 'PUT',
    body: {
      cache_timeout: values.cacheTimeout ? values.cacheTimeout : undefined,
      certification_details: values.certificationDetails,
      certified_by: values.certifiedBy,
      description: values.description,
      slice_name: values.title,
      owners: values.owners,
    },
  });

  const updateChartDataFetchResult = useFetch({
    url: 'dashboard/related/owners?q=(filter:%27%27,page:0,page_size:100)',
  });

  const ownersOptions = updateChartDataFetchResult.data
    ? updateChartDataFetchResult.data.result.map((item: any) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  useEffect(() => {
    if (updateChartData.data?.id) {
      dispatch(dvtChartEditStatus('Success'));
      onClose();
    }
  }, [onClose, updateChartData.data]);

  const handleOnChange = (key: string, value: any) => {
    setValues((state: any) => ({ ...state, [key]: value }));
  };

  useEffect(() => {
    if (!updateChartData.loading) {
      setChartApi('');
    }
  }, [updateChartData.loading]);

  return (
    <StyledChartEdit>
      <DvtModalHeader
        buttonLabel={t('SAVE')}
        onClick={() => setChartApi(`chart/${meta?.id}`)}
        onClose={onClose}
      />
      <StyledChartEditBody>
        <StyledChartEditGroup>
          <StyledChartEditInput>
            {meta.title}
            <DvtInput
              value={values.title}
              label={t('Name')}
              onChange={v => handleOnChange('title', v)}
              typeDesign="form"
            />
            <DvtInput
              value={values.description}
              label={t('Description')}
              onChange={v => handleOnChange('description', v)}
              typeDesign="form"
            />
            <DvtInput
              value={values.certifiedBy}
              label={t('Certified By')}
              onChange={v => handleOnChange('certifiedBy', v)}
              typeDesign="form"
            />
            <DvtInput
              value={values.certificationDetails}
              label={t('Certified Details')}
              onChange={v => handleOnChange('certificationDetails', v)}
              typeDesign="form"
            />
          </StyledChartEditInput>
          <StyledChartEditInput>
            <DvtInput
              value={values.cacheTimeout}
              label={t('Cache Timeout')}
              onChange={v => handleOnChange('cacheTimeout', v)}
              typeDesign="form"
              number
            />
            <DvtInputSelect
              label={t('Owners')}
              data={ownersOptions}
              selectedValues={values.owners}
              setSelectedValues={v => handleOnChange('owners', v)}
              typeDesign="form"
            />
          </StyledChartEditInput>
        </StyledChartEditGroup>
      </StyledChartEditBody>
    </StyledChartEdit>
  );
};

export default DvtChartEdit;
