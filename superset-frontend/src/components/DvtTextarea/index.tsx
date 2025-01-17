/* eslint-disable translation-vars/no-template-vars */
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
  StyleTextarea,
  StyleTextareaLabel,
  StyleTextareaText,
} from './dvt-textarea.module';

export interface DvtTextareaProps {
  label?: string;
  typeDesign?: 'text' | 'form' | 'border' | 'resize';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const DvtTextarea: React.FC<DvtTextareaProps> = ({
  label,
  typeDesign = 'text',
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <StyleTextarea>
      {label && <StyleTextareaLabel>{label}</StyleTextareaLabel>}
      <StyleTextareaText
        typeDesign={typeDesign}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </StyleTextarea>
  );
};

export default DvtTextarea;
