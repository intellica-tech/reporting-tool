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

interface StyledDvtSelectDatabaseListItemProps {
  active: boolean;
}

const StyledDvtSelectDatabaseList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const StyledDvtSelectDatabaseListLabel = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.dark2};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const StyledDvtSelectDatabaseListScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 500px;
  padding-right: 9px;
  margin-top: 20px;
  overflow-y: auto;
  width: 100%;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 6px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    width: 4px;
    border-radius: 12px;
  }
`;

const StyledDvtSelectDatabaseListItem = styled.button<StyledDvtSelectDatabaseListItemProps>`
  outline: none;
  margin: 0;
  border: none;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.dvt.primary.base : theme.colors.dvt.grayscale.light2};
  border-radius: 8px;
  min-height: 38px;
  font-size: 12px;
  color: ${({ theme, active }) =>
    active ? theme.colors.grayscale.light5 : theme.colors.dvt.text.label};
  text-align: left;
  word-break: break-all;
`;

export {
  StyledDvtSelectDatabaseList,
  StyledDvtSelectDatabaseListLabel,
  StyledDvtSelectDatabaseListScroll,
  StyledDvtSelectDatabaseListItem,
};
