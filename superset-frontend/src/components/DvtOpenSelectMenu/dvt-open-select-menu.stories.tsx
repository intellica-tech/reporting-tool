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
import React, { useEffect, useState } from 'react';
import DvtOpenSelectMenu, { DvtOpenSelectMenuProps } from '.';

export default {
  title: 'Dvt-Components/DvtOpenSelectMenu',
  component: DvtOpenSelectMenu,
};

const initialValues = {
  saved: '',
  column: '',
  operator: '',
  aggregate: '',
  option: '',
  sql: '',
  expressionType: '',
  clause: '',
};

const columnData = [
  {
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'year',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 1617,
    is_certified: false,
    is_dttm: true,
    python_date_format: '%Y',
    type: 'BIGINT',
    type_generic: 2,
    verbose_name: null,
    warning_markdown: null,
  },
  {
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'publisher',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 428,
    is_certified: false,
    is_dttm: false,
    python_date_format: null,
    type: 'STRING',
    type_generic: 1,
    verbose_name: null,
    warning_markdown: null,
  },
  {
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'global_sales',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 421,
    is_certified: false,
    is_dttm: false,
    python_date_format: null,
    type: 'FLOAT64',
    type_generic: 0,
    verbose_name: null,
    warning_markdown: null,
  },
];

const savedData = [
  {
    certification_details: null,
    certified_by: null,
    currency: null,
    d3format: null,
    description: null,
    expression: 'COUNT(*)',
    id: 14,
    is_certified: false,
    metric_name: 'count',
    verbose_name: 'COUNT(*)',
    warning_markdown: null,
    warning_text: null,
  },
];

const apiNameOptionData = [
  {
    label: 'From Home',
    value: 1,
  },
  {
    label: 'No Perefence',
    value: 2,
  },
  {
    label: 'No Answer',
    value: 3,
  },
  {
    label: 'In an Office (with Other Developers)',
    value: 4,
  },
];

const apiColorOptionData = [
  {
    label: '<NULL>',
    value: 1,
  },
  {
    label: 'A. No high school (secondary school)',
    value: 2,
  },
  {
    label: "F. Bachelor's degree",
    value: 3,
  },
  {
    label: 'C. High school diploma or equivalent (GED)',
    value: 4,
  },
  {
    label: 'I. Ph.D.',
    value: 5,
  },
];

export const Default = (args: DvtOpenSelectMenuProps) => {
  const [values, setValues] = useState<any>(initialValues);
  const [optionData, setOptionData] = useState<any[]>([]);

  useEffect(() => {
    if (args.type === 'filters') {
      if (values.column) {
        if (values.column?.column_name === 'global_sales') {
          setOptionData(apiNameOptionData);
        } else if (values.column?.column_name === 'publisher') {
          setOptionData(apiColorOptionData);
        } else {
          setOptionData([]);
        }
      }
    } else {
      setOptionData([]);
    }
  }, [values.column]);

  return (
    <div>
      <DvtOpenSelectMenu
        {...args}
        values={values}
        setValues={setValues}
        savedData={savedData}
        columnData={columnData}
        optionData={optionData}
        closeOnClick={() => {}}
        saveOnClick={args => console.log({ ...values, ...args })}
      />
    </div>
  );
};

Default.args = {
  type: 'normal',
};
