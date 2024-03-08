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
};

const columnData = [
  {
    label: 'name',
    value: 'name',
  },
  {
    label: 'color',
    value: 'color',
  },
  {
    label: 'path_json',
    value: 'path_json',
  },
  {
    label: 'polyline',
    value: 'polyline',
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
        if (values.column?.value === 'name') {
          setOptionData(apiNameOptionData);
        } else if (values.column?.value === 'color') {
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
        columnData={columnData}
        optionData={optionData}
        closeOnClick={() => {}}
        saveOnClick={() => console.log(values)}
      />
    </div>
  );
};

Default.args = {
  type: 'x-axis',
};
