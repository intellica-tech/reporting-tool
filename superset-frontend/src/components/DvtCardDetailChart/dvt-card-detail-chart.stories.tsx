import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DvtCardDetailChart, { DvtCardDetailChartProps } from '.';

export default {
  title: 'Dvt-Components/DvtCardDetailChart',
  component: DvtCardDetailChart,
  argTypes: {
    slice_name: {
      control: { type: 'text' },
      defaultValue: 'Country of Citizenship',
    },
    viz_type: {
      control: { type: 'text' },
      defaultValue: 'World Map',
    },
    datasource_name_text: {
      control: { type: 'text' },
      defaultValue: 'public_FCC 2018 Survey',
    },
    datasource_url: {
      control: { type: 'text' },
      defaultValue: '/',
    },
    changed_on_delta_humanized: {
      control: { type: 'string' },
      defaultValue: '2 days ago',
    },
  },
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = (args: DvtCardDetailChartProps) => (
  <div style={{ backgroundColor: '#E2E8F0', padding: '20px', height: '85vh' }}>
    <div style={{ width: '400px' }}>
      <DvtCardDetailChart {...args} />
    </div>
  </div>
);
