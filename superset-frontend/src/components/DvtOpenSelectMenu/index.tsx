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
import React, { useState } from 'react';
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
import DvtAceEditor from '../DvtAceEditor';

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
  const [activeTab, setActiveTab] = useState<string>('SIMPLE');
  return (
    <StyledOpenSelectMenu>
      {type === 'filter' && (
        <StyledOpenSelectMenuFilter>
          <StyledOpenSelectMenuFilterTabsGroup>
            <StyledOpenSelectMenuFilterTabs
              activeTab={activeTab === 'SIMPLE'}
              onClick={() => setActiveTab('SIMPLE')}
            >
              SIMPLE
            </StyledOpenSelectMenuFilterTabs>
            <StyledOpenSelectMenuFilterTabs
              activeTab={activeTab === 'CUSTOM SQL'}
              onClick={() => setActiveTab('CUSTOM SQL')}
            >
              CUSTOM SQL
            </StyledOpenSelectMenuFilterTabs>
          </StyledOpenSelectMenuFilterTabsGroup>
          {activeTab === 'SIMPLE' && (
            <StyledOpenSelectMenuFilterInputGroup>
              <DvtSelect
                selectedValue=""
                setSelectedValue={() => {}}
                placeholder="144 column(s)"
                data={[
                  { value: 'failed', label: 'Failed' },
                  { value: 'success', label: 'Success' },
                ]}
                typeDesign="navbar"
              />
              <DvtSelect
                selectedValue=""
                setSelectedValue={() => {}}
                placeholder="12 operator(s)"
                data={[
                  { value: 'failed', label: 'Failed' },
                  { value: 'success', label: 'Success' },
                ]}
                typeDesign="navbar"
              />
              <DvtInput
                value=""
                onChange={() => {}}
                placeholder="Filter value (case sensitive)"
              />
            </StyledOpenSelectMenuFilterInputGroup>
          )}
          {activeTab === 'CUSTOM SQL' && (
            <StyledOpenSelectMenuFilterInputGroup>
              <DvtSelect
                selectedValue="where"
                setSelectedValue={() => {}}
                placeholder="WHERE Filters by columns
                HAVING Filters by metrics"
                data={[
                  { value: 'where', label: 'WHERE' },
                  { value: 'having', label: 'HAVING' },
                ]}
                typeDesign="navbar"
              />
              <DvtAceEditor
                value=""
                onChange={() => {}}
                mode="sql"
                height="100px"
              />
            </StyledOpenSelectMenuFilterInputGroup>
          )}
          <StyledOpenSelectMenuFilterButtonGroup>
            <DvtButton
              label="Cancel"
              colour="primary"
              onClick={() => {}}
              size="small"
            />
            <DvtButton
              label="Save"
              colour="grayscale"
              onClick={() => {}}
              size="small"
            />
          </StyledOpenSelectMenuFilterButtonGroup>
        </StyledOpenSelectMenuFilter>
      )}
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
