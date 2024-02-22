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
import { styled } from '@superset-ui/core';

interface TabProps {
  activeTab: boolean;
}

const StyledOpenSelectMenu = styled.div`
  width: 308px;
  height: 315px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.dvt.boxShadow.base};
  padding: 0 11px;
`;
const StyledOpenSelectMenuFilter = styled.div``;
const StyledOpenSelectMenuFilterTabs = styled.div<TabProps>`
  display: flex;
  flex: 1;
  font-size: 10px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ theme, activeTab }) =>
      activeTab ? theme.colors.dvt.primary.base : theme.colors.dvt.border.base};
`;
const StyledOpenSelectMenuFilterTabsGroup = styled.div`
  display: flex;
`;
const StyledOpenSelectMenuFilterInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 27px 0 0px 0;
`;
const StyledOpenSelectMenuFilterButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 71px;
`;

export {
  StyledOpenSelectMenu,
  StyledOpenSelectMenuFilter,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
  StyledOpenSelectMenuFilterInputGroup,
  StyledOpenSelectMenuFilterButtonGroup,
};
