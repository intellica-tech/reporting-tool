import React from 'react';
import DvtLogo, { DvtLogoProps } from '.';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Dvt-Components/DvtLogo',
  component: DvtLogo,
  decorators: [
    (Story: any) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Default = (args: DvtLogoProps) => <DvtLogo {...args} />;

Default.args = {
  title: 'AppName',
};

Default.argTypes = {
  title: {
    control: { type: 'text' },
  },
};
