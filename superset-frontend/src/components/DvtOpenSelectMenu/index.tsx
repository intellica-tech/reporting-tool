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
import { t } from '@superset-ui/core';
import DvtSelect from '../DvtSelect';
// import DvtInput from '../DvtInput';
import DvtButton from '../DvtButton';
import DvtAceEditor from '../DvtAceEditor';
import Icon from '../Icons/Icon';
import OpenSelectMenuData from './dvtOpenSelectMenuData';
import {
  StyledOpenSelectMenu,
  StyledOpenSelectMenuFilterButtonGroup,
  StyledOpenSelectMenuFilterInputGroup,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
  StyledOpenSelectMenuIcon,
  StyledOpenSelectMenuLabel,
  StyledOpenSelectMenuSaved,
  StyledOpenSelectMenuTitle,
  CustomSqlWhereOrHaving,
  CustomSqlWhereOrHavingLabel,
} from './dvt-open-select-menu.module';

interface DataProps {
  label: string;
  value: string;
}

interface ValuesProps {
  saved: any;
  column: any;
  operator: any;
  aggregate: any;
  option: any;
  sql: string;
}

export interface DvtOpenSelectMenuProps {
  type:
    | 'x-axis'
    | 'temporal_x-axis'
    | 'breakdowns'
    | 'metric'
    | 'metrics'
    | 'filters'
    | 'dimensions'
    | 'sort_by'
    | 'percentage_metrics'
    | 'soruce_target';
  values: ValuesProps;
  setValues: (values: ValuesProps) => void;
  savedData?: DataProps[];
  columnData: DataProps[];
  optionData?: DataProps[];
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({
  type = 'x-axis',
  values,
  setValues,
  savedData = [],
  columnData = [],
  optionData = [],
}) => {
  const [activeTab, setActiveTab] = useState<string>('SIMPLE');
  const [whereOrHaving, setWhereOrHaving] = useState({
    label: t('WHERE'),
    value: 'where',
  });

  const onAggregateTypes = [
    'metric',
    'metrics',
    'sort_by',
    'percentage_metrics',
  ];

  return (
    <StyledOpenSelectMenu>
      <StyledOpenSelectMenuFilterTabsGroup>
        {type !== 'filters' && (
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
      {activeTab === 'SAVED' && (
        <>
          {savedData.length ? (
            <StyledOpenSelectMenuFilterInputGroup>
              <DvtSelect
                selectedValue={values.saved}
                setSelectedValue={vl => setValues({ ...values, saved: vl })}
                placeholder={`${savedData.length} ${t('metric(s)')}`}
                data={savedData}
                typeDesign="navbar"
              />
            </StyledOpenSelectMenuFilterInputGroup>
          ) : (
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
        </>
      )}
      {activeTab === 'SIMPLE' && (
        <StyledOpenSelectMenuFilterInputGroup>
          <DvtSelect
            selectedValue={values.column}
            setSelectedValue={vl => setValues({ ...values, column: vl })}
            placeholder={`${columnData.length} ${t('column(s)')}`}
            data={columnData}
            typeDesign="navbar"
          />
          {onAggregateTypes.includes(type) && (
            <DvtSelect
              selectedValue={values.aggregate}
              setSelectedValue={vl => setValues({ ...values, aggregate: vl })}
              placeholder={`${OpenSelectMenuData.aggregate.length} ${t(
                'aggregates(s)',
              )}`}
              data={OpenSelectMenuData.aggregate}
              typeDesign="navbar"
            />
          )}
          {type === 'filters' && (
            <>
              <DvtSelect
                selectedValue={values.operator}
                setSelectedValue={vl => setValues({ ...values, operator: vl })}
                placeholder={`${OpenSelectMenuData.operator.length} ${t(
                  'operator(s)',
                )}`}
                data={OpenSelectMenuData.operator}
                typeDesign="navbar"
              />
              <DvtSelect
                selectedValue={values.option}
                setSelectedValue={vl => setValues({ ...values, option: vl })}
                placeholder={`${optionData.length} ${t('option(s)')}`}
                data={optionData}
                typeDesign="navbar"
              />
            </>
          )}
        </StyledOpenSelectMenuFilterInputGroup>
      )}
      {activeTab === 'CUSTOM SQL' && (
        <StyledOpenSelectMenuFilterInputGroup>
          {type === 'filters' && (
            <CustomSqlWhereOrHaving>
              <DvtSelect
                selectedValue={whereOrHaving}
                setSelectedValue={setWhereOrHaving}
                data={[
                  { label: t('WHERE'), value: 'where' },
                  { label: t('HAVING'), value: 'having' },
                ]}
                typeDesign="navbar"
                width={110}
              />
              <CustomSqlWhereOrHavingLabel>
                <p>
                  <b>{t('WHERE')}</b>
                  {` ${t('Filters by columns')}`}
                </p>
                <p>
                  <b>{t('HAVING')}</b>
                  {` ${t('Filters by metrics')}`}
                </p>
              </CustomSqlWhereOrHavingLabel>
            </CustomSqlWhereOrHaving>
          )}
          <DvtAceEditor
            value={values.sql}
            onChange={vl => setValues({ ...values, sql: vl })}
            mode="sql"
            height={type === 'filters' ? '100px' : '150px'}
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
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
