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
import { SupersetTheme, supersetTheme } from '@superset-ui/core';
import { FolderOutlined, HeartOutlined } from '@ant-design/icons';
import DvtPagination from '../DvtPagination';
import {
  StyledTable,
  StyledTableTable,
  StyledTabletHead,
  StyledTableTr,
  StyledTableTh,
  StyledTableTbody,
  StyledTableTd,
  StyledTablePagination,
  StyledTableTitle,
  StyledTableIcon,
} from './dvt-table.module';
import Icon from '../Icons/Icon';

export interface DvtTableProps {
  data: any[];
  header: {
    title: string;
    field?: string;
    folderIcon?: boolean;
    heartIcon?: boolean;
    onLink?: boolean;
    flex?: number;
    clicks?: [];
    showHover?: boolean;
  }[];
  onRowClick?: (row: any) => void;
  itemsPerPage?: number;
  page?: number;
  setPage?: (newPage: number) => void;
  pagination?: boolean;
}

const DvtTable: React.FC<DvtTableProps> = ({
  data,
  header,
  onRowClick,
  itemsPerPage = 10,
  page = 1,
  setPage,
  pagination = false,
}) => {
  const itemsPerPageValue = itemsPerPage;
  const indexOfLastItem = page * itemsPerPageValue;
  const indexOfFirstItem = (page - 1) * itemsPerPageValue;
  const currentItems = pagination
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : data;

  const [openRow, setOpenRow] = useState<number | null>(null);

  const paginate = (pageNumber: number) => {
    if (setPage) {
      setPage(pageNumber);
    }
  };

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

  const columnsWithDefaults = 100 / totalFlex;

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
                {column.title}
              </StyledTableTh>
            ))}
          </StyledTableTitle>
        </StyledTabletHead>
        <StyledTableTbody>
          {currentItems.map((row, rowIndex) => (
            <StyledTableTr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              onMouseOver={() => setOpenRow(rowIndex)}
              onMouseOut={() => setOpenRow(null)}
            >
              {header.map((column, columnIndex) => (
                <StyledTableTd
                  key={columnIndex}
                  $onLink={column.onLink || false}
                >
                  <StyledTableIcon>
                    {column.folderIcon && (
                      <FolderOutlined
                        css={(theme: SupersetTheme) => ({
                          color: theme.colors.grayscale.dark2,
                          marginRight: '14px',
                          fontSize: '20px',
                        })}
                      />
                    )}
                    {column.heartIcon && (
                      <HeartOutlined
                        css={(theme: SupersetTheme) => ({
                          color: theme.colors.grayscale.dark2,
                          marginRight: '14px',
                          fontSize: '20px',
                        })}
                      />
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
                              click: () => void;
                              colour: string;
                            },
                            index,
                          ) => (
                            <Icon
                              key={index}
                              onClick={clicks.click}
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
                          ),
                        )}
                        {column.field !== 'action' && column.field && (
                          <>{row[column.field]}</>
                        )}
                      </>
                    )}
                  </StyledTableIcon>
                </StyledTableTd>
              ))}
            </StyledTableTr>
          ))}
        </StyledTableTbody>
      </StyledTableTable>
      {pagination && (
        <StyledTablePagination>
          <DvtPagination
            page={page || 1}
            setPage={paginate}
            itemSize={data.length}
            pageItemSize={itemsPerPageValue}
          />
        </StyledTablePagination>
      )}
    </StyledTable>
  );
};

export default DvtTable;