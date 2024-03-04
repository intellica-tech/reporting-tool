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
  align-items: center;
  gap: 20px;
  padding: 10px;
`;
const StyledHeadTitle = styled.div`
  font-size: 18px;
  font-style: normal;
  align-items: center;
  font-weight: 700;
  line-height: 160%;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
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
  flex: auto;
  width: 404px;
`;

const StyledDvtSelect = styled.div`
  flex: auto;
`;

const StyledDvtDescription = styled.div`
  flex: auto;
  width: 404px;
  height: 90px;
`;

const StyledDvtButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export {
  StyledRowLevelSecurity,
  StyledHeadTitle,
  StyledDvtInputLabel,
  StyledDvtInput,
  StyledDvtSelect,
  StyledDvtInputLabelUnneccessary,
  StyledDvtDescription,
  StyledDvtButtons,
};
