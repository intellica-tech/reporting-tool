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

const StyledRangeInput = styled.input``;

interface DvtPopperProps {
  left: number;
}

const StyledRange = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledPopper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPopperBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dvt.primary.base};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grayscale.light5};
  font-size: 12px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.2px;
  cursor: pointer;
  padding: 8px 10px;
`;

const StyledPopperGroup = styled.div`
  position: relative;
`;

const StyledPopperAbsolute = styled.div<DvtPopperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;

  &::before {
    content: '';
    position: absolute;
  }

  ${({ theme, left }) => `
  opacity: 1;
  bottom: 33px;
  left: ${left}%;
  transform: translateX(-50%);

  &::before {
    bottom: -13px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 13px solid ${theme.colors.dvt.primary.base};
  }
`}
`;

const StyledRangePopover = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledRangeLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dvt.text.label};
`;

export {
  StyledPopper,
  StyledPopperBody,
  StyledPopperGroup,
  StyledPopperAbsolute,
  StyledRangeInput,
  StyledRangePopover,
  StyledRangeLabel,
  StyledRange,
};
