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
  data: [
    { label: 'List Users', onClick: () => {}, menu: 'Security' },
    { label: 'List Roles', onClick: () => {}, menu: 'Security' },
    { label: 'Row Level Security', onClick: () => {}, menu: 'Security' },
    { label: 'Action Log', onClick: () => {}, menu: 'Security' },
    { label: 'Database Connections', onClick: () => {}, menu: 'Data' },
    { label: 'CSS Templates', onClick: () => {}, menu: 'Manage' },
    { label: 'Alerts & Reports', onClick: () => {}, menu: 'Manage' },
    { label: 'Annotation Layers', onClick: () => {}, menu: 'Manage' },
    { label: 'Profile', onClick: () => {}, menu: 'User' },
    { label: 'Info', onClick: () => {}, menu: 'User' },
    { label: 'Logout', onClick: () => {}, menu: 'User' },
    { label: 'Version: 1.1.1-dev', onClick: () => {}, menu: 'About' },
  ],
  menu: ['Security', 'Data', 'Manage', 'User', 'About'],
};

Default.argsTypes = {
  img: {
    control: { type: 'text' },
  },
};
