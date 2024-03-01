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
import { ModalProps } from 'src/dvt-modal';
import useFetch from 'src/hooks/useFetch';
import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import DvtButton from 'src/components/DvtButton';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtTextarea from 'src/components/DvtTextarea';
import { useDispatch } from 'react-redux';
import { dvtRowLevelSecurityAddStatus } from 'src/dvt-redux/dvt-rowlevelsecurityReducer';
import {
  StyledDvtButtons,
  StyledDvtDescription,
  StyledDvtInput,
  StyledDvtInputLabel,
  StyledDvtInputLabelUnneccessary,
  StyledDvtSelect,
  StyledHeadTitle,
  StyledRowLevelSecurity,
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
  const [value, setValue] = useState<InputProps>({
    ruleName: '',
    filterType: { label: '', value: '' },
    datasets: [],
    roles: [],
    groupKey: '',
    clause: '',
    description: '',
  });

  const dispatch = useDispatch();
  const [apiUrl, setApiUrl] = useState<string>('');
  const [datasetData, setDatasetData] = useState<any[]>([]);
  const [rolesData, setRolesData] = useState<any[]>([]);
  const [errorRuleName, setErrorRuleName] = useState<string>('');

  const rowLevelSecurityAddData = useFetch({
    url: apiUrl,
    method: 'POST',
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

  const tablesData = useFetch({
    url: 'rowlevelsecurity/related/tables?q=(filter:%27%27,page:0,page_size:100)',
  });

  useEffect(() => {
    if (tablesData) {
      setDatasetData(
        tablesData.result.map((item: any) => {
          return {
            label: item.text,
            value: item.value,
          };
        }),
      );
    }
  }, [tablesData]);

  const rolesDataPromise = useFetch({
    url: 'rowlevelsecurity/related/roles?q=(filter:%27%27,page:0,page_size:100)',
  });

  useEffect(() => {
    if (rolesDataPromise) {
      setRolesData(
        rolesDataPromise.result.map((item: any) => {
          return {
            label: item.text,
            value: item.value,
          };
        }),
      );
    }
  }, [rolesDataPromise]);

  const handleAdd = () => {
    setApiUrl('rowlevelsecurity/');
  };

  useEffect(() => {
    if (rowLevelSecurityAddData?.id) {
      dispatch(dvtRowLevelSecurityAddStatus('Success'));
      onClose();
      console.log('Close?:');
    }
  }, [rowLevelSecurityAddData]);

  const handleCancel = () => {
    setValue({
      ruleName: '',
      filterType: { label: '', value: '' },
      datasets: [],
      roles: [],
      groupKey: '',
      clause: '',
      description: '',
    });
    onClose();
  };

  useEffect(() => {
    if (apiUrl) {
      setTimeout(() => {
        setApiUrl('');
      }, 2000);
    }
  }, [apiUrl]);

  return (
    <StyledRowLevelSecurity>
      <StyledHeadTitle>+ Add Rule</StyledHeadTitle>
      <StyledDvtInput>
        <StyledDvtInputLabel>RULE NAME</StyledDvtInputLabel>
        <DvtInput
          onChange={newValue => setValue({ ...value, ruleName: newValue })}
          value={value.ruleName}
          typeDesign="form"
          size="small"
        />
      </StyledDvtInput>
      <StyledDvtSelect>
        <StyledDvtInputLabelUnneccessary>
          FILTER TYPE
        </StyledDvtInputLabelUnneccessary>
        <DvtSelect
          data={filterTypeData}
          selectedValue={value.filterType}
          setSelectedValue={selected =>
            setValue({ ...value, filterType: selected })
          }
          width={404}
        />
      </StyledDvtSelect>
      <StyledDvtSelect>
        <StyledDvtInputLabel>DATASETS</StyledDvtInputLabel>
        <DvtInputSelect
          data={datasetData}
          selectedValues={value.datasets}
          setSelectedValues={selected =>
            setValue({ ...value, datasets: selected })
          }
        />
      </StyledDvtSelect>
      <StyledDvtSelect>
        <StyledDvtInputLabelUnneccessary>ROLES</StyledDvtInputLabelUnneccessary>
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
          GROUP KEY
        </StyledDvtInputLabelUnneccessary>
        <DvtInput
          onChange={newValue => setValue({ ...value, groupKey: newValue })}
          value={value.groupKey}
          typeDesign="form"
          size="small"
        />
      </StyledDvtInput>
      <StyledDvtInput>
        <StyledDvtInputLabel>CLAUSE</StyledDvtInputLabel>
        <DvtInput
          onChange={newValue => setValue({ ...value, clause: newValue })}
          value={value.clause}
          typeDesign="form"
          size="small"
        />
      </StyledDvtInput>
      <StyledDvtDescription>
        <StyledDvtInputLabelUnneccessary>
          DESCRIPTION
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
          label="CANCEL"
          onClick={handleCancel}
        />
        <DvtButton
          colour="grayscale"
          typeColour="basic"
          label="ADD"
          onClick={handleAdd}
        />
      </StyledDvtButtons>
    </StyledRowLevelSecurity>
  );
};

export default DvtRowLevelSecurityAdd;