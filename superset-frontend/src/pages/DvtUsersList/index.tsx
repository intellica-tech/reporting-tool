import { t } from '@superset-ui/core';
import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import Icon from 'src/components/Icons/Icon';
import DvtTable from 'src/components/DvtTable';
import {
  StyledAddButton,
  StyledRefreshButton,
  StyledUsersList,
} from './dvt-users-list.module';

function DvtUsersList() {
  const [data, setData] = useState<any[]>([]);

  const usersListData = [
    {
      id: 1,
      title: t('First Name'),
    },
    {
      id: 2,
      title: t('Last Name'),
    },
    {
      id: 3,
      title: t('User Name'),
    },
    {
      id: 4,
      title: t('E-mail'),
    },
    {
      id: 5,
      title: t('Is Active?'),
    },
    {
      id: 6,
      title: t('Role'),
    },
    {
      id: 7,
      title: t('Actions'),
      clicks: [
        {
          icon: 'search',
          click: () => {},
          popperLabel: t('Show Record'),
        },
        {
          icon: 'edit_alt',
          click: () => {},
          popperLabel: t('Edit Record'),
        },
        {
          icon: 'trash',
          click: () => {},
          popperLabel: t('Delete Record'),
        },
      ],
    },
  ];
  return (
    <StyledUsersList>
      <StyledAddButton>
        <Icon fileName="dvt-add_square" onClick={() => {}} />
      </StyledAddButton>
      <StyledRefreshButton>
        <DvtButton
          label="REFRESH"
          onClick={() => ({})}
          iconToRight
          colour="primary"
          typeColour="powder"
          icon="circle"
        />
      </StyledRefreshButton>
      <div>
        <DvtTable data={data} header={usersListData} />
      </div>
    </StyledUsersList>
  );
}

export default DvtUsersList;
