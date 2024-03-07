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
import React, { useState } from 'react';
import { SupersetTheme, supersetTheme } from '@superset-ui/core';
import Icon from '../Icons/Icon';
import DvtPopper from '../DvtPopper';
import {
  StyledInput,
  StyledInputInput,
  StyledInputField,
  StyledInputIcon,
  StyledInputLabel,
  StyledInputPopover,
  StyledInputClear,
  StyledError,
} from './dvt-input.module';

export interface DvtInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'search';
  typeDesign?: 'text' | 'form' | 'chartsForm';
  size?: 'small' | 'medium' | 'large';
  value: string;
  onChange: (value: string) => void;
  handleSearchClick?: () => void;
  disabled?: boolean;
  importantLabel?: string;
  popoverLabel?: string;
  popoverDirection?: 'top' | 'bottom' | 'left' | 'right';
  onShowClear?: boolean;
  error?: string;
  number?: boolean;
}

const DvtInput = ({
  label,
  placeholder = '',
  type = 'text',
  size = 'small',
  value,
  typeDesign = 'text',
  onChange,
  handleSearchClick,
  importantLabel,
  popoverDirection,
  disabled,
  popoverLabel,
  onShowClear = false,
  error,
  number = false,
}: DvtInputProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [onHover, setOnHover] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (number && !/^\d*$/.test(e.target.value)) {
      return;
    }
    onChange(e.target.value);
  };

  return (
    <StyledInput onMouseLeave={() => setOnHover(false)}>
      {label && (
        <StyledInputPopover>
          <StyledInputLabel>{label}</StyledInputLabel>
          {importantLabel && (
            <DvtPopper
              label={importantLabel}
              direction={popoverDirection}
              size="small"
            >
              <Icon
                fileName="warning"
                css={(theme: SupersetTheme) => ({
                  color: theme.colors.alert.base,
                })}
                iconSize="l"
              />
            </DvtPopper>
          )}
          {popoverLabel && (
            <DvtPopper
              size="small"
              label={popoverLabel}
              direction={popoverDirection}
            >
              <Icon
                fileName="warning"
                css={(theme: SupersetTheme) => ({
                  color: theme.colors.dvt.primary.base,
                })}
                iconSize="l"
              />
            </DvtPopper>
          )}
        </StyledInputPopover>
      )}
      <StyledInputInput $size={size} typeDesign={typeDesign}>
        {type === 'email' && (
          <Icon
            fileName="email"
            iconSize="xl"
            iconColor={supersetTheme.colors.dvt.text.label}
            style={{ paddingRight: '12px' }}
          />
        )}
        {type === 'password' && (
          <Icon
            fileName="lock_locked"
            iconSize="xl"
            iconColor={supersetTheme.colors.dvt.text.label}
            style={{ paddingRight: '12px' }}
          />
        )}
        <StyledInputField
          typeDesign={typeDesign}
          $size={size}
          placeholder={placeholder}
          type={show ? 'text' : type}
          value={Number.isNaN(value) ? '' : value}
          onChange={handleChange}
          disabled={disabled}
          onMouseOver={() => setOnHover(true)}
        />
        {onShowClear && value && onHover && (
          <StyledInputClear
            onClick={() => {
              if (value !== '') {
                onChange('');
              }
            }}
          />
        )}
        {type === 'password' && (
          <StyledInputIcon onClick={() => setShow(!show)}>
            <Icon
              fileName={show ? 'eye' : 'eye_slash'}
              iconSize="xl"
              iconColor={supersetTheme.colors.dvt.text.label}
            />
          </StyledInputIcon>
        )}
        {type === 'search' && (
          <StyledInputIcon
            onClick={() => handleSearchClick && handleSearchClick}
          >
            <Icon
              fileName="search"
              iconSize="xl"
              iconColor={supersetTheme.colors.dvt.text.label}
            />
          </StyledInputIcon>
        )}
      </StyledInputInput>
      {error && <StyledError>{error}</StyledError>}
    </StyledInput>
  );
};

export default DvtInput;
