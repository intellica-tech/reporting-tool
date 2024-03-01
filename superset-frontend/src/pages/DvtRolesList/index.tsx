import { t } from '@superset-ui/core';
import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import DvtTable from 'src/components/DvtTable';

function DvtListRoles() {
  const [data, setData] = useState<any[]>([]);

  const listRolesHeaderData = [
    {
      id: 1,
      title: t('Name'),
      flex: 5,
    },
    {
      id: 2,
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
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <DvtButton
          label="Copy Role"
          onClick={() => {}}
          bold
          colour="primary"
          typeColour="powder"
        />
        <DvtButton
          onClick={() => {}}
          bold
          icon="dvt-linear_arrow"
          colour="primary"
          typeColour="powder"
        />
      </div>

      <DvtTable data={data} header={listRolesHeaderData} />
    </div>
  );
}

export default DvtListRoles;
