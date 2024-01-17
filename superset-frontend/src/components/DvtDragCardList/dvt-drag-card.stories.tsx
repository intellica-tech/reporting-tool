import React from 'react';
import DvtDargCardList, { DvtDragCardListProps } from './index';

export default {
  title: 'Dvt-Components/DvtDargCardList',
  component: DvtDargCardList,
};

export const Default = (args: DvtDragCardListProps) => {
  return <DvtDargCardList {...args} />;
};

Default.args = {
  data: [
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
    { label: 'arac', value: { id: 1, name: 'arac' }, icon: 'dvt-hashtag' },
  ],
};
