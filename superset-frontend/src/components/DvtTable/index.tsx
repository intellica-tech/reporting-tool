// DvtTable.tsx
import React, { useEffect } from 'react';
import DvtPagination from '../DvtPagination';
import { SupersetTheme } from '@superset-ui/core';
import {
  BookFilled,
  DeleteOutlined,
  EditFilled,
  FolderOutlined,
  HeartOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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

export interface DvtTableProps {
  data: any[];
  columns: {
    Header: string;
    accessor: string;
    folderIcon?: boolean;
    heartIcon?: boolean;
    onLink: boolean;
    date: boolean;
    flex: number;
  }[];
  onRowClick?: (row: any) => void;
  actions: boolean;
  bookmarkIcon: boolean;
  itemsPerPage?: number;
  currentPage: number;
  setcurrentPage: (newPage: number) => void;
  currentItems: any[];
  setCurrentItems: (newCurrentItems: any[]) => void;
}

const DvtTable: React.FC<DvtTableProps> = ({
  data,
  columns,
  onRowClick,
  actions,
  bookmarkIcon,
  itemsPerPage = 10,
  currentPage,
  setcurrentPage,
  currentItems,
  setCurrentItems,
}) => {
  const itemsPerPageValue = itemsPerPage;
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPageValue;
    const indexOfFirstItem = (currentPage - 1) * itemsPerPageValue;
    const newCurrentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(newCurrentItems);
  }, [data, currentPage, itemsPerPageValue]);

  const paginate = (pageNumber: number) => {
    setcurrentPage(pageNumber);
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
  const totalFlex = columns.reduce(
    (total, column) => total + (column.flex || 1),
    0,
  );

  const columnsWithDefaults = 100 / totalFlex;

  return (
    <StyledTable>
      <StyledTableTable>
        <StyledTabletHead>
          <StyledTableTitle>
            {columns.map(column => (
              <StyledTableTh
                key={column.accessor}
                flex={column.flex * columnsWithDefaults}
              >
                {column.Header}
              </StyledTableTh>
            ))}
            {actions || bookmarkIcon ? (
              <StyledTableTh flex={columnsWithDefaults}>Action</StyledTableTh>
            ) : (
              ''
            )}
          </StyledTableTitle>
        </StyledTabletHead>
        <StyledTableTbody>
          {currentItems.map((row, rowIndex) => (
            <StyledTableTr
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map(column => (
                <StyledTableTd key={column.accessor} $onLink={column.onLink}>
                  <StyledTableIcon>
                    {column.folderIcon && (
                      <FolderOutlined
                        css={(theme: SupersetTheme) => ({
                          color: theme.colors.grayscale.dark2,
                          marginRight: '14px',
                          fontSize: '20px',
                        })}
                      ></FolderOutlined>
                    )}
                    {column.heartIcon && (
                      <HeartOutlined
                        css={(theme: SupersetTheme) => ({
                          color: theme.colors.grayscale.dark2,
                          marginRight: '14px',
                          fontSize: '20px',
                        })}
                      ></HeartOutlined>
                    )}
                    {column.date ? (
                      <>
                        {formatDateTime(row[column.accessor]).date}
                        <br />
                        {formatDateTime(row[column.accessor]).time}
                      </>
                    ) : (
                      <div>{row[column.accessor]}</div>
                    )}
                  </StyledTableIcon>
                </StyledTableTd>
              ))}
              {actions && !bookmarkIcon && (
                <StyledTableTd $onLink={false} css={{}}>
                  <EditFilled
                    css={{
                      marginRight: '10px',
                      fontSize: '16px',
                    }}
                  />
                  <UploadOutlined
                    css={{
                      marginRight: '10px',
                      fontSize: '16px',
                    }}
                  />
                  <DeleteOutlined
                    css={{
                      fontSize: '16px',
                    }}
                  />
                </StyledTableTd>
              )}

              {!actions && bookmarkIcon && (
                <StyledTableTd $onLink={false}>
                  <BookFilled
                    css={{
                      marginLeft: '10px',
                      fontSize: '16px',
                    }}
                  />
                </StyledTableTd>
              )}
            </StyledTableTr>
          ))}
        </StyledTableTbody>
      </StyledTableTable>
      <StyledTablePagination>
        <DvtPagination
          page={currentPage || 1}
          setPage={paginate}
          itemSize={data.length}
          pageItemSize={itemsPerPageValue}
        />
      </StyledTablePagination>
    </StyledTable>
  );
};

export default DvtTable;
