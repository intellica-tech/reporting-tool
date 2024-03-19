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
import DvtRadio from '.';

export default {
  title: 'Dvt-Components/DvtRadio',
  component: DvtRadio,
};

export const Default = () => {
  const [active, setActive] = useState<string>('');

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <DvtRadio
        active={active}
        setActive={setActive}
        label="Radio 1"
        value="1"
      />
      <DvtRadio
        active={active}
        setActive={setActive}
        label="Radio 2"
        value="2"
      />
    </div>
  );
};

export const Disabled = () => {
  const [active, setActive] = useState<string>('');

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <DvtRadio
        active={active}
        setActive={setActive}
        label="Radio 1"
        value="1"
        disabled
      />
      <DvtRadio
        active={active}
        setActive={setActive}
        label="Radio 2"
        value="2"
        disabled
      />
    </div>
  );
};
