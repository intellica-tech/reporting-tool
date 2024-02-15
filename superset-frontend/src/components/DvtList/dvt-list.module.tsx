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

const StyledDvtList = styled.div`
  padding-right: 10px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  padding: 20px 16px;
  border-radius: 12px;
`;

const StyledDvtListScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 520px;
  overflow-y: auto;
  padding-right: 8px;

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

const StyledDvtListItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:first-of-type) {
    margin-top: 2px;
  }
`;

const StyledDvtListItemText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
`;

export {
  StyledDvtList,
  StyledDvtListScroll,
  StyledDvtListItem,
  StyledDvtListItemText,
};
