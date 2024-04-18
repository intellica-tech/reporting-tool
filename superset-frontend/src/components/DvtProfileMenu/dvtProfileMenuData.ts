import { t } from '@superset-ui/core';

interface DvtProfileMenuDataMenuProps {
  label: string;
  link: string;
}

interface DvtProfileMenuDataProps {
  title: string;
  menu: DvtProfileMenuDataMenuProps[];
}

const DvtProfileMenuData: DvtProfileMenuDataProps[] = [
  {
    title: t('Security'),
    menu: [
      { label: t('List Users'), link: '/user/list/' },
      { label: t('List Roles'), link: '/role/list/' },
      {
        label: t('Row Level Security'),
        link: '/rowlevelsecurity/list/',
      },
      { label: t('Action Log'), link: '/logmodelview/list/' },
    ],
  },
  // {
  //   title: t('Data'),
  //   menu: [{ label: t('Database Connections'), link: '/databaseview/list/' }],
  // },
  {
    title: t('Manage'),
    menu: [
      { label: t('CSS Templates'), link: '/csstemplatemodelview/list/' },
      // { label: t('Alerts & Reports'), link: '/alert/list/' },
      { label: t('Annotation Layers'), link: '/annotationlayer/list/' },
    ],
  },
  {
    title: t('User'),
    menu: [
      { label: t('Profile'), link: '/profile/' },
      { label: t('Info'), link: '/users/userinfo/' },
      { label: t('Logout'), link: '/logout/' },
    ],
  },
  {
    title: t('About'),
    menu: [{ label: `${t('Version')}: `, link: '' }],
  },
];

export default DvtProfileMenuData;
