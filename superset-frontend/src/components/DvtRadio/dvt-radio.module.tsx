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

interface StyledRadioProps {
  active: boolean;
}

const StyledRadio = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
`;

const StyledRadioLabel = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledRadioCheck = styled.div<StyledRadioProps>`
  content: '';
  height: 19px;
  width: 19px;
  border-radius: 50px;
  border: ${({ active }) => (active ? '6px' : '2px')} solid
    ${({ theme }) => theme.colors.dvt.primary.base};
`;

export { StyledRadio, StyledRadioLabel, StyledRadioCheck };
