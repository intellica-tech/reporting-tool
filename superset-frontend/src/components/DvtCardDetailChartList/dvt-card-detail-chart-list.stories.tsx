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
      id: 1,
      slice_name: 'Örnek Başlık 1',
      viz_type: 'Grafik Türü 1',
      datasource_name_text: 'Veri Seti 1',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
    {
      id: 2,
      slice_name: 'Örnek Başlık 2',
      viz_type: 'Grafik Türü 2',
      datasource_name_text: 'Veri Seti 2',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
    {
      id: 3,
      slice_name: 'Örnek Başlık 3',
      viz_type: 'Grafik Türü 3',
      datasource_name_text: 'Veri Seti 3',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
    {
      id: 4,
      slice_name: 'Örnek Başlık 4',
      viz_type: 'Grafik Türü 4',
      datasource_name_text: 'Veri Seti 4',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
    {
      id: 5,
      slice_name: 'Örnek Başlık 5',
      viz_type: 'Grafik Türü 5',
      datasource_name_text: 'Veri Seti 5',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
    {
      id: 6,
      slice_name: 'Örnek Başlık 6',
      viz_type: 'Grafik Türü 6',
      datasource_name_text: 'Veri Seti 6',
      datasource_url: '/',
      changed_on_delta_humanized: '2 days ago',
    },
  ],
  added: [2],
};

const Template: Story<DvtCardDetailChartListProps> = (
  args: DvtCardDetailChartListProps,
) => (
  <div style={{ width: '400px' }}>
    <DvtCardDetailChartList {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: dummyData.data,
};
