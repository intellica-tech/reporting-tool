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
import { SupersetTheme } from '@superset-ui/core';
import Icon from '../Icons/Icon';
import {
  StyledNavigationBarItem,
  StyledNavigationBarItemIcon,
  StyledNavigationBarItemLabel,
} from './dvt-navigation-bar-item.module';

export interface DvtNavigationBarItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}

const DvtNavigationBarItem: React.FC<DvtNavigationBarItemProps> = ({
  icon,
  label,
  onClick,
  active = false,
}) => (
  <StyledNavigationBarItem onClick={onClick}>
    <StyledNavigationBarItemIcon>
      <Icon
        fileName={icon}
        css={(theme: SupersetTheme) => ({
          color: active
            ? theme.colors.dvt.primary.base
            : theme.colors.dvt.text.label,
          fontSize: '16.5px',
        })}
      />
    </StyledNavigationBarItemIcon>
    <StyledNavigationBarItemLabel active={active}>
      {label}
    </StyledNavigationBarItemLabel>
  </StyledNavigationBarItem>
);

export default DvtNavigationBarItem;
