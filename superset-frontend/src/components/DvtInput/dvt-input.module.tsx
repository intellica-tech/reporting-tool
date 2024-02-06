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

interface StyledInputProps {
  $size: string;
  typeDesign: string;
}

const sizes = {
  small: 40,
  medium: 48,
  large: 56,
};

const StyledInputInput = styled.div<StyledInputProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: ${({ theme, typeDesign }) =>
    typeDesign === 'chartsForm'
      ? 'none'
      : `1px solid ${theme.colors.dvt.primary.light2}`};
  padding: 8px 16px;
  border-radius: ${({ typeDesign }) =>
    typeDesign === 'form'
      ? '4px'
      : typeDesign === 'chartsForm'
      ? '4px'
      : '12px'};
  width: 100%;
  height: ${({ $size }) => sizes[$size]}px;
  background-color: ${({ typeDesign, theme }) =>
    typeDesign === 'chartsForm'
      ? theme.colors.dvt.grayscale.light2
      : theme.colors.grayscale.light5};

  &:hover {
    border: ${({ theme, typeDesign }) =>
      typeDesign === 'chartsForm'
        ? 'none'
        : `1px solid ${theme.colors.dvt.primary.light1}`};
  }

  &:focus-within {
    border: ${({ theme, typeDesign }) =>
      typeDesign === 'chartsForm'
        ? 'none'
        : `1px solid ${theme.colors.dvt.primary.base}`};
  }

  transition: 0.15s;
`;

const StyledInputField = styled.input<StyledInputProps>`
  width: 100%;
  height: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  background-color: ${({ typeDesign, theme }) =>
    typeDesign === 'chartsForm'
      ? theme.colors.dvt.grayscale.light2
      : theme.colors.grayscale.light5};
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

const StyledInputIcon = styled.div`
  cursor: pointer;
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledInputClearWrapper = styled.div<{ disabled?: boolean }>`
  cursor: pointer;
  border-radius: 100%;
  height: 14px;
  width: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: ${props =>
    props.disabled ? 'none' : `2px solid ${props.theme.colors.dvt.text.label}`};

  text-align: 'center';
  color: ${props => `${props.theme.colors.dvt.text.label}`};
  font-weight: 1000;
`;

const StyledInputClearLine = styled.div<{ disabled?: boolean }>``;

const StyledInputLabel = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-weight: 500;
`;

const StyledInputPopover = styled.div`
  display: flex;
  gap: 8px;
`;

export {
  StyledInput,
  StyledInputField,
  StyledInputIcon,
  StyledInputLabel,
  StyledInputInput,
  StyledInputClearWrapper,
  StyledInputClearLine,
  StyledInputPopover,
};
