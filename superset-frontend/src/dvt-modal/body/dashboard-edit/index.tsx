import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import { DvtSchemeColorData } from 'src/components/DvtSelectColorScheme/dvtSchemeColorData';
import useFetch from 'src/hooks/useFetch';
import DvtInput from 'src/components/DvtInput';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtSelectColorScheme from 'src/components/DvtSelectColorScheme';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import DvtCollapse from 'src/components/DvtCollapse';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledDashboardEdit,
  StyledDashboardEditBody,
  StyledDashboardEditGroup,
  StyledDashboardEditInput,
} from './dashboard-edit.module';

const DvtDashboardEdit = ({ meta, onClose }: ModalProps) => {
  const [values, setValues] = useState<any>({
    title: '',
    urlSlug: '',
    owners: [],
    colorSchema: {},
    certifiedBy: '',
    certificationDetails: '',
  });
  const [dashboardApi, setDashboardApi] = useState<string>('');
  const [jsonValue, setJsonValue] = useState<any | null>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dashboardItemApi = useFetch({ url: `dashboard/${meta.id}` });

  useEffect(() => {
    if (dashboardItemApi) {
      const { result } = dashboardItemApi;
      const jsonData = JSON.parse(result.json_metadata || '{}');
      const colorScheme = (jsonData !== '{}' && jsonData?.color_scheme) || null;
      const findedColorSchema = colorScheme
        ? DvtSchemeColorData.find(item => item.id === colorScheme)
        : {};

      const ownersFixed = result.owners.map((item: any) => item.id);

      setValues({
        title: result.dashboard_title || '',
        urlSlug: result.slug || '',
        owners: ownersFixed,
        colorSchema: findedColorSchema,
        certifiedBy: result.certified_by || '',
        certificationDetails: result.certification_details || '',
      });
    }
  }, [dashboardItemApi]);

  const updateDashboardData = useFetch({
    url: dashboardApi,
    method: 'PUT',
    body: {
      certification_details: values.certificationDetails,
      certified_by: values.certifiedBy,
      dashboard_title: values.title,
      owners: values.owners,
      slug: values.urlSlug,
      json_metadata: JSON.stringify(jsonValue),
    },
  });

  const updateDashboardDataFetchResult = useFetch({
    url: 'dashboard/related/owners?q=(filter:%27%27,page:0,page_size:100)',
  });

  const ownersOptions = updateDashboardDataFetchResult
    ? updateDashboardDataFetchResult.result.map((item: any) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  useEffect(() => {
    if (updateDashboardData?.id) {
      onClose();
    }
  }, [onClose, updateDashboardData]);

  const defaultJsonValue = `{
    "color_scheme": "${values.colorSchema?.label || ''}",
    "label_colors": {},
    "timed_refresh_immune_slices": [],
    "expanded_slices": {},
    "refresh_frequency": 0,
    "cross_filters_enabled": true,
    "shared_label_colors": {},
  }`;

  const handleOnChange = (key: string, value: any) => {
    setValues((state: any) => ({ ...state, [key]: value }));
  };

  return (
    <StyledDashboardEdit>
      <DvtModalHeader
        buttonLabel={t('SAVE')}
        onClick={() => setDashboardApi(`dashboard/${meta?.id}`)}
        onClose={onClose}
      />
      <StyledDashboardEditBody>
        <StyledDashboardEditGroup>
          <StyledDashboardEditInput>
            <DvtInput
              value={values.title}
              label={t('Title')}
              onChange={v => handleOnChange('title', v)}
              typeDesign="form"
            />
            <DvtInput
              value={values.certifiedBy}
              label={t('CERTIFIED BY')}
              onChange={v => handleOnChange('certifiedBy', v)}
              typeDesign="form"
            />
            <DvtInputSelect
              label={t('Owners')}
              data={ownersOptions}
              selectedValues={values.owners}
              setSelectedValues={v => handleOnChange('owners', v)}
              typeDesign="form"
            />
          </StyledDashboardEditInput>
          <StyledDashboardEditInput>
            <DvtInput
              value={values.urlSlug}
              label={t('Url Slug')}
              onChange={v => handleOnChange('urlSlug', v)}
              typeDesign="form"
            />
            <DvtSelectColorScheme
              label={t('Color Scheme')}
              selectedValue={values.colorSchema}
              setSelectedValue={v => handleOnChange('colorSchema', v)}
              typeDesign="form"
            />
            <DvtInput
              value={values.certificationDetails}
              label={t('Certification Details')}
              onChange={v => handleOnChange('certificationDetails', v)}
              typeDesign="form"
            />
          </StyledDashboardEditInput>
        </StyledDashboardEditGroup>
        <DvtCollapse label="ADVANCED" isOpen={isOpen} setIsOpen={setIsOpen}>
          <DvtJsonEditor value={defaultJsonValue} onChange={setJsonValue} />
        </DvtCollapse>
      </StyledDashboardEditBody>
    </StyledDashboardEdit>
  );
};

export default DvtDashboardEdit;
