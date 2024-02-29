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
import { Meta } from '@storybook/react';
import DvtList, { SelectedTablesProps } from '.';

export default {
  title: 'Dvt-Components/DvtList',
  component: DvtList,
} as Meta;

const listData = [
  {
    title: 'ab_permision',
    data: [
      { name: 'id', type: 'integer', selectStar: '' },
      { name: 'name', type: 'varchar', selectStar: '' },
      { name: 'title', type: 'string', selectStar: '' },
      { name: 'schema', type: 'string', selectStar: '' },
      { name: 'table', type: 'string', selectStar: '' },
      { name: 'origin', type: 'string', selectStar: '' },
      { name: 'subtitle', type: 'string', selectStar: '' },
      { name: 'chart', type: 'string', selectStar: '' },
      { name: 'earing', type: 'string', selectStar: '' },
      { name: 'bar', type: 'string', selectStar: '' },
      { name: 'run', type: 'string', selectStar: '' },
      { name: 'time', type: 'string', selectStar: '' },
    ],
    selectStar: '',
  },
  {
    title: 'ab_role',
    data: [
      { name: 'origin', type: 'string', selectStar: '' },
      { name: 'subtitle', type: 'string', selectStar: '' },
      { name: 'chart', type: 'string', selectStar: '' },
      { name: 'earing', type: 'string', selectStar: '' },
      { name: 'bar', type: 'string', selectStar: '' },
    ],
    selectStar: '',
  },
  {
    title: 'ap_admin',
    data: [
      { name: 'name', type: 'varchar' },
      { name: 'title', type: 'string' },
      { name: 'schema', type: 'string' },
      { name: 'chart', type: 'string' },
      { name: 'earing', type: 'string' },
      { name: 'bar', type: 'string' },
      { name: 'run', type: 'string' },
      { name: 'time', type: 'string' },
    ],
    selectStar: '',
  },
];

export const Default = () => {
  const [data, setData] = useState<SelectedTablesProps[]>(listData);

  const handleDeleteClick = (item: any) => {
    setData(data.filter(i => i.title !== item.title));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ width: '250px' }}>
        <DvtList data={data} deleteClick={handleDeleteClick} />
      </div>
    </div>
  );
};
