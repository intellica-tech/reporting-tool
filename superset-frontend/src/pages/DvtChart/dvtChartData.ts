import { t } from '@superset-ui/core';

interface OptionsData {
  label: string;
  value: any;
}

interface ActivesProps {
  [key: string]: string[];
}

interface FormsProps {
  status:
    | 'input'
    | 'select'
    | 'multiple-select'
    | 'input-drop'
    | 'checkbox'
    | 'annotation-layer'
    | 'tabs';
  label?: string;
  name: string;
  popper?: string;
  popperError?: string;
  placeholder?: string;
  type?: 'normal' | 'aggregates' | 'filters';
  savedType?: 'metric' | 'expressions';
  multiple?: boolean;
  options?: OptionsData[];
  number?: boolean;
}

interface CollapsesProps {
  collapse_label: string;
  collapse_popper?: string;
  collapse_popper_error?: string;
  collapse_active: string;
  forms: FormsProps[];
  tabs_name?: string;
  tabs_actives?: ActivesProps;
}

interface DvtChartDataProps {
  chart_name: string;
  collapses: CollapsesProps[];
}

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
      value: 1,
    },
    {
      label: t('1 week ago'),
      value: 2,
    },
    {
      label: t('28 days ago'),
      value: 3,
    },
    {
      label: t('30 days ago'),
      value: 4,
    },
    {
      label: t('52 weeks ago'),
      value: 5,
    },
    {
      label: t('1 year ago'),
      value: 6,
    },
    {
      label: t('104 weeks ago'),
      value: 7,
    },
    {
      label: t('2 years ago'),
      value: 8,
    },
    {
      label: t('156 weeks ago'),
      value: 9,
    },
    {
      label: t('3 years ago'),
      value: 10,
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

const formDimensions: FormsProps = {
  label: t('DIMENSIONS'),
  name: 'groupby',
  popper: t(
    'Dimensions contain qualitative values such as names, dates, or geographical data. Use dimensions to categorize, segment, and reveal the details in your data. Dimensions affect the level of detail in the view.',
  ),
  status: 'input-drop',
  multiple: true,
  type: 'normal',
  savedType: 'expressions',
};

const formMetrics: FormsProps = {
  label: t('METRICS'),
  name: 'metrics',
  popper: t(
    'Select one or many metrics to display. You can use an aggregation function on a column or write custom SQL to create a metric.',
  ),
  popperError: t('cannot be empty'),
  status: 'input-drop',
  multiple: true,
  type: 'aggregates',
  savedType: 'metric',
};

const formFilters: FormsProps = {
  label: t('FILTERS'),
  name: 'adhoc_filters',
  status: 'input-drop',
  multiple: true,
  type: 'filters',
};

const formSortBy: FormsProps = {
  label: t('SORT BY'),
  name: 'timeseries_limit_metric',
  popper: t(
    'This metric is used to define row selection criteria (how the rows are sorted) if a series or row limit is present. If not defined, it reverts to the first metric (where appropriate).',
  ),
  status: 'input-drop',
  multiple: false,
  type: 'aggregates',
  savedType: 'metric',
};

const formRowLimit: FormsProps = {
  label: t('ROW LIMIT'),
  name: 'row_limit',
  popper: t(
    'Limits the number of the rows that are computed in the query that is the source of the data used for this chart.',
  ),
  status: 'select',
  options: chartFormsOption.row_limit,
};

const lineAndBarChart: CollapsesProps[] = [
  {
    collapse_label: t('Query'),
    collapse_popper_error: t('This section contains validation errors'),
    collapse_active: 'query',
    forms: [
      {
        label: t('X-AXIS'),
        name: 'x_axis',
        popper: t('Dimension to use on x-axis.'),
        popperError: t('cannot be empty'),
        status: 'input-drop',
        multiple: false,
        type: 'normal',
        savedType: 'expressions',
      },
      {
        label: t('TIME GRAIN'),
        name: 'time_grain_sqla',
        popper: t(
          'Select a time grain for the visualization. The grain is the time interval represented by a single point on the chart.',
        ),
        placeholder: t('None'),
        status: 'select',
        options: chartFormsOption.time_grain_sqla,
      },
      formMetrics,
      formDimensions,
      {
        label: t('CONTRIBUTION MODE'),
        name: 'contributionMode',
        popper: t('Calculate contribution per series or row'),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.contributionMode,
      },
      formFilters,
      {
        label: t('SERIES LIMIT'),
        name: 'limit',
        popper: t(
          'Limits the number of series that get displayed. A joined subquery (or an extra phase where subqueries are not supported) is applied to limit the number of series that get fetched and rendered. This feature is useful when grouping by high cardinality column(s) though does increase the query complexity and cost.',
        ),
        placeholder: t('None'),
        status: 'select',
        options: chartFormsOption.limit,
      },
      formSortBy,
      {
        label: t('SORT DESCENDING'),
        name: 'order_desc',
        status: 'checkbox',
      },
      formRowLimit,
      {
        label: t('TRUNCATE METRIC'),
        name: 'truncate_metric',
        status: 'checkbox',
      },
      {
        label: t('SHOW EMPTY COLUMNS'),
        name: 'show_empty_columns',
        status: 'checkbox',
      },
    ],
  },
  {
    collapse_label: t('Advanced analytics'),
    collapse_popper: t(
      'This section contains options that allow for advanced analytical post processing of query results',
    ),
    collapse_active: 'advanced_analytics',
    forms: [
      {
        label: t('ROLLING FUNCTION'),
        name: 'rolling_type',
        popper: t(
          'Defines a rolling window function to apply, works along with the [Periods] text box',
        ),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.rolling_type,
      },
      {
        label: t('TIME SHIFT'),
        name: 'time_compare',
        popper: t(
          'Overlay one or more timeseries from a relative time period. Expects relative time deltas in natural language (example: 24 hours, 7 days, 52 weeks, 365 days). Free text is supported.',
        ),
        placeholder: t('Select ...'),
        status: 'multiple-select',
        options: chartFormsOption.time_compare,
      },
      {
        label: t('CALCULATION TYPE'),
        name: 'comparison_type',
        popper: t(
          'How to display time shifts: as individual lines; as the difference between the main time series and each time shift; as the percentage change; or as the ratio between series and time shifts.',
        ),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.comparison_type,
      },
      {
        label: t('RULE'),
        name: 'resample_rule',
        popper: t('Pandas resample rule'),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.resample_rule,
      },
      {
        label: t('FILL METHOD'),
        name: 'resample_method',
        popper: t('Pandas resample method'),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.resample_method,
      },
    ],
  },
  {
    collapse_label: t('Annotations and Layers'),
    collapse_active: 'annotations_and_layers',
    forms: [
      {
        name: 'annotation_layers',
        placeholder: t('Add annotation layer'),
        status: 'annotation-layer',
      },
    ],
  },
  {
    collapse_label: t('Predictive Analytics'),
    collapse_active: 'predictive_analytics',
    forms: [
      {
        label: t('ENABLE FORECAST'),
        name: 'forecastEnabled',
        status: 'checkbox',
      },
      {
        label: t('FORECAST PERIODS'),
        name: 'forecastPeriods',
        popper: t('How many periods into the future do we want to predict'),
        status: 'input',
        number: true,
      },
      {
        label: t('CONFIDENCE INTERVAL'),
        name: 'forecastInterval',
        popper: t(
          'Width of the confidence interval. Should be between 0 and 1',
        ),
        status: 'input',
      },
      {
        label: t('YEARLY SEASONALITY'),
        name: 'forecastSeasonalityYearly',
        popper: t(
          'Should yearly seasonality be applied. An integer value will specify Fourier order of seasonality.',
        ),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.forecastSeasonalityYearly,
      },
      {
        label: t('WEEKLY SEASONALITY'),
        name: 'forecastSeasonalityWeekly',
        popper: t(
          'Should weekly seasonality be applied. An integer value will specify Fourier order of seasonality.',
        ),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.forecastSeasonalityWeekly,
      },
      {
        label: t('DAILY SEASONALITY'),
        name: 'forecastSeasonalityDaily',
        popper: t(
          'Should daily seasonality be applied. An integer value will specify Fourier order of seasonality.',
        ),
        placeholder: t('Select ...'),
        status: 'select',
        options: chartFormsOption.forecastSeasonalityDaily,
      },
    ],
  },
];

const DvtChartData: DvtChartDataProps[] = [
  {
    chart_name: 'echarts_timeseries_line',
    collapses: lineAndBarChart,
  },
  {
    chart_name: 'echarts_timeseries_bar',
    collapses: lineAndBarChart,
  },
  {
    chart_name: 'echarts_area',
    collapses: lineAndBarChart,
  },
  {
    chart_name: 'table',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        tabs_name: 'query_mode',
        tabs_actives: {
          aggregate: [
            'groupby',
            'metrics',
            'percent_metrics',
            'adhoc_filters',
            'timeseries_limit_metric',
            'server_pagination',
            'server_page_length',
            'order_desc',
            'show_totals',
          ],
          raw: [
            'all_columns',
            'adhoc_filters',
            'order_by_cols',
            'server_pagination',
            'server_page_length',
          ],
        },
        forms: [
          {
            label: t('QUERY MODE'),
            name: 'query_mode',
            status: 'tabs',
            options: [
              { label: t('AGGREGATE'), value: 'aggregate' },
              { label: t('RAW RECORDS'), value: 'raw' },
            ],
          },
          {
            ...formDimensions,
            popperError: t(
              'Group By, Metrics or Percentage Metrics must have a value',
            ),
          },
          {
            ...formMetrics,
            popperError: t(
              'Group By, Metrics or Percentage Metrics must have a value',
            ),
          },
          {
            label: t('PERCENTAGE METRICS'),
            name: 'percent_metrics',
            popper: t(
              'Select one or many metrics to display, that will be displayed in the percentages of total. Percentage metrics will be calculated only from data within the row limit. You can use an aggregation function on a column or write custom SQL to create a percentage metric.',
            ),
            popperError: t(
              'Group By, Metrics or Percentage Metrics must have a value',
            ),
            status: 'input-drop',
            multiple: true,
            type: 'aggregates',
            savedType: 'metric',
          },
          {
            label: t('COLUMNS'),
            name: 'all_columns',
            popper: t('Columns to display'),
            popperError: t('must have a value'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          formFilters,
          formSortBy,
          {
            label: t('ORDERING'),
            name: 'order_by_cols',
            popper: t('Order results by selected columns'),
            placeholder: t('Select ...'),
            status: 'multiple-select',
            options: chartFormsOption.order_by_cols,
          },
          {
            label: t('SERVER PAGINATION'),
            name: 'server_pagination',
            status: 'checkbox',
          },
          {
            label: t('SERVER PAGE LENGTH'),
            name: 'server_page_length',
            popper: t('Rows per page, 0 means no pagination'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.server_page_length,
          },
          {
            label: t('SORT DESCENDING'),
            name: 'order_desc',
            status: 'checkbox',
          },
          {
            label: t('SHOW TOTALS'),
            name: 'show_totals',
            status: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'big_number_total',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          {
            label: t('METRIC'),
            name: 'metric',
            popper: t(
              'Select a metric to display. You can use an aggregation function on a column or write custom SQL to create a metric.',
            ),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          formFilters,
        ],
      },
      {
        collapse_label: t('Display settings'),
        collapse_active: 'display_settings',
        forms: [
          {
            name: 'subheader',
            label: t('SUBHEADER'),
            status: 'input',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'pie',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          formDimensions,
          {
            label: t('METRIC'),
            name: 'metric',
            popper: t(
              'Select a metric to display. You can use an aggregation function on a column or write custom SQL to create a metric.',
            ),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          formFilters,
          formRowLimit,
          {
            label: t('SORT BY METRIC'),
            name: 'sort_by_metric',
            status: 'checkbox',
          },
        ],
      },
    ],
  },
];

export default DvtChartData;
