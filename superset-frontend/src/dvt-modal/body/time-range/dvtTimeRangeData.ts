import { t } from '@superset-ui/core';

const DvtTimeRangeData = {
  rangeType: [
    {
      label: t('Last'),
      value: 'last',
    },
    {
      label: t('Previous'),
      value: 'previous',
    },
    // {
    //   label: t('Custom'),
    //   value: 'custom',
    // },
    // {
    //   label: t('Advanced'),
    //   value: 'advanced',
    // },
    {
      label: t('No filter'),
      value: 'no_filter',
    },
  ],
  radioLast: [
    {
      label: t('last day'),
      value: 'day',
      comparator: 'Last day',
    },
    {
      label: t('last week'),
      value: 'week',
      comparator: 'Last week',
    },
    {
      label: t('last month'),
      value: 'month',
      comparator: 'Last month',
    },
    {
      label: t('last quarter'),
      value: 'quarter',
      comparator: 'Last quarter',
    },
    {
      label: t('last year'),
      value: 'year',
      comparator: 'Last year',
    },
  ],
  radioPrevious: [
    {
      label: t('previous calendar week'),
      value: 'week',
      comparator: 'previous calendar week',
    },
    {
      label: t('previous calendar month'),
      value: 'month',
      comparator: 'previous calendar month',
    },
    {
      label: t('previous calendar year'),
      value: 'year',
      comparator: 'previous calendar year',
    },
  ],
};

export default DvtTimeRangeData;
