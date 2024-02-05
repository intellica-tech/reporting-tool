import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtSelectColorScheme from 'src/components/DvtSelectColorScheme';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import {
  StyledDashboardEdit,
  StyledDashboardEditBody,
  StyledDashboardEditGroup,
  StyledDashboardEditHeader,
  StyledDashboardEditInput,
} from './dashboard-edit.module';
import DvtCollapse from 'src/components/DvtCollapse';

const DvtDashboardEdit = ({ meta, onClose }: ModalProps) => {
  const [title, setTitle] = useState<string>(meta.result.dashboard_title);
  const [slugUrl, setSlugUrl] = useState<string>(meta.result.slug);
  const [changedNyName, setChangedByName] = useState<string>(
    meta.result.changed_by_name,
  );
  const [certifiedBy, setCertifiedBy] = useState<string>(
    meta.result.certified_by,
  );
  const [dashboardApi, setDashboardApi] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<any[]>(
    meta.result.owners.map((item: any) => item.id),
  );
  const [selectedColorValues, setSelectedColorValues] = useState<any | null>(
    () => {
      const jsonData = JSON.parse(meta.result.json_metadata || '{}');
      const colorScheme = (jsonData !== '{}' && jsonData.color_scheme) || null;
      return colorScheme ? { label: colorScheme } : '{}';
    },
  );
  const [jsonValue, setJsonValue] = useState<any | null>('');

  const updateDashboardData = useFetch({
    url: dashboardApi,
    method: 'PUT',
    body: {
      certification_details: certifiedBy,
      certified_by: changedNyName,
      dashboard_title: title,
      owners: selectedValues,
      slug: slugUrl,
      json_metadata: jsonValue,
    },
  });

  const updateDashboardDataFetchResult = useFetch({
    url: '/api/v1/dashboard/related/owners?q=(filter:%27%27,page:0,page_size:100)',
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
    "timed_refresh_immune_slices": [],
    "expanded_slices": {},
    "refresh_frequency": 0,
    "color_scheme": "${selectedColorValues?.label || ''}",
    "label_colors": {},
    "cross_filters_enabled": true
  }`;

  return (
    <StyledDashboardEdit>
      <StyledDashboardEditHeader>
        <DvtButton
          colour="primary"
          label={t('SAVE')}
          typeColour="powder"
          onClick={() => setDashboardApi(`/api/v1/dashboard/${meta.result.id}`)}
          size="small"
        />
      </StyledDashboardEditHeader>
      <StyledDashboardEditBody>
        <StyledDashboardEditGroup>
          <StyledDashboardEditInput>
            <DvtInput
              value={title}
              label={t('Title')}
              onChange={setTitle}
              typeDesign="form"
            />
            <DvtInput
              value={changedNyName}
              label={t('CERTIFIED BY')}
              onChange={setChangedByName}
              typeDesign="form"
            />
            <DvtInputSelect
              label={t('Owners')}
              data={ownersOptions}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              typeDesign="form"
            />
          </StyledDashboardEditInput>
          <StyledDashboardEditInput>
            <DvtInput
              value={slugUrl}
              label={t('Url Slug')}
              onChange={setSlugUrl}
              typeDesign="form"
            />
            <DvtSelectColorScheme
              label={t('Color Scheme')}
              selectedValue={selectedColorValues}
              setSelectedValue={setSelectedColorValues}
              typeDesign="form"
            />
            <DvtInput
              value={certifiedBy}
              label={t('Certification Details')}
              onChange={setCertifiedBy}
              typeDesign="form"
            />
          </StyledDashboardEditInput>
        </StyledDashboardEditGroup>
        <DvtCollapse label="ADVANCED">
          <DvtJsonEditor value={defaultJsonValue} onChange={setJsonValue} />
        </DvtCollapse>
      </StyledDashboardEditBody>
    </StyledDashboardEdit>
  );
};

export default DvtDashboardEdit;
