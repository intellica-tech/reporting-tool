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
import DvtTable from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';

function AlertList() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/report/');
        const data = await response.json();

        const editedData = data.result
          .filter((item: any) => item.type === 'Alert')
          .map((item: any) => ({
            date: new Date(item.last_eval_dttm).toLocaleString('tr-TR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            name: item.name,
            crontab_humanized: item.crontab_humanized,
            recipients: item.type,
            created_by: `${item.created_by.first_name} ${item.created_by.last_name}`,
            owners: `${item.owners[0].first_name} ${item.owners[0].last_name}`,
            modifiedBy: `${item.changed_by.first_name} ${item.changed_by.last_name}`,
            active: item.active.toString(),
          }));

        setApiData(editedData);
        console.log('Fetched and edited data:', data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const modifiedData = {
    header: [
      { id: 1, title: 'Last Run', field: 'date' },
      { id: 2, title: 'Name', field: 'name' },
      { id: 3, title: 'Schedule', field: 'crontab_humanized' },
      { id: 4, title: 'Notification Method', field: 'recipients' },
      { id: 5, title: 'Created by', field: 'created_by' },
      { id: 6, title: 'Owners', field: 'owners' },
      { id: 7, title: 'Modified', field: 'modifiedBy' },
      { id: 8, title: 'Active', field: 'active' },
      {
        id: 9,
        title: 'Action',
        clicks: [
          {
            icon: 'edit_alt',
            click: () => {},
          },
          {
            icon: 'share',
            click: () => {},
          },
          {
            icon: 'trash',
            click: () => {},
          },
        ],
      },
    ],
  };

  return <DvtTable data={apiData} header={modifiedData.header} />;
}

export default withToasts(AlertList);
