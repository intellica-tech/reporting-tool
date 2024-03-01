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
import React, { useState } from 'react';
import { supersetTheme } from '@superset-ui/core';
import DvtAddFormFields, { DvtAddFormFieldsProps } from '.';

export default {
  title: 'Dvt-Components/DvtAddFormFields',
  component: DvtAddFormFields,
};

export const Default = (args: DvtAddFormFieldsProps) => {
  const [values, setValues] = useState<any>({
    firstName: '',
    isActive: false,
    role: [],
    filterType: { label: '', value: '' },
    clause: '',
  });

  return (
    <div
      style={{
        backgroundColor: supersetTheme.colors.dvt.primary.light2,
        padding: 30,
        width: '70vw',
      }}
    >
      <DvtAddFormFields {...args} values={values} setValues={setValues} />
    </div>
  );
};

Default.args = {
  forms: [
    {
      label: 'First Name',
      field: 'firstName',
      important: true,
      placehoder: 'First Name',
      status: 'input',
      description: 'Write the user first name or names',
    },
    {
      label: 'Is Active?',
      field: 'isActive',
      status: 'checkbox',
      description:
        'Username valid for authentication on DB or LDAP, unused for OID auth',
    },
    {
      label: 'Role',
      field: 'role',
      placehoder: 'Select Value',
      status: 'select-multiple',
      options: [
        { label: 'Regular', value: 1 },
        { label: 'Base', value: 2 },
      ],
      description:
        'The user role on the application, this will associate with a list of permissions',
    },
    {
      label: 'Filter Type',
      field: 'filterType',
      placehoder: 'Regular',
      status: 'select',
      options: [
        { label: 'Regular', value: 1 },
        { label: 'Base', value: 2 },
      ],
      description:
        'Regular filters add where clauses . to queries if a user belongs to a role  referenced in the filter. Base filters apply . filters to all queries expect the roles defined in the filter, and can be used to define what users can see if no RLS filters within a filter group apply to them. ',
    },
    {
      label: 'Clause',
      field: 'clause',
      important: true,
      placehoder: 'Clause',
      status: 'textarea',
      description:
        'nd web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in thei',
    },
  ],
};
