/* eslint-disable react-hooks/exhaustive-deps */
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
import React, { useEffect, useRef, useState } from 'react';
import { SupersetTheme } from '@superset-ui/core';
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
  StyledInputSelectNumberOptions,
  StyledInputSelectNumber,
  StyledError,
} from './dvt-input-select.module';

interface SelectData {
  label: string;
  value: number;
}

export interface DvtInputSelectProps {
  label?: string;
  data?: SelectData[];
  placeholder?: string;
  selectedValues: any[];
  setSelectedValues: (newSelectedVales: any[]) => void;
  typeDesign?: 'text' | 'form' | 'chartsForm';
  startNumber?: number;
  endNumber?: number;
  error?: string;
}

const DvtInputSelect = ({
  label,
  data = [],
  placeholder = '',
  selectedValues,
  setSelectedValues,
  typeDesign = 'text',
  startNumber,
  endNumber,
  error,
}: DvtInputSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fixData, setFixData] = useState<SelectData[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const toggleOption = (value: number) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter(val => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const selectedOptions = data.filter(option =>
    selectedValues.includes(option.value),
  );
  const unselectedOptions = data.filter(
    option => !selectedValues.includes(option.value),
  );

  useEffect(() => {
    let fData = [];
    if (startNumber !== undefined && endNumber) {
      for (let i = startNumber; i < endNumber + 1; i += 1) {
        fData.push({
          label: i.toString(),
          value: i,
        });
      }
    } else {
      fData = data;
    }
    setFixData(fData);
  }, [startNumber, endNumber]);

  return (
    <StyledInputSelect ref={ref}>
      <StyledInputSelectLabel
        typeDesign={typeDesign}
        isOpen={isOpen}
        selected={false}
      >
        {label}
      </StyledInputSelectLabel>
      <StyledInputSelectInput
        typeDesign={typeDesign}
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        selected={false}
      >
        <StyledInputSelectField
          typeDesign={typeDesign}
          isOpen={isOpen}
          selected={selectedValues.length > 0}
        >
          {fixData
            .filter(option => selectedValues.includes(option.value))
            .map(option => option.label)
            .join(', ') || placeholder}
        </StyledInputSelectField>
        <StyledInputSelectIcon isOpen={isOpen}>
          <Icon
            fileName="caret_right"
            iconSize="xxl"
            css={(theme: SupersetTheme) => ({
              color:
                typeDesign === 'form'
                  ? theme.colors.dvt.text.label
                  : theme.colors.grayscale.dark2,
            })}
          />
        </StyledInputSelectIcon>
      </StyledInputSelectInput>
      {isOpen && !startNumber && !endNumber && (
        <StyledInputSelectOptions
          itemLength={fixData.length}
          typeDesign={typeDesign}
        >
          {[...selectedOptions, ...unselectedOptions].map(option => (
            <StyledInputSelectOptionsLabel
              key={option.value}
              onClick={() => toggleOption(option.value)}
              selected={selectedValues.includes(option.value)}
              typeDesign={typeDesign}
            >
              {option.label}
              {selectedValues.includes(option.value) && (
                <StyledInputSelectDiv
                  onClick={e => {
                    e.stopPropagation();
                    toggleOption(option.value);
                  }}
                >
                  X
                </StyledInputSelectDiv>
              )}
            </StyledInputSelectOptionsLabel>
          ))}
        </StyledInputSelectOptions>
      )}
      {isOpen &&
        !!(
          startNumber !== undefined &&
          endNumber &&
          !!(startNumber < endNumber)
        ) && (
          <StyledInputSelectNumberOptions>
            {fixData.map(option => (
              <StyledInputSelectNumber
                key={option.value}
                onClick={() => toggleOption(option.value)}
                selected={selectedValues.includes(option.value)}
                typeDesign={typeDesign}
              >
                {option.label}
              </StyledInputSelectNumber>
            ))}
          </StyledInputSelectNumberOptions>
        )}
      {error && <StyledError>{error}</StyledError>}
    </StyledInputSelect>
  );
};

export default DvtInputSelect;
