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

import React, { ReactNode, useState } from 'react';
import Icon from 'src/components/Icons/Icon';
import { supersetTheme } from '@superset-ui/core';
import {
  StyledDashboardDroppedRow,
  StyledDashboardDroppedRowGrid,
  StyledDashboardDroppedRowOptions,
} from '../dvtDashboardEdit.module';

interface DvtDashboardEditRowProps {
  children: ReactNode;
  deleteClick: () => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  rowId: string;
  isEdit: boolean;
}

const DvtDashboardEditRow = ({
  children,
  deleteClick,
  onDrop,
  rowId = '',
  isEdit = false,
}: DvtDashboardEditRowProps) => {
  const [onHover, setOnHover] = useState<boolean>(false);
  const [onDraggable, setOnDraggable] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData('drag-drop-row-id', JSON.stringify(id));
  };

  return (
    <StyledDashboardDroppedRow
      onMouseLeave={() => setOnHover(false)}
      onMouseOver={() => setOnHover(true)}
      draggable={onDraggable}
      onDragStart={e => handleDragStart(e, rowId)}
    >
      {isEdit && onHover && (
        <StyledDashboardDroppedRowOptions>
          <Icon
            style={{ cursor: 'move' }}
            fileName="drag"
            iconColor={supersetTheme.colors.dvt.grayscale.base}
            onMouseDown={() => setOnDraggable(true)}
            onMouseUp={() => setOnDraggable(false)}
          />
          <Icon
            fileName="dvt-delete"
            iconColor={supersetTheme.colors.dvt.grayscale.base}
            onClick={deleteClick}
          />
        </StyledDashboardDroppedRowOptions>
      )}
      <StyledDashboardDroppedRowGrid
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
        isEdit={isEdit}
      >
        {children}
      </StyledDashboardDroppedRowGrid>
    </StyledDashboardDroppedRow>
  );
};

export default DvtDashboardEditRow;
