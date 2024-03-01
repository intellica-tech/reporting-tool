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
import DvtInputSelect, { DvtInputSelectProps } from './index';

export default {
  title: 'Dvt-Components/DvtInputSelect',
  component: DvtInputSelect,
};

export const Default = (args: DvtInputSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  const exampleData = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
    { label: 'Option 4', value: 4 },
    { label: 'Option 5', value: 5 },
    { label: 'Option 6', value: 6 },
    { label: 'Option 7', value: 7 },
    { label: 'Option 8', value: 8 },
    { label: 'Option 9', value: 9 },
    { label: 'Option 10', value: 10 },
  ];
  return (
    <div style={{ width: 404 }}>
      <DvtInputSelect
        {...args}
        data={exampleData}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    </div>
  );
};

Default.argTypes = {
  label: {
    control: { type: 'text' },
    defaultValue: 'Select Option',
  },
  placeholder: {
    control: { type: 'text' },
    defaultValue: 'Select...',
  },
};

export const Number = (args: DvtInputSelectProps) => {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);
  return (
    <div style={{ width: 404 }}>
      <DvtInputSelect
        {...args}
        data={[]}
        startNumber={0}
        endNumber={24}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
      />
    </div>
  );
};
