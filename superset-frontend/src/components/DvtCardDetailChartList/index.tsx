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
import DvtCardDetailChart from '../DvtCardDetailChart';
import { StyledDvtCardDetailChartList } from './dvt-card-detail-chart-list.module';

export interface CardDetailChartDataProps {
  id?: number;
  slice_name: string;
  viz_type: string;
  datasource_name_text: string;
  datasource_url: string;
  changed_on_delta_humanized: string;
}

export interface DvtCardDetailChartListProps {
  data: CardDetailChartDataProps[];
  added: number[];
}

const DvtCardDetailChartList: React.FC<DvtCardDetailChartListProps> = ({
  data = [],
  added = [],
}) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    draggedData: CardDetailChartDataProps,
  ) => {
    e.dataTransfer.setData('drag-drop', JSON.stringify(draggedData));
  };

  return (
    <StyledDvtCardDetailChartList>
      {data.map((item: any, index) => (
        <div
          onDragStart={e => handleDragStart(e, item)}
          draggable={!added.includes(item.id)}
          key={index}
        >
          <DvtCardDetailChart
            slice_name={item.slice_name}
            viz_type={item.viz_type}
            datasource_name_text={item.datasource_name_text}
            datasource_url={
              item.datasource_url === null ? '' : item.datasource_url
            }
            changed_on_delta_humanized={item.changed_on_delta_humanized}
            added={added.includes(item.id)}
          />
        </div>
      ))}
    </StyledDvtCardDetailChartList>
  );
};

export default DvtCardDetailChartList;
