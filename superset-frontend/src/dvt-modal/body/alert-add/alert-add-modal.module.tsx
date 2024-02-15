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

const StyledAlertAdd = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 15px;
`;

const StyledAlertAddHeader = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 20px 27px 3px 27px;
  height: 60px;
  padding-left: 16px;
  font-weight: 600;
`;

const StyledAlertAddBody = styled.div`
  display: flex;
  height: 100%;
`;

const StyledAlertAddLeftMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 243px;
  padding: 0 14px 0 27px;
`;

const StyledAlertAddTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
  letter-spacing: 0.2px;
`;

const StyledAlertAddSelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const StyledAlertAddLine = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.dvt.border.base};
  margin-bottom: 12px;
  padding-bottom: 12px;
`;

const StyledAlertAddItemGroup = styled.div`
  display: flex;
  width: 879px;
  height: 508px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  gap: 45px;
  padding: 18px 21px 18px 28px;
`;

const StyledAlertAddAlertConition = styled.div`
  display: flex;
  flex-direction: column;
  width: 226px;
  gap: 15px;
`;

const StyledAlertAddAlertConditionSchedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 226px;
`;

const StyledAlertAddSelectFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const StyledAlertAddInputFlex = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledAlertAddMessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 282px;
`;

const StyledAlertAddButtonGroup = styled.div`
  display: flex;
  height: 100%;
  justify-content: end;
  align-items: end;
  gap: 8px;
`;

export {
  StyledAlertAdd,
  StyledAlertAddHeader,
  StyledAlertAddBody,
  StyledAlertAddLeftMenu,
  StyledAlertAddSelectGroup,
  StyledAlertAddLine,
  StyledAlertAddItemGroup,
  StyledAlertAddAlertConition,
  StyledAlertAddTitle,
  StyledAlertAddAlertConditionSchedule,
  StyledAlertAddSelectFlex,
  StyledAlertAddMessageContent,
  StyledAlertAddButtonGroup,
  StyledAlertAddInputFlex,
};
