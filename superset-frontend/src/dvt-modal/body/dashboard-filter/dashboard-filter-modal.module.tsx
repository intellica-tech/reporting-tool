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

const StyledDashboardFilter = styled.div``;
const StyledDashboardBody = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledDashboardFilterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledDashboardFilterRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 879px;
  height: 679px;
  padding: 20px 0 0 28px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
`;

const StyledDashboardFilterMenuTabs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 202px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  padding: 0 13px;
`;

const StyledDashboardFilterLabel = styled.div`
  color: ${({ theme }) => theme.colors.dvt.primary.light1};
  font-size: 12px;
  font-weight: 500;
`;

const StyledDashboardFilterCollapse = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  gap: 12px;
`;

const StyledDashboardFilterButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 8px;
  height: 100%;
`;

export {
  StyledDashboardFilter,
  StyledDashboardBody,
  StyledDashboardFilterLeft,
  StyledDashboardFilterRight,
  StyledDashboardFilterMenuTabs,
  StyledDashboardFilterLabel,
  StyledDashboardFilterCollapse,
  StyledDashboardFilterButtonGroup,
};
