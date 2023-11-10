import React from 'react';
import {
  StyledDvtPagination,
  StyledDvtPaginationText,
  StyledDvtPaginationButton,
  StyledDvtPaginationIcon,
  StyledDvtPaginationPageNumber,
} from './dvt-pagination.module';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { SupersetTheme } from '@superset-ui/core';

export interface DvtPaginationProps {
  page: number;
  setPage: (newPage: number) => void;
  itemSize: number;
  pageItemSize: number;
}

const DvtPagination: React.FC<DvtPaginationProps> = ({
  page = 1,
  setPage,
  itemSize,
  pageItemSize,
}) => {
  const totalPages = Math.ceil(itemSize / pageItemSize);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <StyledDvtPagination>
      <StyledDvtPaginationText>{'Page'}</StyledDvtPaginationText>
      <StyledDvtPaginationButton>
        <StyledDvtPaginationPageNumber>{page}</StyledDvtPaginationPageNumber>
        <StyledDvtPaginationIcon>
          <UpOutlined
            css={(theme: SupersetTheme) => ({
              fontSize: '15.75px',
              color: theme.colors.grayscale.light5,
            })}
            onClick={() => handlePageChange(page + 1)}
          />
          <DownOutlined
            css={(theme: SupersetTheme) => ({
              fontSize: '15.75px',
              color: theme.colors.grayscale.light5,
            })}
            onClick={() => handlePageChange(page - 1)}
          />
        </StyledDvtPaginationIcon>
      </StyledDvtPaginationButton>
      <StyledDvtPaginationText>
        {'of '}
        {totalPages}
      </StyledDvtPaginationText>
    </StyledDvtPagination>
  );
};

export default DvtPagination;
