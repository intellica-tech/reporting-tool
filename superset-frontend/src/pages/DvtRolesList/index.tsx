/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import DvtButton from 'src/components/DvtButton';
import DvtTable from 'src/components/DvtTable';

function DvtListRoles() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const userData = fetchUserData;
        setData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchUserData = [
    {
      id: 1,
      name: 'John',
    },

    {
      id: 2,
      name: 'Jane',
    },
  ];
  const listRolesHeaderData = [
    {
      id: 1,
      title: t('Name'),
      field: 'name',
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
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 30,
        }}
      >
        <DvtButton
          label={t("Copy Role")}
          onClick={() => {}}
          bold
          colour="primary"
          typeColour="powder"
        />
      </div>
      <DvtTable data={data} header={listRolesHeaderData} />
    </>
  );
}

export default DvtListRoles;
