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
import DvtInputDrop, { DvtInputDropProps } from './index';
import DvtDargCard from '../DvtDragCard';

export default {
  title: 'Dvt-Components/DvtInputDrop',
  component: DvtInputDrop,
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

export const Default = (args: DvtInputDropProps) => {
  const [droppedData, setDroppedData] = useState<any[]>([]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        gap: 20,
        padding: 20,
      }}
    >
      <DvtInputDrop
        {...args}
        droppedData={droppedData}
        setDroppedData={setDroppedData}
        savedData={[{ label: 'COUNT (*)', value: 'count' }]}
        columnData={columnData}
        datasourceApi="datasource/table/7"
      />
      <DvtDargCard
        label="color"
        value={{ column_name: 'color' }}
        icon="dvt-hashtag"
      />
      <DvtDargCard
        label="path_json"
        value={{ column_name: 'path_json' }}
        icon="dvt-hashtag"
      />
      <DvtDargCard
        label="COUNT(*)"
        value={{
          certification_details: null,
          certified_by: null,
          currency: null,
          d3format: null,
          description: null,
          expression: 'COUNT(*)',
          id: 14,
          is_certified: false,
          metric_name: 'count',
          verbose_name: 'COUNT(*)',
          warning_markdown: null,
          warning_text: null,
        }}
        icon="dvt-hashtag"
      />
    </div>
  );
};
Default.args = {
  placeholder: 'Drop columns here or click',
  label: 'Metrics',
  type: 'aggregates',
  multiple: true,
  popoverLabel: 'Info',
};
