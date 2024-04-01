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

interface DvtPopperProps {
  direction: string;
  top: number;
  left: number;
  childWidth: number;
  childHeight: number;
  popperChildrenScreen: {
    height: number;
    width: number;
  };
}

interface DvtPopperFontSizeProps {
  fontSize: 'small' | 'medium';
}

const StyledPopper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPopperBody = styled.div<DvtPopperFontSizeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.dvt.primary.base};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grayscale.light5};
  font-size: ${({ fontSize }) => (fontSize === 'small' ? '12px' : '16px')};
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.2px;
  cursor: pointer;
  padding: ${({ fontSize }) =>
    fontSize === 'small' ? '8px 10px' : '10px 15px'};
`;

const StyledPopperGroup = styled.div`
  position: relative;
`;

const StyledPopperAbsolute = styled.div<DvtPopperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  &::before {
    content: '';
    position: absolute;
  }

  ${({
    direction,
    childWidth,
    theme,
    left,
    top,
    childHeight,
    popperChildrenScreen,
  }) => {
    if (direction === 'bottom') {
      return `
      opacity: ${childHeight && childWidth ? 1 : 0};
      bottom: ${top - childHeight - 13}px;
      right: ${left - childWidth + popperChildrenScreen.width / 2}px;
      transform: translateX(-50%);

        &::before {
          top: -13px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 13px solid ${theme.colors.dvt.primary.base};
        }
      `;
    }
    if (direction === 'top') {
      return `
      opacity: ${childHeight && childWidth ? 1 : 0};
      bottom: ${top + popperChildrenScreen.height + 13}px;
      right: ${left - childWidth + popperChildrenScreen.width / 2}px;
      transform: translateX(-50%);

        &::before {
          bottom: -13px;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 13px solid ${theme.colors.dvt.primary.base};
        }
      `;
    }
    if (direction === 'left') {
      return `
      opacity: ${childHeight && childWidth ? 1 : 0};
      bottom: ${top - childHeight + popperChildrenScreen.height / 2}px;
      right: ${left + popperChildrenScreen.width + 13}px;
      transform: translateY(-50%);
      
        &::before {
          right: -13px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-left: 13px solid ${theme.colors.dvt.primary.base};
        }
      `;
    }
    if (direction === 'right') {
      return `
      opacity: ${childHeight && childWidth ? 1 : 0};
      bottom: ${top - childHeight + popperChildrenScreen.height / 2}px;
      right: ${left - childWidth - 13}px;
      transform: translateY(-50%);
  
    &::before {
      left: -13px;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 13px solid ${theme.colors.dvt.primary.base};
    }
  `;
    }

    return '';
  }};
`;

export {
  StyledPopper,
  StyledPopperBody,
  StyledPopperGroup,
  StyledPopperAbsolute,
};
