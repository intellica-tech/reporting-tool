import { t } from '@superset-ui/core';
import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import { useHistory } from 'react-router-dom';
import DvtTable from 'src/components/DvtTable';
import { StyledAddButton, StyledUsersList } from './dvt-users-list.module';

function DvtUsersList() {
  const history = useHistory();
  const [data, setData] = useState<any[]>([]);

  const addUser = () => {
    history.push('/users/add');
  };

  const usersListData = [
    {
      id: 1,
      title: t('First Name'),
      sort: true,
    },
    {
      id: 2,
      title: t('Last Name'),
      sort: true,
    },
    {
      id: 3,
      title: t('User Name'),
      sort: true,
    },
    {
      id: 4,
      title: t('E-mail'),
      sort: true,
    },
    {
      id: 5,
      title: t('Is Active?'),
      sort: true,
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
        <DvtButton
          label="Add"
          onClick={addUser}
          iconToRight
          colour="primary"
          typeColour="powder"
          icon="dvt-add_square"
        />
      </StyledAddButton>
      <div>
        <DvtTable data={data} header={usersListData} />
      </div>
    </StyledUsersList>
  );
}

export default DvtUsersList;
