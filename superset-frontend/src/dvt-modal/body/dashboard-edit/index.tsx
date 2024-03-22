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
import { ModalProps } from 'src/dvt-modal';
import { DvtSchemeColorData } from 'src/components/DvtSelectColorScheme/dvtSchemeColorData';
import useFetch from 'src/dvt-hooks/useFetch';
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
  const [jsonValue, setJsonValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dashboardItemApi = useFetch({ url: `dashboard/${meta.id}` });

  useEffect(() => {
    if (dashboardItemApi.data) {
      const { result } = dashboardItemApi.data;
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
  }, [dashboardItemApi.data]);

  const updateDashboardData = useFetch({
    url: dashboardApi,
    method: 'PUT',
    body: {
      certification_details: values.certificationDetails,
      certified_by: values.certifiedBy,
      dashboard_title: values.title,
      owners: values.owners,
      slug: values.urlSlug,
      json_metadata: jsonValue,
    },
  });

  const updateDashboardDataFetchResult = useFetch({
    url: 'dashboard/related/owners?q=(filter:%27%27,page:0,page_size:100)',
  });

  const ownersOptions = updateDashboardDataFetchResult.data
    ? updateDashboardDataFetchResult.data.result.map((item: any) => ({
        label: item.text,
        value: item.value,
      }))
    : [];

  useEffect(() => {
    if (updateDashboardData.data?.id) {
      onClose();
    }
  }, [onClose, updateDashboardData.data]);

  useEffect(() => {
    const formattedJson = `{
      "color_scheme": "${values.colorSchema?.id || ''}",
      "label_colors": {},
      "shared_label_colors": {},
      "color_scheme_domain": [
        ${
          values.colorSchema?.colors
            ?.map((color: string) => `"${color}"`)
            .join(',\n    ') || ''
        }
      ]
    }`;

    setJsonValue(formattedJson);
  }, [values.colorSchema]);

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
          <DvtJsonEditor value={jsonValue} onChange={setJsonValue} />
        </DvtCollapse>
      </StyledDashboardEditBody>
    </StyledDashboardEdit>
  );
};

export default DvtDashboardEdit;
