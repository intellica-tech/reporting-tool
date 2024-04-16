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
import DvtAceEditor from 'src/components/DvtAceEditor';
import Icon from 'src/components/Icons/Icon';
import { Resizable } from 're-resizable';
import {
  StyledDashboardDroppedListItem,
  StyledDashboardDroppedListItemTitle,
  StyledDashboardDroppedListItemChart,
} from '../dvtDashboardEdit.module';

interface DvtDashboardEditMarkdownProps {
  value: string;
  setValue: (value: string) => void;
  markdownItem: any;
  totalWidth: number;
  deleteClick: () => void;
  isEdit: boolean;
  onReSize: boolean;
  setOnReSize: (args: string) => void;
  setSize: (sizes: { height: number; width: number }) => void;
}

const DvtDashboardEditMarkdown = ({
  value,
  setValue,
  markdownItem,
  totalWidth = 0,
  deleteClick,
  isEdit = false,
  onReSize,
  setOnReSize,
  setSize,
}: DvtDashboardEditMarkdownProps) => {
  const [onHover, setOnHover] = useState<boolean>(false);
  const { meta } = markdownItem;

  const onlyGridItemWidthScreen = (getWidth: number) =>
    ((window.innerWidth - (isEdit ? 574 : 94)) / 12) * getWidth;

  return (
    <Resizable
      enable={{ right: isEdit, bottom: isEdit }}
      onResizeStop={(e, direction, ref, d) => {
        if (d.height || d.width) {
          setSize({
            height: meta?.height + Number((d.height / 8).toFixed(0)),
            width:
              meta?.width +
              Number((d.width / onlyGridItemWidthScreen(1)).toFixed(0)),
          });
        }
        setOnReSize('');
      }}
      size={{
        width: onlyGridItemWidthScreen(meta?.width) - 15,
        height: meta?.height * 8,
      }}
      onResizeStart={() => {
        setOnReSize(markdownItem.id);
      }}
      maxWidth={
        totalWidth === 12
          ? onlyGridItemWidthScreen(meta?.width) - 15
          : onlyGridItemWidthScreen(12 - totalWidth + meta?.width) - 15
      }
    >
      <StyledDashboardDroppedListItem
        isEdit={isEdit}
        isOnResize={onReSize}
        onMouseLeave={() => setOnHover(false)}
        onMouseOver={() => setOnHover(true)}
      >
        <StyledDashboardDroppedListItemTitle>
          {isEdit && onHover && (
            <Icon
              style={{ cursor: 'pointer' }}
              fileName="dvt-delete"
              onClick={deleteClick}
            />
          )}
        </StyledDashboardDroppedListItemTitle>
        <StyledDashboardDroppedListItemChart>
          <DvtAceEditor
            height={`${meta?.height * 8 - 82}px`}
            mode="markdown"
            value={value}
            onChange={(vl: any) => setValue(vl)}
          />
        </StyledDashboardDroppedListItemChart>
      </StyledDashboardDroppedListItem>
    </Resizable>
  );
};

export default DvtDashboardEditMarkdown;
