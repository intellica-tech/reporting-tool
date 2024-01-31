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
import React from 'react';
import {
  StyledCheckbox,
  StyledCheckboxInput,
  StyledCheckboxLabel,
} from './dvt-checkbox.module';

export interface DvtCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  colour?: 'black' | 'grey';
}

const DvtCheckbox: React.FC<DvtCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  colour = 'grey',
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <StyledCheckbox
      checked={checked}
      disabled={disabled}
      onClick={() => !disabled && handleChange()}
      colour={colour}
    >
      <StyledCheckboxInput
        checked={checked}
        disabled={disabled}
        colour={colour}
      />
      <StyledCheckboxLabel
        checked={checked}
        disabled={disabled}
        colour={colour}
      >
        {label}
      </StyledCheckboxLabel>
    </StyledCheckbox>
  );
};

export default DvtCheckbox;
