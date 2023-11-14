import React, { useState } from 'react';
import DvtTable, { DvtTableProps } from '.';

export default {
  title: 'Dvt-Components/DvtTable',
  component: DvtTable,
};

export const Default = (args: DvtTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [currentItems, setCurrentItems] = useState<any[]>([]);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);
  const handleItemChange = (newCurrentItems: any[]) =>
    setCurrentItems(newCurrentItems);

  return (
    <div style={{ width: 1440, height: 1050 }}>
      <DvtTable
        {...args}
        currentPage={currentPage}
        setcurrentPage={handlePageChange}
        currentItems={currentItems}
        setCurrentItems={handleItemChange}
        actions={true}
      />
    </div>
  );
};

Default.args = {
  data: [
    {
      name: 'arac',
      type: 'Pysical',
      database: 'PostgreSQL',
      schema: 'Dwh',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'hrrr2',
      type: 'Pysical',
      database: 'PostgreSQL',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'channel_members',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'channel',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'cleaned_sales_data',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'covid_vaccines',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'exported_stats',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'members_channels_2',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
    {
      name: 'Fcc 2018 Survey',
      type: 'Pysical',
      database: 'Examples',
      schema: 'Public',
      modifiedDate: '10.03.2023 12:45:00',
      modifiedBy: 'Admin',
      owners: 'A',
    },
  ],
  columns: [
    {
      Header: 'Name',
      accessor: 'name',
      folderIcon: true,
      onLink: true,
      flex: 3,
    },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Database', accessor: 'database' },
    { Header: 'Schema', accessor: 'schema' },
    { Header: 'Modified Date', accessor: 'modifiedDate', date: true },
    { Header: 'Modified By', accessor: 'modifiedBy' },
    { Header: 'Owners', accessor: 'owners' },
  ],
  rowKey: 'name',
  pageSize: 10,
};

Default.argTypes = {
  title: {
    control: { type: 'text' },
  },
};
