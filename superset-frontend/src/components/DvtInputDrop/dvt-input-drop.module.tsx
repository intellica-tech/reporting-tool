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
  flex-direction: column;
  gap: 12px;
  position: relative;
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
  align-items: center;
`;

const StyledInputDropLabel = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dvt.text.label};
`;

const StyledInputDropGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  padding: 12px 14px;
  gap: 2px;
`;

interface StyledInputDropGroupItemProps {
  bgOnItem?: boolean;
  marginTop?: boolean;
}

const StyledInputDropGroupItem = styled.div<StyledInputDropGroupItemProps>`
  display: flex;
  align-items: center;
  ${({ bgOnItem, theme }) =>
    bgOnItem && `background-color: ${theme.colors.dvt.primary.light2}`};
  border-radius: 4px;
  ${({ marginTop }) => marginTop && `margin-top: 4px`};
`;

interface StyledInputDropGroupItemLabelProps {
  textOnPlaceholder?: boolean;
}

const StyledInputDropGroupItemLabel = styled.div<StyledInputDropGroupItemLabelProps>`
  font-size: 14px;
  color: ${({ theme, textOnPlaceholder }) =>
    textOnPlaceholder
      ? theme.colors.dvt.text.help
      : theme.colors.dvt.text.bold};
  flex: 1;
  min-height: 26px;
  padding: 2px 4px;
`;

const StyledInputDropGroupItemRemove = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  border-right: 2px solid ${({ theme }) => theme.colors.dvt.grayscale.light2};
  padding: 0;
  max-width: 26px;
  min-width: 26px;
  min-height: 26px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1px;
    width: 12px;
    background-color: ${({ theme }) => theme.colors.dvt.text.bold};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

interface StyledInputDropMenuProps {
  menuRight: number;
  menuTopCalc: string;
  menuTopCalcArrow: string;
}

const StyledInputDropMenu = styled.div<StyledInputDropMenuProps>`
  position: fixed;
  left: ${({ menuRight }) => menuRight + 20}px;
  top: ${({ menuTopCalc }) => menuTopCalc};
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: ${({ menuTopCalcArrow }) => menuTopCalcArrow};
    left: -8px;
    height: 16px;
    width: 16px;
    border: 8px solid ${({ theme }) => theme.colors.dvt.primary.light2};
    border-right-color: transparent;
    border-bottom-color: transparent;
    transform: rotate(-45deg);
  }
`;

const StyledError = styled.div`
  color: ${({ theme }) => theme.colors.dvt.error.base};
  font-size: 12px;
  font-weight: 400;
  padding: 0 0 0 2px;
`;

export {
  StyledInputDrop,
  StyledInputDropIcon,
  StyledInputDropPlaceholder,
  StyledInputDropLabel,
  StyledInputDropGroup,
  StyledInputDropGroupItem,
  StyledInputDropGroupItemLabel,
  StyledInputDropGroupItemRemove,
  StyledInputDropMenu,
  StyledError,
};
