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

const dropdownKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

interface StyledDvtTextareaIconProps {
  isOpen: boolean;
}

interface StyledDvtTextareaItemProps {
  selectedItem: number;
  Item: number;
}

const StyledDvtTextareaSelectRun = styled.div`
  position: relative;
  width: 100%;
  height: 281px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grayscale.light5};
  padding: 30px;
  padding-bottom: 70px;
  display: flex;

  & .ace_scrollbar-v {
    &::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
      width: 8px;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
      width: 8px;
      border-radius: 12px;
    }
  }

  & .ace_scrollbar-h {
    &::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
      height: 8px;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
      height: 8px;
      border-radius: 12px;
    }
  }

  & .ace_scroller.ace_scroll-left {
    box-shadow: none;
  }

  & .ace_placeholder {
    font-family: inherit;
    color: ${({ theme }) => theme.colors.dvt.text.placeholder};
    font-weight: 600;
  }
`;

const StyledDvtTextareaLimit = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  min-width: 110px;
`;

const StyledDvtTextareaButton = styled.div`
  width: 110px;
  margin-left: 20px;
`;

const StyledDvtTextareaGroup = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;

const StyledDvtTextareaDropdown = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.dvt.primary.light2};
  max-width: 145px;
  animation: ${dropdownKeyframes} 0.3s ease-in-out;
  transform-origin: top;
`;

const StyledDvtTextareaDropdownItem = styled.div<StyledDvtTextareaItemProps>`
  padding: 5px;
  cursor: pointer;

  ${({ theme, Item, selectedItem }) =>
    Item === selectedItem
      ? `
      color: ${theme.colors.grayscale.light5};
      background: ${theme.colors.dvt.text.help};
      `
      : `
      color: ${theme.colors.dvt.text.help};
      background: ${theme.colors.grayscale.light5};
      }
    `}
`;

const StyledDvtTextareaIcon = styled.div<StyledDvtTextareaIconProps>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'none')};
`;

export {
  StyledDvtTextareaSelectRun,
  StyledDvtTextareaLimit,
  StyledDvtTextareaButton,
  StyledDvtTextareaGroup,
  StyledDvtTextareaDropdown,
  StyledDvtTextareaDropdownItem,
  StyledDvtTextareaIcon,
};
