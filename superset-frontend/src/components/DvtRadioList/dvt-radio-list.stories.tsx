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
import DvtRadioList, { DvtRadioListProps } from '.';

export default {
  title: 'Dvt-Components/DvtRadioList',
  component: DvtRadioList,
};

const data = [
  { label: 'Radio 1', value: 'radio1' },
  { label: 'Radio 2', value: 'radio2' },
  { label: 'Radio 3', value: 'radio3' },
  { label: 'Radio 4', value: 'radio4' },
  { label: 'Radio 5', value: 'radio5' },
  { label: 'Radio 6', value: 'radio6' },
];

export const Default = (args: DvtRadioListProps) => {
  const [active, setActive] = useState<string>('');
  return (
    <div style={{ width: '300px' }}>
      <DvtRadioList
        {...args}
        data={data}
        active={active}
        setActive={setActive}
      />
    </div>
  );
};

export const VerticalExample = (args: DvtRadioListProps) => {
  const [active, setActive] = useState<string>('');
  return (
    <div style={{ width: '300px' }}>
      <DvtRadioList
        {...args}
        data={data}
        direction="vertical"
        active={active}
        setActive={setActive}
      />
    </div>
  );
};
