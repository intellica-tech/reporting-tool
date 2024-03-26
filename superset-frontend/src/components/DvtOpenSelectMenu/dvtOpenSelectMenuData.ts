import { t } from '@superset-ui/core';

interface DataProps {
  label: string;
  value: string;
}

interface OperatorDataProps {
  having: DataProps[];
  where: DataProps[];
}

interface OpenSelectMenuDataProps {
  operator: OperatorDataProps;
  aggregate: DataProps[];
  whereOrHaving: DataProps[];
}

const openSelectMenuData: OpenSelectMenuDataProps = {
  operator: {
    having: [
      {
        label: t('Equal to (=)'),
        value: '=',
      },
      {
        label: t('Not equal to (<>)'),
        value: '<>',
      },
      {
        label: t('Less than (<)'),
        value: '<',
      },
      {
        label: t('Less or equal (<=)'),
        value: '<=',
      },
      {
        label: t('Greater than (>)'),
        value: '>',
      },
      {
        label: t('Greater or equal (>=)'),
        value: '>=',
      },
    ],
    where: [
      {
        label: t('In'),
        value: 'IN',
      },
      {
        label: t('Not in'),
        value: 'NOT IN',
      },
      {
        label: t('Like'),
        value: 'LIKE',
      },
      {
        label: t('Like (case insensitive'),
        value: 'ILIKE',
      },
      {
        label: t('Is not null'),
        value: 'IS NOT NULL',
      },
      {
        label: t('Is null'),
        value: 'IS NULL',
      },
    ],
  },
  aggregate: [
    {
      label: t('AVG'),
      value: 'AVG',
    },
    {
      label: t('COUNT'),
      value: 'COUNT',
    },
    {
      label: t('COUNT_DISTINCT'),
      value: 'COUNT_DISTINCT',
    },
    {
      label: t('MAX'),
      value: 'MAX',
    },
    {
      label: t('MIN'),
      value: 'MIN',
    },
    {
      label: t('SUM'),
      value: 'SUM',
    },
  ],
  whereOrHaving: [
    { label: t('WHERE'), value: 'WHERE' },
    { label: t('HAVING'), value: 'HAVING' },
  ],
};

export default openSelectMenuData;
