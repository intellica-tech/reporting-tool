interface DvtChartFormPayloadsProps {
  viz_name: string;
  form_data: string[];
  queries: string[];
}

const lineChartPayload = [
  'adhoc_filters',
  'annotation_layers',
  'color_scheme',
  'comparison_type',
  'contributionMode',
  'datasource',
  'extra_form_data',
  'force',
  'forecastEnabled',
  'forecastInterval',
  'forecastPeriods',
  'forecastSeasonalityDaily',
  'forecastSeasonalityWeekly',
  'forecastSeasonalityYearly',
  'groupby',
  'legendOrientation',
  'legendType',
  'limit',
  'metrics',
  'min_periods',
  'only_total',
  'order_desc',
  'resample_method',
  'resample_rule',
  'result_format',
  'result_type',
  'rich_tooltip',
  'rolling_periods',
  'rolling_type',
  'row_limit',
  'show_empty_columns',
  'show_legend',
  'sort_series_type',
  'time_compare',
  'time_grain_sqla',
  'timeseries_limit_metric',
  'tooltipTimeFormat',
  'truncateXAxis',
  'truncateYAxis',
  'truncate_metric',
  'url_params',
  'viz_type',
  'x_axis',
  'x_axis_sort_asc',
  'x_axis_sort_series',
  'x_axis_sort_series_ascending',
  'x_axis_time_format',
  'x_axis_title_margin',
  'y_axis_bounds',
  'y_axis_format',
  'y_axis_title_margin',
  'y_axis_title_position',
];

const lineChartQueries = [
  'annotation_layers',
  'applied_time_extras',
  'columns',
  'custom_form_data',
  'custom_params',
  'extras',
  'filters',
  'metrics',
  'order_desc',
  'orderby',
  'post_processing',
  'row_limit',
  'series_columns',
  'series_limit',
  'series_limit_metric',
  'time_offsets',
  'url_params',
];

const DvtChartFormPayloads: DvtChartFormPayloadsProps[] = [
  {
    viz_name: 'echarts_timeseries_line',
    form_data: [...lineChartPayload, 'opacity', 'markerSize', 'seriesType'],
    queries: lineChartQueries,
  },
  {
    viz_name: 'echarts_timeseries_bar',
    form_data: [...lineChartPayload, 'orientation'],
    queries: lineChartQueries,
  },
  {
    viz_name: 'echarts_area',
    form_data: [...lineChartPayload, 'opacity', 'markerSize', 'seriesType'],
    queries: lineChartQueries,
  },
  {
    viz_name: 'table',
    form_data: [
      'adhoc_filters',
      'all_columns',
      'color_pn',
      'datasource',
      'extra_form_data',
      'force',
      'groupby',
      'include_time',
      'metrics',
      'order_by_cols',
      'order_desc',
      'percent_metrics',
      'query_mode',
      'result_format',
      'result_type',
      'row_limit',
      'server_page_length',
      'server_pagination',
      'show_cell_bars',
      'show_totals',
      'table_timestamp_format',
      'temporal_columns_lookup',
      'time_grain_sqla',
      'timeseries_limit_metric',
      'url_params',
      'viz_type',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'post_processing',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'big_number_total',
    form_data: [
      'adhoc_filters',
      'datasource',
      'extra_form_data',
      'force',
      'header_font_size',
      'metric',
      'result_format',
      'result_type',
      'subheader',
      'subheader_font_size',
      'time_format',
      'url_params',
      'viz_type',
      'y_axis_format',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'pie',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'groupby',
      'innerRadius',
      'label_type',
      'labels_outside',
      'legendOrientation',
      'legendType',
      'metric',
      'number_format',
      'outerRadius',
      'result_format',
      'result_type',
      'row_limit',
      'show_labels',
      'show_labels_threshold',
      'show_legend',
      'sort_by_metric',
      'url_params',
      'viz_type',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'bubble_v2',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'datasource',
      'entity',
      'extra_form_data',
      'force',
      'legendOrientation',
      'legendType',
      'max_bubble_size',
      'opacity',
      'order_desc',
      'orderby',
      'result_format',
      'result_type',
      'row_limit',
      'series',
      'show_legend',
      'size',
      'tooltipSizeFormat',
      'truncateXAxis',
      'truncateYAxis',
      'url_params',
      'viz_type',
      'x',
      'xAxisFormat',
      'x_axis_title_margin',
      'y',
      'y_axis_bounds',
      'y_axis_format',
      'y_axis_title_margin',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'histogram',
    form_data: [
      'adhoc_filters',
      'all_columns_x',
      'color_scheme',
      'datasource',
      'extra_form_data',
      'groupby',
      'row_limit',
      'link_length',
      'show_legend',
      'url_params',
      'viz_type',
    ],
    queries: [],
  },
  {
    viz_name: 'funnel',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'datasource',
      'extra_form_data',
      'force',
      'groupby',
      'legendOrientation',
      'metric',
      'number_format',
      'result_format',
      'result_type',
      'row_limit',
      'show_labels',
      'show_legend',
      'show_tooltip_labels',
      'sort_by_metric',
      'tooltip_label_type',
      'url_params',
      'viz_type',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'heatmap',
    form_data: [
      'datasource',
      'viz_type',
      'url_params',
      'all_columns_x',
      'all_columns_y',
      'metric',
      'adhoc_filters',
      'row_limit',
      'sort_by_metric',
      'linear_color_scheme',
      'xscale_interval',
      'yscale_interval',
      'canvas_image_rendering',
      'normalize_across',
      'left_margin',
      'bottom_margin',
      'y_axis_bounds',
      'y_axis_format',
      'time_format',
      'currency_format',
      'sort_x_axis',
      'sort_y_axis',
      'show_legend',
      'show_perc',
      'show_values',
      'normalized',
      'extra_form_data',
    ],
    queries: [],
  },
  {
    viz_name: 'gauge_chart',
    form_data: [
      'adhoc_filters',
      'animation',
      'color_scheme',
      'datasource',
      'end_angle',
      'extra_form_data',
      'font_size',
      'force',
      'groupby',
      'metric',
      'number_format',
      'overlap',
      'result_format',
      'result_type',
      'row_limit',
      'show_pointer',
      'show_progress',
      'sort_by_metric',
      'split_number',
      'start_angle',
      'url_params',
      'value_formatter',
      'viz_type',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'waterfall',
    form_data: [
      'adhoc_filters',
      'datasource',
      'decrease_color',
      'extra_form_data',
      'force',
      'groupby',
      'increase_color',
      'metric',
      'result_format',
      'result_type',
      'row_limit',
      'time_grain_sqla',
      'total_color',
      'url_params',
      'viz_type',
      'x_axis',
      'x_axis_time_format',
      'x_ticks_layout',
      'y_axis_format',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'big_number',
    form_data: [
      'adhoc_filters',
      'color_picker',
      'compare_lag',
      'compare_suffix',
      'datasource',
      'extra_form_data',
      'force',
      'header_font_size',
      'metric',
      'min_periods',
      'resample_method',
      'resample_rule',
      'result_format',
      'result_type',
      'rolling_periods',
      'rolling_type',
      'show_timestamp',
      'show_trend_line',
      'start_y_axis_at_zero',
      'subheader_font_size',
      'time_format',
      'time_grain_sqla',
      'url_params',
      'viz_type',
      'x_axis',
      'y_axis_format',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'post_processing',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'echarts_timeseries_scatter',
    form_data: [...lineChartPayload, 'markerSize'],
    queries: lineChartQueries,
  },
  {
    viz_name: 'pivot_table_v2',
    form_data: [
      'adhoc_filters',
      'aggregateFunction',
      'colOrder',
      'colSubTotals',
      'colTotals',
      'combineMetric',
      'conditional_formatting',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'groupbyColumns',
      'groupbyRows',
      'metrics',
      'metricsLayout',
      'order_desc',
      'result_format',
      'result_type',
      'rowOrder',
      'rowSubTotals',
      'rowTotals',
      'row_limit',
      'series_limit',
      'series_limit_metric',
      'temporal_columns_lookup',
      'time_grain_sqla',
      'transposePivot',
      'url_params',
      'valueFormat',
      'viz_type',
    ],
    queries: [
      'annotation_layers',
      'applied_time_extras',
      'columns',
      'custom_form_data',
      'custom_params',
      'extras',
      'filters',
      'metrics',
      'order_desc',
      'orderby',
      'row_limit',
      'series_limit',
      'series_limit_metric',
      'url_params',
    ],
  },
  {
    viz_name: 'dist_bar',
    form_data: [
      'datasource',
      'viz_type',
      'url_params',
      'metrics',
      'adhoc_filters',
      'groupby',
      'columns',
      'row_limit',
      'timeseries_limit_metric',
      'order_desc',
      'contribution',
      'color_scheme',
      'show_legend',
      'rich_tooltip',
      'y_axis_format',
      'y_axis_bounds',
      'bottom_margin',
      'x_ticks_layout',
      'extra_form_data',
    ],
    queries: [],
  },
  {
    viz_name: 'world_map',
    form_data: [
      'adhoc_filters',
      'applied_time_extras',
      'color_by',
      'color_picker',
      'color_scheme',
      'country_fieldtype',
      'datasource',
      'entity',
      'filters',
      'having',
      'linear_color_scheme',
      'max_bubble_size',
      'metric',
      'row_limit',
      'secondary_metric',
      'show_bubbles',
      'sort_by_metric',
      'url_params',
      'viz_type',
      'y_axis_format',
    ],
    queries: [],
  },
];

export default DvtChartFormPayloads;
