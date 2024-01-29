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
import { keyframes, styled } from '@superset-ui/core';

interface StyledInputSelect {
  selected: boolean;
}

interface StyledInputSelectIcon {
  isOpen: boolean;
}

const optionsKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const StyledInputSelectInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
`;

const StyledInputSelectField = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
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

const StyledInputSelectIcon = styled.div<StyledInputSelectIcon>`
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'none')};
`;

const StyledInputSelect = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledInputSelectLabel = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-weight: 500;
`;

const StyledInputSelectOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin-top: 5px;
  border-radius: 4px;
  padding: 8px 0 8px 0;
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  transform-origin: top;
`;

const StyledInputSelectOptionsLabel = styled.div<StyledInputSelect>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.dvt.grayscale.light1 : ''};
  padding: 5px 13px 5px 13px;
`;
const StyledInputSelectDiv = styled.div`
  font-size: 15px;
`;

export {
  StyledInputSelectInput,
  StyledInputSelectField,
  StyledInputSelectIcon,
  StyledInputSelect,
  StyledInputSelectLabel,
  StyledInputSelectOptions,
  StyledInputSelectOptionsLabel,
  StyledInputSelectDiv,
};
