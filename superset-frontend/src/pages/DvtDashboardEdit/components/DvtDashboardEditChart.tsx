/* eslint-disable react-hooks/exhaustive-deps */
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
import useResizeDetectorByObserver from 'src/dvt-hooks/useResizeDetectorByObserver';
import ChartContainer from 'src/components/Chart/ChartContainer';
import DvtSpinner from 'src/components/DvtSpinner';
import Icon from 'src/components/Icons/Icon';
import {
  StyledDashboardDroppedListItem,
  StyledDashboardDroppedListItemTitle,
  StyledDashboardDroppedListItemChart,
} from '../dvtDashboardEdit.module';

interface DvtDashboardEditChartProps {
  item: any;
  meta: { height: number; width: number };
  deleteClick: () => void;
  isEdit: boolean;
  rowChildLength: number;
  totalWidth?: number;
}

const DvtDashboardEditChart = ({
  item,
  meta,
  deleteClick,
  isEdit = false,
  rowChildLength = 0,
}: DvtDashboardEditChartProps) => {
  const {
    ref: chartPanelRef,
    observerRef: resizeObserverRef,
    width: chartPanelWidth,
    height: chartPanelHeight,
  } = useResizeDetectorByObserver();
  const [onHover, setOnHover] = useState(false);

  return (
    <StyledDashboardDroppedListItem
      key={item.id}
      isEdit={isEdit}
      onMouseLeave={() => setOnHover(false)}
      onMouseOver={() => setOnHover(true)}
      style={{
        height: meta?.height * 8,
      }}
    >
      <StyledDashboardDroppedListItemTitle>
        <div>{item.slice_name}</div>
        {isEdit && onHover && (
          <Icon
            style={{ cursor: 'pointer' }}
            fileName="dvt-delete"
            onClick={deleteClick}
          />
        )}
      </StyledDashboardDroppedListItemTitle>
      <StyledDashboardDroppedListItemChart
        ref={resizeObserverRef}
        style={{
          height: `calc(${meta?.height * 8}px - 32px - 50px)`,
          width: `calc(${(100 / 12) * meta?.width}vw - ${
            (((isEdit ? 588 : 108) +
              (rowChildLength - 1) * 15 +
              rowChildLength * 32) /
              12) *
            meta?.width
          }px)`,
        }}
      >
        {item.chartStatus === 'loading' ? (
          <DvtSpinner type="grow" size="xlarge" />
        ) : (
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            ref={chartPanelRef}
          >
            <ChartContainer
              width={chartPanelWidth}
              height={chartPanelHeight}
              ownState={undefined}
              annotationData={undefined}
              chartAlert={null}
              chartStackTrace={null}
              chartId={0}
              chartStatus={item.chartStatus}
              formData={JSON.parse(item.result.params)}
              queriesResponse={item.render}
              timeout={60}
              vizType={item.viz_type}
            />
          </div>
        )}
      </StyledDashboardDroppedListItemChart>
    </StyledDashboardDroppedListItem>
  );
};

export default DvtDashboardEditChart;
