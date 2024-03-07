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
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtSelect from '../DvtSelect';
import DvtInputSelect from '../DvtInputSelect';
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

interface OptionDataProps {
  label: string;
  value: number;
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
    | 'soruce_target'
    | 'columns';
  values: ValuesProps;
  setValues: (values: ValuesProps) => void;
  savedData?: DataProps[];
  columnData: DataProps[];
  optionData?: OptionDataProps[];
  closeOnClick: () => void;
  saveOnClick: () => void;
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({
  type = 'x-axis',
  values,
  setValues,
  savedData = [],
  columnData = [],
  optionData = [],
  closeOnClick,
  saveOnClick,
}) => {
  const [activeTab, setActiveTab] = useState<string>('SIMPLE');
  const [whereOrHaving, setWhereOrHaving] = useState({
    label: t('WHERE'),
    value: 'where',
  });
  const [operatorData, setOperatorData] = useState<any[]>([]);

  useEffect(() => {
    if (whereOrHaving.value === 'having') {
      setOperatorData(OpenSelectMenuData.operator.having);
    } else {
      setOperatorData([
        ...OpenSelectMenuData.operator.having,
        ...OpenSelectMenuData.operator.where,
      ]);
    }
  }, [whereOrHaving]);

  const resetValues = () => {
    setValues({
      saved: '',
      column: '',
      operator: '',
      aggregate: '',
      option: '',
      sql: '',
    });
  };

  const onAggregateTypes = [
    'metric',
    'metrics',
    'sort_by',
    'percentage_metrics',
  ];

  const filtersOptionOnInputSelect = ['IN', 'NOT IN'];

  const filtersOptionWithoutForm = ['IS NOT NULL', 'IS NULL'];

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
            setSelectedValue={vl => {
              const filtersAutoAddOperator =
                type === 'filters'
                  ? values.operator?.value
                    ? {}
                    : {
                        operator: OpenSelectMenuData.operator.where.find(
                          fi => fi.value === 'IN',
                        ),
                      }
                  : {};
              const autoAddSql = values.aggregate?.value
                ? values.aggregate.value === 'COUNT_DISTINCT'
                  ? `COUNT(DISTINCT ${vl.value})`
                  : `${values.aggregate.value}(${vl.value})`
                : onAggregateTypes.includes(type)
                ? `(${vl.value})`
                : type === 'filters'
                ? filtersAutoAddOperator?.operator?.value
                  ? `${vl.value} ${filtersAutoAddOperator.operator.value}`
                  : `${vl.value} ${values.operator.value}`
                : vl.value;

              if (filtersAutoAddOperator?.operator?.value) {
                setWhereOrHaving({
                  label: t('WHERE'),
                  value: 'where',
                });
              }

              const onOptionValue =
                values.option?.value || values.option?.length
                  ? { option: '' }
                  : {};

              setValues({
                ...values,
                column: vl,
                sql: autoAddSql,
                ...filtersAutoAddOperator,
                ...onOptionValue,
              });
            }}
            placeholder={`${columnData.length} ${t('column(s)')}`}
            data={columnData}
            typeDesign="navbar"
          />
          {onAggregateTypes.includes(type) && (
            <DvtSelect
              selectedValue={values.aggregate}
              setSelectedValue={vl => {
                const onColumnAddSql = values.column?.value
                  ? vl.value === 'COUNT_DISTINCT'
                    ? `COUNT(DISTINCT ${values.column.value})`
                    : `${vl.value}(${values.column.value})`
                  : vl.value;
                setValues({ ...values, aggregate: vl, sql: onColumnAddSql });
              }}
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
                setSelectedValue={vl => {
                  const onColumnAddSql = values.column?.value
                    ? values.option &&
                      !filtersOptionWithoutForm.includes(vl.value)
                      ? filtersOptionOnInputSelect.includes(vl.value)
                        ? `${values.column.value} ${vl.value} (${
                            values.option?.value
                              ? `'${
                                  optionData.find(
                                    fi => fi.value === values.option.value,
                                  )?.label
                                }'`
                              : optionData
                                  .filter(fi =>
                                    values.option.includes(fi.value),
                                  )
                                  .map(vm => `'${vm.label}'`)
                                  .join(', ')
                          })`
                        : values.option?.length
                        ? `${values.column.value} ${vl.value} '${
                            optionData.find(fi => fi.value === values.option[0])
                              ?.label
                          }'`
                        : `${values.column.value} ${vl.value} '${values.option.label}'`
                      : `${values.column.value} ${vl.value}`
                    : '';
                  const optionMultipleOrSelect =
                    filtersOptionWithoutForm.includes(vl.value)
                      ? { option: '' }
                      : values.option
                      ? filtersOptionOnInputSelect.includes(vl.value)
                        ? {
                            option: values.option?.value
                              ? [values.option.value]
                              : values.option,
                          }
                        : {
                            option: values.option?.length
                              ? optionData.find(
                                  fi => fi.value === values.option[0],
                                )
                              : values.option,
                          }
                      : {};

                  setValues({
                    ...values,
                    operator: vl,
                    sql: onColumnAddSql,
                    ...optionMultipleOrSelect,
                  });
                }}
                placeholder={`${operatorData.length} ${t('operator(s)')}`}
                data={operatorData}
                typeDesign="navbar"
              />
              {!filtersOptionWithoutForm.includes(values.operator?.value) && (
                <>
                  {filtersOptionOnInputSelect.includes(
                    values.operator?.value,
                  ) ? (
                    <DvtInputSelect
                      selectedValues={values.option ? values.option : []}
                      setSelectedValues={vl => {
                        const autoAddSql = `${values.column?.value} ${
                          values.operator?.value
                        } (${optionData
                          .filter(fi => vl.includes(fi.value))
                          .map(vm => `'${vm.label}'`)
                          .join(', ')})`;
                        setValues({ ...values, option: vl, sql: autoAddSql });
                      }}
                      placeholder={`${optionData.length} ${t('option(s)')}`}
                      data={optionData}
                      // typeDesign="navbar"
                    />
                  ) : (
                    <DvtSelect
                      selectedValue={values.option}
                      setSelectedValue={vl => {
                        const autoAddSql = `${values.column?.value} ${values.operator?.value} '${vl.label}'`;
                        setValues({ ...values, option: vl, sql: autoAddSql });
                      }}
                      placeholder={`${optionData.length} ${t('option(s)')}`}
                      data={optionData}
                      typeDesign="navbar"
                    />
                  )}
                </>
              )}
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
                setSelectedValue={vl => {
                  if (
                    whereOrHaving.value !== vl.value &&
                    (values.column || values.operator)
                  ) {
                    resetValues();
                  }
                  setWhereOrHaving(vl);
                }}
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
            border
          />
        </StyledOpenSelectMenuFilterInputGroup>
      )}
      <StyledOpenSelectMenuFilterButtonGroup>
        <DvtButton
          label="Cancel"
          colour="primary"
          onClick={() => {
            resetValues();
            closeOnClick();
          }}
          size="small"
        />
        <DvtButton
          label="Save"
          colour="grayscale"
          onClick={saveOnClick}
          size="small"
        />
      </StyledOpenSelectMenuFilterButtonGroup>
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
