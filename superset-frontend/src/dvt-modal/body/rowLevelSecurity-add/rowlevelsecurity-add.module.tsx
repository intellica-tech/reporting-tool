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

const StyledRowLevelSecurity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const StyledRowLevelSecurityBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  border-radius: 12px;
  height: 100%;
  padding: 18px 28px;
  gap: 15px;
`;

const StyledDvtInputLabel = styled.div`
  ::after {
    display: inline-block;
    margin-left: 4px;
    color: ${({ theme }) => theme.colors.dvt.error.base};
    content: '*';
  }
`;

const StyledDvtInputLabelUnneccessary = styled.div``;

const StyledDvtInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledDvtSelect = styled.div``;

const StyledDvtDescription = styled.div``;

const StyledDvtButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
`;

export {
  StyledRowLevelSecurity,
  StyledDvtInputLabel,
  StyledDvtInput,
  StyledDvtSelect,
  StyledDvtInputLabelUnneccessary,
  StyledDvtDescription,
  StyledDvtButtons,
  StyledRowLevelSecurityBody,
};
