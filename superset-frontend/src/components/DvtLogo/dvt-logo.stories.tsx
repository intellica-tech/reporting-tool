import React from 'react';
import DvtLogo, { DvtLogoProps } from './index';

export default {
  title: 'Dvt-Components/DvtLogo',
  component: DvtLogo,
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
