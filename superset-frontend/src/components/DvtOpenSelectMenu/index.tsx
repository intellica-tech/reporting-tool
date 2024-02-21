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
import Icon from '../Icons/Icon';
import {
  StyledOpenSelectMenu,
  StyledOpenSelectMenuFilter,
  StyledOpenSelectMenuFilterButtonGroup,
  StyledOpenSelectMenuFilterInputGroup,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
} from './dvt-select.module';
import DvtSelect from '../DvtSelect';
import DvtInput from '../DvtInput';
import DvtButton from '../DvtButton';

export interface DvtOpenSelectMenuProps {
  apiUrl: string;
  data: any[];
  type?: 'filter' | 'timeRange';
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({
  data,
  apiUrl,
  type = 'filter',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<string>('');
  return (
    <StyledOpenSelectMenu>
      {type === 'filter' && (
        <StyledOpenSelectMenuFilter>
          <StyledOpenSelectMenuFilterTabsGroup>
            <StyledOpenSelectMenuFilterTabs>
              SIMPLE
            </StyledOpenSelectMenuFilterTabs>
            <StyledOpenSelectMenuFilterTabs>
              CUSTOM SQL
            </StyledOpenSelectMenuFilterTabs>
          </StyledOpenSelectMenuFilterTabsGroup>
          <StyledOpenSelectMenuFilterInputGroup>
            <DvtSelect
              selectedValue=""
              setSelectedValue={() => {}}
              data={[
                { value: 'failed', label: 'Failed' },
                { value: 'success', label: 'Success' },
              ]}
            />
            <DvtSelect
              selectedValue=""
              setSelectedValue={() => {}}
              data={[
                { value: 'failed', label: 'Failed' },
                { value: 'success', label: 'Success' },
              ]}
            />
            <DvtInput value="" onChange={() => {}} />
          </StyledOpenSelectMenuFilterInputGroup>
          <StyledOpenSelectMenuFilterButtonGroup>
            <DvtButton label="Cancel" colour="primary" onClick={() => {}} />
            <DvtButton label="Save" colour="grayscale" onClick={() => {}} />
          </StyledOpenSelectMenuFilterButtonGroup>
        </StyledOpenSelectMenuFilter>
      )}
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
