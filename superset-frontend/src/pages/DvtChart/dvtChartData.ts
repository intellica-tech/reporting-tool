import { t } from '@superset-ui/core';

interface OptionsData {
  label: string;
  value: any;
}

interface FormsProps {
  status:
    | 'input'
    | 'select'
    | 'multiple-select'
    | 'input-drop'
    | 'checkbox'
    | 'annotation-layer';
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
};

const DvtChartData: DvtChartDataProps[] = [
  {
    chart_name: 'echarts_timeseries_line',
    collapses: [
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
          {
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
          },
          {
            label: t('DIMENSIONS'),
            name: 'groupby',
            popper: t(
              'Dimensions contain qualitative values such as names, dates, or geographical data. Use dimensions to categorize, segment, and reveal the details in your data. Dimensions affect the level of detail in the view.',
            ),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('CONTRIBUTION MODE'),
            name: 'contributionMode',
            popper: t('Calculate contribution per series or row'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.contributionMode,
          },
          {
            label: t('FILTERS'),
            name: 'adhoc_filters',
            status: 'input-drop',
            multiple: true,
            type: 'filters',
          },
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
          {
            label: t('SORT BY'),
            name: 'timeseries_limit_metric',
            popper: t(
              'This metric is used to define row selection criteria (how the rows are sorted) if a series or row limit is present. If not defined, it reverts to the first metric (where appropriate).',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          {
            label: t('SORT DESCENDING'),
            name: 'order_desc',
            status: 'checkbox',
          },
          {
            label: t('ROW LIMIT'),
            name: 'row_limit',
            popper: t(
              'Limits the number of the rows that are computed in the query that is the source of the data used for this chart.',
            ),
            status: 'select',
            options: chartFormsOption.row_limit,
          },
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
    ],
  },
  {
    chart_name: 'big_number_total',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          {
            label: t('METRIC'),
            name: 'metric',
            popper: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          {
            label: t('FILTERS'),
            name: 'adhoc_filters',
            status: 'input-drop',
            multiple: true,
            type: 'filters',
          },
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
];

export default DvtChartData;
