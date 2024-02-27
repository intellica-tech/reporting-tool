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
  gap: 24px;
`;

const StyledRowLevelSecurityFilterAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

const StyledRowLevelSecurityButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 36px;
`;

const StyledRowLevelSecurityCount = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
  letter-spacing: 0.2px;
`;
export {
  StyledRowLevelSecurity,
  StyledRowLevelSecurityButton,
  StyledRowLevelSecurityFilterAdd,
  StyledRowLevelSecurityCount
};
