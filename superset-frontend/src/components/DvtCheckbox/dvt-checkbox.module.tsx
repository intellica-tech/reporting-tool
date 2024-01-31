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

interface StyledCheckboxProps {
  checked: boolean;
  disabled: boolean;
}

const StyledCheckbox = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

const StyledCheckboxInput = styled.div<StyledCheckboxProps>`
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ theme }) => theme.colors.dvt.primary.base};
  border-radius: 7px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &::after {
    content: '';
    position: absolute;
    top: 11px;
    left: 3px;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 12px;
    border: 2px solid ${({ theme }) => theme.colors.dvt.primary.base};
    border-width: 2px 2px 0 0;
    border-radius: 1px;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transform-origin: left top;
    transform: scaleX(-1) rotate(135deg);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
`;

const StyledCheckboxLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

export { StyledCheckbox, StyledCheckboxInput, StyledCheckboxLabel };
