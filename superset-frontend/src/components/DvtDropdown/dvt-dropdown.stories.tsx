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
import DvtDropdown, { DvtDropdownProps } from '.';

export default {
  title: 'Dvt-Components/DvtDropdown',
  component: DvtDropdown,
};

export const Default = (args: DvtDropdownProps) => <DvtDropdown {...args} />;

Default.args = {
  data: [
    { label: 'Edit', icon: 'edit_alt', onClick: () => {} },
    { label: 'Export', icon: 'share', onClick: () => {} },
    { label: 'Delete', icon: 'trash', onClick: () => {} },
  ],
  icon: 'more_vert',
  direction: 'right',
};

export const MenuExample = (args: DvtDropdownProps) => (
  <DvtDropdown {...args} />
);

MenuExample.args = {
  data: [
    { label: 'List Users', onClick: () => {}, menu: 'Security' },
    { label: 'List Roles', onClick: () => {}, menu: 'Security' },
    { label: 'Row Level Security', onClick: () => {}, menu: 'Security' },
    { label: 'Action Log', onClick: () => {}, menu: 'Security' },
    { label: 'Database Connections', onClick: () => {}, menu: 'Data' },
    { label: 'CSS Templates', onClick: () => {}, menu: 'Manage' },
    { label: 'Alerts & Reports', onClick: () => {}, menu: 'Manage' },
    { label: 'Annotation Layers', onClick: () => {}, menu: 'Manage' },
    { label: 'Profile', onClick: () => {}, menu: 'User' },
    { label: 'Info', onClick: () => {}, menu: 'User' },
    { label: 'Logout', onClick: () => {}, menu: 'User' },
    { label: 'Version: 1.1.1-dev', onClick: () => {}, menu: 'About' },
  ],
  icon: 'more_vert',
  direction: 'right',
  menu: ['Security', 'Data', 'Manage', 'User', 'About'],
};
