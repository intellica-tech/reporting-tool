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

const StyledDashboardEdit = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StyledDashboard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
`;
const StyledChartList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 455px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
`;

const StyledOpenSelectMenuFilterTabs = styled.div<TabProps>`
  display: flex;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ theme, activeTab }) =>
      activeTab ? theme.colors.grayscale.dark2 : theme.colors.dvt.text.label};
  color: ${({ theme, activeTab }) =>
    activeTab ? theme.colors.grayscale.dark2 : theme.colors.dvt.text.label};
`;
const StyledOpenSelectMenuFilterTabsGroup = styled.div`
  display: flex;
  width: 100%;
`;

export {
  StyledDashboardEdit,
  StyledDashboard,
  StyledChartList,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
};
