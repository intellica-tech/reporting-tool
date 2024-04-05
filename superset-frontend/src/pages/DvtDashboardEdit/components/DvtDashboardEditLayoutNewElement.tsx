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

import React from 'react';
import {
  StyledDashboardLayoutNew,
  StyledDashboardLayoutNewIcon,
  StyledDashboardLayoutNewLabel,
} from '../dvtDashboardEdit.module';

interface DvtDashboardEditLayoutNewElementProps {
  type: 'tabs' | 'row' | 'column' | 'header' | 'text' | 'divider';
}

const DvtDashboardEditLayoutNewElement = ({
  type = 'divider',
}: DvtDashboardEditLayoutNewElementProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('drag-drop-row-id', JSON.stringify({}));
  };

  const iconClassSwitch = () => {
    switch (type) {
      case 'tabs':
        return 'fa fa-window-restore';
      case 'row':
        return 'fa fa-long-arrow-right';
      case 'column':
        return 'fa fa-long-arrow-down';
      case 'header':
        return 'fa fa-header';
      case 'text':
        return 'fa fa-font';
      case 'divider':
        return 'divider';
      default:
        return '';
    }
  };

  return (
    <StyledDashboardLayoutNew draggable onDragStart={handleDragStart}>
      <StyledDashboardLayoutNewIcon className={iconClassSwitch()} />
      <StyledDashboardLayoutNewLabel>{type}</StyledDashboardLayoutNewLabel>
    </StyledDashboardLayoutNew>
  );
};

export default DvtDashboardEditLayoutNewElement;
