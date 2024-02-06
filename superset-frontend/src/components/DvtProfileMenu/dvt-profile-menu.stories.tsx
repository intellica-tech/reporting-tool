import React from 'react';
import { Meta } from '@storybook/react';
import DvtProfileMenu, { DvtProfileMenuProps } from '.';

export default {
  title: 'Dvt-Components/DvtProfileMenu',
  component: DvtProfileMenu,
} as Meta;

export const Default = (args: DvtProfileMenuProps) => (
  <div style={{ display: 'flex', justifyContent: 'end' }}>
    <DvtProfileMenu {...args} />
  </div>
);

Default.args = {
  img: 'https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/1.png',
  version: '0.0.1',
};

Default.argsTypes = {
  img: {
    control: { type: 'text' },
  },
};
