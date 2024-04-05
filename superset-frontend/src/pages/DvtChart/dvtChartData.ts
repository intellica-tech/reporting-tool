import { t } from '@superset-ui/core';
import { chartFormsOption } from './dvtChartDataOptions';

interface OptionsData {
  label: string;
  value: any;
}

interface ActivesProps {
  [key: string]: string[];
}

interface ValuesProps {
  name: string;
  placeholder?: string;
  options?: OptionsData[];
  number?: boolean;
}

interface RangeConfigProps {
  min: number;
  max: number;
  step: number;
}

interface FormsProps {
  status:
    | 'input'
    | 'select'
    | 'multiple-select'
    | 'input-drop'
    | 'checkbox'
    | 'annotation-layer'
    | 'tabs'
    | 'two-input'
    | 'two-select'
    | 'range'
    | 'color';
  label?: string;
  name: string;
  popper?: string;
  popperError?: string;
  placeholder?: string;
  type?: 'normal' | 'aggregates' | 'filters';
  savedType?: 'metric' | 'expressions';
  simpleType?: 'normal' | 'temporal';
  multiple?: boolean;
  options?: OptionsData[];
  number?: boolean;
  values?: ValuesProps[];
  rangeConfig?: RangeConfigProps;
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

const formMetric: FormsProps = {
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

const sortDescending: FormsProps = {
  label: t('SORT DESCENDING'),
  name: 'order_desc',
  status: 'checkbox',
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
      sortDescending,
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
          sortDescending,
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
        forms: [formMetric, formFilters],
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
          formMetric,
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
  {
    chart_name: 'bubble_v2',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          {
            label: t('DIMENSION'),
            name: 'dimension',
            popper: t(
              'Defines the grouping of entities. Each series is represented by a specific color in the chart.',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('ENTITY'),
            name: 'entity',
            popper: t('This defines the element to be plotted on the chart'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('X AXIS'),
            name: 'x',
            popper: t(
              "The dataset column/metric that returns the values on your chart's x-axis.",
            ),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          {
            label: t('Y AXIS'),
            name: 'y',
            popper: t(
              "The dataset column/metric that returns the values on your chart's y-axis.",
            ),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          formFilters,
          {
            label: t('BUBBLE SIZE'),
            name: 'size',
            popper: t('Metric used to calculate bubble size'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          formSortBy,
          sortDescending,
          formRowLimit,
        ],
      },
    ],
  },
  {
    chart_name: 'histogram',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
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
          formRowLimit,
          formDimensions,
        ],
      },
    ],
  },
  {
    chart_name: 'funnel',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          formDimensions,
          formMetric,
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
  {
    chart_name: 'heatmap',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          {
            label: t('X AXIS'),
            name: 'all_columns_x',
            popper: t('Columns to display'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('Y AXIS'),
            name: 'all_columns_y',
            popper: t('Columns to display'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          formMetric,
          formFilters,
          formRowLimit,
          {
            label: t('SORT BY METRIC'),
            name: 'sort_by_metric',
            status: 'checkbox',
          },
        ],
      },
      {
        collapse_label: t('Heatmap Options'),
        collapse_active: 'heatmap_options',
        forms: [
          {
            label: t('LINEAR COLOR SCHEME'),
            name: 'linear_color_scheme',
            status: 'select',
            options: chartFormsOption.linear_color_scheme,
          },
          {
            label: t('XSCALE INTERVAL'),
            name: 'xscale_interval',
            status: 'select',
            options: chartFormsOption.xscale_interval,
          },
          {
            label: t('YSCALE INTERVAL'),
            name: 'yscale_interval',
            status: 'select',
            options: chartFormsOption.yscale_interval,
          },
          {
            label: t('RENDERING'),
            name: 'canvas_image_rendering',
            popper: t(
              'image-rendering CSS attribute of the canvas object that defines how the browser scales up the image',
            ),
            status: 'select',
            options: chartFormsOption.canvas_image_rendering,
          },
          {
            label: t('NORMALIZE ACROSS'),
            name: 'normalize_across',
            popper: t(
              'Color will be shaded based the normalized (0% to 100%) value of a given cell against the other cells in the selected range:',
            ),
            status: 'select',
            options: chartFormsOption.normalize_across,
          },
          {
            label: t('LEFT MARGIN'),
            name: 'left_margin',
            popper: t(
              'Left margin, in pixels, allowing for more room for axis labels',
            ),
            status: 'select',
            options: chartFormsOption.left_margin,
          },
          {
            label: t('BOTTOM MARGIN'),
            name: 'bottom_margin',
            popper: t(
              'Bottom margin, in pixels, allowing for more room for axis labels',
            ),
            status: 'select',
            options: chartFormsOption.bottom_margin,
          },
          {
            label: t('VALUE BOUNDS'),
            name: 'y_axis_bounds',
            popper: t(
              'Hard value bounds applied for color coding. Is only relevant and applied when the normalization is applied against the whole heatmap.',
            ),
            status: 'two-input',
            values: [
              {
                name: 'min',
                placeholder: t('Min'),
                number: true,
              },
              {
                name: 'max',
                placeholder: t('Max'),
                number: true,
              },
            ],
          },
          {
            label: t('VALUE FORMAT'),
            name: 'y_axis_format',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            status: 'select',
            options: chartFormsOption.y_axis_format,
          },
          {
            label: t('TIME FORMAT'),
            name: 'time_format',
            popper: t(
              'D3 time format syntax: https://github.com/d3/d3-time-format.',
            ),
            status: 'select',
            options: chartFormsOption.time_format,
          },
          {
            label: t('CURRENCY FORMAT'),
            name: 'currency_format',
            status: 'two-select',
            values: [
              {
                name: 'symbolPosition',
                placeholder: t('Prefix or suffix'),
                options: chartFormsOption.currency_format.symbolPosition,
              },
              {
                name: 'symbol',
                placeholder: t('Currency'),
                options: chartFormsOption.currency_format.symbol,
              },
            ],
          },
          {
            label: t('SORT X AXIS'),
            name: 'sort_x_axis',
            status: 'select',
            options: chartFormsOption.sort_x_axis,
          },
          {
            label: t('SORT Y AXIS'),
            name: 'sort_y_axis',
            status: 'select',
            options: chartFormsOption.sort_y_axis,
          },
          {
            label: t('LEGEND'),
            name: 'show_legend',
            status: 'checkbox',
          },
          {
            label: t('SHOW PERCENTAGE'),
            name: 'show_perc',
            status: 'checkbox',
          },
          {
            label: t('SHOW VALUES'),
            name: 'show_values',
            status: 'checkbox',
          },
          {
            label: t('NORMALIZED'),
            name: 'normalized',
            status: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'gauge_chart',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          formDimensions,
          formMetric,
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
  {
    chart_name: 'waterfall',
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
            label: t('BREAKDOWNS'),
            name: 'groupby',
            popper: t(
              '"Breaks down the series by the category specified in this control. This can help viewers understand how each category affects the overall value.',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          formMetric,
          formFilters,
          formRowLimit,
        ],
      },
    ],
  },
  {
    chart_name: 'big_number',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'query',
        forms: [
          {
            label: t('TEMPORAL X-AXIS'),
            name: 'x_axis',
            popper: t('Dimension to use on x-axis.'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'metric',
            simpleType: 'temporal',
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
          formMetric,
          formFilters,
        ],
      },
      {
        collapse_label: t('Options'),
        collapse_active: 'options',
        forms: [
          {
            label: t('COMPARISON PERIOD LAG'),
            name: 'compare_lag',
            popper: t(
              'Based on granularity, number of time periods to compare against',
            ),
            status: 'input',
            number: true,
          },
          {
            label: t('COMPARISON SUFFIX'),
            name: 'compare_suffix',
            popper: t('Suffix to apply after the percentage display'),
            status: 'input',
          },
          {
            label: t('SHOW TIMESTAMP'),
            name: 'show_timestamp',
            status: 'checkbox',
            popper: 'Whether to display the timestamp',
          },
          {
            label: t('SHOW TREND LINE'),
            name: 'show_trend_line',
            status: 'checkbox',
            popper: 'Whether to display the trend line',
          },
          {
            label: t('START Y-AXIS AT 0'),
            name: 'start_y_axis_at_zero',
            status: 'checkbox',
            popper:
              'Start y-axis at zero. Uncheck to start y-axis at minimum value in the data.',
          },
        ],
      },
      {
        collapse_label: t('Advanced Analytics'),
        collapse_active: 'advancedAnalytics',
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
            label: t('PERIODS'),
            name: 'rolling_periods',
            popper: t(
              'Defines the size of the rolling window function, relative to the time granularity selected',
            ),
            status: 'input',
            number: true,
          },
          {
            label: t('MIN PERIODS'),
            name: 'min_periods',
            popper: t(
              'The minimum number of rolling periods required to show a value. For instance if you do a cumulative sum on 7 days you may want your "Min Period" to be 7, so that all data points shown are the total of 7 periods. This will hide the "ramp up" taking place over the first 7 periods',
            ),
            status: 'input',
            number: true,
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
    ],
  },
];

export default DvtChartData;
