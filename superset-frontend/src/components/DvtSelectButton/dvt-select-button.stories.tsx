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
import DvtSelectButton, { DvtSelectButtonProps } from '.';

export default {
  title: 'Dvt-Components/DvtSelectButton',
  component: DvtSelectButton,
};

export const Default = (args: DvtSelectButtonProps) => {
  const [activeButton, setActiveButton] = useState<string>('');
  return (
    <div style={{ padding: '50px 0 ', width: '256px' }}>
      <DvtSelectButton
        {...args}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
    </div>
  );
};

Default.args = {
  data: [
    {
      popoverLabel: 'Button 1',
      icon: 'dvt-linear_chart',
    },
    {
      popoverLabel: 'Button 2',
      icon: 'dvt-status_up',
    },
    {
      popoverLabel: 'Button 3',
      icon: 'dvt-diagram',
    },
    {
      popoverLabel: 'Button 4',
      icon: 'dvt-chart',
    },
    {
      popoverLabel: 'Button 5',
      icon: 'dvt-4k',
    },
  ],
};
