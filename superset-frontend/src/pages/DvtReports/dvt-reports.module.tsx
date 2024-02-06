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

const StyledReports = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const StyledReportsListButtons = styled.div`
  display: flex;
  border-radius: 12px;
  height: 56px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
`;

const StyledDvtSelectButtons = styled.div`
  display: flex;
`;

const StyledSelectedItem = styled.div`
  display: flex;
  gap: 45px;
  padding: 35px;
`;

const StyledSelectedItemCount = styled.div`
  display: flex;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary.dark3};
`;

const StyledReportsButton = styled.div`
  display: flex;
  justify-content: space-between;
  flex: end;
  padding: 30px 0px 36px 0px;
`;

const StyledReportsButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: row;
  justify-content: flex-end;
`;

export {
  StyledReports,
  StyledReportsButton,
  StyledDvtSelectButtons,
  StyledSelectedItemCount,
  StyledSelectedItem,
  StyledReportsListButtons,
  StyledReportsButtons,
};
