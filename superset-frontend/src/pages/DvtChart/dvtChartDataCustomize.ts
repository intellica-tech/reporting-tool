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

const sortSeriesBy: FormsProps = {
  label: t('SORT SERIES BY'),
  name: 'sort_series_type',
  status: 'select',
  popper: t('Based on what should series be ordered on the chart and legend'),
  options: chartFormsOption.sort_series_type,
};

const sortSeriesAscending: FormsProps = {
  label: t('SORT SERIES ASCENDING'),
  name: 'sort_series_ascending',
  status: 'checkbox',
  popper: t('Sort series in ascending order'),
};

const colorScheme: FormsProps = {
  label: t('COLOR SCHEME'),
  popper: t('The color scheme for rendering chart'),
  name: 'color_scheme',
  status: 'color-select',
  optionsColor: chartFormsOption.color_scheme,
};

const seriesStyle: FormsProps = {
  label: t('SERIES STYLE'),
  name: 'seriesType',
  status: 'select',
  popper: t('Series chart type (line, bar etc)'),
  options: chartFormsOption.seriesType,
};

const showValue: FormsProps = {
  label: t('SHOW VALUE'),
  name: 'show_value',
  status: 'checkbox',
  popper: t('Show series values on the chart'),
};

const stackedStyle: FormsProps = {
  label: t('STACKED STYLE'),
  name: 'stack',
  status: 'select',
  popper: t('Stack series on top of each other'),
  options: chartFormsOption.stack,
};

const onlyTotal: FormsProps = {
  label: t('ONLY TOTAL'),
  name: 'only_total',
  status: 'checkbox',
  popper: t(
    'Only show the total value on the stacked chart, and not show on the selected category',
  ),
};

const percentageThreshold: FormsProps = {
  label: t('PERCENTAGE THRESHOLD'),
  name: 'percentage_threshold',
  status: 'input',
  popper: t('Minimum threshold in percentage points for showing labels.'),
  number: true,
};

const areaChart: FormsProps = {
  label: t('AREA CHART'),
  name: 'area',
  status: 'checkbox',
  popper: t('Draw area under curves. Only applicable for line types.'),
};

const areaChartOpacity: FormsProps = {
  label: t('AREA CHART OPACITY'),
  name: 'opacity',
  status: 'range',
  popper: t('Opacity of Area Chart. Also applies to confidence band.'),
  rangeConfig: {
    min: 0,
    max: 1,
    step: 0.1,
  },
};

const marker: FormsProps = {
  label: t('MARKER'),
  name: 'markerEnabled',
  status: 'checkbox',
  popper: t('Draw a marker on data points. Only applicable for line types.'),
};

const markerSize: FormsProps = {
  label: t('MARKER SIZE'),
  name: 'markerSize',
  status: 'range',
  popper: t('Size of marker. Also applies to forecast observations.'),
  rangeConfig: {
    min: 0,
    max: 20,
    step: 1,
  },
};

const extraControls: FormsProps = {
  label: t('EXTRA CONTROLS'),
  name: 'show_extra_controls',
  status: 'checkbox',
  popper: t(
    'Whether to show extra controls or not. Extra controls include things like making mulitBar charts stacked or side by side.',
  ),
};

const dataZoom: FormsProps = {
  label: t('DATA ZOOM'),
  name: 'zoomable',
  status: 'checkbox',
  popper: t('Enable data zooming controls'),
};

const minorTicks: FormsProps = {
  label: t('MINOR TICKS'),
  name: 'minorTicks',
  status: 'checkbox',
  popper: t('Show minor ticks on axes.'),
};

const showLegend: FormsProps = {
  label: t('SHOW LEGEND'),
  name: 'show_legend',
  status: 'checkbox',
  popper: t('Whether to display a legend for the chart'),
};

const type: FormsProps = {
  label: t('TYPE'),
  name: 'legendType',
  status: 'select',
  popper: t('Legend type'),
  options: chartFormsOption.legendType,
};

const orientation: FormsProps = {
  label: t('ORIENTATION'),
  name: 'legendOrientation',
  status: 'select',
  popper: t('Legend Orientation'),
  options: chartFormsOption.legendOrientation,
};

const margin: FormsProps = {
  label: t('MARGIN'),
  name: 'legendMargin',
  status: 'input',
  number: true,
  popper: t('Additional padding for legend.'),
};

const timeFormat: FormsProps = {
  label: t('TIME FORMAT'),
  name: 'x_axis_time_format',
  status: 'select',
  popper: t(
    'D3 time format syntax: https://github.com/d3/d3-time-format. When using other than adaptive formatting, labels may overlap',
  ),
  options: chartFormsOption.time_format,
};

const rotateXAxisLabel: FormsProps = {
  label: t('ROTATE X AXIS LABEL'),
  name: 'xAxisLabelRotation',
  status: 'select',
  popper: t('Input field supports custom rotation. e.g. 30 for 30°'),
  options: chartFormsOption.xAxisLabelRotation,
};

const richTooltip: FormsProps = {
  label: t('RICH TOOLTIP'),
  name: 'rich_tooltip',
  status: 'checkbox',
  popper: t('Shows a list of all series available at that point in time'),
};

const tooltipSortByMetric: FormsProps = {
  label: t('TOOLTIP SORT BY METRIC'),
  name: 'tooltipSortByMetric',
  status: 'checkbox',
  popper: t(
    'Whether to sort tooltip by the selected metric in descending order.',
  ),
};

const tooltipTimeFormat: FormsProps = {
  label: t('TOOLTIP TIME FORMAT'),
  name: 'tooltipTimeFormat',
  status: 'select',
  popper: t('D3 time format syntax: https://github.com/d3/d3-time-format'),
  options: chartFormsOption.time_format,
};

const forceDateFormat: FormsProps = {
  label: t('FORCE DATE FORMAT'),
  name: 'force_timestamp_formatting',
  status: 'checkbox',
  popper: t('Use date formatting even when metric value is not a timestamp'),
};

const yAxisFormat: FormsProps = {
  label: t('Y AXIS FORMAT'),
  name: 'y_axis_format',
  status: 'select',
  popper: t('D3 format syntax: https://github.com/d3/d3-format'),
  options: chartFormsOption.y_axis_format,
};

const currencyFormat: FormsProps = {
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
};

const logarithmicYAxis: FormsProps = {
  label: t('LOGARITHMIC Y-AXIS'),
  name: 'logAxis',
  status: 'checkbox',
  popper: t('Logarithmic y-axis'),
};

const minorSplitLine: FormsProps = {
  label: t('MINOR SPLIT LINE'),
  name: 'minorSplitLine',
  status: 'checkbox',
  popper: t('Draw split lines for minor y-axis ticks'),
};

const bigNumberFontSize: FormsProps = {
  label: t('BIG NUMBER FONT SIZE'),
  name: 'header_font_size',
  status: 'select',
  popper: t('Changing this control takes effect instantly'),
  options: chartFormsOption.header_font_size,
};

const subheaderFontSize: FormsProps = {
  label: t('SUBHEADER FONT SIZE'),
  name: 'subheader_font_size',
  popper: t('Changing this control takes effect instantly'),
  status: 'select',
  options: chartFormsOption.header_font_size,
};

const truncateXAxis: FormsProps = {
  label: t('TRUNCATE X AXIS'),
  name: 'truncateXAxis',
  status: 'checkbox',
  popper: t(
    'Truncate X Axis. Can be overridden by specifying a min or max bound. Only applicable for numercal X axis.',
  ),
};

const xAxisBounds: FormsProps = {
  label: t('X AXIS BOUNDS'),
  name: 'xAxisBounds',
  status: 'two-input',
  popper: t(
    "Bounds for numerical X axis. Not applicable for temporal or categorical axes. When left empty, the bounds are dynamically defined based on the min/max of the data. Note that this feature will only expand the axis range. It won't narrow the data's extent.",
  ),
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
};

const truncateYAxis: FormsProps = {
  label: t('TRUNCATE Y AXIS'),
  name: 'truncateYAxis',
  status: 'checkbox',
  popper: t(
    'Truncate Y Axis. Can be overridden by specifying a min or max bound.',
  ),
};

const yAxisBounds: FormsProps = {
  label: t('Y AXIS BOUNDS'),
  name: 'y_axis_bounds',
  status: 'two-input',
  popper: t(
    "Bounds for the Y-axis. When left empty, the bounds are dynamically defined based on the min/max of the data. Note that this feature will only expand the axis range. It won't narrow the data's extent.",
  ),
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
};

const numberFormat: FormsProps = {
  label: t('NUMBER FORMAT'),
  name: 'number_format',
  status: 'select',
  popper: t(
    'D3 format syntax: https://github.com/d3/d3-format Only applies when "Label Type" is set to show values.',
  ),
  options: chartFormsOption.y_axis_format,
};

const dateFormat: FormsProps = {
  label: t('DATE FORMAT'),
  name: 'time_format',
  status: 'select',
  popper: t('D3 format syntax: https://github.com/d3/d3-format'),
  options: chartFormsOption.time_format,
};

const showLabels: FormsProps = {
  label: t('SHOW LABELS'),
  name: 'show_labels',
  status: 'checkbox',
  popper: t('Whether to display the labels.'),
};

const xTickLayout: FormsProps = {
  label: t('X TICK LAYOUT'),
  name: 'x_ticks_layout',
  status: 'select',
  popper: t('The way the ticks are laid out on the X-axis'),
  options: [],
};

const legend: FormsProps = {
  label: t('LEGEND'),
  name: 'show_legend',
  popper: t('Whether to display the legend (toggles)'),
  status: 'checkbox',
};

const xAxisLabel: FormsProps = {
  label: t('X AXIS LABEL'),
  name: 'x_axis_label',
  popper: t('Changing this control takes effect instantly.'),
  status: 'input',
};

const yAxisLabel: FormsProps = {
  label: t('Y AXIS LABEL'),
  name: 'y_axis_label',
  popper: t('Changing this control takes effect instantly.'),
  status: 'input',
};

const xAxisTitle: FormsProps = {
  label: t('X AXIS TITLE'),
  name: 'x_axis_title',
  status: 'input',
  popper: t('Changing this control takes effect instantly'),
};

const xAxisTitleMargin: FormsProps = {
  label: t('X AXIS TITLE BOTTOM MARGIN'),
  name: 'x_axis_title_margin',
  status: 'select',
  popper: t('Changing this control takes effect instantly'),
  options: chartFormsOption.x_axis_title_margin,
};

const yAxisTitle: FormsProps = {
  label: t('Y AXIS TITLE'),
  name: 'y_axis_title',
  status: 'input',
  popper: t('Changing this control takes effect instantly'),
};

const yAxisTitleMargin: FormsProps = {
  label: t('Y AXIS TITLE MARGIN'),
  name: 'y_axis_title_margin',
  status: 'select',
  popper: t('Changing this control takes effect instantly'),
  options: chartFormsOption.y_axis_title_margin,
};

const roam: FormsProps = {
  label: t('ENABLE GRAPH ROAMING'),
  name: 'roam',
  popper: t('Whether to enable changing graph position and scaling.'),
  placeholder: t('Select ...'),
  status: 'select',
  options: chartFormsOption.roam,
};

const labelType: FormsProps = {
  label: t('LABEL TYPE'),
  name: 'label_type',
  status: 'select',
  popper: t('What should be shown on the label?'),
  options: chartFormsOption.label_types2,
};

const collapseChartTitle: CollapsesProps = {
  collapse_label: t('Chart Title'),
  collapse_active: 'chart_title',
  forms: [
    xAxisTitle,
    xAxisTitleMargin,
    yAxisTitle,
    yAxisTitleMargin,
    {
      label: t('Y AXIS TITLE POSITION'),
      name: 'y_axis_title_position',
      status: 'select',
      popper: t('Changing this control takes effect instantly'),
      options: chartFormsOption.y_axis_title_position,
    },
  ],
};

const DvtChartCustomize: DvtChartCustomizeProps[] = [
  {
    chart_name: 'echarts_timeseries_line',
    collapses: [
      collapseChartTitle,
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          sortSeriesBy,
          sortSeriesAscending,
          colorScheme,
          seriesStyle,
          showValue,
          stackedStyle,
          onlyTotal,
          percentageThreshold,
          areaChart,
          areaChartOpacity,
          marker,
          markerSize,
          dataZoom,
          minorTicks,
          showLegend,
          type,
          orientation,
          margin,
          timeFormat,
          rotateXAxisLabel,
          richTooltip,
          tooltipSortByMetric,
          tooltipTimeFormat,
          yAxisFormat,
          currencyFormat,
          logarithmicYAxis,
          minorSplitLine,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_timeseries_bar',
    collapses: [
      {
        collapse_label: t('Chart Title'),
        collapse_active: 'chart_title',
        tabs_name: 'orientation',
        tabs_actives: {
          vertical: [
            'x_axis_title',
            'x_axis_title_margin',
            'y_axis_title',
            'y_axis_title_margin',
            'y_axis_title_position',
          ],
          horizontal: [
            'x_axis_title',
            'x_axis_title_margin',
            'x_axis_title_position',
            'y_axis_title',
            'y_axis_title_margin',
          ],
        },
        forms: [
          {
            label: t('BAR ORIENTATION'),
            name: 'orientation',
            status: 'tabs',
            options: [
              { label: t('VERTICAL'), value: 'vertical' },
              { label: t('HORIZONTAL'), value: 'horizontal' },
            ],
          },
          xAxisTitle,
          xAxisTitleMargin,
          {
            label: t('X AXIS TITLE POSITION'),
            name: 'x_axis_title_position',
            status: 'select',
            popper: t('Changing this control takes effect instantly'),
            options: chartFormsOption.y_axis_title_position,
          },
          yAxisTitle,
          yAxisTitleMargin,
          {
            label: t('Y AXIS TITLE POSITION'),
            name: 'y_axis_title_position',
            status: 'select',
            popper: t('Changing this control takes effect instantly'),
            options: chartFormsOption.y_axis_title_position,
          },
        ],
      },
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          sortSeriesBy,
          sortSeriesAscending,
          colorScheme,
          showValue,
          stackedStyle,
          minorTicks,
          dataZoom,
          showLegend,
          type,
          orientation,
          margin,
          timeFormat,
          rotateXAxisLabel,
          currencyFormat,
          truncateXAxis,
          xAxisBounds,
          richTooltip,
          tooltipSortByMetric,
          tooltipTimeFormat,
          yAxisFormat,
          currencyFormat,
          logarithmicYAxis,
          minorSplitLine,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_area',
    collapses: [
      collapseChartTitle,
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          sortSeriesBy,
          sortSeriesAscending,
          colorScheme,
          seriesStyle,
          areaChartOpacity,
          showValue,
          stackedStyle,
          extraControls,
          marker,
          markerSize,
          minorTicks,
          dataZoom,
          showLegend,
          type,
          orientation,
          margin,
          timeFormat,
          rotateXAxisLabel,
          richTooltip,
          tooltipSortByMetric,
          tooltipTimeFormat,
          yAxisFormat,
          currencyFormat,
          logarithmicYAxis,
          minorSplitLine,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
        ],
      },
    ],
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
            status: 'select',
            popper: t('D3 time format for datetime columns'),
            options: chartFormsOption.time_format,
          },
          {
            label: t('PAGE LENGTH'),
            name: 'page_length',
            status: 'select',
            popper: t('Rows per page, 0 means no pagination'),
            options: chartFormsOption.page_length,
          },
          {
            label: t('SEARCH BOX'),
            name: 'include_search',
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
          bigNumberFontSize,
          subheaderFontSize,
          numberFormat,
          currencyFormat,
          dateFormat,
          forceDateFormat,
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
          colorScheme,
          {
            label: t('PERCENTAGE THRESHOLD'),
            name: 'show_labels_threshold',
            status: 'input',
            number: true,
            popper: t(
              'Minimum threshold in percentage points for showing labels.',
            ),
          },
          showLegend,
          type,
          orientation,
          margin,
          {
            label: t('LABEL TYPE'),
            name: 'label_type',
            status: 'select',
            popper: t('What should be shown on the label?'),
            options: chartFormsOption.label_type,
          },
          numberFormat,
          currencyFormat,
          dateFormat,
          showLabels,
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
          colorScheme,
          showLegend,
          type,
          orientation,
          margin,
          {
            label: t('MAX BUBBLE SIZE'),
            name: 'max_bubble_size',
            popper: t('Changing this control takes effect instantly'),
            status: 'select',
            options: [],
          },
          {
            label: t('BUBBLE SIZE NUMBER FORMAT'),
            name: 'max_bubble_size',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            status: 'select',
            options: [],
          },
          {
            label: t('BUBBLE OPACITY'),
            name: 'opacity',
            popper: t(
              'Opacity of bubbles, 0 means completely transparent, 1 means opaque',
            ),
            status: 'range',
            rangeConfig: {
              min: 0,
              max: 1,
              step: 0.1,
            },
          },
        ],
      },
      {
        collapse_label: t('X Axis'),
        collapse_active: 'x_axis',
        forms: [
          xAxisTitle,
          {
            label: t('ROTATE X AXIS LABEL'),
            name: 'xAxisLabelRotation',
            popper: t('Input field supports custom rotation. e.g. 30 for 30°'),
            status: 'select',
            options: [],
          },
          { ...xAxisTitleMargin, label: t('X AXIS TITLE MARGIN') },
          {
            label: t('X AXIS FORMAT'),
            name: 'xAxisFormat',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            status: 'select',
            options: [],
          },
          {
            label: t('LOGARITHMIC X-AXIS'),
            name: 'logXAxis',
            popper: t('Logarithmic x-axis'),
            status: 'checkbox',
          },
        ],
      },
      {
        collapse_label: t('Y Axis'),
        collapse_active: 'y_axis',
        forms: [
          yAxisTitle,
          {
            label: t('ROTATE Y AXIS LABEL'),
            name: 'yAxisLabelRotation',
            popper: t('Changing this control takes effect instantly'),
            status: 'select',
            options: chartFormsOption.yAxisLabelRotation,
          },
          yAxisTitleMargin,
          yAxisFormat,
          logarithmicYAxis,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
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
          colorScheme,
          {
            label: t('NO OF BINS'),
            name: 'link_length',
            popper: t('Select the number of bins for the histogram'),
            status: 'select',
            options: [],
          },
          xAxisLabel,
          yAxisLabel,
          legend,
          {
            label: t('NORMALIZED'),
            name: 'normalized',
            popper: t('Whether to normalize the histogram'),
            status: 'checkbox',
          },
          {
            label: t('CUMULATIVE'),
            name: 'cumulative',
            popper: t('Whether to make the histogram cumulative'),
            status: 'checkbox',
          },
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
          colorScheme,
          showLegend,
          orientation,
          margin,
          {
            label: t('LABEL CONTENTS'),
            name: 'label_type',
            status: 'select',
            popper: t('What should be shown as the label'),
            options: [],
          },
          {
            label: t('TOOLTIP CONTENTS'),
            name: 'tooltip_label_type',
            status: 'select',
            popper: t('What should be shown as the tooltip label'),
            options: [],
          },
          numberFormat,
          currencyFormat,
          showLabels,
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
          colorScheme,
          {
            label: t('FONT SIZE'),
            name: 'font_size',
            popper: t(
              'Font size for axis labels, detail value and other text elements',
            ),
            status: 'range',
            rangeConfig: {
              min: 10,
              max: 20,
              step: 1,
            },
          },
          numberFormat,
          currencyFormat,
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
            popper: t('Number of split segments on the axis'),
            status: 'range',
            rangeConfig: {
              min: 3,
              max: 30,
              step: 1,
            },
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
          showValue,
          showLegend,
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
          xAxisLabel,
          timeFormat,
          xTickLayout,
          yAxisLabel,
          yAxisFormat,
          currencyFormat,
        ],
      },
    ],
  },
  {
    chart_name: 'big_number',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('FIXED COLOR'),
            name: 'increase_color',
            status: 'color',
            popper: t('Use this to define a static color for all circles'),
          },
          bigNumberFontSize,
          subheaderFontSize,
          numberFormat,
          currencyFormat,
          dateFormat,
          forceDateFormat,
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_timeseries_scatter',
    collapses: [
      collapseChartTitle,
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          sortSeriesBy,
          sortSeriesAscending,
          colorScheme,
          showValue,
          stackedStyle,
          marker,
          markerSize,
          dataZoom,
          minorTicks,
          showLegend,
          type,
          orientation,
          margin,
          timeFormat,
          rotateXAxisLabel,
          richTooltip,
          tooltipSortByMetric,
          tooltipTimeFormat,
          yAxisFormat,
          currencyFormat,
          logarithmicYAxis,
          minorSplitLine,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
        ],
      },
    ],
  },
  {
    chart_name: 'pivot_table_v2',
    collapses: [
      {
        collapse_label: t('Options'),
        collapse_active: 'options',
        forms: [
          {
            label: t('VALUE FORMAT'),
            name: 'valueFormat',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            status: 'select',
            options: chartFormsOption.y_axis_format,
          },
          currencyFormat,
          dateFormat,
          {
            label: t('SORT ROWS BY'),
            name: 'rowOrder',
            status: 'select',
            options: chartFormsOption.rowOrder,
          },
          {
            label: t('SORT COLUMNS BY'),
            name: 'colOrder',
            status: 'select',
            options: chartFormsOption.rowOrder,
          },
          {
            label: t('ROWS SUBTOTAL POSITION'),
            name: '',
            status: 'select',
            options: [],
          },
          {
            label: t('COLUMNS SUBTOTAL POSITION'),
            name: '',
            status: 'select',
            options: [],
          },
        ],
      },
    ],
  },
  {
    chart_name: 'dist_bar',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          colorScheme,
          legend,
          {
            label: t('BAR VALUES'),
            name: 'show_bar_value',
            status: 'checkbox',
            popper: t('Show the value on top of the bar'),
          },
          richTooltip,
          {
            label: t('STACKED BARS'),
            name: 'bar_stacked',
            status: 'checkbox',
            popper: t('Show the value on top of the bar'),
          },
          {
            label: t('SORT BARS'),
            name: 'order_bars',
            status: 'checkbox',
            popper: t('Sort bars by x labels.'),
          },
          yAxisFormat,
          yAxisLabel,
          { ...extraControls, name: 'show_controls' },
          {
            label: t('Y BOUNDS'),
            name: 'y_axis_showminmax',
            status: 'checkbox',
            popper: t(
              'Whether to display the min and max values of the Y-axis',
            ),
          },
          yAxisBounds,
        ],
      },
      {
        collapse_label: t('X Axis'),
        collapse_active: 'x_axis',
        forms: [
          {
            label: t('X AXIS LABEL'),
            name: 'x_axis_label',
            status: 'input',
          },
          {
            label: t('BOTTOM MARGIN'),
            name: 'bottom_margin',
            popper: t(
              'Bottom margin, in pixels, allowing for more room for axis labels',
            ),
            status: 'select',
            options: [],
          },
          xTickLayout,
          {
            label: t('REDUCE X TICKS'),
            name: 'reduce_x_ticks',
            popper: t(
              'Reduces the number of X-axis ticks to be rendered. If true, the x-axis will not overflow and labels may be missing. If false, a minimum width will be applied to columns and the width may overflow into an horizontal scroll.',
            ),
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
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [yAxisFormat, currencyFormat],
      },
    ],
  },
  {
    chart_name: 'treemap_v2',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          colorScheme,
          showLabels,
          {
            label: t('LABEL TYPE'),
            name: 'label_type',
            status: 'select',
            popper: t('What should be shown on the label?'),
            options: chartFormsOption.label_types,
          },
          numberFormat,
          currencyFormat,
          dateFormat,
        ],
      },
    ],
  },
  {
    chart_name: 'box_plot',
    collapses: [
      collapseChartTitle,
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [colorScheme, xTickLayout, numberFormat, dateFormat],
      },
    ],
  },
  {
    chart_name: 'graph_chart',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          colorScheme,
          showLegend,
          type,
          orientation,
          margin,
          {
            label: t('GRAPH LAYOUT'),
            name: 'force',
            status: 'tabs',
            options: [
              { label: t('FORCE'), value: 'FORCE' },
              { label: t('CIRCULAR'), value: 'CIRCULAR' },
            ],
          },
          {
            label: t('EDGE SYMBOLS'),
            name: 'edgeSymbol',
            popper: t('Symbol of two ends of edge line'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.edgeSymbol,
          },
          {
            label: t('ENABLE NODE DRAGGING'),
            name: 'draggable',
            popper: t('Whether to enable node dragging in force layout mode.'),
            status: 'checkbox',
          },
          roam,
          {
            label: t('NODE SELECT MODE'),
            name: 'selectedMode',
            popper: t('Allow node selections'),
            placeholder: t('Select ...'),
            status: 'select',
            options: chartFormsOption.selectedMode,
          },
          {
            label: t('LABEL THRESHOLD'),
            name: 'showSymbolThreshold',
            status: 'input',
            popper: t('Minimum value for label to be displayed on graph.'),
            number: true,
          },
          {
            label: t('NODE SIZE'),
            name: 'baseNodeSize',
            status: 'input',
            popper: t(
              'Median node size, the largest node will be 4 times larger than the smallest',
            ),
            number: true,
          },
          {
            label: t('EDGE WIDTH'),
            name: 'baseEdgeWidth',
            status: 'input',
            popper: t(
              'Median edge width, the thickest edge will be 4 times thicker than the thinnest.',
            ),
            number: true,
          },
          {
            label: t('EDGE LENGTH'),
            name: 'edgeLength',
            status: 'range',
            popper: t('Edge length between nodes'),
            rangeConfig: {
              min: 100,
              max: 1000,
              step: 50,
            },
          },
          {
            label: t('GRAVITY'),
            name: 'gravity',
            status: 'range',
            popper: t('Strength to pull the graph toward center'),
            rangeConfig: {
              min: 0.1,
              max: 1,
              step: 0.1,
            },
          },
          {
            label: t('REPULSION'),
            name: 'repulsion',
            status: 'range',
            popper: t('Repulsion strength between nodes'),
            rangeConfig: {
              min: 100,
              max: 3000,
              step: 50,
            },
          },
          {
            label: t('FRICTION'),
            name: 'friction',
            status: 'range',
            popper: t('Friction between nodes'),
            rangeConfig: {
              min: 0.1,
              max: 1,
              step: 0.1,
            },
          },
        ],
      },
    ],
  },
  {
    chart_name: 'radar',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          colorScheme,
          showLegend,
          type,
          orientation,
          margin,
          showLabels,
          labelType,
          {
            label: t('LABEL POSITION'),
            name: 'label_position',
            status: 'select',
            popper: t('D3 format syntax: https://github.com/d3/d3-format'),
            options: chartFormsOption.label_position,
          },
          numberFormat,
          dateFormat,
          {
            label: t('CIRCLE RADAR SHAPE'),
            name: 'draggable',
            popper: t(`Radar render type, whether to display 'circle' shape.`),
            status: 'checkbox',
          },
        ],
      },
    ],
  },
  {
    chart_name: 'echarts_timeseries_step',
    collapses: [
      collapseChartTitle,
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          sortSeriesBy,
          sortSeriesAscending,
          colorScheme,
          {
            label: t('STEP TYPE'),
            name: 'label_type',
            status: 'select',
            popper: t('What should be shown on the label?'),
            options: chartFormsOption.seriesType2,
          },
          showValue,
          stackedStyle,
          areaChart,
          areaChartOpacity,
          marker,
          markerSize,
          dataZoom,
          minorTicks,
          showLegend,
          type,
          orientation,
          margin,
          timeFormat,
          rotateXAxisLabel,
          richTooltip,
          tooltipSortByMetric,
          tooltipTimeFormat,
          yAxisFormat,
          currencyFormat,
          logarithmicYAxis,
          minorSplitLine,
          truncateXAxis,
          xAxisBounds,
          truncateYAxis,
          yAxisBounds,
        ],
      },
    ],
  },
  {
    chart_name: 'tree_chart',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          {
            label: t('TREE LAYOUT '),
            name: 'layout',
            status: 'tabs',
            popper: 'Layout type of tree',
            options: [
              { label: t('Orthogonal'), value: 'orthogonal' },
              { label: t('Radial'), value: 'radial' },
            ],
          },
          {
            label: t('TREE ORIENTATION'),
            name: 'orient',
            status: 'tabs',
            popper: 'Orientation of tree',
            options: [
              { label: t('Left to Right'), value: 'LR' },
              { label: t('Right to Left'), value: 'RL' },
              { label: t('Top to Bottom'), value: 'TB' },
              { label: t('Bottom to Top'), value: 'BT' },
            ],
          },
          {
            label: t('Node label position'),
            name: 'nodeLabelPosition',
            status: 'tabs',
            popper: 'Position of intermediate node label on tree',
            options: [
              { label: t('left'), value: 'left' },
              { label: t('top'), value: 'top' },
              { label: t('right'), value: 'right' },
              { label: t('bottom'), value: 'bottom' },
            ],
          },
          {
            label: t('Child label position'),
            name: 'childLabelPosition',
            status: 'tabs',
            popper: 'Position of child node label on tree',
            options: [
              { label: t('left'), value: 'left' },
              { label: t('top'), value: 'top' },
              { label: t('right'), value: 'right' },
              { label: t('bottom'), value: 'bottom' },
            ],
          },
          {
            label: t('Emphasis'),
            name: 'emphasis',
            status: 'tabs',
            popper: 'Which relatives to highlight on hover',
            options: [
              { label: t('ancestor'), value: 'ancestor' },
              { label: t('descendant'), value: 'descendant' },
            ],
          },
          {
            label: t('Symbol'),
            name: 'symbol',
            status: 'select',
            popper: t('Layout type of tree'),
            options: chartFormsOption.symbol,
          },
          {
            label: t('Symbol size'),
            name: 'symbolSize',
            status: 'range',
            popper: t('Size of edge symbols'),
            rangeConfig: {
              min: 5,
              max: 30,
              step: 2,
            },
          },
          roam,
        ],
      },
    ],
  },
  {
    chart_name: 'sunburst_v2',
    collapses: [
      {
        collapse_label: t('Chart Options'),
        collapse_active: 'chart_options',
        forms: [
          colorScheme,
          showLabels,
          {
            label: t('PERCENTAGE THRESHOLD'),
            name: 'show_labels_threshold',
            status: 'input',
            popper: t(
              'Minimum threshold in percentage points for showing labels.',
            ),
            number: true,
          },
          {
            label: t('SHOW TOTAL'),
            name: 'show_total',
            popper: t(`Whether to display the aggregate count`),
            status: 'checkbox',
          },
          labelType,
          numberFormat,
          currencyFormat,
          dateFormat,
        ],
      },
    ],
  },
];

export default DvtChartCustomize;
