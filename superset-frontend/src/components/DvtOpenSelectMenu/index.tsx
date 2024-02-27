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
  StyledOpenSelectMenuIcon,
  StyledOpenSelectMenuLabel,
  StyledOpenSelectMenuSaved,
  StyledOpenSelectMenuTitle,
} from './dvt-select.module';
import DvtSelect from '../DvtSelect';
import DvtInput from '../DvtInput';
import DvtButton from '../DvtButton';
import DvtAceEditor from '../DvtAceEditor';
import { t } from '@superset-ui/core';
import Icon from '../Icons/Icon';

interface dataProps {
  savedData?: { column: string; aggregate: string };
  metricData?: { column: string; aggregate: string };
  filterData?: { column: string; operator: string; filterValue: string };
  customSql: { selectSql: string; sqlQuery: string };
}

export interface DvtOpenSelectMenuProps {
  apiUrl: string;
  data: dataProps;
  type: 'metric' | 'filters' | 'soruce_target';
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>(
    data.savedData ? 'SAVED' : 'SIMPLE',
  );
  return (
    <StyledOpenSelectMenu>
      <StyledOpenSelectMenuFilter>
        <StyledOpenSelectMenuFilterTabsGroup>
          {data.savedData && (
            <StyledOpenSelectMenuFilterTabs
              activeTab={activeTab === 'SAVED'}
              onClick={() => setActiveTab('SAVED')}
            >
              SAVED
            </StyledOpenSelectMenuFilterTabs>
          )}
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
        {activeTab === 'SIMPLE' && data.metricData && (
          <StyledOpenSelectMenuFilterInputGroup>
            <DvtSelect
              selectedValue=""
              setSelectedValue={() => {}}
              placeholder="8 column(s)"
              data={[
                { value: 'failed', label: 'Failed' },
                { value: 'success', label: 'Success' },
              ]}
              typeDesign="navbar"
              label="COLUMN"
            />
            <DvtSelect
              selectedValue=""
              setSelectedValue={() => {}}
              placeholder="6 aggregates(s)"
              data={[
                { value: 'failed', label: 'Failed' },
                { value: 'success', label: 'Success' },
              ]}
              typeDesign="navbar"
              label="AGGREGATE"
            />
          </StyledOpenSelectMenuFilterInputGroup>
        )}
        {activeTab === 'SIMPLE' && data.filterData && (
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
        {activeTab === 'SAVED' && (
          <StyledOpenSelectMenuSaved>
            <StyledOpenSelectMenuIcon>
              <Icon fileName="dvt-file" style={{ fontSize: '55px' }} />
            </StyledOpenSelectMenuIcon>
            <StyledOpenSelectMenuTitle>
              {t('No temporal columns found')}
            </StyledOpenSelectMenuTitle>
            <StyledOpenSelectMenuLabel>
              {t(
                'Add calculated temporal columns to dataset in "Edit datasource" modal',
              )}
            </StyledOpenSelectMenuLabel>
          </StyledOpenSelectMenuSaved>
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
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
