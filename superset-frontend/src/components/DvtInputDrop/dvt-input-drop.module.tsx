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

const StyledInputDrop = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  border-radius: 4px;
  width: 100%;
  height: 39px;
`;

const StyledInputDropField = styled.input`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  border: none;
  cursor: default;
  
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dvt.text.help};
  }

  ::-ms-reveal,
  ::-ms-clear {
    display: none;
  }
`;

const StyledInputDropPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dvt.primary.light1};
`;

const StyledInputDropIcon = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  cursor: pointer;
`;

export {
  StyledInputDrop,
  StyledInputDropField,
  StyledInputDropIcon,
  StyledInputDropPlaceholder,
};
