import { t } from '@superset-ui/core';

interface apiUrlsProps {
  name: string;
  url: string;
}

interface SidebarDataProps {
  pathname: string;
  key: string;
  data: any[];
  apiUrls?: apiUrlsProps[];
}

const dataYesOrNo = [
  { label: t('Yes'), value: '!t' },
  { label: t('No'), value: '!f' },
];

const DvtSidebarData: SidebarDataProps[] = [
  {
    pathname: '/superset/welcome/',
    key: 'welcome',
    data: [
      {
        titleMenu: 'folder navigation',
        title: t('menu'),
        data: [
          {
            title: t('Connections'),
            url: '/databaseview/list/',
            fileName: 'dvt-activity',
          },
          {
            title: t('Dataset'),
            url: '/tablemodelview/list/',
            fileName: 'dvt-database',
          },
          {
            title: t('Dashboard'),
            url: '/dashboard/list/',
            fileName: 'dvt-box',
          },
          {
            title: t('Report'),
            url: '/report/list/',
            fileName: 'dvt-analytic_chart',
          },
          {
            title: t('Alert'),
            url: '/alert/list/',
            fileName: 'dvt-alert',
          },
          {
            title: t('Sqlhub'),
            url: '/sqlhub/',
            fileName: 'dvt-box',
          },
        ],
      },
      {
        titleMenu: 'folder',
        title: t('my folder'),
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
    pathname: '/sqlhub/history/',
    key: 'queryHistory',
    data: [
      {
        label: t('Database'),
        values: [],
        placeholder: t('Select or type a value'),
        name: 'databse',
      },
      {
        label: t('State'),
        values: [],
        placeholder: t('Select or type a value'),
        name: 'state',
      },
      {
        label: t('User'),
        values: [],
        placeholder: t('Type a value'),
        name: 'user',
      },
      {
        label: t('Time Range'),
        placeholder: t('Type a value'),
        name: 'time-range',
        status: 'datepicker',
      },
      {
        label: t('Search by Query Text'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'input',
      },
    ],
  },
  {
    pathname: '/superset/sqllab/saved_queries/',
    key: 'savedQueries',
    data: [
      {
        label: t('Database'),
        values: [],
        placeholder: t('Select or type a value'),
        name: 'database',
      },
      {
        label: t('Schema'),
        values: [],
        placeholder: t('Select or type a value'),
        name: 'schema',
      },
      {
        label: t('Tags'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'tags',
      },
      {
        label: t('Search'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'input',
      },
    ],
  },
  {
    pathname: '/tablemodelview/list/',
    key: 'datasets',
    data: [
      {
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
        placeholder: t('Database'),
        name: 'database',
      },
      {
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
    apiUrls: [
      {
        name: 'owner',
        url: 'dataset/related/owners',
      },
      {
        name: 'database',
        url: 'dataset/related/database',
      },
      {
        name: 'schema',
        url: 'dataset/distinct/schema',
      },
    ],
  },
  {
    pathname: '/dataset/add/',
    key: 'datasetAdd',
    data: [
      {
        placeholder: t('DATABASE'),
        name: 'database',
      },
      {
        placeholder: t('SCHEMA'),
        name: 'schema',
      },
    ],
    apiUrls: [
      {
        name: 'database',
        url: 'database/?q=(filters:!((col:database_name,opr:ct,value:%27%27)),order_columns:database_name,order_direction:asc,page:0,page_size:100)',
      },
    ],
  },
  {
    pathname: '/csstemplatemodelview/list/',
    key: 'newTrainedTable',
    data: [
      {
        placeholder: t('CATEGORY'),
        name: 'category',
        label: 'CATEGORY',
      },
      {
        placeholder: t('ALGORİTHM'),
        name: 'algorithm',
        label: 'ALGORİTHM',
      },
      {
        placeholder: t('DATABASE'),
        name: 'database',
        label: 'DATABASE',
      },
      {
        placeholder: t('SCHEMA'),
        name: 'schema',
        label: 'SCHEMA',
      },
    ],
    apiUrls: [
      {
        name: 'database',
        url: 'database/?q=(filters:!((col:database_name,opr:ct,value:%27%27)),order_columns:database_name,order_direction:asc,page:0,page_size:100)',
      },
    ],
  },
  {
    pathname: '/dashboard/list/',
    key: 'dashboard',
    data: [
      {
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
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
    apiUrls: [
      {
        name: 'owner',
        url: 'dashboard/related/owners',
      },
      {
        name: 'createdBy',
        url: 'dashboard/related/created_by',
      },
    ],
  },
  {
    pathname: '/report/list/',
    key: 'reports',
    data: [
      {
        placeholder: t('Owner'),
        name: 'owner',
      },
      {
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
        placeholder: t('Dataset'),
        name: 'dataset',
      },
      {
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
    apiUrls: [
      {
        name: 'owner',
        url: 'chart/related/owners',
      },
      {
        name: 'createdBy',
        url: 'chart/related/created_by',
      },
      {
        name: 'dataset',
        url: 'dataset/?q=(columns:!(datasource_name,datasource_id),keys:!(none),order_column:table_name,order_direction:asc,page:0,page_size:100)',
      },
      {
        name: 'dashboards',
        url: 'dashboard/?q=(columns:!(dashboard_title,id),keys:!(none),order_column:dashboard_title,order_direction:asc,page:0,page_size:100)',
      },
    ],
  },
  {
    pathname: '/alert/list/',
    key: 'alerts',
    data: [
      {
        label: t('Owner'),
        placeholder: t('Select or type a value'),
        name: 'owner',
      },
      {
        label: t('Created by'),
        placeholder: t('Select or type a value'),
        name: 'createdBy',
      },
      {
        label: t('Status'),
        values: [
          { label: t('Success'), value: 'Success' },
          { label: t('Working'), value: 'Error' },
          { label: t('Error'), value: 'Error' },
          { label: t('Not triggered'), value: 'Not triggered' },
          { label: t('On Grace'), value: 'On Grace' },
        ],
        placeholder: t('Select or type a value'),
        name: 'status',
      },
      {
        label: t('Search'),
        placeholder: t('Type a value'),
        name: 'search',
        status: 'input',
      },
    ],
    apiUrls: [
      {
        name: 'owner',
        url: 'report/related/owners',
      },
      {
        name: 'createdBy',
        url: 'report/related/created_by',
      },
    ],
  },
  {
    pathname: '/superset/profile/admin/',
    key: 'profile',
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
    apiUrls: [
      {
        name: 'dataset',
        url: 'dataset/',
      },
    ],
  },
  {
    pathname: '/explore/',
    key: 'chart',
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
        status: 'select-input',
      },
    ],
    apiUrls: [
      {
        name: 'database',
        url: 'database/?q=(filters:!((col:database_name,opr:ct,value:%27%27),(col:expose_in_sqllab,opr:eq,value:!t)),order_columns:database_name,order_direction:asc,page:0,page_size:100)',
      },
    ],
  },
  {
    pathname: '/annotationlayer/list/',
    key: 'annotationLayer',
    data: [
      {
        placeholder: t('Created By'),
        name: 'createdBy',
      },
      {
        placeholder: t('Search'),
        name: 'search',
        status: 'input',
      },
    ],
    apiUrls: [
      {
        name: 'createdBy',
        url: 'annotation_layer/related/created_by',
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
