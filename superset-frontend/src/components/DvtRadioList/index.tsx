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
import { StyledRadioList } from './dvt-radio-list.module';
import DvtRadio from '../DvtRadio';

interface DvtRadioProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DvtRadioListProps {
  data: DvtRadioProps[];
  direction?: 'horizontal' | 'vertical';
  active: string;
  setActive: (active: string) => void;
}

const DvtRadioList: React.FC<DvtRadioListProps> = ({
  data,
  direction = 'horizontal',
  active,
  setActive,
}) => (
  <StyledRadioList direction={direction}>
    {data.map((radio, index) => (
      <DvtRadio
        label={radio.label}
        value={radio.value}
        active={active}
        setActive={setActive}
        key={index}
        disabled={radio.disabled}
      />
    ))}
  </StyledRadioList>
);

export default DvtRadioList;
