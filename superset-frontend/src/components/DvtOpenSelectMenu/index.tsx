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
import { useDispatch } from 'react-redux';
import { t } from '@superset-ui/core';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
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
  FilterTimeRangeOpen,
} from './dvt-open-select-menu.module';

export interface MetricDataProps {
  certification_details: any;
  certified_by: any;
  currency: any;
  d3format: any;
  description: any;
  expression: string;
  id: number;
  is_certified: boolean;
  metric_name: string;
  verbose_name: string;
  warning_markdown: any;
  warning_text: any;
}

export interface ColumnDataProps {
  advanced_data_type: any;
  certification_details: any;
  certified_by: any;
  column_name: string;
  description: any;
  expression: any;
  filterable: boolean;
  groupby: boolean;
  id: number;
  is_certified: boolean;
  is_dttm: boolean;
  python_date_format: any;
  type: any;
  type_generic: any;
  verbose_name: any;
  warning_markdown: any;
}

interface OptionDataProps {
  label: string;
  value: any;
}

interface ValuesProps {
  saved: any;
  column: any;
  operator: any;
  aggregate: any;
  option: any;
  comparator: any;
  sql: string;
  expressionType: string;
  clause: string;
  filterType?: string;
}

export interface DvtOpenSelectMenuProps {
  type?: 'normal' | 'aggregates' | 'filters';
  savedType?: 'metric' | 'expressions';
  simpleType?: 'normal' | 'temporal';
  values: ValuesProps;
  setValues: (values: ValuesProps) => void;
  savedData?: MetricDataProps[];
  columnData: ColumnDataProps[];
  optionData?: OptionDataProps[];
  closeOnClick: () => void;
  saveOnClick: (args: any) => void;
  tab: 'SAVED' | 'SIMPLE' | 'SQL';
  clause: 'WHERE' | 'HAVING';
}

const DvtOpenSelectMenu: React.FC<DvtOpenSelectMenuProps> = ({
  type = 'normal',
  savedType = 'metric',
  simpleType = 'normal',
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
  const dispatch = useDispatch();
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
      comparator: '',
      sql: '',
      expressionType: '',
      clause: '',
      filterType: '',
    });
  };

  const filtersOptionOnInputSelect = ['IN', 'NOT IN'];

  const filtersOptionWithoutForm = ['IS NOT NULL', 'IS NULL'];

  const savedDataTypes =
    savedType === 'expressions'
      ? columnData.filter(f => f.expression)
      : savedData;

  const columnDataSimpleTypes = columnData.filter(f => {
    if (simpleType === 'temporal') {
      return f.is_dttm;
    }
    if (type === 'filters') {
      return f.filterable;
    }
    return f;
  });

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
          {simpleType !== 'temporal' && savedData.length ? (
            <StyledOpenSelectMenuFilterInputGroup>
              <DvtSelect
                label={`SAVED ${
                  savedType === 'expressions' ? 'EXPRESSIONS' : 'METRIC'
                }`}
                selectedValue={values.saved}
                setSelectedValue={vl => {
                  setValues({
                    ...values,
                    saved: vl,
                    column: '',
                    aggregate: '',
                    sql: savedType === 'expressions' ? vl.expression : '',
                  });
                }}
                placeholder={`${savedDataTypes.length} ${
                  savedType === 'expressions' ? t('column(s)') : t('metric(s)')
                }`}
                data={savedDataTypes}
                typeDesign="navbar"
                objectName={
                  savedType === 'expressions' ? 'column_name' : 'metric_name'
                }
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
                    ? vl.python_date_format ||
                      vl.type === 'TIMESTAMP WITHOUT TIME ZONE'
                      ? {
                          operator: {
                            label: t('No filter'),
                            value: 'TEMPORAL_RANGE',
                          },
                          comparator: 'No filter',
                          filterType: 'time_range',
                        }
                      : values.filterType === 'time_range'
                      ? {
                          operator: OpenSelectMenuData.operator.where.find(
                            fi => fi.value === 'IN',
                          ),
                          filterType: '',
                        }
                      : {}
                    : vl.python_date_format ||
                      vl.type === 'TIMESTAMP WITHOUT TIME ZONE'
                    ? {
                        operator: {
                          label: t('No filter'),
                          value: 'TEMPORAL_RANGE',
                        },
                        comparator: 'No filter',
                        filterType: 'time_range',
                      }
                    : {
                        operator: OpenSelectMenuData.operator.where.find(
                          fi => fi.value === 'IN',
                        ),
                        filterType: '',
                      }
                  : {};
              const autoAddSql = values.aggregate?.value
                ? values.aggregate.value === 'COUNT_DISTINCT'
                  ? `COUNT(DISTINCT ${vl.column_name})`
                  : `${values.aggregate.value}(${vl.column_name})`
                : type === 'aggregates'
                ? `(${vl.column_name})`
                : type === 'filters'
                ? filtersAutoAddOperator?.operator?.value
                  ? filtersAutoAddOperator.filterType === 'time_range'
                    ? vl.column_name
                    : `${vl.column_name} ${filtersAutoAddOperator.operator.value}`
                  : `${vl.column_name} ${values.operator.value}`
                : vl.column_name;

              if (filtersAutoAddOperator?.operator?.value) {
                setWhereOrHaving({
                  label: t('WHERE'),
                  value: 'WHERE',
                });
              }

              const onOptionValue =
                values.option?.value || values.option?.length
                  ? { option: '', comparator: '' }
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
            placeholder={`${columnDataSimpleTypes.length} ${t('column(s)')}`}
            data={columnDataSimpleTypes}
            typeDesign="navbar"
            objectName="column_name"
          />
          {type === 'aggregates' && (
            <DvtSelect
              selectedValue={values.aggregate}
              setSelectedValue={vl => {
                const onColumnAddSql = values.column?.column_name
                  ? vl.value === 'COUNT_DISTINCT'
                    ? `COUNT(DISTINCT ${values.column.column_name})`
                    : `${vl.value}(${values.column.column_name})`
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
              {values?.filterType === 'time_range' ? (
                <FilterTimeRangeOpen
                  onClick={() =>
                    dispatch(
                      openModal({
                        component: 'time-range',
                        meta: values,
                      }),
                    )
                  }
                >
                  {values.operator?.label}
                  <Icon fileName="clock" iconSize="xl" />
                </FilterTimeRangeOpen>
              ) : (
                <>
                  <DvtSelect
                    selectedValue={values.operator}
                    setSelectedValue={vl => {
                      const onColumnAddSql = values.column?.column_name
                        ? values.option &&
                          !filtersOptionWithoutForm.includes(vl.value)
                          ? filtersOptionOnInputSelect.includes(vl.value)
                            ? `${values.column.column_name} ${vl.value} (${
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
                            ? `${values.column.column_name} ${vl.value} '${
                                optionData.find(
                                  fi => fi.value === values.option[0],
                                )?.label
                              }'`
                            : `${values.column.column_name} ${vl.value} '${values.option.label}'`
                          : `${values.column.column_name} ${vl.value}`
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
                                comparator: values.option?.value
                                  ? [values.option.value]
                                  : values.option,
                              }
                            : {
                                option: values.option?.length
                                  ? optionData.find(
                                      fi => fi.value === values.option[0],
                                    )
                                  : values.option,
                                comparator: values.option?.length
                                  ? values.option[0]
                                  : values.option.value,
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
                  {!filtersOptionWithoutForm.includes(
                    values.operator?.value,
                  ) && (
                    <>
                      {filtersOptionOnInputSelect.includes(
                        values.operator?.value,
                      ) ? (
                        <DvtInputSelect
                          selectedValues={values.option ? values.option : []}
                          setSelectedValues={vl => {
                            const autoAddSql = `${values.column?.column_name} ${
                              values.operator?.value
                            } (${vl
                              .map(vm => {
                                const stringOrNumber =
                                  typeof vm === 'number' ? vm : `'${vm}'`;
                                return stringOrNumber;
                              })
                              .join(', ')})`;
                            const comparators = optionData
                              .filter(fi => vl.includes(fi.value))
                              .map(vm => vm.label);

                            setValues({
                              ...values,
                              option: vl,
                              comparator: comparators,
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
                            const stringOrNumber =
                              typeof vl.value === 'number'
                                ? vl.value
                                : `'${vl.value}'`;
                            const autoAddSql = `${values.column?.column_name} ${values.operator?.value} ${stringOrNumber}`;
                            setValues({
                              ...values,
                              comparator: vl.value,
                              option: vl,
                              sql: autoAddSql,
                            });
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
                comparator: '',
                filterType: '',
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
