interface SidebarDataProps {
  pathname: string;
  data: any[];
}

const DvtSidebarData: SidebarDataProps[] = [
  {
    pathname: '/superset/welcome/',
    data: [
      {
        navigationData: [
          {
            title: 'menu',
            data: [
              {
                title: 'Connections',
                url: '/',
                fileName: 'dvt-activity',
              },
              {
                title: 'Dataset',
                url: '/',
                fileName: 'dvt-database',
              },
              {
                title: 'Dashboard',
                url: '/',
                fileName: 'dvt-box',
              },
              {
                title: 'Report',
                url: '/',
                fileName: 'dvt-analytic_chart',
              },
              {
                title: 'Alert',
                url: '/',
                fileName: 'dvt-alert',
              },
            ],
          },
        ],
        folderNavigationData: [
          {
            title: 'my folder',
            data: [
              {
                name: 'Dnext',
                url: '',
                data: [
                  {
                    name: 'Dashboard 1',
                    url: '',
                    data: [
                      {
                        name: 'Report 1',
                        url: '/dashboard/1/report/1',
                        data: [],
                      },
                      {
                        name: 'Report 2',
                        url: '/dashboard/1/report/2',
                        data: [],
                      },
                    ],
                  },
                  {
                    name: 'Dashboard 2',
                    url: '/dashboard/2',
                    data: [],
                  },
                ],
              },
              {
                name: 'Planning',
                url: '/planning',
                data: [],
              },
              {
                name: 'Reporting',
                url: '/reporting',
                data: [],
              },
            ],
          },
        ],
        items: [
          {
            title: 'shared folder',
          },
        ],
      },
    ],
  },
  {
    pathname: '/dataset/add/',
    data: [
      {
        selectData: [
          {
            label: 'Database',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'Database',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'Database',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Type a value',
          },
        ],
      },
    ],
  },
  {
    pathname: '/superset/sqllab/history/',
    data: [
      {
        selectData: [
          {
            label: 'Database',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'State',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'User',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Type a value',
          },
          {
            label: 'Time Range',
            values: [],
            placeholder: 'Type a value',
            datePicker: true,
          },
          {
            label: 'Search by Query Text',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Type a value',
          },
        ],
      },
    ],
  },
  {
    pathname: '/tablemodelview/list/',
    data: [
      {
        selectData: [
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Owner',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Database',
          },
          {
            values: [
              { label: 'Lorem ıpsum', value: 'failed' },
              { label: 'Dolor Sit Amet', value: 'success' },
              { label: 'Lorem ıpsum', value: 'failed1' },
              { label: 'Dolor Sit Amet', value: 'success1' },
            ],
            placeholder: 'Schema',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Type',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Certified',
          },
        ],
      },
    ],
  },
  {
    pathname: '/chart/list/',
    data: [
      {
        selectData: [
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Sqlite',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Main',
          },
          {
            values: [],
            valuesList: [
              {
                id: 1,
                subtitle: 'integer',
                title: 'table_schema_id',
              },
              {
                id: 2,
                subtitle: 'string',
                title: 'table_schema_title',
              },
              {
                id: 3,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 4,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 5,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 6,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 7,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 8,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 9,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 10,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 11,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 12,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 13,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 14,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 15,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 16,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 17,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 18,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 19,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 20,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 21,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 22,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 23,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 24,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 25,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 26,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 27,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 28,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 29,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 30,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 31,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
              {
                id: 32,
                subtitle: 'string',
                title: 'table_schema_subtitle',
              },
            ],
            placeholder: 'See Table Schema',
            title: 'FFC 2019 Survey',
          },
        ],
      },
    ],
  },
  {
    pathname: '/dashboard/list/',
    data: [
      {
        selectData: [
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Owner',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Created by',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Status',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Favorite',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Certified',
          },
        ],
      },
    ],
  },
  {
    pathname: '/report/list/',
    data: [
      {
        selectData: [
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Owner',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Created by',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Chart Type',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Dataset',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Dashboards',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Favorite',
          },
          {
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Certified',
          },
        ],
      },
    ],
  },
  {
    pathname: '/alert/list/',
    data: [
      {
        selectData: [
          {
            label: 'Owner',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'Created by',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'Status',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Select or type a value',
          },
          {
            label: 'Search',
            values: [
              { label: 'Failed', value: 'failed' },
              { label: 'Success', value: 'success' },
            ],
            placeholder: 'Type a value',
          },
        ],
      },
    ],
  },
  {
    pathname: '/superset/profile/admin/',
    data: [
      {
        items: [
          {
            icon: 'dvt-briefcase',
            label: 'Created Content',
            url: 'test',
          },
          {
            icon: 'dvt-calendar',
            label: 'Schedule',
            url: 'test1',
          },
          {
            icon: 'dvt-history',
            label: 'Recent Activity',
            url: 'test2',
          },
          {
            icon: 'dvt-star',
            label: 'Favorites',
            url: 'test3',
          },
          {
            icon: 'dvt-users',
            label: 'Groups and Roles',
            url: 'test4',
          },
          {
            icon: 'dvt-arrow_forwardup',
            label: 'Query History',
            url: 'test5',
          },
        ], itemsLogout: [
          {
            icon: 'dvt-logout',
            label: 'Log Out',
          },
        ],
      },
    ],
  },

];

export default DvtSidebarData;
