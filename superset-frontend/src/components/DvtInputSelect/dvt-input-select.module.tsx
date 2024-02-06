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

interface StyledInputSelectProps {
  selected: boolean;
  typeDesign: string;
}

interface StyledInputSelectIconProps {
  isOpen: boolean;
}

interface StyledInputDesignProps {
  typeDesign: string;
  isOpen: boolean;
  selected: boolean;
}

interface StyledInputLengthDesignProps {
  itemLength: number;
  typeDesign: string;
}

const optionsKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const StyledInputSelectInput = styled.div<StyledInputDesignProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ theme, typeDesign }) =>
    typeDesign === 'chartsForm'
      ? 'none'
      : `1px solid ${theme.colors.dvt.primary.light2}`};
  padding: ${({ typeDesign }) => (typeDesign === 'form' ? '2px 8px' : '12px')};
  border-radius: ${({ typeDesign }) =>
    typeDesign === 'form' ? '4px' : '12px'};
  width: 100%;
  min-height: 40px;
  background-color: ${({ isOpen, theme, typeDesign }) =>
    typeDesign === 'form' || typeDesign === 'navbar'
      ? theme.colors.grayscale.light5
      : isOpen
      ? theme.colors.dvt.primary.light2
      : theme.colors.dvt.grayscale.light2};
  cursor: pointer;
`;

const StyledInputSelectField = styled.div<StyledInputDesignProps>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  border: none;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.dvt.text.bold : theme.colors.dvt.text.help};
  background-color: ${({ isOpen, theme, typeDesign }) =>
    typeDesign === 'form' || typeDesign === 'navbar'
      ? theme.colors.grayscale.light5
      : isOpen
      ? theme.colors.dvt.primary.light2
      : theme.colors.dvt.grayscale.light2};
`;

const StyledInputSelectIcon = styled.div<StyledInputSelectIconProps>`
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

const StyledInputSelectLabel = styled.div<StyledInputDesignProps>`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-weight: 500;
  margin-left: ${({ typeDesign }) => (typeDesign === 'form' ? '0' : '13px')};
`;

const StyledInputSelectOptions = styled.div<StyledInputLengthDesignProps>`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  max-height: 274px;
  overflow-y: auto;
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  z-index: 999;
  transform-origin: top;
  background: ${({ theme }) => theme.colors.dvt.primary.light2};
  margin-top: 5px;
  border-radius: ${({ itemLength, typeDesign }) =>
    itemLength > 6 ? '12px 0 0 12px' : typeDesign === 'form' ? '4px' : '12px'};
  padding: 8px 0 8px 0;
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  transform-origin: top;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 6px;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    border-radius: 3px;
  }
`;

const StyledInputSelectOptionsLabel = styled.div<StyledInputSelectProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  padding: 5px 13px 5px 13px;
  ${({ theme, selected, typeDesign }) =>
    selected
      ? typeDesign === 'form' || typeDesign === 'navbar'
        ? `
        color: ${theme.colors.dvt.text.help};
        background: ${theme.colors.dvt.primary.light2};
      `
        : `
        color: ${theme.colors.grayscale.light5};
        background: ${theme.colors.dvt.primary.light1};
      `
      : typeDesign === 'form' || typeDesign === 'navbar'
      ? `
        color: ${theme.colors.dvt.primary.light1};
        background: ${theme.colors.dvt.primary.light3};
      }
    `
      : `
        color: ${theme.colors.dvt.primary.light1};
      }
    `}
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
