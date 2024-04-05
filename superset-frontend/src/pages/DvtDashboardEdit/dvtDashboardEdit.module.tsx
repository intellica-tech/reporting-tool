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
  height: 100%;
  gap: 25px;
`;

const StyledDashboard = styled.div`
  flex: 1;
  position: relative;
`;

const StyledTab = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 455px;
  max-width: 455px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
`;

const StyledTabs = styled.div<TabProps>`
  display: flex;
  flex: 1;
  font-size: 20px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 28px 0 18px 0;
  border-bottom: 2px solid
    ${({ theme, activeTab }) =>
      activeTab
        ? theme.colors.grayscale.dark2
        : theme.colors.dvt.text.placeholder};
  color: ${({ theme, activeTab }) =>
    activeTab
      ? theme.colors.grayscale.dark2
      : theme.colors.dvt.text.placeholder};
`;
const StyledTabsGroup = styled.div`
  display: flex;
  width: 100%;
`;

const StyledChartList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 20px;
`;

const StyledChartFilter = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledDashboardDroppedListGridShow = styled.div`
  position: absolute;
  top: 0;
  left: 30px;
  right: 26px;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
  z-index: 1;
`;

const StyledDashboardDroppedListGridShowItem = styled.div`
  background-color: ${({ theme }) => theme.colors.dvt.primary.base};
  height: 100%;
  width: 100%;
  opacity: 0.15;
`;

const StyledDashboardDroppedList = styled.div`
  padding: 0 20px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  min-height: calc(100vh - 210px);
  max-height: calc(100vh - 210px);

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 6px;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    border-radius: 3px;
  }
`;

interface StyledDashboardDroppedListItemProps {
  isEdit: boolean;
  isOnResize: boolean;
}

const StyledDashboardDroppedListItem = styled.div<StyledDashboardDroppedListItemProps>`
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  height: 100%;
  ${({ isOnResize, theme }) =>
    isOnResize && `outline: 1px solid ${theme.colors.primary.base}`};

  ${({ isEdit, theme }) =>
    isEdit &&
    `
      cursor: move;

      &:hover {
        outline: 1px dashed ${theme.colors.dvt.primary.base};
      }
  `};
`;

const StyledDashboardDroppedListItemTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledDashboardDroppedListItemChart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  flex: 1;
`;

const StyledDashboardDroppedRow = styled.div`
  position: relative;
  width: calc(100% + 32px);
  height: fit-content;
  margin-left: -32px;
  padding-left: 32px;
`;

interface StyledDashboardDroppedRowGridProps {
  isEdit: boolean;
}

const StyledDashboardDroppedRowGrid = styled.div<StyledDashboardDroppedRowGridProps>`
  ${({ isEdit, theme }) =>
    isEdit && `border: 1px dashed ${theme.colors.dvt.grayscale.light1}`};
  display: flex;
  flex-flow: row;
  gap: 15px;
`;

const StyledDashboardDroppedRowOptions = styled.div`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

interface StyledNewAddRowProps {
  hovered: boolean;
  fixHeight: number;
}

const StyledNewAddRow = styled.div<StyledNewAddRowProps>`
  min-height: ${({ fixHeight }) => fixHeight}px;
  width: 100%;
  cursor: pointer;

  ${({ hovered, theme }) =>
    hovered && `border-top: 5px solid ${theme.colors.dvt.primary.base};`}
`;

const StyledDashboardLayoutNew = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px;
  cursor: move;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dvt.primary.light3};
  }
`;

const StyledDashboardLayoutNewIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.dvt.primary.light2};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.dvt.primary.base};
  position: relative;

  &.fa.fa-window-restore {
    font-size: 18px;
  }

  &.divider {
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      height: 2px;
      background-color: ${({ theme }) => theme.colors.dvt.primary.base};
    }
  }
`;

const StyledDashboardLayoutNewLabel = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dvt.text.label};
  text-transform: capitalize;
`;

export {
  StyledDashboardEdit,
  StyledDashboard,
  StyledTab,
  StyledTabs,
  StyledTabsGroup,
  StyledChartList,
  StyledChartFilter,
  StyledDashboardDroppedList,
  StyledDashboardDroppedListGridShow,
  StyledDashboardDroppedListGridShowItem,
  StyledDashboardDroppedListItem,
  StyledDashboardDroppedListItemTitle,
  StyledDashboardDroppedListItemChart,
  StyledDashboardDroppedRow,
  StyledDashboardDroppedRowGrid,
  StyledDashboardDroppedRowOptions,
  StyledNewAddRow,
  StyledDashboardLayoutNew,
  StyledDashboardLayoutNewIcon,
  StyledDashboardLayoutNewLabel,
};
