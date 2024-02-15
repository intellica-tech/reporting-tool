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

const StyledConnectionAdd = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 15px;
`;

const StyledConnectionAddHeader = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 16px 27px;
  height: 60px;
  padding-left: 16px;
`;

const StyledConnectionAddBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 0px 27px 16px 27px;
  border-radius: 12px;
  height: 100%;
  padding: 18px 28px;
  gap: 15px;
`;

const StyledConnectionAddDatabaseIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const StyledConnectionAddDatabaseIcons = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StyledConnectionAddDatabaseIconGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledConnectionAddDatabaseType = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledConnectionAddSelectFile = styled.div`
  color: ${({ theme }) => theme.colors.dvt.primary.base};
  cursor: pointer;
  margin-top: 30px;
`;
const StyledConnectionAddLabel = styled.div`
  margin: 30px 0;
  font-weight: 600;
`;
const StyledConnectionAddStep2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledConnectionAddSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledConnectionAddToBasic = styled.div`
  color: ${({ theme }) => theme.colors.dvt.primary.base};
  cursor: pointer;
`;

const StyledConnectionAddButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.dvt.primary.base};
  cursor: pointer;
  align-items: center;
`;

const StyledConnectionAddButton = styled.div`
  display: flex;
  justify-content: end;
  gap: 15px;
`;

const StyledConnectionAddButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;
const StyledConnectionAddCollapse = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 450px;
`;

const StyledConnectionAddGroup = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 580px;
  overflow-y: auto;
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

const StyledConnectionAddGroupStep3 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 580px;
  overflow-y: auto;
  overflow-x: hidden;
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

const StyledConnectionAddGroups = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledConnectionAddInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledConnectionAddCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px 0 5px 10px;
`;

export {
  StyledConnectionAdd,
  StyledConnectionAddHeader,
  StyledConnectionAddBody,
  StyledConnectionAddDatabaseIcon,
  StyledConnectionAddDatabaseType,
  StyledConnectionAddSelectFile,
  StyledConnectionAddLabel,
  StyledConnectionAddDatabaseIconGroup,
  StyledConnectionAddDatabaseIcons,
  StyledConnectionAddStep2,
  StyledConnectionAddButton,
  StyledConnectionAddSwitch,
  StyledConnectionAddToBasic,
  StyledConnectionAddButtonGroup,
  StyledConnectionAddButtons,
  StyledConnectionAddCollapse,
  StyledConnectionAddGroup,
  StyledConnectionAddGroups,
  StyledConnectionAddInputGroup,
  StyledConnectionAddCheckboxGroup,
  StyledConnectionAddGroupStep3,
};
