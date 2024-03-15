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
  width: 340px;
  min-height: 360px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.dvt.boxShadow.base};
  padding: 0 11px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

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
  padding: 27px 0;
`;

const StyledOpenSelectMenuFilterButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const StyledOpenSelectMenuSaved = styled.div`
  display: flex;
  flex-direction: column;
  height: 187px;
  gap: 15px;
`;

const StyledOpenSelectMenuTitle = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  font-size: 14px;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.2px;
`;

const StyledOpenSelectMenuLabel = styled.div`
  display: flex;
  text-align: center;
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-weight: 500;
  padding: 0 20px;
`;

const StyledOpenSelectMenuIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  min-height: 100px;
`;

const CustomSqlWhereOrHaving = styled.div`
  display: flex;
  gap: 15px;
`;

const CustomSqlWhereOrHavingLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.grayscale.dark2};
`;

const FilterTimeRangeOpen = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  height: 48px;
  width: 100%;
  border-radius: 12px;
  padding: 2px 12px;
  border: 1px solid ${({ theme }) => theme.colors.dvt.primary.light2};
  cursor: pointer;
`;

export {
  StyledOpenSelectMenu,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
  StyledOpenSelectMenuFilterInputGroup,
  StyledOpenSelectMenuFilterButtonGroup,
  StyledOpenSelectMenuSaved,
  StyledOpenSelectMenuTitle,
  StyledOpenSelectMenuLabel,
  StyledOpenSelectMenuIcon,
  CustomSqlWhereOrHaving,
  CustomSqlWhereOrHavingLabel,
  FilterTimeRangeOpen,
};
