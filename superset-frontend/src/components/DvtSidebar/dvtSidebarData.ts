import { t } from '@superset-ui/core';

interface SidebarDataProps {
  pathname: string;
  key?: string;
  data: any[];
}

const dataYesOrNo = [
  { label: t('Yes'), value: '!t' },
  { label: t('No'), value: '!f' },
];

const DvtSidebarData: SidebarDataProps[] = [
  {
    pathname: '/superset/welcome/',
    data: [
      {
        titleMenu: 'folder navigation',
        title: 'menu',
        data: [
          {
            title: 'Connections',
            url: '/databaseview/list/',
            fileName: 'dvt-activity',
          },
          {
            title: 'Dataset',
            url: '/tablemodelview/list/',
            fileName: 'dvt-database',
          },
          {
            title: 'Dashboard',
            url: '/dashboard/list/',
            fileName: 'dvt-box',
          },
          {
            title: 'Report',
            url: '/report/list/',
            fileName: 'dvt-analytic_chart',
          },
          {
            title: 'Alert',
            url: '/alert/list/',
            fileName: 'dvt-alert',
          },
          {
            title: 'Sqlhub',
            url: '/sqlhub/',
            fileName: 'dvt-box',
          },
        ],
      },
      {
        titleMenu: 'folder',
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
      {
        titleMenu: 'shared folder',
        title: 'shared folder',
      },
    ],
  },
  {
    pathname: '/databaseview/list/',
    key: 'connection',
    data: [
      {
        label: t('EXPOSE IN SQL LAB'),
        values: dataYesOrNo,
        placeholder: t('Select or type a value'),
        name: 'expose_in_sqllab',
      },
      {
        label: t('AQE'),
        values: dataYesOrNo,
        placeholder: t('Select or type a value'),
        name: 'allow_run_async',
      },
      {
        label: t('SEARCH'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'input',
      },
    ],
  },
  {
    pathname: '/superset/sqllab/history/',
    key: 'sqllab',
    data: [
      {
        label: t('Database'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Select or type a value'),
      },
      {
        label: t('State'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Select or type a value'),
      },
      {
        label: t('User'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Type a value'),
      },
      {
        label: t('Time Range'),
        values: [],
        placeholder: t('Type a value'),
        datePicker: true,
      },
      {
        label: t('Search by Query Text'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Type a value'),
      },
    ],
  },
  {
    pathname: '/superset/sqllab/saved_queries/',
    data: [
      {
        label: t('Database'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Select or type a value'),
      },
      {
        label: t('Schema'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Select or type a value'),
      },
      {
        label: t('Tags'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Type a value'),
      },
      {
        label: t('Search'),
        values: [],
      },
    ],
  },
  {
    pathname: '/tablemodelview/list/',
    key: 'datasets',
    data: [
      {
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Database'),
        name: 'database',
      },
      {
        values: [
          { label: t('Lorem ıpsum'), value: 'failed' },
          { label: t('Dolor Sit Amet'), value: 'success' },
          { label: t('Lorem ıpsum'), value: 'failed1' },
          { label: t('Dolor Sit Amet'), value: 'success1' },
        ],
        placeholder: t('Schema'),
        name: 'schema',
      },
      {
        values: [
          { label: t('Virtual'), value: '!f' },
          { label: t('Physical'), value: '!t' },
        ],
        placeholder: t('Type'),
        name: 'type',
      },
      {
        values: dataYesOrNo,
        placeholder: t('Certified'),
        name: 'certified',
      },
      {
        label: t('SEARCH'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'input',
      },
    ],
  },
  {
    pathname: '/chart/list/',
    data: [
      {
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Sqlite'),
      },
      {
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Main'),
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
        placeholder: t('See Table Schema'),
        title: 'FFC 2019 Survey',
      },
    ],
  },
  {
    pathname: '/dataset/add/',
    key: 'datasetAdd',
    data: [
      {
        values: [],
        placeholder: t('DATABASE'),
        name: 'database',
      },
      {
        values: [],
        placeholder: t('SCHEMA'),
        name: 'schema',
      },
    ],
  },
  {
    pathname: '/dashboard/list/',
    key: 'dashboard',
    data: [
      {
        values: [],
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
        values: [],
        placeholder: t('Created by'),
        name: 'createdBy',
      },
      {
        values: [
          { label: t('Published'), value: '!t' },
          { label: t('Draft'), value: '!f' },
        ],
        placeholder: t('Status'),
        name: 'status',
      },
      {
        values: dataYesOrNo,
        placeholder: t('Favorite'),
        name: 'favorite',
      },
      {
        values: dataYesOrNo,
        placeholder: t('Certified'),
        name: 'certified',
      },
    ],
  },
  {
    pathname: '/report/list/',
    key: 'reports',
    data: [
      {
        values: [],
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
        values: [],
        placeholder: t('Created by'),
        name: 'createdBy',
      },
      {
        values: [
          { label: t('Pie Chart'), value: 'pie' },
          { label: t('Big Number with Trendline'), value: 'big_number' },
          { label: t('Table'), value: 'table' },
          { label: t('World Map'), value: 'world_map' },
          { label: t('Treemap (legacy)'), value: 'treemap' },
          { label: t('Bar Chart'), value: 'dist_bar' },
          {
            label: t('Time-series Bar Chart'),
            value: 'echarts_timeseries_bar',
          },
          { label: t('Chord Diagram'), value: 'chord' },
          { label: t('Heatmap'), value: 'heatmap' },
          { label: t('Box Plot'), value: 'box_plot' },
          { label: t('Sankey Diagram'), value: 'sankey' },
        ],
        placeholder: t('Chart Type'),
        name: 'chartType',
      },
      {
        values: [],
        placeholder: t('Dataset'),
        name: 'dataset',
      },
      {
        values: [],
        placeholder: t('Dashboards'),
        name: 'dashboards',
      },
      {
        values: dataYesOrNo,
        placeholder: t('Favorite'),
        name: 'favorite',
      },
      {
        values: dataYesOrNo,
        placeholder: t('Certified'),
        name: 'certified',
      },
      {
        placeholder: t('Search'),
        name: 'search',
        status: 'input',
      },
      // {
      //   values: [
      //     {
      //       label: t('Alphabetical'),
      //       value: 'slice_name',
      //     },
      //     {
      //       label: t('Recently modified'),
      //       value: 'changed_on_delta_humanized',
      //     },
      //     {
      //       label: t('Least recently modified'),
      //       value: 'changed_on_delta_humanized',
      //     },
      //   ],
      //   placeholder: t('Sort'),
      //   name: 'sort',
      // },
    ],
  },
  {
    pathname: '/alert/list/',
    key: 'alerts',
    data: [
      {
        label: t('Owner'),
        values: [{ label: t('Superset Admin'), value: 'Superset Admin' }],
        placeholder: t('Select or type a value'),
        name: 'owner',
      },
      {
        label: t('Created by'),
        values: [{ label: t('Superset Admin'), value: 'Superset Admin' }],
        placeholder: t('Select or type a value'),
        name: 'createdBy',
      },
      {
        label: t('Status'),
        values: [
          { label: t('Error'), value: 'Error' },
          { label: t('Success'), value: 'Success' },
        ],
        placeholder: t('Select or type a value'),
        name: 'status',
      },
      {
        label: t('Search'),
        values: [
          { label: t('Failed'), value: 'failed' },
          { label: t('Success'), value: 'success' },
        ],
        placeholder: t('Type a value'),
        name: 'search',
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
            label: t('Created Content'),
            url: 'test',
          },
          {
            icon: 'dvt-calendar',
            label: t('Schedule'),
            url: 'test1',
          },
          {
            icon: 'dvt-history',
            label: t('Recent Activity'),
            url: 'test2',
          },
          {
            icon: 'dvt-star',
            label: t('Favorites'),
            url: 'test3',
          },
          {
            icon: 'dvt-users',
            label: t('Groups and Roles'),
            url: 'test4',
          },
          {
            icon: 'dvt-arrow_forwardup',
            label: t('Query History'),
            url: 'test5',
          },
        ],
        itemsLogout: [
          {
            icon: 'dvt-logout',
            label: t('Log Out'),
          },
        ],
      },
    ],
  },
  {
    pathname: '/chart/add',
    key: 'chartAdd',
    data: [
      {
        placeholder: t('Dataset'),
        name: 'dataset',
      },
      {
        values: [
          { label: t('Popular'), value: 'popular' },
          { label: t('ECharts'), value: 'echarts' },
          { label: t('Advanced-Analytics'), value: 'advanced_analytics' },
        ],
        placeholder: t('Recommended Tags'),
        name: 'recommended_tags',
      },
      {
        placeholder: t('Category'),
        name: 'category',
      },
      {
        placeholder: t('Tags'),
        name: 'tags',
      },
    ],
  },
  {
    pathname: '/explore/',
    key: 'chartAdd',
    data: [
      {
        label: t('Chart Source'),
        placeholder: t('Search Metrics & Columns'),
        name: 'search',
        status: 'input',
      },
    ],
  },
  {
    pathname: '/sqlhub/',
    key: 'sqlhub',
    data: [
      {
        placeholder: t('Database'),
        name: 'database',
      },
      {
        placeholder: t('Schema'),
        name: 'schema',
      },
      {
        placeholder: t('See Table Schema'),
        name: 'see_table_schema',
      },
    ],
  },
  {
    pathname: '/annotationlayer/list/',
    key: 'annotationlayer',
    data: [
      {
        values: [],
        placeholder: t('Created By'),
        name: 'createdBy',
      },
      {
        status: 'input',
        values: '',
        placeholder: t('Search'),
        name: 'search',
      },
    ],
  },
];

const DefaultOrder = [
  'line',
  'big_number',
  'big_number_total',
  'table',
  'pivot_table_v2',
  'echarts_timeseries_line',
  'echarts_area',
  'echarts_timeseries_bar',
  'echarts_timeseries_scatter',
  'pie',
  'mixed_timeseries',
  'filter_box',
  'dist_bar',
  'area',
  'bar',
  'deck_polygon',
  'time_table',
  'histogram',
  'deck_scatter',
  'deck_hex',
  'time_pivot',
  'deck_arc',
  'heatmap',
  'deck_grid',
  'deck_screengrid',
  'treemap_v2',
  'box_plot',
  'sunburst',
  'sankey',
  'word_cloud',
  'mapbox',
  'kepler',
  'cal_heatmap',
  'rose',
  'bubble',
  'bubble_v2',
  'deck_geojson',
  'horizon',
  'deck_multi',
  'compare',
  'partition',
  'event_flow',
  'deck_path',
  'graph_chart',
  'world_map',
  'paired_ttest',
  'para',
  'country_map',
];

export { DvtSidebarData, DefaultOrder };
