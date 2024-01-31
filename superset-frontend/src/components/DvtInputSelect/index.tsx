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
import React, { useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutsite';
import Icon from '../Icons/Icon';
import {
  StyledInputSelectInput,
  StyledInputSelectField,
  StyledInputSelectIcon,
  StyledInputSelect,
  StyledInputSelectLabel,
  StyledInputSelectOptions,
  StyledInputSelectOptionsLabel,
  StyledInputSelectDiv,
} from './dvt-input-select.module';

interface SelectData {
  label: string;
  value: number;
}

export interface DvtInputSelectProps {
  label?: string;
  data: SelectData[];
  placeholder?: string;
  selectedValues: any[];
  setSelectedValues: (newSelectedVales: any[]) => void;
  typeDesign?: 'text' | 'form' | 'chartsForm';
}

const DvtInputSelect = ({
  label,
  data,
  placeholder = '',
  selectedValues,
  setSelectedValues,
  typeDesign = 'text',
}: DvtInputSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(val => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <StyledInputSelect ref={ref}>
      <StyledInputSelectLabel typeDesign={typeDesign} isOpen={isOpen}>
        {label}
      </StyledInputSelectLabel>
      <StyledInputSelectInput
        typeDesign={typeDesign}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <StyledInputSelectField
          placeholder={placeholder}
          value={selectedValues.join(', ')}
          typeDesign={typeDesign}
          isOpen={isOpen}
        />
        <StyledInputSelectIcon isOpen={isOpen}>
          <Icon fileName="caret_right" iconSize="xl" />
        </StyledInputSelectIcon>
      </StyledInputSelectInput>
      {isOpen && (
        <StyledInputSelectOptions
          itemLength={data.length}
          typeDesign={typeDesign}
        >
          {data.map(option => (
            <StyledInputSelectOptionsLabel
              key={option.value}
              onClick={() => toggleOption(option.label)}
              selected={selectedValues.includes(option.label)}
              typeDesign={typeDesign}
            >
              {option.label}
              {selectedValues.includes(option.label) && (
                <StyledInputSelectDiv
                  onClick={e => {
                    e.stopPropagation();
                    toggleOption(option.label);
                  }}
                >
                  X
                </StyledInputSelectDiv>
              )}
            </StyledInputSelectOptionsLabel>
          ))}
        </StyledInputSelectOptions>
      )}
    </StyledInputSelect>
  );
};

export default DvtInputSelect;
