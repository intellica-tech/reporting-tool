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
  options: any;
  sql: string;
  expressionType: string;
  clause: string;
}

export interface DvtOpenSelectMenuProps {
  type: 'normal' | 'aggregates' | 'filters';
  savedType: 'metric' | 'expressions';
  values: ValuesProps;
  setValues: (values: ValuesProps) => void;
  savedData?: DataProps[];
  columnData: DataProps[];
  optionData?: OptionDataProps[];
  closeOnClick: () => void;
  saveOnClick: (args: any) => void;
  tab: 'SAVED' | 'SIMPLE' | 'SQL';
  clause: 'WHERE' | 'HAVING';
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({
  type = 'normal',
  savedType = 'metric',
  values,
  setValues,
  savedData = [],
  columnData = [],
  optionData = [],
  closeOnClick,
  saveOnClick,
  tab = 'SIMPLE',
  clause = 'WHERE',
}) => {
  const [activeTab, setActiveTab] = useState<string>(tab);
  const [whereOrHaving, setWhereOrHaving] = useState(
    OpenSelectMenuData.whereOrHaving.find(f => f.value === clause),
  );
  const [operatorData, setOperatorData] = useState<any[]>([]);
  const [sql, setSql] = useState<string>('');

  useEffect(() => {
    if (whereOrHaving?.value === 'HAVING') {
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
      options: '',
      sql: '',
      expressionType: '',
      clause: '',
    });
  };

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
          activeTab={activeTab === 'SQL'}
          onClick={() => setActiveTab('SQL')}
        >
          CUSTOM SQL
        </StyledOpenSelectMenuFilterTabs>
      </StyledOpenSelectMenuFilterTabsGroup>
      {activeTab === 'SAVED' && (
        <>
          {savedData.length ? (
            <StyledOpenSelectMenuFilterInputGroup>
              <DvtSelect
                label={`SAVED ${
                  savedType === 'expressions' ? 'EXPRESSIONS' : 'METRIC'
                }`}
                selectedValue={values.saved}
                setSelectedValue={vl =>
                  setValues({
                    ...values,
                    saved: vl,
                    column: '',
                    aggregate: '',
                    sql: '',
                  })
                }
                placeholder={`${savedData.length} ${
                  savedType === 'expressions' ? t('column(s)') : t('metric(s)')
                }`}
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
                : type === 'aggregates'
                ? `(${vl.value})`
                : type === 'filters'
                ? filtersAutoAddOperator?.operator?.value
                  ? `${vl.value} ${filtersAutoAddOperator.operator.value}`
                  : `${vl.value} ${values.operator.value}`
                : vl.value;

              if (filtersAutoAddOperator?.operator?.value) {
                setWhereOrHaving({
                  label: t('WHERE'),
                  value: 'WHERE',
                });
              }

              const onOptionValue =
                values.option?.value || values.option?.length
                  ? { option: '' }
                  : {};

              setValues({
                ...values,
                saved: '',
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
          {type === 'aggregates' && (
            <DvtSelect
              selectedValue={values.aggregate}
              setSelectedValue={vl => {
                const onColumnAddSql = values.column?.value
                  ? vl.value === 'COUNT_DISTINCT'
                    ? `COUNT(DISTINCT ${values.column.value})`
                    : `${vl.value}(${values.column.value})`
                  : vl.value;
                setValues({
                  ...values,
                  saved: '',
                  aggregate: vl,
                  sql: onColumnAddSql,
                });
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
                        const options = optionData
                          .filter(fi => vl.includes(fi.value))
                          .map(vm => vm.label);

                        setValues({
                          ...values,
                          option: vl,
                          options,
                          sql: autoAddSql,
                        });
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
      {activeTab === 'SQL' && (
        <StyledOpenSelectMenuFilterInputGroup>
          {type === 'filters' && (
            <CustomSqlWhereOrHaving>
              <DvtSelect
                selectedValue={whereOrHaving}
                setSelectedValue={vl => {
                  if (
                    whereOrHaving?.value !== vl.value &&
                    (values.column || values.operator)
                  ) {
                    resetValues();
                  }
                  setWhereOrHaving(vl);
                }}
                data={OpenSelectMenuData.whereOrHaving}
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
            onChange={vl => {
              setValues({
                ...values,
                saved: '',
                column: '',
                operator: '',
                aggregate: '',
                option: '',
                options: '',
                sql: vl,
              });
              setSql(vl);
            }}
            mode="sql"
            height={type === 'filters' ? '140px' : '200px'}
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
          typeColour={
            values.saved ||
            (type === 'aggregates'
              ? values.column && values.aggregate
              : values.column) ||
            sql
              ? 'basic'
              : 'powder'
          }
          colour="grayscale"
          onClick={() =>
            values.saved ||
            (type === 'aggregates'
              ? values.column && values.aggregate
              : values.column) ||
            sql
              ? saveOnClick({
                  expressionType: activeTab,
                  clause: whereOrHaving?.value,
                })
              : () => {}
          }
          size="small"
        />
      </StyledOpenSelectMenuFilterButtonGroup>
    </StyledOpenSelectMenu>
  );
};

export default DvtOpenSelectMenu;
