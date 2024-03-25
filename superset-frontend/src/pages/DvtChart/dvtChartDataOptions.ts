import { t } from '@superset-ui/core';

const forecastSeasonality = [
  {
    label: t('default'),
    value: 'null',
  },
  {
    label: t('Yes'),
    value: 'true',
  },
  {
    label: t('No'),
    value: 'false',
  },
];

const chartFormsOption = {
  time_grain_sqla: [
    {
      label: t('Second'),
      value: 'PT1S',
    },
    {
      label: t('Minute'),
      value: 'PT1M',
    },
    {
      label: t('Hour'),
      value: 'PT1H',
    },
    {
      label: t('Day'),
      value: 'P1D',
    },
    {
      label: t('Week'),
      value: 'P1W',
    },
    {
      label: t('Month'),
      value: 'P1M',
    },
    {
      label: t('Quarter'),
      value: 'P3M',
    },
    {
      label: t('Year'),
      value: 'P1Y',
    },
  ],
  contributionMode: [
    {
      label: t('None'),
      value: 'null',
    },
    {
      label: t('Row'),
      value: 'row',
    },
    {
      label: t('Series'),
      value: 'column',
    },
  ],
  limit: [
    {
      label: '5',
      value: '5',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '25',
      value: '25',
    },
    {
      label: '50',
      value: '50',
    },
    {
      label: '100',
      value: '100',
    },
    {
      label: '500',
      value: '500',
    },
  ],
  row_limit: [
    {
      label: '10',
      value: '10',
    },
    {
      label: '50',
      value: '50',
    },
    {
      label: '100',
      value: '100',
    },
    {
      label: '250',
      value: '250',
    },
    {
      label: '500',
      value: '500',
    },
    {
      label: '1000',
      value: '1000',
    },
    {
      label: '5000',
      value: '5000',
    },
    {
      label: '10000',
      value: '10000',
    },
    {
      label: '50000',
      value: '50000',
    },
  ],
  rolling_type: [
    {
      label: t('None'),
      value: 'null',
    },
    {
      label: t('mean'),
      value: 'mean',
    },
    {
      label: t('sum'),
      value: 'sum',
    },
    {
      label: t('std'),
      value: 'std',
    },
    {
      label: t('cumsum'),
      value: 'cumsum',
    },
  ],
  time_compare: [
    {
      label: t('1 day ago'),
      value: '1 day ago',
    },
    {
      label: t('1 week ago'),
      value: '1 week ago',
    },
    {
      label: t('28 days ago'),
      value: '28 days ago',
    },
    {
      label: t('30 days ago'),
      value: '30 days ago',
    },
    {
      label: t('52 weeks ago'),
      value: '52 weeks ago',
    },
    {
      label: t('1 year ago'),
      value: '1 year ago',
    },
    {
      label: t('104 weeks ago'),
      value: '104 weeks ago',
    },
    {
      label: t('2 years ago'),
      value: '2 years ago',
    },
    {
      label: t('156 weeks ago'),
      value: '156 weeks ago',
    },
    {
      label: t('3 years ago'),
      value: '3 years ago',
    },
  ],
  comparison_type: [
    {
      label: t('Actual values'),
      value: 'values',
    },
    {
      label: t('Difference'),
      value: 'difference',
    },
    {
      label: t('Percentage change'),
      value: 'percentage',
    },
    {
      label: t('Ratio'),
      value: 'ratio',
    },
  ],
  resample_rule: [
    {
      label: t('1 minutely frequency'),
      value: '1T',
    },
    {
      label: t('1 hourly frequency'),
      value: '1H',
    },
    {
      label: t('1 calendar day frequency'),
      value: '1D',
    },
    {
      label: t('7 calendar day frequency'),
      value: '7D',
    },
    {
      label: t('1 month start frequency'),
      value: '1MS',
    },
    {
      label: t('1 month end frequency'),
      value: '1M',
    },
    {
      label: t('1 year start frequency'),
      value: '1AS',
    },
    {
      label: t('1 year end frequency'),
      value: '1A',
    },
  ],
  resample_method: [
    {
      label: t('Null imputation'),
      value: 'asfreq',
    },
    {
      label: t('Zero imputation'),
      value: 'zerofill',
    },
    {
      label: t('Linear interpolation'),
      value: 'linear',
    },
    {
      label: t('Forward values'),
      value: 'ffill',
    },
    {
      label: t('Backward values'),
      value: 'bfill',
    },
    {
      label: t('Median values'),
      value: 'median',
    },
    {
      label: t('Mean values'),
      value: 'mean',
    },
    {
      label: t('Sum values'),
      value: 'sum',
    },
  ],
  forecastSeasonalityYearly: forecastSeasonality,
  forecastSeasonalityWeekly: forecastSeasonality,
  forecastSeasonalityDaily: forecastSeasonality,
  order_by_cols: [
    {
      label: t('eu_sales [asc]'),
      value: '["eu_sales", true]',
    },
    {
      label: t('eu_sales [desc]'),
      value: '["eu_sales", false]',
    },
    {
      label: t('genre [asc]'),
      value: '["genre", true]',
    },
    {
      label: t('genre [desc]'),
      value: '["genre", false]',
    },
    {
      label: t('global_sales [asc]'),
      value: '["global_sales", true]',
    },
    {
      label: t('global_sales [desc]'),
      value: '["global_sales", false]',
    },
    {
      label: t('jp_sales [asc]'),
      value: '["jp_sales", true]',
    },
    {
      label: t('jp_sales [desc]'),
      value: '["jp_sales", false]',
    },
    {
      label: t('na_sales [asc]'),
      value: '["na_sales", true]',
    },
    {
      label: t('na_sales [desc]'),
      value: '["na_sales", false]',
    },
    {
      label: t('name [asc]'),
      value: '["name", true]',
    },
    {
      label: t('name [desc]'),
      value: '["name", false]',
    },
    {
      label: t('other_sales [asc]'),
      value: '["other_sales", true]',
    },
    {
      label: t('other_sales [desc]'),
      value: '["other_sales", false]',
    },
    {
      label: t('platform [asc]'),
      value: '["platform", true]',
    },
    {
      label: t('platform [desc]'),
      value: '["platform", false]',
    },
    {
      label: t('publisher [asc]'),
      value: '["publisher", true]',
    },
    {
      label: t('publisher [desc]'),
      value: '["publisher", false]',
    },
    {
      label: t('rank [asc]'),
      value: '["rank", true]',
    },
    {
      label: t('rank [desc]'),
      value: '["rank", false]',
    },
    {
      label: t('year [asc]'),
      value: '["year", true]',
    },
    {
      label: t('year [desc]'),
      value: '["year", false]',
    },
  ],
  server_page_length: [
    {
      label: t('All'),
      value: 0,
    },
    {
      label: t('10'),
      value: 10,
    },
    {
      label: t('20'),
      value: 20,
    },
    {
      label: t('50'),
      value: 50,
    },
    {
      label: t('100'),
      value: 100,
    },
    {
      label: t('200'),
      value: 200,
    },
  ],
};

export { forecastSeasonality, chartFormsOption };
