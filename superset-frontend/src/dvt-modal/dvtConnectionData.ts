import { t } from '@superset-ui/core';

interface ConnectionDataProps {
  databaseType: string;
  driver: string;
  engine: string;
  data: any[];
  engine_information: {};
  extra?: string;
}

const DvtConnectionData: ConnectionDataProps[] = [
  {
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
  {
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
  {
    databaseType: 'Presto',
    driver: '',
    engine: '',
    engine_information: {
      supports_file_upload: true,
      disable_ssh_tunneling: false,
    },
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
  },
];

const OtherOptions = [
  { label: 'Apache Druid', value: '' },
  { label: 'Apache Hive', value: '' },
  { label: 'Apache Spark SQL', value: '' },
  { label: 'Aurora MySQL (Data API)', value: '' },
  { label: 'Aurora PostgreSQL (Data API)', value: '' },
  { label: 'MySQL', value: '' },
  { label: 'PostgreSQL', value: '' },
  { label: 'Presto', value: '' },
  { label: 'SQLite', value: '' },
  { label: 'Trino', value: '' },
  { label: 'Other', value: '' },
];

export { DvtConnectionData, OtherOptions };
