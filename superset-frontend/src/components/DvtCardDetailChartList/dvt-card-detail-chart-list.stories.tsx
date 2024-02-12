import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';
import DvtCardDetailChartList, { DvtCardDetailChartListProps } from '.';

export default {
  title: 'Dvt-Components/DvtCardDetailChartList',
  component: DvtCardDetailChartList,
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

const dummyData: DvtCardDetailChartListProps = {
  data: [
    {
      labelTitle: 'Örnek Başlık 1',
      vizTypeLabel: 'Grafik Türü 1',
      datasetLabel: 'Veri Seti 1',
      modified: new Date('2024-02-12'),
    },
    {
      labelTitle: 'Örnek Başlık 2',
      vizTypeLabel: 'Grafik Türü 2',
      datasetLabel: 'Veri Seti 2',
      modified: new Date('2024-02-11'),
    },
    {
      labelTitle: 'Örnek Başlık 3',
      vizTypeLabel: 'Grafik Türü 3',
      datasetLabel: 'Veri Seti 3',
      modified: new Date('2024-02-10'),
    },
    {
      labelTitle: 'Örnek Başlık 4',
      vizTypeLabel: 'Grafik Türü 4',
      datasetLabel: 'Veri Seti 4',
      modified: new Date('2024-02-09'),
    },
    {
      labelTitle: 'Örnek Başlık 5',
      vizTypeLabel: 'Grafik Türü 5',
      datasetLabel: 'Veri Seti 5',
      modified: new Date('2024-02-08'),
    },
    {
      labelTitle: 'Örnek Başlık 6',
      vizTypeLabel: 'Grafik Türü 6',
      datasetLabel: 'Veri Seti 6',
      modified: new Date('2024-02-07'),
    },
  ],
};

const Template: Story<DvtCardDetailChartListProps> = (
  args: DvtCardDetailChartListProps,
) => (
  <div style={{ width: '400px', height: '172px' }}>
    <DvtCardDetailChartList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: dummyData.data,
};
