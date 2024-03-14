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
import useFetch from 'src/dvt-hooks/useFetch';
import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import DvtButton from 'src/components/DvtButton';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtTextarea from 'src/components/DvtTextarea';
import { useDispatch } from 'react-redux';
import { dvtRowLevelSecurityAddStatus } from 'src/dvt-redux/dvt-rowlevelsecurityReducer';
import DvtModalHeader from 'src/components/DvtModalHeader';
import {
  StyledDvtButtons,
  StyledDvtDescription,
  StyledDvtInput,
  StyledDvtInputLabel,
  StyledDvtInputLabelUnneccessary,
  StyledDvtSelect,
  StyledRowLevelSecurity,
  StyledRowLevelSecurityBody,
} from './rowlevelsecurity-add.module';

const filterTypeData = [
  {
    label: 'Regular',
    value: 'Regular',
  },
  {
    label: 'Base',
    value: 'Base',
  },
];

interface InputProps {
  ruleName: string;
  filterType: { label: string; value: string };
  datasets: any[];
  roles: any[];
  groupKey: string;
  clause: string;
  description: string;
}

const DvtRowLevelSecurityAdd = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<InputProps>({
    ruleName: '',
    filterType: { label: '', value: '' },
    datasets: [],
    roles: [],
    groupKey: '',
    clause: '',
    description: '',
  });
  const [apiUrl, setApiUrl] = useState<string>('');
  const [datasetData, setDatasetData] = useState<any[]>([]);
  const [rolesData, setRolesData] = useState<any[]>([]);

  const rowLevelSecurityAddData = useFetch({
    url: apiUrl,
    method: meta?.isEdit ? 'PUT' : 'POST',
    body: {
      name: value.ruleName,
      description: value.description,
      filter_type: value.filterType.value,
      group_key: value.groupKey,
      clause: value.clause,
      roles: value.roles.length ? value.roles : [],
      tables: value.datasets.length ? value.datasets : [],
    },
  });

  useEffect(() => {
    if (meta?.isEdit) {
      setValue({
        ruleName: meta.name,
        filterType: { label: meta.filter_type, value: meta.value },
        datasets: meta.tables.map((item: any) => item.id),
        roles: meta.roles.map((item: any) => item.id),
        groupKey: meta.group_key,
        clause: meta.clause,
        description: meta.description,
      });
    }
  }, [meta]);

  const tablesData = useFetch({
    url: 'rowlevelsecurity/related/tables?q=(filter:%27%27,page:0,page_size:100)',
  });

  useEffect(() => {
    if (tablesData.data) {
      setDatasetData(
        tablesData.data.result.map((item: any) => ({
          label: item.text,
          value: item.value,
        })),
      );
    }
  }, [tablesData.data]);

  const rolesDataPromise = useFetch({
    url: 'rowlevelsecurity/related/roles?q=(filter:%27%27,page:0,page_size:100)',
  });

  useEffect(() => {
    if (rolesDataPromise.data) {
      setRolesData(
        rolesDataPromise.data.result.map((item: any) => ({
          label: item.text,
          value: item.value,
        })),
      );
    }
  }, [rolesDataPromise.data]);

  useEffect(() => {
    if (rowLevelSecurityAddData.data?.id) {
      dispatch(dvtRowLevelSecurityAddStatus('Success'));
      onClose();
    }
  }, [rowLevelSecurityAddData.data]);

  useEffect(() => {
    if (!rowLevelSecurityAddData.loading) {
      setApiUrl('');
    }
  }, [rowLevelSecurityAddData.loading]);

  return (
    <StyledRowLevelSecurity>
      <DvtModalHeader title={t('+ Add Rule')} onClose={onClose} />
      <StyledRowLevelSecurityBody>
        <StyledDvtInput>
          <StyledDvtInputLabel>{t('RULE NAME')}</StyledDvtInputLabel>
          <DvtInput
            onChange={newValue => setValue({ ...value, ruleName: newValue })}
            value={value.ruleName}
            typeDesign="form"
            size="small"
          />
        </StyledDvtInput>
        <StyledDvtSelect>
          <StyledDvtInputLabelUnneccessary>
            {t('FILTER TYPE')}
          </StyledDvtInputLabelUnneccessary>
          <DvtSelect
            data={filterTypeData}
            selectedValue={value.filterType}
            setSelectedValue={selected =>
              setValue({ ...value, filterType: selected })
            }
            typeDesign="form"
            maxWidth
          />
        </StyledDvtSelect>
        <StyledDvtSelect>
          <StyledDvtInputLabel>{t('DATASETS')}</StyledDvtInputLabel>
          <DvtInputSelect
            data={datasetData}
            selectedValues={value.datasets}
            setSelectedValues={selected =>
              setValue({ ...value, datasets: selected })
            }
          />
        </StyledDvtSelect>
        <StyledDvtSelect>
          <StyledDvtInputLabelUnneccessary>
            {t('ROLES')}
          </StyledDvtInputLabelUnneccessary>
          <DvtInputSelect
            data={rolesData}
            selectedValues={value.roles}
            setSelectedValues={selected =>
              setValue({ ...value, roles: selected })
            }
          />
        </StyledDvtSelect>
        <StyledDvtInput>
          <StyledDvtInputLabelUnneccessary>
            {t('GROUP KEY')}
          </StyledDvtInputLabelUnneccessary>
          <DvtInput
            onChange={newValue => setValue({ ...value, groupKey: newValue })}
            value={value.groupKey}
            typeDesign="form"
            size="small"
          />
        </StyledDvtInput>
        <StyledDvtInput>
          <StyledDvtInputLabel>{t('CLAUSE')}</StyledDvtInputLabel>
          <DvtInput
            onChange={newValue => setValue({ ...value, clause: newValue })}
            value={value.clause}
            typeDesign="form"
            size="small"
          />
        </StyledDvtInput>
        <StyledDvtDescription>
          <StyledDvtInputLabelUnneccessary>
            {t('DESCRIPTION')}
          </StyledDvtInputLabelUnneccessary>
          <DvtTextarea
            onChange={newValue => setValue({ ...value, description: newValue })}
            value={value.description}
            typeDesign="form"
          />
        </StyledDvtDescription>
        <StyledDvtButtons>
          <DvtButton
            colour="primary"
            typeColour="powder"
            label={t('CANCEL')}
            onClick={onClose}
          />
          <DvtButton
            colour={meta?.isEdit ? 'primary' : 'grayscale'}
            typeColour="basic"
            label={meta?.isEdit ? t('SAVE') : t('ADD')}
            loading={rowLevelSecurityAddData.loading}
            onClick={() =>
              meta?.isEdit
                ? setApiUrl(`rowlevelsecurity/${meta?.id}`)
                : setApiUrl('rowlevelsecurity/')
            }
          />
        </StyledDvtButtons>
      </StyledRowLevelSecurityBody>
    </StyledRowLevelSecurity>
  );
};

export default DvtRowLevelSecurityAdd;
