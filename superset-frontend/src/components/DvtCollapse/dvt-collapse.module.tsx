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

const optionsKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

interface StyledCollapseProps {
  bgTransparent: boolean;
}

interface StyledCollapseIconProps {
  isOpen: boolean;
}

interface StyledCollapseChildrenProps {
  typeDesign: string;
}

const StyledCollapse = styled.div<StyledCollapseProps>`
  background-color: ${({ theme, bgTransparent }) =>
    bgTransparent ? 'transparent' : theme.colors.grayscale.light5};
  width: 100%;
`;

const StyledCollapseGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const StyledCollapseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const StyledCollapseDeleteIcon = styled.button`
  padding: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: none;
  position: relative;
  margin-left: auto;
  margin-right: 2px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    border-radius: 4px;
    width: 12px;
    transition: all 300ms;
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.dark1};
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const StyledCollapseIcon = styled.div<StyledCollapseIconProps>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(-180deg)' : 'none')};
`;

const StyledCollapseChildren = styled.div<StyledCollapseChildrenProps>`
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  transform-origin: top;
  padding-top: ${({ typeDesign }) => (typeDesign === 'dvt-list' ? 11 : 20)}px;
`;

const StyledCollapsePopover = styled.div``;

export {
  StyledCollapse,
  StyledCollapsePopover,
  StyledCollapseGroup,
  StyledCollapseLabel,
  StyledCollapseDeleteIcon,
  StyledCollapseIcon,
  StyledCollapseChildren,
};
