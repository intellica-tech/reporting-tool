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
import { SupersetTheme } from '@superset-ui/core';
import Icon from '../Icons/Icon';
import {
  StyledCollapse,
  StyledCollapsePopover,
  StyledCollapseGroup,
  StyledCollapseLabel,
  StyledCollapseDeleteIcon,
  StyledCollapseIcon,
  StyledCollapseChildren,
} from './dvt-collapse.module';
import DvtPopper from '../DvtPopper';

export interface DvtCollapseProps {
  label: string;
  children: ReactNode;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
  typeDesign?: 'normal' | 'dvt-list';
  deleteClick?: () => void;
  copyToClick?: () => void;
}

const DvtCollapse: React.FC<DvtCollapseProps> = ({
  label = '',
  children,
  popoverDirection = 'top',
  popoverLabel = '',
  isOpen,
  setIsOpen,
  typeDesign = 'normal',
  deleteClick,
  copyToClick,
}) => {
  const [onHover, setOnHover] = useState<boolean>(false);

  return (
    <StyledCollapse bgTransparent={typeDesign === 'dvt-list'}>
      <StyledCollapseGroup
        onMouseLeave={() => (deleteClick || copyToClick) && setOnHover(false)}
        onMouseOver={() => (deleteClick || copyToClick) && setOnHover(true)}
      >
        <StyledCollapseLabel onClick={() => setIsOpen(!isOpen)}>
          {label}
          {popoverLabel && (
            <StyledCollapsePopover>
              {popoverLabel ? (
                <DvtPopper label={popoverLabel} direction={popoverDirection}>
                  <Icon
                    fileName="warning"
                    css={(theme: SupersetTheme) => ({
                      color: theme.colors.dvt.primary.base,
                    })}
                    iconSize="l"
                  />
                </DvtPopper>
              ) : (
                <Icon
                  fileName="warning"
                  css={(theme: SupersetTheme) => ({
                    color: theme.colors.dvt.primary.base,
                  })}
                  iconSize="l"
                />
              )}
            </StyledCollapsePopover>
          )}
        </StyledCollapseLabel>
        {onHover && deleteClick && (
          <StyledCollapseDeleteIcon onClick={deleteClick} />
        )}
        {onHover && copyToClick && (
          <Icon iconSize="l" fileName="dvt-file" onClick={copyToClick} />
        )}
        <StyledCollapseIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <Icon fileName="caret_down" iconSize="xxl" />
        </StyledCollapseIcon>
      </StyledCollapseGroup>

      {isOpen && (
        <StyledCollapseChildren typeDesign={typeDesign}>
          {children}
        </StyledCollapseChildren>
      )}
    </StyledCollapse>
  );
};

export default DvtCollapse;
