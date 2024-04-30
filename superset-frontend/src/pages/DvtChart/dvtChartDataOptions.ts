import {
  CategoricalAirbnb,
  CategoricalD3,
  CategoricalEcharts,
  CategoricalGoogle,
  CategoricalLyft,
  CategoricalPreset,
  CategoricalSuperset,
  t,
} from '@superset-ui/core';
import schemes from 'packages/superset-ui-core/src/color/colorSchemes/sequential/d3';
import schemesTwo from 'packages/superset-ui-core/src/color/colorSchemes/sequential/common';
import {
  D3_FORMAT_OPTIONS,
  D3_TIME_FORMAT_OPTIONS,
} from 'src/explore/controls';
import { DvtSchemeColorData } from 'src/components/DvtSelectColorScheme/dvtSchemeColorData';

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

const leftOrBottomMargin = [
  {
    label: t('auto'),
    value: 'auto',
  },
  {
    label: '50',
    value: 50,
  },
  {
    label: '75',
    value: 75,
  },
  {
    label: '100',
    value: 100,
  },
  {
    label: '125',
    value: 125,
  },
  {
    label: '150',
    value: 150,
  },
  {
    label: '200',
    value: 200,
  },
];

const sortAxisChoices = [
  {
    label: t('Axis ascending'),
    value: 'alpha_asc',
  },
  {
    label: t('Axis descending'),
    value: 'alpha_desc',
  },
  {
    label: t('Metric ascending'),
    value: 'value_asc',
  },
  {
    label: t('Metric descending'),
    value: 'value_desc',
  },
];

const minAndMaxNumberValues = (min: number, max: number) => {
  const result = [];
  for (let i = min; i < max; i += 1) {
    result.push({
      label: String(i),
      value: i,
    });
  }
  return result;
};

const oneBetweenFifty = minAndMaxNumberValues(1, 50);

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
      value: 'None',
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
  linear_color_scheme: [...schemes, ...schemesTwo],
  xscale_interval: oneBetweenFifty,
  yscale_interval: oneBetweenFifty,
  canvas_image_rendering: [
    {
      label: t('pixelated (Sharp)'),
      value: 'pixelated',
    },
    {
      label: t('auto (Smooth)'),
      value: 'auto',
    },
  ],
  normalize_across: [
    {
      label: t('heatmap'),
      value: 'heatmap',
    },
    {
      label: t('x'),
      value: 'x',
    },
    {
      label: t('y'),
      value: 'y',
    },
  ],
  left_margin: leftOrBottomMargin,
  bottom_margin: leftOrBottomMargin,
  y_axis_format: D3_FORMAT_OPTIONS.map((item: any) => ({
    label: item[1],
    value: item[0],
  })),
  time_format: D3_TIME_FORMAT_OPTIONS.map((item: any) => ({
    label: item[1],
    value: item[0],
  })),
  sort_x_axis: sortAxisChoices,
  sort_y_axis: sortAxisChoices,
  currency_format: {
    symbolPosition: [
      {
        label: t('Prefix'),
        value: 'prefix',
      },
      {
        label: t('Suffix'),
        value: 'suffix',
      },
    ],
    symbol: [
      {
        label: '$ (USD)',
        value: 'USD',
      },
      {
        label: '€ (EUR)',
        value: 'EUR',
      },
      {
        label: '£ (GBP)',
        value: 'GBP',
      },
      {
        label: '₹ (INR)',
        value: 'INR',
      },
      {
        label: 'MX$ (MXN)',
        value: 'MXN',
      },
      {
        label: '¥ (JPY)',
        value: 'JPY',
      },
      {
        label: 'CN¥ (CNY)',
        value: 'CNY',
      },
    ],
  },
  yAxisLabelRotation: [
    {
      label: '0°',
      value: 0,
    },
    {
      label: '45°',
      value: 45,
    },
  ],
  aggregateFunction: [
    {
      label: t('Count'),
      value: 'Count',
    },
    {
      label: t('Count Unique Values'),
      value: 'Count Unique Values',
    },
    {
      label: t('List Unique Values'),
      value: 'List Unique Values',
    },
    {
      label: t('Sum'),
      value: 'Sum',
    },
    {
      label: t('Average'),
      value: 'Average',
    },
    {
      label: t('Median'),
      value: 'Median',
    },
    {
      label: t('Sample Variance'),
      value: 'Sample Variance',
    },
    {
      label: t('Sample Standard Deviation'),
      value: 'Sample Standard Deviation',
    },
    {
      label: t('Minimum'),
      value: 'Minimum',
    },
    {
      label: t('Maximum'),
      value: 'Maximum',
    },
    {
      label: t('First'),
      value: 'First',
    },
    {
      label: t('Last'),
      value: 'Last',
    },
    {
      label: t('Sum as Fraction of Total'),
      value: 'Sum as Fraction of Total',
    },
    {
      label: t('Sum as Fraction of Rows'),
      value: 'Sum as Fraction of Rows',
    },
    {
      label: t('Sum as Fraction of Columns'),
      value: 'Sum as Fraction of Columns',
    },
    {
      label: t('Count as Fraction of Total'),
      value: 'Count as Fraction of Total',
    },
    {
      label: t('Count as Fraction of Rows'),
      value: 'Count as Fraction of Rows',
    },
    {
      label: t('Count as Fraction of Columns'),
      value: 'Count as Fraction of Columns',
    },
  ],
  label_type: [
    {
      label: t('Value'),
      value: 'value',
    },
    {
      label: t('Category Name'),
      value: 'key',
    },
    {
      label: t('Percentage'),
      value: 'percent',
    },
    {
      label: t('Category and Value'),
      value: 'key_value',
    },
    {
      label: t('Category and Percentage'),
      value: 'key_percent',
    },
    {
      label: t('Category, Value and Percentage'),
      value: 'key_value_percent',
    },
  ],
  header_font_size: [
    {
      label: t('Tiny'),
      value: 0.2,
    },
    {
      label: t('Small'),
      value: 0.3,
    },
    {
      label: t('Normal'),
      value: 0.4,
    },
    {
      label: t('Large'),
      value: 0.5,
    },
    {
      label: t('Huge'),
      value: 0.6,
    },
  ],
  subheader_font_size: [
    {
      label: t('Tiny'),
      value: 0.125,
    },
    {
      label: t('Small'),
      value: 0.15,
    },
    {
      label: t('Normal'),
      value: 0.2,
    },
    {
      label: t('Large'),
      value: 0.3,
    },
    {
      label: t('Huge'),
      value: 0.4,
    },
  ],
  page_length: [
    {
      label: t('All'),
      value: 0,
    },
    {
      label: '10',
      value: 10,
    },
    {
      label: '20',
      value: 20,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '100',
      value: 100,
    },
    {
      label: '200',
      value: 200,
    },
  ],
  x_axis_title_margin: [
    {
      label: '15',
      value: 15,
    },
    {
      label: '30',
      value: 30,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '75',
      value: 75,
    },
    {
      label: '100',
      value: 100,
    },
    {
      label: '125',
      value: 125,
    },
    {
      label: '150',
      value: 150,
    },
    {
      label: '200',
      value: 200,
    },
  ],
  y_axis_title_margin: [
    {
      label: '15',
      value: 15,
    },
    {
      label: '30',
      value: 30,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '75',
      value: 75,
    },
    {
      label: '100',
      value: 100,
    },
    {
      label: '125',
      value: 125,
    },
    {
      label: '150',
      value: 150,
    },
    {
      label: '200',
      value: 200,
    },
  ],
  y_axis_title_position: [
    {
      label: t('Left'),
      value: 'Left',
    },
    {
      label: t('Top'),
      value: 'Top',
    },
  ],
  sort_series_type: [
    {
      label: t('Category name'),
      value: 'name',
    },
    {
      label: t('Total value'),
      value: 'sum',
    },
    {
      label: t('Minimum value'),
      value: 'min',
    },
    {
      label: t('Max value'),
      value: 'max',
    },
    {
      label: t('Average value'),
      value: 'avg',
    },
  ],
  seriesType: [
    {
      label: t('Line'),
      value: 'line',
    },
    {
      label: t('Scatter'),
      value: 'scatter',
    },
    {
      label: t('Smooth Line'),
      value: 'smooth',
    },
    {
      label: t('Bar'),
      value: 'bar',
    },
    {
      label: t('Step - start'),
      value: 'start',
    },
    {
      label: t('Step - middle'),
      value: 'middle',
    },
    {
      label: t('Step - end'),
      value: 'end',
    },
  ],
  stack: [
    {
      label: t('None'),
      value: 'null',
    },
    {
      label: t('Stack'),
      value: 'Stack',
    },
    {
      label: t('Stream'),
      value: 'Stream',
    },
  ],
  legendType: [
    {
      label: t('Scroll'),
      value: 'scroll',
    },
    {
      label: t('Plain'),
      value: 'plain',
    },
  ],
  legendOrientation: [
    {
      label: t('Top'),
      value: 'top',
    },
    {
      label: t('Bottom'),
      value: 'bottom',
    },
    {
      label: t('Left'),
      value: 'left',
    },
    {
      label: t('Right'),
      value: 'right',
    },
  ],
  xAxisLabelRotation: [
    {
      label: '0°',
      value: 0,
    },
    {
      label: '45°',
      value: 45,
    },
    {
      label: '90°',
      value: 90,
    },
  ],
  legendOrientationTopLeft: [
    {
      label: t('Top'),
      value: 'top',
    },
    {
      label: t('Left'),
      value: 'left',
    },
  ],
  country_fieldtype: [
    {
      label: t('Full name'),
      value: 'name',
    },
    {
      label: t('code International Olympic Committee (cioc)'),
      value: 'cioc',
    },
    {
      label: t('code ISO 3166-1 alpha-2 (cca2)'),
      value: 'cca2',
    },
    {
      label: t('code ISO 3166-1 alpha-3 (cca3)'),
      value: 'cca3',
    },
  ],
  max_bubble_size: [
    {
      label: '5',
      value: '5',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '15',
      value: '15',
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
      label: '75',
      value: '75',
    },
    {
      label: '100',
      value: '100',
    },
  ],
  country_color_scheme: [
    ...CategoricalSuperset,
    ...CategoricalAirbnb,
    ...CategoricalD3,
    ...CategoricalEcharts,
    ...CategoricalGoogle,
    ...CategoricalLyft,
    ...CategoricalPreset,
    ...schemes,
  ],
  color_scheme: DvtSchemeColorData,
  rowOrder: [
    {
      label: t('key a-z'),
      value: 'key_a_to_z',
    },
    {
      label: t('key z-a'),
      value: 'key_z_to_a',
    },
    {
      label: t('value ascending'),
      value: 'value_a_to_z',
    },
    {
      label: t('value descending'),
      value: 'value_z_to_a',
    },
  ],
  whiskerOptions: [
    {
      label: t('Tukey'),
      value: 'Tukey',
    },
    {
      label: t('Min/max (no outliers)'),
      value: 'Min/max (no outliers)',
    },
    {
      label: t('2/98 percentiles'),
      value: '2/98 percentiles',
    },
    {
      label: t('9/91 percentiles'),
      value: '9/91 percentiles',
    },
  ],
  label_types: [
    {
      label: t('Value'),
      value: 'value',
    },
    {
      label: t('Key'),
      value: 'Key',
    },
    {
      label: t('Category and Value'),
      value: 'key_value',
    },
  ],
  label_types2: [
    {
      label: t('Value'),
      value: 'value',
    },
    {
      label: t('Category and Value'),
      value: 'key_value',
    },
  ],
  edgeSymbol: [
    {
      label: t('None -> None'),
      value: 'none,none',
    },
    {
      label: t('None -> Arrow'),
      value: 'none,arrow',
    },
    {
      label: t('Circle -> Arrow'),
      value: 'circle,arrow',
    },
    {
      label: t('Circle -> Circle'),
      value: 'circle,circle',
    },
  ],
  roam: [
    {
      label: t('Disabled'),
      value: false,
    },
    {
      label: t('Scale only'),
      value: 'scale',
    },
    {
      label: t('Move only'),
      value: 'move',
    },
    {
      label: t('Scale and Move'),
      value: true,
    },
  ],
  selectedMode: [
    {
      label: t('Disabled'),
      value: false,
    },
    {
      label: t('Single'),
      value: 'single',
    },
    {
      label: t('Multiple'),
      value: 'multiple',
    },
  ],
  label_position: [
    {
      label: t('Top'),
      value: 'top',
    },
    {
      label: t('Left'),
      value: 'left',
    },
    {
      label: t('Right'),
      value: 'right',
    },
    {
      label: t('Bottom'),
      value: 'bottom',
    },
    {
      label: t('Inside'),
      value: 'inside',
    },
    {
      label: t('Inside left'),
      value: 'insideLeft',
    },
    {
      label: t('Inside right'),
      value: 'insideRight',
    },
    {
      label: t('Inside top'),
      value: 'insideTop',
    },
    {
      label: t('Inside bottom'),
      value: 'insideBottom',
    },
    {
      label: t('Inside top left'),
      value: 'insideTopLeft',
    },
    {
      label: t('Inside bottom left'),
      value: 'insideBottomLeft',
    },
    {
      label: t('Inside top right'),
      value: 'insideTopRight',
    },
    {
      label: t('Inside bottom right'),
      value: 'insideBottomRight',
    },
  ],
  seriesType2: [
    {
      label: t('Start'),
      value: 'start',
    },
    {
      label: t('Middle'),
      value: 'middle',
    },
    {
      label: t('End'),
      value: 'end',
    },
  ],
  symbol: [
    {
      label: t('Empty circle'),
      value: 'emptyCircle',
    },
    {
      label: t('Circle'),
      value: 'circle',
    },
    {
      label: t('Rectangle'),
      value: 'rect',
    },
    {
      label: t('Triangle'),
      value: 'triangle',
    },
    {
      label: t('Diamond'),
      value: 'diamond',
    },
    {
      label: t('Pin'),
      value: 'pin',
    },
    {
      label: t('Arrow'),
      value: 'arrow',
    },
    {
      label: t('None'),
      value: 'none',
    },
  ],
  link_length: [
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
      label: '75',
      value: '75',
    },
    {
      label: '100',
      value: '100',
    },
    {
      label: '150',
      value: '150',
    },
    {
      label: '200',
      value: '200',
    },
    {
      label: '250',
      value: '250',
    },
  ],
  rowSubtotalPosition: [
    {
      label: t('Top'),
      value: true,
    },
    {
      label: t('Bottom'),
      value: false,
    },
  ],
  colSubtotalPosition: [
    {
      label: t('Left'),
      value: true,
    },
    {
      label: t('Right'),
      value: false,
    },
  ],
  yAxisIndex: [
    {
      label: t('Primary'),
      value: 0,
    },
    {
      label: t('Secondary'),
      value: 1,
    },
  ],
  x_ticks_layout: [
    {
      label: t('auto'),
      value: 'auto',
    },
    {
      label: t('flat'),
      value: 'flat',
    },
    {
      label: '45°',
      value: '45°',
    },
    {
      label: '90°',
      value: '90°',
    },
    {
      label: t('staggered'),
      value: 'staggered',
    },
  ],
  orient: [
    { label: t('Left to Right'), value: 'LR' },
    { label: t('Right to Left'), value: 'RL' },
    { label: t('Top to Bottom'), value: 'TB' },
    { label: t('Bottom to Top'), value: 'BT' },
  ],
  node_label_position: [
    { label: t('left'), value: 'left' },
    { label: t('top'), value: 'top' },
    { label: t('right'), value: 'right' },
    { label: t('bottom'), value: 'bottom' },
  ],
};

export { forecastSeasonality, chartFormsOption };
