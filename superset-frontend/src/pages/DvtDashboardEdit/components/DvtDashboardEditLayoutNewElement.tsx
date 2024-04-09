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
  const generateUniqueID = (prefix: string) => {
    const randomString = Math.random().toString(36).substr(2, 10);
    const uniqueID = `${prefix}-${randomString}`;
    return uniqueID;
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rowUnique = generateUniqueID('ROW');
    const columnUnique = generateUniqueID('COLUMN');
    const headerUnique = generateUniqueID('HEADER');
    const markdownUnique = generateUniqueID('MARKDOWN');
    const dividerUnique = generateUniqueID('DIVIDER');

    const dataObject = () => {
      switch (type) {
        case 'row':
          return {
            [rowUnique]: {
              type: 'ROW',
              id: rowUnique,
              children: [],
              parents: ['ROOT_ID', 'GRID_ID'],
              meta: {
                background: 'BACKGROUND_TRANSPARENT',
              },
            },
          };
        case 'column':
          return {
            [columnUnique]: {
              type: 'COLUMN',
              id: columnUnique,
              children: [],
              parents: ['ROOT_ID', 'GRID_ID', rowUnique],
              meta: {
                width: 4,
                background: 'BACKGROUND_TRANSPARENT',
              },
            },
            [rowUnique]: {
              type: 'ROW',
              id: rowUnique,
              children: [columnUnique],
              parents: ['ROOT_ID', 'GRID_ID'],
              meta: {
                background: 'BACKGROUND_TRANSPARENT',
              },
            },
          };
        case 'header':
          return {
            [headerUnique]: {
              type: 'HEADER',
              id: headerUnique,
              children: [],
              parents: ['ROOT_ID', 'GRID_ID'],
              meta: {
                text: 'New header',
                headerSize: 'MEDIUM_HEADER',
                background: 'BACKGROUND_TRANSPARENT',
              },
            },
          };
        case 'text':
          return {
            [markdownUnique]: {
              type: 'MARKDOWN',
              id: markdownUnique,
              children: [],
              parents: ['ROOT_ID', 'GRID_ID', rowUnique],
              meta: {
                width: 4,
                height: 50,
              },
            },
            [rowUnique]: {
              type: 'ROW',
              id: rowUnique,
              children: [markdownUnique],
              parents: ['ROOT_ID', 'GRID_ID'],
              meta: {
                background: 'BACKGROUND_TRANSPARENT',
              },
            },
          };
        case 'divider':
          return {
            [dividerUnique]: {
              type: 'DIVIDER',
              id: dividerUnique,
              children: [],
              parents: ['ROOT_ID', 'GRID_ID'],
              meta: {},
            },
          };
        default:
          return {};
      }
    };

    e.dataTransfer.setData('drag-drop-new', JSON.stringify(dataObject()));
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
