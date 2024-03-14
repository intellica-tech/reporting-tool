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
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'year',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 1617,
    is_certified: false,
    is_dttm: true,
    python_date_format: '%Y',
    type: 'BIGINT',
    type_generic: 2,
    verbose_name: null,
    warning_markdown: null,
  },
  {
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'publisher',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 428,
    is_certified: false,
    is_dttm: false,
    python_date_format: null,
    type: 'STRING',
    type_generic: 1,
    verbose_name: null,
    warning_markdown: null,
  },
  {
    advanced_data_type: null,
    certification_details: null,
    certified_by: null,
    column_name: 'global_sales',
    description: null,
    expression: null,
    filterable: true,
    groupby: true,
    id: 421,
    is_certified: false,
    is_dttm: false,
    python_date_format: null,
    type: 'FLOAT64',
    type_generic: 0,
    verbose_name: null,
    warning_markdown: null,
  },
];

const savedData = [
  {
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
        savedData={savedData}
        columnData={columnData}
        datasourceApi="datasource/table/7"
      />
      <DvtDargCard
        label="year"
        value={{
          advanced_data_type: null,
          certification_details: null,
          certified_by: null,
          column_name: 'year',
          description: null,
          expression: null,
          filterable: true,
          groupby: true,
          id: 1617,
          is_certified: false,
          is_dttm: true,
          python_date_format: '%Y',
          type: 'BIGINT',
          type_generic: 2,
          verbose_name: null,
          warning_markdown: null,
        }}
        icon="clock"
      />
      <DvtDargCard
        label="publisher"
        value={{
          advanced_data_type: null,
          certification_details: null,
          certified_by: null,
          column_name: 'publisher',
          description: null,
          expression: null,
          filterable: true,
          groupby: true,
          id: 428,
          is_certified: false,
          is_dttm: false,
          python_date_format: null,
          type: 'STRING',
          type_generic: 1,
          verbose_name: null,
          warning_markdown: null,
        }}
        icon="field_abc"
      />
      <DvtDargCard
        label="global_sales"
        value={{
          advanced_data_type: null,
          certification_details: null,
          certified_by: null,
          column_name: 'global_sales',
          description: null,
          expression: null,
          filterable: true,
          groupby: true,
          id: 421,
          is_certified: false,
          is_dttm: false,
          python_date_format: null,
          type: 'FLOAT64',
          type_generic: 0,
          verbose_name: null,
          warning_markdown: null,
        }}
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
        icon="function_x"
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
