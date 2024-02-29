/* eslint-disable react-hooks/exhaustive-deps */
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
import React from 'react';
import DvtInput from '../DvtInput';
import DvtTextarea from '../DvtTextarea';
import DvtSelect from '../DvtSelect';
import DvtInputSelect from '../DvtInputSelect';
import DvtCheckbox from '../DvtCheckbox';
import {
  StyledDvtAddFormFields,
  StyledFormFieldItem,
  StyledFormFieldItemLabel,
  StyledFormFieldItemLabelImportant,
  StyledFormFieldItemForm,
  StyledFormFieldItemFormDescription,
} from './dvt-add-form-fields.module';

interface FormsProps {
  label: string;
  field: string;
  important?: boolean;
  placehoder?: string;
  status: 'input' | 'textarea' | 'select' | 'select-multiple' | 'checkbox';
  description?: string;
  options?: any[];
}

export interface DvtAddFormFieldsProps {
  forms: FormsProps[];
  values: any;
  setValues: (args: any) => void;
}

const DvtAddFormFields: React.FC<DvtAddFormFieldsProps> = ({
  forms,
  values,
  setValues,
}) => (
  <StyledDvtAddFormFields>
    {forms.map((item: FormsProps, index: number) => (
      <StyledFormFieldItem key={index}>
        <StyledFormFieldItemLabel>
          {item.label}
          {item.important && (
            <StyledFormFieldItemLabelImportant>
              *
            </StyledFormFieldItemLabelImportant>
          )}
        </StyledFormFieldItemLabel>
        <StyledFormFieldItemForm>
          {item.status === 'input' && (
            <DvtInput
              placeholder={item.placehoder}
              value={values[item.field]}
              onChange={v => setValues({ ...values, [item.field]: v })}
            />
          )}
          {item.status === 'textarea' && (
            <DvtTextarea
              placeholder={item.placehoder}
              value={values[item.field]}
              onChange={v => setValues({ ...values, [item.field]: v })}
              typeDesign="border"
            />
          )}
          {item.status === 'select' && (
            <DvtSelect
              placeholder={item.placehoder}
              selectedValue={values[item.field]}
              setSelectedValue={v => setValues({ ...values, [item.field]: v })}
              data={item.options || []}
              typeDesign="navbar"
            />
          )}
          {item.status === 'select-multiple' && (
            <DvtInputSelect
              placeholder={item.placehoder}
              selectedValues={values[item.field]}
              setSelectedValues={v => setValues({ ...values, [item.field]: v })}
              data={item.options || []}
              typeDesign="form"
            />
          )}
          {item.status === 'checkbox' && (
            <DvtCheckbox
              checked={values[item.field]}
              onChange={v => setValues({ ...values, [item.field]: v })}
            />
          )}
          {item.description && (
            <StyledFormFieldItemFormDescription>
              {item.description}
            </StyledFormFieldItemFormDescription>
          )}
        </StyledFormFieldItemForm>
      </StyledFormFieldItem>
    ))}
  </StyledDvtAddFormFields>
);

export default DvtAddFormFields;
