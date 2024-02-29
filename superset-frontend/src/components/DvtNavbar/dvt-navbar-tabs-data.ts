import { t } from '@superset-ui/core';
import { ButtonTabsDataProps } from '../DvtButtonTabs';

interface UserDataProps {
  image: string;
}

interface DvtNavbarTabsDataProps {
  pathname: string;
  data: ButtonTabsDataProps[];
}

export const UserData: UserDataProps = {
  image:
    'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
};

export const sqlTabsData = [
  {
    label: t('Saved Queries'),
    value: '/savedqueryview/list/',
  },
  {
    label: t('Query History'),
    value: '/sqlhub/history/',
  },
];

export const DvtNavbarTabsData: DvtNavbarTabsDataProps[] = [
  {
    pathname: '/alert/list/',
    data: [
      {
        label: t('Alerts'),
        value: 'Alert',
      },
      {
        label: t('Reports'),
        value: 'Report',
      },
    ],
  },
  {
    pathname: '/sqlhub/',
    data: [
      {
        label: t('Saved'),
        icon: 'caret_down',
        value: 'Saved',
      },
      {
        label: t('Copy Link'),
        icon: 'link',
        value: 'Copy Link',
      },
    ],
  },
  {
    pathname: '/dashboard/list/',
    data: [
      {
        label: t('Card'),
        icon: 'dvt-all',
        value: 'Card',
      },
      {
        label: t('Table'),
        icon: 'dvt-mine',
        value: 'Table',
      },
    ],
  },
  {
    pathname: '/report/list/',
    data: [
      {
        label: t('Card'),
        icon: 'dvt-all',
        value: 'Card',
      },
      {
        label: t('Table'),
        icon: 'dvt-mine',
        value: 'Table',
      },
    ],
  },
  {
    pathname: '/explore/',
    data: [
      {
        label: t('Data'),
        value: 'data',
      },
      {
        label: t('Customize'),
        value: 'customize',
      },
    ],
  },
  {
    pathname: '/rowlevelsecurity/list/',
    data: [
      {
        label: t('Filter List'),
        value: 'filterList',
        icon: 'dvt-filter',
      },
    ],
  },
];

export const WithNavbarBottom: string[] = [
  // '/superset/welcome/',
  '/alert/list/',
  '/sqlhub/history/',
  '/savedqueryview/list/',
  '/sqlhub/',
  '/chart/add',
  '/dashboard/list/',
  '/report/list/',
  '/explore/',
  '/rowlevelsecurity/list/',
];
