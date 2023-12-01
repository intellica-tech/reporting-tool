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
import DvtNavigationBar, { DvtNavigationBarProps } from '.';

export default {
  title: 'Dvt-Components/DvtNavigationBar',
  component: DvtNavigationBar,
};

export const Default = (args: DvtNavigationBarProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    args.navigationBarData.findIndex(item => item.active),
  );

  return (
    <div style={{ height: '100vh' }}>
      <DvtNavigationBar
        {...args}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </div>
  );
};

Default.args = {
  navigationBarData: [
    {
      icon: 'calendar',
      label: 'Created Content',
      onClick: () => {},
      active: true,
    },
    { icon: 'calendar', label: 'Schedule', onClick: () => {} },
    { icon: 'calendar', label: 'Recent Activity', onClick: () => {} },
    { icon: 'calendar', label: 'Favorites', onClick: () => {} },
    { icon: 'calendar', label: 'Groups and Roles', onClick: () => {} },
    { icon: 'calendar', label: 'Query History', onClick: () => {} },
    {
      icon: 'calendar',
      label: 'Log Out',
      onClick: () => {},
      flexEnd: true,
    },
  ],
};
