import { t } from '@superset-ui/core';
import { chartFormsOption } from './dvtChartDataOptions';

interface OptionsData {
  label: string;
  value: any;
}

interface OptionsDataColor {
  id: string;
  label: any;
  colors: string[];
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
    | 'color-select'
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
  optionsColor?: OptionsDataColor[];
  number?: boolean;
  values?: ValuesProps[];
  rangeConfig?: RangeConfigProps;
  onShowClear?: boolean;
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

const formTimeGrain: FormsProps = {
  label: t('TIME GRAIN'),
  name: 'time_grain_sqla',
  popper: t(
    'Select a time grain for the visualization. The grain is the time interval represented by a single point on the chart.',
  ),
  placeholder: t('None'),
  status: 'select',
  options: chartFormsOption.time_grain_sqla,
};

const formSortByMetric: FormsProps = {
  label: t('SORT BY METRIC'),
  name: 'sort_by_metric',
  status: 'checkbox',
};

const formRule: FormsProps = {
  label: t('RULE'),
  name: 'resample_rule',
  popper: t('Pandas resample rule'),
  placeholder: t('Select ...'),
  status: 'select',
  options: chartFormsOption.resample_rule,
  onShowClear: true,
};

const formFillMethod: FormsProps = {
  label: t('FILL METHOD'),
  name: 'resample_method',
  popper: t('Pandas resample method'),
  placeholder: t('Select ...'),
  status: 'select',
  options: chartFormsOption.resample_method,
  onShowClear: true,
};

const formSeriesLimit: FormsProps = {
  label: t('SERIES LIMIT'),
  name: 'series_limit',
  popper: t(
    'Limits the number of series that get displayed. A joined subquery (or an extra phase where subqueries are not supported) is applied to limit the number of series that get fetched and rendered. This feature is useful when grouping by high cardinality column(s) though does increase the query complexity and cost.',
  ),
  placeholder: t('None'),
  status: 'select',
  options: chartFormsOption.limit,
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
      formTimeGrain,
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
      formRule,
      formFillMethod,
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
          formSortByMetric,
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
          formSortByMetric,
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
          formSortByMetric,
        ],
      },
      {
        collapse_label: t('Heatmap Options'),
        collapse_active: 'heatmap_options',
        forms: [
          {
            label: t('LINEAR COLOR SCHEME'),
            name: 'linear_color_scheme',
            status: 'color-select',
            optionsColor: chartFormsOption.linear_color_scheme,
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
          formSortByMetric,
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
          formTimeGrain,
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
          formRule,
          formFillMethod,
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_timeseries_scatter',
    collapses: lineAndBarChart,
  },
  {
    chart_name: 'pivot_table_v2',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        forms: [
          {
            label: t('COLUMNS'),
            name: 'groupbyColumns',
            popper: t('Columns to group by on the columns'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('ROWS'),
            name: 'groupbyRows',
            popper: t('Columns to group by on the rows'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          formTimeGrain,
          formMetrics,
          {
            label: t('APPLY METRICS ON'),
            name: 'metricsLayout',
            status: 'tabs',
            options: [
              { label: t('COLUMNS'), value: 'COLUMNS' },
              { label: t('ROWS'), value: 'ROWS' },
            ],
          },
          formFilters,
          formSeriesLimit,
          {
            label: t('CELL LIMIT'),
            name: 'row_limit',
            popper: t('Limits the number of cells that get retrieved.'),
            status: 'select',
            options: chartFormsOption.row_limit,
          },
          formSortBy,
          {
            label: t('SORT DESCENDING'),
            name: 'order_desc',
            status: 'checkbox',
          },
        ],
      },
      {
        collapse_label: t('Options'),
        collapse_active: 'options',
        forms: [
          {
            label: t('AGGREGATION FUNCTION'),
            name: 'aggregateFunction',
            popper: t(
              'Aggregate function to apply when pivoting and computing the total rows and columns',
            ),
            status: 'select',
            options: chartFormsOption.aggregateFunction,
          },
          {
            label: t('SHOW ROWS TOTAL'),
            name: 'rowTotals',
            status: 'checkbox',
          },
          {
            label: t('SHOW ROWS SUBTOTAL'),
            name: 'rowSubTotals',
            status: 'checkbox',
          },
          {
            label: t('SHOW COLUMNS TOTAL'),
            name: 'colTotals',
            status: 'checkbox',
          },
          {
            label: t('SHOW COLUMNS SUBTOTAL'),
            name: 'colSubTotals',
            status: 'checkbox',
          },
          {
            label: t('TRANSPOSE PIVOT'),
            name: 'transposePivot',
            status: 'checkbox',
          },
          {
            label: t('COMBINE METRICS'),
            name: 'combineMetric',
            status: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'dist_bar',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        forms: [
          formMetrics,
          formFilters,
          {
            label: t('DIMENSIONS'),
            name: 'groupby',
            popper: t(
              'Dimensions contain qualitative values such as names, dates, or geographical data. Use dimensions to categorize, segment, and reveal the details in your data. Dimensions affect the level of detail in the view.',
            ),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('BREAKDOWNS'),
            name: 'columns',
            popper: t('Defines how each series is broken down'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          formRowLimit,
          formSortBy,
          {
            label: t('SORT DESCENDING'),
            name: 'order_desc',
            status: 'checkbox',
          },
          {
            label: t('CONTRIBUTION'),
            name: 'contribution',
            status: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'world_map',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        forms: [
          {
            label: t('COUNTRY COLUMN'),
            name: 'entity',
            popper: t('3 letter code of the country'),
            popperError: t('cannot be empty'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('COUNTRY FIELD TYPE'),
            name: 'country_fieldtype',
            popper: t(
              'The country code standard that Superset should expect to find in the [country] column',
            ),
            status: 'select',
            options: chartFormsOption.country_fieldtype,
          },
          formMetric,
          formFilters,
          formRowLimit,
          formSortByMetric,
        ],
      },
      {
        collapse_label: t('Options'),
        collapse_active: 'options',
        forms: [
          {
            label: t('SHOW BUBBLES'),
            name: 'show_bubbles',
            status: 'checkbox',
          },
          {
            label: t('BUBBLE SIZE'),
            name: 'secondary_metric',
            popper: t('Metric that defines the size of the bubble'),
            status: 'input-drop',
            multiple: false,
            type: 'aggregates',
            savedType: 'metric',
          },
          {
            label: t('MAX BUBBLE SIZE'),
            name: 'max_bubble_size',
            status: 'select',
            options: chartFormsOption.max_bubble_size,
          },
          {
            label: t('BUBBLE COLOR'),
            name: 'color_picker',
            status: 'color',
          },
          {
            label: t('COUNTRY COLOR SCHEME'),
            name: 'color_scheme',
            status: 'color-select',
            optionsColor: chartFormsOption.country_color_scheme,
          },
        ],
      },
    ],
  },
  {
    chart_name: 'mixed_timeseries',
    collapses: [
      {
        collapse_label: t('Shared query fields'),
        collapse_active: 'sharedQueryFields',
        collapse_popper_error: t('This section contains validation errors'),
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
        ],
      },
      {
        collapse_label: t('Query A'),
        collapse_active: 'queryA',
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          formMetrics,
          formDimensions,
          formFilters,
          formSeriesLimit,
          formSortBy,
          sortDescending,
          formRowLimit,
          {
            label: t('TRUNCATE METRIC'),
            name: 'truncate_metric',
            status: 'checkbox',
          },
        ],
      },
      {
        collapse_label: t('Advanced analytics Query A '),
        collapse_active: 'advancedA',
        collapse_popper: t(
          'This section contains options that allow for advanced analytical post processing of query results',
        ),
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
          formRule,
          formFillMethod,
        ],
      },
      {
        collapse_label: t('Query B'),
        collapse_active: 'queryB',
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          {
            label: t('METRICS'),
            name: 'metrics_b',
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
            name: 'groupby_b',
            popper: t(
              'Dimensions contain qualitative values such as names, dates, or geographical data. Use dimensions to categorize, segment, and reveal the details in your data. Dimensions affect the level of detail in the view.',
            ),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('FILTERS'),
            name: 'adhoc_filters_b',
            status: 'input-drop',
            multiple: true,
            type: 'filters',
          },
          {
            label: t('SERIES LIMIT'),
            name: 'series_limit_b',
            popper: t(
              'Limits the number of series that get displayed. A joined subquery (or an extra phase where subqueries are not supported) is applied to limit the number of series that get fetched and rendered. This feature is useful when grouping by high cardinality column(s) though does increase the query complexity and cost.',
            ),
            placeholder: t('None'),
            status: 'select',
            options: chartFormsOption.limit,
          },
          {
            label: t('SORT BY'),
            name: 'timeseries_limit_metric_b',
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
            name: 'order_desc_b',
            status: 'checkbox',
          },
          {
            label: t('ROW LIMIT'),
            name: 'row_limit_b',
            popper: t(
              'Limits the number of the rows that are computed in the query that is the source of the data used for this chart.',
            ),
            status: 'select',
            options: chartFormsOption.row_limit,
          },
          {
            label: t('TRUNCATE METRIC'),
            name: 'truncate_metric_b',
            status: 'checkbox',
          },
        ],
      },
      {
        collapse_label: t('Advanced analytics Query B '),
        collapse_active: 'advanced_b',
        collapse_popper: t(
          'This section contains options that allow for advanced analytical post processing of query results',
        ),
        forms: [
          {
            label: t('ROLLING FUNCTION'),
            name: 'rolling_type_b',
            popper: t(
              'Defines a rolling window function to apply, works along with the [Periods] text box',
            ),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.rolling_type,
          },
          {
            label: t('PERIODS'),
            name: 'rolling_periods_b',
            popper: t(
              'Defines the size of the rolling window function, relative to the time granularity selected',
            ),
            status: 'input',
            number: true,
          },
          {
            label: t('MIN PERIODS'),
            name: 'min_periods_b',
            popper: t(
              'The minimum number of rolling periods required to show a value. For instance if you do a cumulative sum on 7 days you may want your "Min Period" to be 7, so that all data points shown are the total of 7 periods. This will hide the "ramp up" taking place over the first 7 periods',
            ),
            status: 'input',
            number: true,
          },
          {
            label: t('TIME SHIFT'),
            name: 'time_compare_b',
            popper: t(
              'Overlay one or more timeseries from a relative time period. Expects relative time deltas in natural language (example: 24 hours, 7 days, 52 weeks, 365 days). Free text is supported.',
            ),
            placeholder: t('Select ...'),
            status: 'multiple-select',
            options: chartFormsOption.time_compare,
          },
          {
            label: t('CALCULATION TYPE'),
            name: 'comparison_type_b',
            popper: t(
              'How to display time shifts: as individual lines; as the difference between the main time series and each time shift; as the percentage change; or as the ratio between series and time shifts.',
            ),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.comparison_type,
          },
          {
            label: t('RULE'),
            name: 'resample_rule_b',
            popper: t('Pandas resample rule'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.resample_rule,
            onShowClear: true,
          },
          {
            label: t('FILL METHOD'),
            name: 'resample_method_b',
            popper: t('Pandas resample method'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.resample_method,
            onShowClear: true,
          },
        ],
      },
    ],
  },
  {
    chart_name: 'treemap_v2',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          formDimensions,
          formMetric,
          formRowLimit,
          formSortByMetric,
          formFilters,
        ],
      },
    ],
  },
  {
    chart_name: 'box_plot',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper: t('This section contains validation errors'),
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          {
            label: t('DISTRIBUTE ACROSS'),
            name: 'columns',
            popper: t('Columns to calculate distribution across.'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          formDimensions,
          formMetrics,
          formFilters,
          formSeriesLimit,
          formSortBy,
          {
            label: t('WHISKER/OUTLIER OPTIONS'),
            name: 'whiskerOptions',
            popper: t('Determines how whiskers and outliers are calculated.'),
            status: 'select',
            options: chartFormsOption.whiskerOptions,
          },
        ],
      },
    ],
  },
  {
    chart_name: 'graph_chart',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper: t('This section contains validation errors'),
        forms: [
          {
            label: t('SOURCE'),
            name: 'source',
            popper: t('Name of the source nodes'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          {
            label: t('TARGET'),
            name: 'target',
            popper: t('Name of the target nodes'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          formMetrics,
          {
            label: t('SOURCE CATEGORY'),
            name: 'source_category',
            popper: t(
              'The category of source nodes used to assign colors. If a node is associated with more than one category, only the first will be used.',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('TARGET CATEGORY'),
            name: 'target_category',
            popper: t('Category of target nodes'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          formFilters,
          formRowLimit,
        ],
      },
    ],
  },
  {
    chart_name: 'radar',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          formDimensions,
          formMetric,
          formSortBy,
          formFilters,
          formRowLimit,
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_timeseries_step',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper: t('This section contains validation errors'),
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
          formRule,
          formFillMethod,
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
    chart_name: 'tree_chart',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper: t('This section contains validation errors'),
        forms: [
          {
            label: t('ID'),
            name: 'id',
            popper: t('Name of the id column'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          {
            label: t('PARENT'),
            name: 'parent',
            popper: t(
              'Name of the column containing the id of the parent node',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          {
            label: t('NAME'),
            name: 'name',
            popper: t('Optional name of the data column.'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('ROOT NODE ID'),
            name: 'root_node_id',
            popper: t('Id of root node of the tree.'),
            status: 'input',
          },
          formFilters,
          formRowLimit,
        ],
      },
    ],
  },
  {
    chart_name: 'sunburst_v2',
    collapses: [
      {
        collapse_label: t('Query'),
        collapse_active: 'query',
        collapse_popper: t('This section contains validation errors'),
        collapse_popper_error: t('This section contains validation errors'),

        forms: [
          {
            label: t('HIERARCHY'),
            name: 'columns',
            popper: t('This defines the level of the hierarchy'),
            status: 'input-drop',
            multiple: true,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('PRIMARY METRIC'),
            name: 'metric',
            popper: t(
              'The primary metric is used to define the arc segment sizes',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popperError: t('cannot be empty'),
          },
          {
            label: t('SECONDARY METRIC'),
            name: 'secondary_metric',
            popper: t(
              '[optional] this secondary metric is used to define the color as a ratio against the primary metric. When omitted, the color is categorical and based on labels',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          formFilters,
          formRowLimit,
          formSortByMetric,
        ],
      },
    ],
  },
];

export default DvtChartData;
