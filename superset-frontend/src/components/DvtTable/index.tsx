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
import React, { ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { SupersetTheme, supersetTheme, t } from '@superset-ui/core';
import { Checkbox } from 'antd';
import Icons from '../Icons';
import Icon from '../Icons/Icon';
import {
  StyledTable,
  StyledTableTable,
  StyledTabletHead,
  StyledTableTr,
  StyledTableTh,
  StyledTableThSort,
  StyledTableThSortRotate,
  StyledTableTbody,
  StyledTableTd,
  StyledTableTitle,
  StyledTableIcon,
  StyledTableCheckbox,
  StyledTableUrl,
} from './dvt-table.module';
import DvtPopper from '../DvtPopper';
import { useToasts } from '../MessageToasts/withToasts';
import DvtInput from '../DvtInput';
import DvtAceEditor from '../DvtAceEditor';
import DvtRadioList from '../DvtRadioList';
import DvtSelect from '../DvtSelect';

interface HeaderProps {
  id: number;
  title: string;
  field?: string;
  icon?: string;
  iconActive?: string;
  iconClick?: () => {};
  urlField?: string;
  urlFieldEnd?: string;
  flex?: number;
  clicks?: {
    icon: string;
    click: (row: any) => void;
    colour?: string;
    popperLabel?: string;
  }[];
  showHover?: boolean;
  checkbox?: boolean;
  isFavorite?: boolean;
  isFavoriteApiUrl?: string;
  sort?: boolean;
  modal?: string;
  modalLabel?: string;
  input?: boolean;
  editor?: boolean;
  checkboxData?: boolean;
  checkboxField?: boolean;
  radio?: boolean;
}

export interface DvtTableSortProps {
  column: string;
  direction: 'desc' | 'asc';
}

export interface DvtTableProps {
  data: any[];
  setData?: (row: any[]) => void;
  header: HeaderProps[];
  onRowClick?: (row: any) => void;
  selected?: any[];
  setSelected?: (newSelected: any[]) => void;
  checkboxActiveField?: string;
  setFavoriteData?: (item: any) => void;
  sort?: DvtTableSortProps;
  setSort?: (args: any) => void;
  activeRadio?: string;
  setActiveRadio?: (row: any) => void;
  collapseData?: any[];
}

const DvtTable: React.FC<DvtTableProps> = ({
  data,
  setData = () => {},
  header,
  onRowClick,
  selected = [],
  setSelected = () => {},
  checkboxActiveField = 'id',
  setFavoriteData,
  sort,
  setSort,
  activeRadio = '',
  setActiveRadio = () => {},
  collapseData,
}) => {
  const dispatch = useDispatch();
  const { addDangerToast } = useToasts();
  const [openRow, setOpenRow] = useState<number | null>(null);

  const formatDateTime = (dateTimeString: string) => {
    const [datePart, timePart] = dateTimeString.split(' ');
    const [day, month, year] = datePart.split('.');
    const [hour, minute, second] = timePart.split(':');

    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hour}:${minute}:${second}`;

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };
  const totalFlex = header.reduce(
    (total, header) => total + (header.flex || 1),
    0,
  );

  const history = useHistory();

  const columnsWithDefaults = 100 / totalFlex;

  const checkAll = data.length === selected.length;

  const indeterminate = selected.length > 0 && selected.length < data.length;

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setSelected(e.target.checked ? data.slice() : []);
  };

  const handleFavouriteData = async (item: any, apiUrl: string | undefined) => {
    if (setFavoriteData) {
      const findItem = data.find(row => row.id === item.id);
      const findItemRemovedData = data.filter(row => row.id !== item.id);

      const changedItemFavorite = () => {
        setFavoriteData(
          [
            ...findItemRemovedData,
            { ...findItem, isFavorite: !item.isFavorite },
          ].sort((a, b) => a.id - b.id),
        );
      };

      if (apiUrl) {
        try {
          const res = await fetch(
            `${apiUrl}/${item.id}/${item.isFavorite ? 'unselect' : 'select'}`,
          );
          if (res.ok) {
            changedItemFavorite();
          } else {
            addDangerToast(`${res.status} ${res.statusText}`);
          }
        } catch (error) {
          addDangerToast(error.message);
        }
      } else {
        changedItemFavorite();
      }
    }
  };

  const handleInputChange = (newValue: any, rowId: number, field: string) => {
    const updatedData = data.map(item => {
      if (item.id === rowId) {
        return {
          ...item,
          [field]: newValue,
        };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <StyledTable>
      <StyledTableTable>
        <StyledTabletHead>
          <StyledTableTitle>
            {header.map((column, columnIndex) => (
              <StyledTableTh
                key={columnIndex}
                flex={(column.flex || 1) * columnsWithDefaults}
              >
                {column.checkbox && (
                  <StyledTableCheckbox>
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                    />
                  </StyledTableCheckbox>
                )}
                {column.sort ? (
                  <StyledTableThSort
                    onClick={() =>
                      !!setSort &&
                      setSort({
                        column: column.field,
                        direction:
                          column.field === sort?.column
                            ? sort?.direction === 'desc'
                              ? 'asc'
                              : 'desc'
                            : 'asc',
                      })
                    }
                  >
                    {column.title}
                    <StyledTableThSortRotate
                      asc={
                        column.field === sort?.column &&
                        sort?.direction === 'asc'
                      }
                    >
                      <Icon
                        fileName="dvt-sort"
                        iconColor={
                          column.field === sort?.column
                            ? supersetTheme.colors.dvt.primary.base
                            : supersetTheme.colors.grayscale.dark2
                        }
                      />
                    </StyledTableThSortRotate>
                  </StyledTableThSort>
                ) : (
                  column.title
                )}
              </StyledTableTh>
            ))}
          </StyledTableTitle>
        </StyledTabletHead>
        <StyledTableTbody>
          {data
            .sort((a, b) => (a.collapse ? -1 : b.collapse ? 1 : 0))
            .map((row, rowIndex) => (
              <>
                <StyledTableTr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  onMouseOver={() => setOpenRow(rowIndex)}
                  onMouseOut={() => setOpenRow(null)}
                >
                  {header.map((column, columnIndex) => (
                    <StyledTableTd key={columnIndex}>
                      <StyledTableIcon>
                        {column.checkbox && columnIndex === 0 && (
                          <StyledTableCheckbox>
                            <Checkbox
                              checked={selected.some(
                                item =>
                                  item[checkboxActiveField] ===
                                  row[checkboxActiveField],
                              )}
                              onChange={e => {
                                const checkedRows = e.target.checked
                                  ? [...selected, row]
                                  : selected.filter(
                                      item =>
                                        item[checkboxActiveField] !==
                                        row[checkboxActiveField],
                                    );
                                setSelected(checkedRows);
                              }}
                            />
                          </StyledTableCheckbox>
                        )}
                        {column.input && (
                          <div style={{ marginRight: '14px' }}>
                            <DvtInput
                              value={column.field ? row[column.field] : ''}
                              onChange={newValue =>
                                handleInputChange(
                                  newValue,
                                  row.id,
                                  column.field ? column.field : '',
                                )
                              }
                            />
                          </div>
                        )}

                        {column.editor && (
                          <div
                            style={{
                              margin: '2px 14px',
                              width: '100%',
                            }}
                          >
                            <DvtAceEditor
                              mode="sql"
                              placeholder="SELECT..."
                              value={column.field ? row[column.field] : ''}
                              onChange={newValue =>
                                handleInputChange(
                                  newValue,
                                  row.id,
                                  column.field ? column.field : '',
                                )
                              }
                              height="60px"
                              fontSize={16}
                            />
                          </div>
                        )}
                        {column.checkboxData && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                            }}
                          >
                            <StyledTableCheckbox>
                              <Checkbox
                                onChange={e =>
                                  handleInputChange(
                                    e.target.checked,
                                    row.id,
                                    column.field ? column.field : '',
                                  )
                                }
                                checked={
                                  column.field ? row[column.field] : false
                                }
                              />
                            </StyledTableCheckbox>
                          </div>
                        )}
                        {column.radio && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              width: '100%',
                            }}
                          >
                            <DvtRadioList
                              data={[
                                {
                                  label: '',
                                  value: column.field ? row[column.field] : '',
                                },
                              ]}
                              active={activeRadio}
                              setActive={setActiveRadio}
                            />
                          </div>
                        )}
                        {column.icon && (
                          <Icon
                            onClick={column.iconClick}
                            fileName={
                              row.active
                                ? column.iconActive || 'dvt-folder-active'
                                : column.icon || 'dvt-folder'
                            }
                            iconSize="xl"
                            css={(theme: SupersetTheme) => ({
                              color: theme.colors.grayscale.dark2,
                              marginRight: '14px',
                              fontSize: '20px',
                            })}
                          />
                        )}
                        {column.isFavorite && (
                          <StyledTableTbody
                            onClick={() =>
                              handleFavouriteData(row, column?.isFavoriteApiUrl)
                            }
                          >
                            {row.isFavorite ? (
                              <Icons.StarFilled
                                iconSize="xl"
                                iconColor={supersetTheme.colors.alert.base}
                              />
                            ) : (
                              <Icons.StarOutlined
                                iconSize="xl"
                                iconColor={supersetTheme.colors.dvt.text.bold}
                              />
                            )}
                          </StyledTableTbody>
                        )}
                        {column.modal && column.field && (
                          <StyledTableUrl
                            onClick={() => {
                              dispatch(
                                openModal({
                                  component: column.modal ? column.modal : '',
                                  meta: row,
                                }),
                              );
                            }}
                          >
                            {column.modalLabel
                              ? column.modalLabel
                              : t('Select')}
                          </StyledTableUrl>
                        )}
                        {column.urlField && column.field && (
                          <StyledTableUrl
                            onClick={() => {
                              if (column.urlField) {
                                history.push(
                                  `${column.urlField}${row.id}${
                                    column.urlFieldEnd && column.urlFieldEnd
                                  }`,
                                );
                              }
                            }}
                          >
                            {row[column.field]}
                          </StyledTableUrl>
                        )}
                        {column.field === 'date' ? (
                          <>
                            {formatDateTime(row[column.field]).date}
                            <br />
                            {formatDateTime(row[column.field]).time}
                          </>
                        ) : (
                          <>
                            {column.clicks?.map(
                              (
                                clicks: {
                                  icon: string;
                                  click: (row: any) => void;
                                  colour: string;
                                  popperLabel?: string;
                                },
                                index,
                              ) => (
                                <React.Fragment key={index}>
                                  {clicks.popperLabel && (
                                    <DvtPopper label={clicks.popperLabel}>
                                      <Icon
                                        onClick={() => clicks.click(row)}
                                        fileName={clicks.icon}
                                        iconColor={
                                          clicks.colour ||
                                          supersetTheme.colors.grayscale.dark2
                                        }
                                        iconSize="xl"
                                        style={{
                                          marginRight: 3.6,
                                          visibility: column.showHover
                                            ? openRow === rowIndex
                                              ? 'visible'
                                              : 'hidden'
                                            : 'visible',
                                          height: '56px',
                                          display: 'flex',
                                          alignItems: 'center',
                                        }}
                                      />
                                    </DvtPopper>
                                  )}
                                  {!clicks.popperLabel && (
                                    <Icon
                                      onClick={() => clicks.click(row)}
                                      fileName={clicks.icon}
                                      iconColor={
                                        clicks.colour ||
                                        supersetTheme.colors.grayscale.dark2
                                      }
                                      iconSize="xl"
                                      style={{
                                        marginRight: 3.6,
                                        visibility: column.showHover
                                          ? openRow === rowIndex
                                            ? 'visible'
                                            : 'hidden'
                                          : 'visible',
                                      }}
                                    />
                                  )}
                                </React.Fragment>
                              ),
                            )}

                            {column.field !== 'action' &&
                              !column.input &&
                              !column.editor &&
                              !column.radio &&
                              column.field &&
                              !column.urlField && <>{row[column.field]}</>}
                          </>
                        )}
                      </StyledTableIcon>
                    </StyledTableTd>
                  ))}
                </StyledTableTr>
                {row.collapse && (
                  <StyledTableTr>
                    <StyledTableTd colSpan={header.length}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          gap: '15px',
                          padding: '30px 30px 30px 0 ',
                        }}
                      >
                        {collapseData?.map(field => (
                          <>
                            {field.type === 'sqlEditor' && (
                              <>
                                {field.label}
                                <DvtAceEditor
                                  mode="sql"
                                  placeholder={field.placeholder}
                                  value=""
                                  onChange={() => {}}
                                  height="200px"
                                  fontSize={16}
                                />
                              </>
                            )}
                            {field.type === 'input' && (
                              <DvtInput
                                label={field.label}
                                value=""
                                onChange={() => {}}
                                placeholder={field.placeholder}
                              />
                            )}
                            {field.type === 'select' && (
                              <DvtSelect
                                data={[{ value: 'deneme', label: 'denem' }]}
                                selectedValue={selected}
                                setSelectedValue={setSelected}
                                label={field.label}
                                placeholder={field.placeholder}
                              />
                            )}
                          </>
                        ))}
                      </div>
                    </StyledTableTd>
                  </StyledTableTr>
                )}
              </>
            ))}
        </StyledTableTbody>
      </StyledTableTable>
    </StyledTable>
  );
};

export default DvtTable;
