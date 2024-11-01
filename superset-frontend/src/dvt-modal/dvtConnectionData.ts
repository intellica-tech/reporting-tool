import { t } from '@superset-ui/core';

interface ConnectionDataProps {
  databaseMetaType: string;
  databaseType: string;
  driver: string;
  engine: string;
  data: any[];
  engine_information: {};
  extra?: string;
}

export interface OtherConnectionDataOptionProps {
  label: string;
  value: string;
}

const DvtConnectionData: ConnectionDataProps[] = [
  {
    databaseMetaType: 'PostgreSQL',
    databaseType: 'PostgreSQL',
    driver: 'psycopg2',
    engine: 'postgresql',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
    extra: '{"allows_virtual_table_explore":true}',
    data: [
      {
        title: t('HOST'),
        value: 'host',
        type: 'text',
        importantLabel: t(
          'This can be either an IP address (e.g. 127.0.0.1) or a domain name (e.g. mydatabase.com).',
        ),
        placeholder: t('e.g 127.0.01'),
        popoverLabel: t('Cannot be empty'),
        apiValue: 'host',
      },
      {
        title: t('PORT'),
        value: 'port',
        type: 'text',
        placeholder: t('e.g 5432'),
        popoverLabel: t('Cannot be empty'),
        apiValue: 'port',
      },
      {
        title: t('DATABASE NAME'),
        value: 'database_name',
        type: 'text',
        placeholder: t('e.g Analytics'),
        popoverLabel: t('Cannot be empty'),
        importantLabel: t(
          'Copy the name of the database you are trying to connect to.',
        ),
        apiValue: 'database',
      },
      {
        title: t('USER NAME'),
        value: 'user_name',
        type: 'text',
        placeholder: t('e.g Analytics'),
        popoverLabel: t('Cannot be empty'),
        importantLabel: t(
          'Copy the name of the database you are trying to connect to.',
        ),
        apiValue: 'username',
      },
      {
        title: t('PASSWORD'),
        value: 'password',
        type: 'password',
        placeholder: 'e.g *******',
        apiValue: 'password',
      },
      {
        title: t('DISPLAY NAME'),
        value: 'display_name',
        type: 'text',
        importantLabel: t(
          'Pick a nickname for how the database will display in Superset.',
        ),
        apiValue: 'database_name',
      },
      {
        title: t('ADDITIONAL PARAMETERS'),
        value: 'addittional_parameters',
        type: 'text',
        placeholder: t('e.g param1=value1&param2=value2'),
        importantLabel: t('Add additional custom parameterss'),
        apiValue: 'query',
      },
      {
        type: 'switch',
        value: 'switch',
        importantLabel: t('SSL Mode "require" will be used.'),
        apiValue: 'encryption',
      },
      {
        title: t('Connect this database with a SQLAlchemy URI string instead'),
        type: 'toBasic',
        importantLabel: t(
          'Click this link to switch to an alternate form that allows you to input the SQLAlchemy URL for this database manually.',
        ),
      },
    ],
  },
  {
    databaseMetaType: 'MySQL',
    databaseType: 'MySQL',
    driver: 'mysqldb',
    engine: 'mysql',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
    extra: '{"allows_virtual_table_explore":true}',
    data: [
      {
        title: t('HOST'),
        value: 'host',
        type: 'text',
        importantLabel: t(
          'This can be either an IP address (e.g. 127.0.0.1) or a domain name (e.g. mydatabase.com).',
        ),
        placeholder: t('e.g 127.0.01'),
        popoverLabel: t('Cannot be empty'),
      },
      {
        title: t('PORT'),
        value: 'port',
        type: 'text',
        placeholder: t('e.g 5432'),
        popoverLabel: t('Cannot be empty'),
      },
      {
        title: t('DATABASE NAME'),
        value: 'database_name',
        type: 'text',
        placeholder: t('e.g Analytics'),
        popoverLabel: t('Cannot be empty'),
        importantLabel: t(
          'Copy the name of the database you are trying to connect to.',
        ),
      },
      {
        title: t('USER NAME'),
        value: 'user_name',
        type: 'text',
        placeholder: t('e.g Analytics'),
        popoverLabel: t('Cannot be empty'),
        importantLabel: t(
          'Copy the name of the database you are trying to connect to.',
        ),
      },
      {
        title: t('PASSWORD'),
        value: 'password',
        type: 'password',
        placeholder: 'e.g *******',
      },
      {
        title: t('DISPLAY NAME'),
        value: 'display_name',
        type: 'text',
        importantLabel: t(
          'Pick a nickname for how the database will display in Superset.',
        ),
      },
      {
        title: t('ADDITIONAL PARAMETERS'),
        value: 'addittional_parameters',
        type: 'text',
        placeholder: t('e.g param1=value1&param2=value2'),
        importantLabel: t('Add additional custom parameterss'),
      },
      {
        type: 'switch',
        value: 'switch',
        importantLabel: t('SSL Mode "require" will be used.'),
      },
      {
        title: t('Connect this database with a SQLAlchemy URI string instead'),
        type: 'toBasic',
        importantLabel: t(
          'Click this link to switch to an alternate form that allows you to input the SQLAlchemy URL for this database manually.',
        ),
      },
    ],
  },
  /* {
    databaseType: 'Presto',
    driver: '',
    engine: '',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
    extra: '{"allows_virtual_table_explore":true}',
    data: [],
  },
  {
    databaseType: 'SQLite',
    driver: '',
    engine: '',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
    data: [],
  }, */
  {
    databaseMetaType: 'Trino',
    databaseType: 'sqlalchemy_form',
    driver: '',
    engine: 'trino',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
    data: [
      {
        title: t('DISPLAY NAME'),
        value: 'display_name',
        type: 'text',
        importantLabel: t(
          'Pick a nickname for how the database will display in Superset.',
        ),
        popoverLabel: t('Cannot be empty'),
      },
      {
        title: t('SQLALCHEMY URI'),
        value: 'sqlalchemy_uri',
        type: 'text',
        importantLabel: t(
          'Refer to the for more information on how to structure your URI.',
        ),
        placeholder: t('trino://username:password@host:port/database'),
        popoverLabel: t('Cannot be empty'),
      },
    ],
  },
];

const OtherOptions: OtherConnectionDataOptionProps[] = [
  /* { label: 'Apache Druid', value: '' },
  { label: 'Apache Hive', value: '' },
  { label: 'Apache Spark SQL', value: '' },
  { label: 'Aurora MySQL (Data API)', value: '' },
  { label: 'Aurora PostgreSQL (Data API)', value: '' }, */
  { label: 'MySQL', value: '' },
  { label: 'PostgreSQL', value: '' },
  /* { label: 'Presto', value: '' },
  { label: 'SQLite', value: '' }, */
  { label: 'Trino', value: '' },
  /* { label: 'Other', value: '' }, */
];

const advancedData = [
  {
    title: 'SQL Lab',
    value: 'sql',
    data: [
      {
        label: t('Expose database in SQL Lab'),
        value: 'expose',
        type: 'checkbox',
        popoverLabel: t('Allow this database to be queried in SQL Lab'),
      },
      {
        label: t('Allow CREATE TABLE AS'),
        value: 'createTable',
        type: 'subcheckbox',
        popoverLabel: t('Allow creation of new tables based on queries'),
      },
      {
        label: t('Allow CREATE VIEW AS'),
        value: 'createView',
        type: 'subcheckbox',
        popoverLabel: t('Allow creation of new views based on queries'),
      },
      {
        label: t('Allow DML'),
        value: 'DML',
        type: 'subcheckbox',
        popoverLabel: t(
          'Allow manipulation of the database using non-SELECT statements such as UPDATE, DELETE, CREATE, etc.',
        ),
      },
      {
        label: t('Enable query cost estimation'),
        value: 'enableQuery',
        type: 'subcheckbox',
        popoverLabel: t(
          'For Bigquery, Presto and Postgres, shows a button to compute cost before running a query.',
        ),
      },
      {
        label: t('Allow this database to be explored'),
        value: 'databaseExplored',
        type: 'subcheckbox',
        popoverLabel: t(
          'When enabled, users are able to visualize SQL Lab results in Explore.',
        ),
      },
      {
        label: t('Disable SQL Lab data preview queries'),
        value: 'disabledSqlLab',
        type: 'subcheckbox',
        popoverLabel: t(
          'Disable data preview when fetching table metadata in SQL Lab. Useful to avoid browser performance issues when using databases with very wide tables.',
        ),
      },
    ],
  },
  {
    title: 'Performance',
    value: 'performance',
    data: [
      {
        label: t('CHART CACHE TIMEOUT'),
        value: 'chart_cache_timeout',
        type: 'input',
        popoverLabel: t(
          'Duration (in seconds) of the caching timeout for charts of this database. A timeout of 0 indicates that the cache never expires. Note this defaults to the global timeout if undefined.',
        ),
        placeholder: t('Enter duration in seconds'),
      },
      {
        label: t('SCHEMA CACHE TIMEOUT'),
        value: 'scheme_cache_timeout',
        type: 'input',
        popoverLabel: t(
          'Duration (in seconds) of the metadata caching timeout for schemas of this database. If left unset, the cache never expires.',
        ),
        placeholder: t('Enter duration in seconds'),
      },
      {
        label: t('TABLE CACHE TIMEOUT'),
        value: 'table_cache_timeout',
        type: 'input',
        popoverLabel: t(
          'Duration (in seconds) of the metadata caching timeout for schemas of this database. If left unset, the cache never expires.',
        ),
        placeholder: t('Enter duration in seconds'),
      },
      {
        label: t('Asynchronous query execution'),
        value: 'asynchronous_query_execution',
        type: 'checkbox',
        popoverLabel: t(
          'Operate the database in asynchronous mode, meaning that the queries are executed on remote workers as opposed to on the web server itself. This assumes that you have a Celery worker setup as well as a results backend. Refer to the installation docs for more information.',
        ),
      },
      {
        label: t('Cancel query on window unload event'),
        value: 'cancel_query_on_window_unload_event',
        type: 'checkbox',
        popoverLabel: t(
          'Terminate running queries when browser window closed or navigated to another page. Available for Presto, Hive, MySQL, Postgres and Snowflake databases.',
        ),
      },
    ],
  },
  {
    title: 'Security',
    value: 'security',
    data: [
      {
        label: t('SECURE EXTRA'),
        value: '',
        type: 'jsoneditor',
        placeholder: t('Secure extra'),
      },
      {
        label: t('ROOT CERTIFICATE'),
        value: '',
        type: 'jsoneditor',
        placeholder: t('Secure extra'),
      },
      {
        label: t(
          'Impersonate logged in user (Presto, Trino, Drill, Hive, and GSheets)',
        ),
        value: 'impersonate_logged_in_user',
        type: 'checkbox',
        popoverLabel: t(
          'If Presto or Trino, all the queries in SQL Lab are going to be executed as the currently logged on user who must have permission to run them. If Hive and hive.server2.enable.doAs is enabled, will run the queries as service account, but impersonate the currently logged on user via hive.server2.proxy.user property.',
        ),
      },
      {
        label: t('Allow file uploads to database'),
        value: 'allow_file_uploads_to_database',
        type: 'checkbox',
      },
      {
        label: t('SCHEMAS ALLOWED FOR FILE UPLOAD'),
        value: 'schemes_allowed_for_file',
        type: 'input',
        popoverLabel: t(
          'A comma-separated list of schemas that files are allowed to upload to.',
        ),
        placeholder: t('schema1,schema2'),
      },
    ],
  },
  {
    title: 'Other',
    value: 'other',
    data: [
      {
        label: t('METADATA PARAMETERS'),
        value: '',
        type: 'jsoneditor',
        placeholder: t('Metadata Parameters'),
      },
      {
        label: t('ENGINE PARAMETERS'),
        value: '',
        type: 'jsoneditor',
        placeholder: t('Engine Parameters'),
      },
      {
        label: t('VERSION'),
        value: 'version',
        type: 'input',
        popoverLabel: t(
          'Specify the database version. This should be used with Presto in order to enable query cost estimation.',
        ),
        placeholder: t('Version Number'),
      },
    ],
  },
];

export { DvtConnectionData, OtherOptions, advancedData };
