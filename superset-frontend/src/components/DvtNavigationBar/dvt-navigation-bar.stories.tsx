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
  const defaultActiveItem = args.data.find(item => item.active);
  const [active, setActive] = useState<string>(
    defaultActiveItem && defaultActiveItem.url ? defaultActiveItem.url : '',
  );

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <DvtNavigationBar
        data={args.data}
        active={active}
        setActive={setActive}
      />
      <DvtNavigationBar
        data={[
          {
            icon: 'dvt-logout',
            label: 'Log Out',
          },
        ]}
      />
    </div>
  );
};

Default.args = {
  data: [
    {
      icon: 'calendar',
      label: 'Created Content',
      url: 'test',
      active: true,
    },
    { icon: 'calendar', label: 'Schedule', url: 'test1' },
    {
      icon: 'calendar',
      label: 'Recent Activity',
      url: 'test2',
    },
    { icon: 'calendar', label: 'Favorites', url: 'test3' },
    {
      icon: 'calendar',
      label: 'Groups and Roles',
      url: 'test4',
    },
    {
      icon: 'calendar',
      label: 'Query History',
      url: 'test5',
    },
  ],
};
