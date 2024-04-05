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
        collapse_label: t('Options'),
        collapse_active: 'options',
        forms: [
          {
            label: t('TIMESTAMP FORMAT'),
            name: 'table_timestamp_format',
            status: 'input-drop',
            popper: t('D3 time format for datetime columns'),
            options: [],
          },
          {
            label: t('PAGE LENGTH'),
            name: 'page_length',
            status: 'input-drop',
            popper: t('Rows per page, 0 means no pagination'),
            options: chartFormsOption.page_length,
          },
          {
            label: t('SEARCH BOX'),
            name: '', // cannot find.
            status: 'checkbox',
          },
          {
            label: t('CELL BARS'),
            name: 'show_cell_bars',
            status: 'checkbox',
            popper: t(
              'Whether to display a bar chart background in table columns',
            ),
          },
          {
            label: t('ALIGN +/-'),
            name: 'align_pn',
            status: 'checkbox',
            popper: t(
              'Whether to align background charts with both positive and negative values at 0',
            ),
          },
          {
            label: t('COLOR +/-'),
            name: 'color_pn',
            status: 'checkbox',
            popper: t(
              'Whether to colorize numeric values by whether they are positive or negative',
            ),
          },
          {
            label: t('ALLOW COLUMNS TO BE REARRANGED'),
            name: 'allow_rearrange_columns',
            status: 'checkbox',
            popper: t(
              "Allow end user to drag-and-drop column headers to rearrange them. Note their changes won't persist for the next time they open the chart.",
            ),
          },
        ],
      },
    ],
  },
  {
    chart_name: 'big_number_total',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('BIG NUMBER FONT SIZE'),
            name: 'header_font_size',
            status: 'input-drop',
            popper: t('Changing this control takes effect instantly'),
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            options: chartFormsOption.header_font_size,
          },
          {
            label: t('SUBHEADER FONT SIZE'),
            name: 'subheader_font_size',
            popper: t('Changing this control takes effect instantly'),
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
          },
          {
            label: t('NUMBER FORMAT'),
            name: 'number_format',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t(
              'D3 format syntax: https://github.com/d3/d3-format Only applies when "Label Type" is set to show values.',
            ),
            options: [],
          },
          {
            label: t('DATE FORMAT'),
            name: 'time_format',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            options: [],
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
            label: t('FORCE DATE FORMAT'),
            name: 'force_timestamp_formatting',
            status: 'checkbox',
            popper: t(
              'Use date formatting even when metric value is not a timestamp',
            ),
          },
          // need to Conditional Formatting
        ],
      },
    ],
  },
  {
    chart_name: 'pie',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_popper_error: t('This section contains validation errors'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('COLOR SCHEME'),
            name: 'color_scheme',
            status: 'color',
            popper: t('The color scheme for rendering chart'),
          },
          {
            label: t('PERCENTAGE THRESHOLD'),
            name: 'show_labels_threshold',
            status: 'input',
            number: true,
            popper: t(
              'Minimum threshold in percentage points for showing labels.',
            ),
          },
          {
            label: t('SHOW LEGEND'),
            name: 'show_legend',
            status: 'checkbox',
            popper: t('Whether to display a legend for the chart'),
          },
          {
            label: t('LABEL TYPE'),
            name: 'label_type',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t('What should be shown on the label?'),
            options: chartFormsOption.label_type,
          },
          {
            label: t('NUMBER FORMAT'),
            name: 'number_format',
            status: 'input-drop',
            multiple: false,
            type: 'normal',
            savedType: 'expressions',
            popper: t(
              'D3 format syntax: https://github.com/d3/d3-format Only applies when "Label Type" is set to show values.',
            ),
            options: [],
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
            label: t('PUT LABELS OUTSIDE'),
            name: 'labels_outside',
            status: 'checkbox',
            popper: t('Put the labels outside of the pie?'),
          },
          {
            label: t('LABEL LINE'),
            name: 'label_line',
            status: 'checkbox',
            popper: t('Draw line from Pie to label when labels outside?'),
          },
          {
            label: t('SHOW TOTAL'),
            name: 'show_total',
            status: 'checkbox',
            popper: t('Whether to display the aggregate count.'),
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
          {
            label: t('DONUT'),
            name: 'donut',
            status: 'checkbox',
            popper: t('Do you want a donut or a pie?'),
          },
          {
            label: t('INNER RADIUS'),
            name: 'innerRadius',
            status: 'range',
            rangeConfig: {
              min: 0,
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
