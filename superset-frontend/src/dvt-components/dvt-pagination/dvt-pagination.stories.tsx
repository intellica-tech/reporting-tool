import React, { useState } from 'react';
import DvtPagination, { DvtPaginationProps } from '.';

export default {
  title: 'Dvt-Components/DvtPagination',
  component: DvtPagination,
};

const itemSize = 50;
const pageItemSize = 10;

export const Default = (args: DvtPaginationProps) => {
 const [currentPage, setCurrentPage] = useState(args.page || 1);

 return (
    <DvtPagination
      {...args}
      page={currentPage}
      setPage={setCurrentPage}
      itemSize={itemSize}
      pageItemSize={pageItemSize}
    />
 );
};

Default.argTypes = {
  page: {
    control: { type: 'number' },
    defaultValue: 3,
  },
  itemSize: {
    control: { type: 'number' },
    defaultValue: 50,
  },
  pageItemSize: {
    control: { type: 'number' },
    defaultValue: 10,
  },
}
