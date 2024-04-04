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
  simpleType?: 'normal' | 'datasoruce';
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

interface DvtChartCustomizeProps {
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
    collapse_label: t('Chart Title'),
    collapse_active: 'chart_title',
    forms: [
      {
        label: t('X-AXIS'),
        name: 'x_axis',
        popper: t('Dimension to use on x-axis.'),
        status: 'input',
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

const DvtChartCustomize: DvtChartCustomizeProps[] = [
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
          {
            label: t('SORT BY METRIC'),
            name: 'sort_by_metric',
            status: 'checkbox',
          },
          {
            label: t('OUTER RADIUS'),
            name: 'outerRadius',
            status: 'range',
            rangeConfig: {
              min: 10,
              max: 100,
              step: 1,
            },
          },
        ],
      },
    ],
  },
  {
    chart_name: 'bubble_v2',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('COLOR SCHEME'),
            name: 'color_scheme',
            popper: t('The color scheme for rendering chart.'),
            status: 'color',
          },
          {
            label: t('SHOW LEGEND'),
            name: 'show_legend',
            popper: t('Whether to display a legend for the chart'),
            status: 'checkbox',
          },
          {
            label: t('TYPE'),
            name: 'legendType',
            popper: t('Legent type'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('ORIENTATION'),
            name: 'legendOrientation',
            popper: t('Legent orientation'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('MARGIN'),
            name: 'legendMargin',
            popper: t('Additional padding for legend'),
            status: 'input',
            number: true,
          },
          {
            label: t('MAX BUBBLE SIZE'),
            name: 'max_bubble_size',
            popper: t('Changing this control takes effect instantly'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('BUBBLE SIZE NUMBER FORMAT'),
            name: 'max_bubble_size',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('BUBBLE OPACITY'),
            name: 'opacity',
            popper: t(
              'Opacity of bubbles, 0 means completely transparent, 1 means opaque',
            ),
            status: 'range',
          },
          {
            label: t('X AXIS TITLE'),
            name: 'x_axis_label',
            popper: t('Changing this control takes effect instantly'),
            status: 'input',
          },
          // {
          //   label: t('ROTATE X AXIS LABEL'),
          //   name: 'xAxisLabelRotation',
          //   popper: t('Input field supports custom rotation. e.g. 30 for 30°'),
          //   status: 'input-drop',
          //   multiple: false,
          //   type: 'normal',
          //   savedType: 'expressions',
          // },
          // {
          //   label: t('X AXIS TITLE MARGIN'),
          //   name: 'x_axis_title_margin',
          //   popper: t('Changing this control takes effect instantly'),
          //   status: 'input-drop',
          //   multiple: false,
          //   type: 'normal',
          //   savedType: 'expressions',
          // },
          // {
          //   label: t('X AXIS FORMAT'),
          //   name: 'xAxisFormat',
          //   popper: t('D3 format syntax: https://github.com/d3/d3-format'),
          //   status: 'input-drop',
          //   multiple: false,
          //   type: 'normal',
          //   savedType: 'expressions',
          // },
          // {
          //   label: t('LOGARITHMIC X-AXIS'),
          //   name: 'logXAxis',
          //   popper: t('Logarithmic x-axis'),
          //   status: 'input-drop',
          //   multiple: false,
          //   type: 'normal',
          //   savedType: 'expressions',
          // },
          {
            label: t('Y AXIS TITLE'),
            name: 'y_axis_label',
            popper: t('Changing this control takes effect instantly'),
            status: 'input',
          },
          {
            label: t('ROTATE Y AXIS LABEL'),
            name: 'yAxisLabelRotation',
            popper: t('Changing this control takes effect instantly'),
            status: 'select',
            options: chartFormsOption.yAxisLabelRotation,
          },
          // {
          //   label: t('Y AXIS FORMAT'),
          //   name: 'y_axis_format',
          //   popper: t('Changing this control takes effect instantly'),
          //   status: 'input-drop',
          //   multiple: false,
          //   type: 'normal',
          //   savedType: 'expressions',
          // },
          {
            label: t('LOGARITHMIC Y-AXIS'),
            name: 'logYAxis',
            popper: t('Logarithmic y-axis'),
            status: 'checkbox',
          },
          {
            label: t('TRUNCATE X AXIS'),
            name: 'truncateXAxis',
            popper: t(
              'Truncate X Axis. Can be overridden by specifying a min or max bound. Only applicable for numercal X axis.',
            ),
            status: 'checkbox',
          },
          {
            label: t('TRUNCATE X AXIS'),
            name: 'truncateXAxis',
            popper: t(
              'Truncate X Axis. Can be overridden by specifying a min or max bound. Only applicable for numercal X axis.',
            ),
            status: 'checkbox',
          },
          {
            label: t('X AXIS BOUNDS'),
            name: 'xAxisBounds',
            popper: t(
              "Bounds for numerical X axis. Not applicable for temporal or categorical axes. When left empty, the bounds are dynamically defined based on the min/max of the data. Note that this feature will only expand the axis range. It won't narrow the data's extent.",
            ),
            status: 'two-input',
            values: [
              {
                placeholder: t('MIN'),
                number: true,
                name: 'min',
              },
              {
                placeholder: t('MAX'),
                number: true,
                name: 'max',
              },
            ],
          },
          {
            label: t('TRUNCATE Y AXIS'),
            name: 'truncateYAxis',
            popper: t(
              'Truncate Y Axis. Can be overridden by specifying a min or max bound.',
            ),
            status: 'checkbox',
          },
          {
            label: t('Y AXIS BOUNDS'),
            name: 'xAxisBounds',
            popper: t(
              "Bounds for the Y-axis. When left empty, the bounds are dynamically defined based on the min/max of the data. Note that this feature will only expand the axis range. It won't narrow the data's extent.",
            ),
            status: 'two-input',
            values: [
              {
                placeholder: t('MIN'),
                number: true,
                name: 'min',
              },
              {
                placeholder: t('MAX'),
                number: true,
                name: 'max',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    chart_name: 'histogram',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('COLOR SCHEME'),
            name: 'color_scheme',
            popper: t('The color scheme for rendering chart'),
            status: 'color',
          },
          {
            label: t('NO OF BINS'),
            name: 'link_length',
            popper: t('Select the number of bins for the histogram'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('X AXIS LABEL'),
            name: 'x_axis_label',
            popper: t('Changing this control takes effect instantly.'),
            status: 'input',
          },
          {
            label: t('Y AXIS LABEL'),
            name: 'y_axis_label',
            popper: t('Changing this control takes effect instantly.'),
            status: 'input',
          },
          {
            label: t('LEGEND'),
            name: 'show_legend',
            popper: t('Whether to display the legend (toggles)'),
            status: 'checkbox',
          },
          {
            label: t('NORMALIZED'),
            name: 'normalized',
            popper: t('Whether to normalize the histogram'),
            status: 'checkbox',
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
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        collapse_popper_error: t('This section contains validation errors'),
        forms: [
          formDimensions,
          formMetric,
          formFilters,
          formRowLimit,
          {
            label: t('COLOR SCHEME'),
            name: 'color_scheme',
            status: 'color',
          },
          {
            label: t('SHOW LEGEND'),
            name: 'show_legend',
            status: 'checkbox',
            popper: t('Whether to display a legend for the chart'),
          },
          {
            label: t('ORIENTATION'),
            name: 'legendOrientation',
            status: 'input-drop',
            popper: t('Legend Orientation'),
          },
          {
            label: t('MARGIN'),
            name: 'legendMargin',
            status: 'input',
            popper: t('Additional padding for legend.'),
            popperError: t('is expected to be an integer'),
          },
          {
            label: t('NUMBER FORMAT'),
            name: 'number_format',
            status: 'input-drop',
            popper: t(
              'D3 format syntax: https://github.com/d3/d3-format Only applies when "Label Type" is set to show values.',
            ),
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('TOOLTIP CONTENTS'),
            name: 'tooltip_label_type',
            status: 'input-drop',
            popper: t('What should be shown as the tooltip label'),
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('LABEL CONTENTS'),
            name: 'label_type',
            status: 'input-drop',
            popper: t('What should be shown as the label'),
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
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
            label: t('SHOW LABELS'),
            name: 'show_labels',
            status: 'checkbox',
            popper: t('Whether to display the labels.'),
          },
          {
            label: t('SHOW TOOLTIP LABELS'),
            name: 'show_tooltip_labels',
            status: 'checkbox',
            popper: t('Whether to display the tooltip labels'),
          },
        ],
      },
    ],
  },
  // {
  //   chart_name: 'heatmap',
  //   collapses: [
  //     {
  //       collapse_label: t('Query'),
  //       collapse_popper_error: t('This section contains validation errors'),
  //       collapse_active: 'query',
  //       forms: [
  //         {
  //           label: t('X AXIS'),
  //           name: 'all_columns_x',
  //           popper: t('Columns to display'),
  //           popperError: t('cannot be empty'),
  //           status: 'input-drop',
  //           multiple: false,
  //           type: 'normal',
  //           savedType: 'expressions',
  //         },
  //         {
  //           label: t('Y AXIS'),
  //           name: 'all_columns_y',
  //           popper: t('Columns to display'),
  //           popperError: t('cannot be empty'),
  //           status: 'input-drop',
  //           multiple: false,
  //           type: 'normal',
  //           savedType: 'expressions',
  //         },
  //         formMetric,
  //         formFilters,
  //         formRowLimit,
  //         {
  //           label: t('SORT BY METRIC'),
  //           name: 'sort_by_metric',
  //           status: 'checkbox',
  //         },
  //       ],
  //     },
  //     {
  //       collapse_label: t('Heatmap Options'),
  //       collapse_active: 'heatmap_options',
  //       forms: [
  //         {
  //           label: t('LINEAR COLOR SCHEME'),
  //           name: 'linear_color_scheme',
  //           status: 'select',
  //           options: chartFormsOption.linear_color_scheme,
  //         },
  //         {
  //           label: t('XSCALE INTERVAL'),
  //           name: 'xscale_interval',
  //           status: 'select',
  //           options: chartFormsOption.xscale_interval,
  //         },
  //         {
  //           label: t('YSCALE INTERVAL'),
  //           name: 'yscale_interval',
  //           status: 'select',
  //           options: chartFormsOption.yscale_interval,
  //         },
  //         {
  //           label: t('RENDERING'),
  //           name: 'canvas_image_rendering',
  //           popper: t(
  //             'image-rendering CSS attribute of the canvas object that defines how the browser scales up the image',
  //           ),
  //           status: 'select',
  //           options: chartFormsOption.canvas_image_rendering,
  //         },
  //         {
  //           label: t('NORMALIZE ACROSS'),
  //           name: 'normalize_across',
  //           popper: t(
  //             'Color will be shaded based the normalized (0% to 100%) value of a given cell against the other cells in the selected range:',
  //           ),
  //           status: 'select',
  //           options: chartFormsOption.normalize_across,
  //         },
  //         {
  //           label: t('LEFT MARGIN'),
  //           name: 'left_margin',
  //           popper: t(
  //             'Left margin, in pixels, allowing for more room for axis labels',
  //           ),
  //           status: 'select',
  //           options: chartFormsOption.left_margin,
  //         },
  //         {
  //           label: t('BOTTOM MARGIN'),
  //           name: 'bottom_margin',
  //           popper: t(
  //             'Bottom margin, in pixels, allowing for more room for axis labels',
  //           ),
  //           status: 'select',
  //           options: chartFormsOption.bottom_margin,
  //         },
  //         {
  //           label: t('VALUE BOUNDS'),
  //           name: 'y_axis_bounds',
  //           popper: t(
  //             'Hard value bounds applied for color coding. Is only relevant and applied when the normalization is applied against the whole heatmap.',
  //           ),
  //           status: 'two-input',
  //           values: [
  //             {
  //               name: 'min',
  //               placeholder: t('Min'),
  //               number: true,
  //             },
  //             {
  //               name: 'max',
  //               placeholder: t('Max'),
  //               number: true,
  //             },
  //           ],
  //         },
  //         {
  //           label: t('VALUE FORMAT'),
  //           name: 'y_axis_format',
  //           popper: t('D3 format syntax: https://github.com/d3/d3-format'),
  //           status: 'select',
  //           options: chartFormsOption.y_axis_format,
  //         },
  //         {
  //           label: t('TIME FORMAT'),
  //           name: 'time_format',
  //           popper: t(
  //             'D3 time format syntax: https://github.com/d3/d3-time-format.',
  //           ),
  //           status: 'select',
  //           options: chartFormsOption.time_format,
  //         },
  //         {
  //           label: t('CURRENCY FORMAT'),
  //           name: 'currency_format',
  //           status: 'two-select',
  //           values: [
  //             {
  //               name: 'symbolPosition',
  //               placeholder: t('Prefix or suffix'),
  //               options: chartFormsOption.currency_format.symbolPosition,
  //             },
  //             {
  //               name: 'symbol',
  //               placeholder: t('Currency'),
  //               options: chartFormsOption.currency_format.symbol,
  //             },
  //           ],
  //         },
  //         {
  //           label: t('SORT X AXIS'),
  //           name: 'sort_x_axis',
  //           status: 'select',
  //           options: chartFormsOption.sort_x_axis,
  //         },
  //         {
  //           label: t('SORT Y AXIS'),
  //           name: 'sort_y_axis',
  //           status: 'select',
  //           options: chartFormsOption.sort_y_axis,
  //         },
  //         {
  //           label: t('LEGEND'),
  //           name: 'show_legend',
  //           status: 'checkbox',
  //         },
  //         {
  //           label: t('SHOW PERCENTAGE'),
  //           name: 'show_perc',
  //           status: 'checkbox',
  //         },
  //         {
  //           label: t('SHOW VALUES'),
  //           name: 'show_values',
  //           status: 'checkbox',
  //         },
  //         {
  //           label: t('NORMALIZED'),
  //           name: 'normalized',
  //           status: 'checkbox',
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    chart_name: 'gauge_chart',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('MIN'),
            name: 'min_val',
            popper: t('Minimum value on the gauge axis'),
            popperError: t('is expected to be an integer'),
            status: 'input',
          },
          {
            label: t('MAX'),
            name: 'max_val',
            popper: t('Minimum value on the gauge axis'),
            popperError: t('is expected to be an integer'),
            status: 'input',
          },
          {
            label: t('START ANGLE'),
            name: 'start_angle',
            popper: t('Angle at which to start progress axis'),
            status: 'input',
          },
          {
            label: t('END ANGLE'),
            name: 'end_angle',
            popper: t('Angle at which to end progress axis'),
            status: 'input',
          },
          {
            label: t('COLOR SCHEME'),
            name: 'color_scheme',
            popper: t('The color scheme for rendering chart'),
            status: 'color',
          },
          {
            label: t('FONT SIZE'),
            name: 'font_size',
            popper: t(
              'Font size for axis labels, detail value and other text elements',
            ),
            status: 'range',
          },
          {
            label: t('NUMBER FORMAT'),
            name: 'font_size',
            popper: t(
              'Font size for axis labels, detail value and other text elements',
            ),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
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
            label: t('VALUE FORMAT'),
            name: 'value_formatter',
            popper: t(
              'Additional text to add before or after the value, e.g. unit',
            ),
            status: 'input',
          },
          {
            label: t('SHOW POINTER'),
            name: 'show_pointer',
            status: 'checkbox',
            popper: t('Whether to show the pointer'),
          },
          {
            label: t('ANIMATION'),
            name: 'animation',
            status: 'checkbox',
            popper: t(
              'Whether to animate the progress and the value or just display them',
            ),
          },
          {
            label: t('SHOW AXIS LINE TICKS'),
            name: 'show_axis_tick',
            status: 'checkbox',
            popper: t('Whether to show minor ticks on the axis'),
          },
          {
            label: t('SHOW SPLIT LINES'),
            name: 'show_split_line',
            status: 'checkbox',
            popper: t('Whether to show the split lines on the axis'),
          },
          {
            label: t('SPLIT NUMBER'),
            name: 'split_number',
            status: 'range',
            popper: t('Number of split segments on the axis'),
          },
          {
            label: t('SHOW PROGRESS'),
            name: 'show_progress',
            status: 'checkbox',
            popper: t('Whether to show the progress of gauge chart'),
          },
          {
            label: t('OVERLAP'),
            name: 'overlap',
            status: 'checkbox',
            popper: t(
              'Whether the progress bar overlaps when there are multiple groups of data',
            ),
          },
          {
            label: t('ROUND CAP'),
            name: 'round_cap',
            status: 'checkbox',
            popper: t('Style the ends of the progress bar with a round cap'),
          },
          {
            label: t('INTERVAL BOUNDS'),
            name: 'intervals',
            popper: t(
              'Comma-separated interval bounds, e.g. 2,4,5 for intervals 0-2, 2-4 and 4-5. Last number should match the value provided for MAX.',
            ),
            status: 'input',
          },
          {
            label: t('INTERVAL COLORS'),
            name: 'interval_color_indices',
            popper: t(
              'Comma-separated color picks for the intervals, e.g. 1,2,4. Integers denote colors from the chosen color scheme and are 1-indexed. Length must be matching that of interval bounds.',
            ),
            status: 'input',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'waterfall',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('SHOW VALUE'),
            name: 'show_value',
            popper: t('Show series values on the chart'),
            status: 'checkbox',
          },
          {
            label: t('SHOW LEGEND'),
            name: 'show_legend',
            popper: t('Whether to display a legend for the chart'),
            status: 'checkbox',
          },
          {
            label: t('INCREASE'),
            name: 'increase_color',
            status: 'color',
            popper: t('Changing this color takes effect instantly'),
          },
          {
            label: t('DECREASE'),
            name: 'decrease_color',
            status: 'color',
            popper: t('Changing this color takes effect instantly'),
          },
          {
            label: t('TOTAL'),
            name: 'total_color',
            status: 'color',
            popper: t('Changing this color takes effect instantly'),
          },
          {
            label: t('X AXIS LABEL'),
            name: 'x_axis_label',
            status: 'input',
            popper: t('Changing this control takes effect instantly'),
          },
          {
            label: t('TIME FORMAT'),
            name: 'x_axis_time_format',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t('x_axis_time_format'),
          },
          {
            label: t('X TICK LAYOUT'),
            name: 'x_ticks_layout',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t('The way the ticks are laid out on the X-axis'),
          },

          {
            label: t('Y AXIS LABEL'),
            name: 'y_axis_label',
            status: 'input',
            popper: t('Changing this control takes effect instantly'),
          },
          {
            label: t('Y AXIS FORMAT'),
            name: 'y_axis_format',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            options: chartFormsOption.y_axis_format,
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

          formMetric,
          formFilters,
          formRowLimit,
        ],
      },
    ],
  },
];

export default DvtChartCustomize;
