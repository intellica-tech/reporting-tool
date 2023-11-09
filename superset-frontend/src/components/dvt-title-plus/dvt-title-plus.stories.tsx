import React from 'react';
import DvtTitlePlus, { DvtTitlePlusProps } from './index';

export default {
  title: 'Dvt-Components/DvtTitlePlus',
  component: DvtTitlePlus,
};

export const Default = (args: DvtTitlePlusProps) => <DvtTitlePlus {...args} />;

Default.args = {
  title: 'title-plus title',
  plusIcon: false,
};

Default.argTypes = {
  title: {
    control: { type: 'text' },
  },
  plusIcon: {
    control: { type: 'boolean' },
  },
};
