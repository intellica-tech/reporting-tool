import React from 'react';
import DvtLogo, { DvtLogoProps } from './index';

export default {
  title: 'Dvt-Components/DvtCard',
  component: DvtLogo,
};

export const Default = (args: DvtLogoProps) => <DvtLogo {...args} />;

Default.args = {
  title: 'card title',
};

Default.argTypes = {
  title: {
    control: { type: 'text' },
  },
};
