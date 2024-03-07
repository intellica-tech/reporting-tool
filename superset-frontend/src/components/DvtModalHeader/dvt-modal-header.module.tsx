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

const StyledDvtModalHeader = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  padding: 0 28px;
`;

const StyledDvtModalHeaderTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.colors.grayscale.dark2};
`;

const StyledDvtModalHeaderClose = styled.button`
  width: 45px;
  height: 45px;
  position: relative;
  outline: none;
  background-color: transparent;
  border: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 1.5px;
    width: 18px;
    background-color: ${({ theme }) => theme.colors.grayscale.dark2};
    top: 50%;
    left: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export {
  StyledDvtModalHeader,
  StyledDvtModalHeaderTitle,
  StyledDvtModalHeaderClose,
};
