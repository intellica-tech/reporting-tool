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
  'currency_format',
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
  'legendMargin',
  'legendOrientation',
  'legendType',
  'limit',
  'logAxis',
  'metrics',
  'min_periods',
  'minorSplitLine',
  'minorTicks',
  'only_total',
  'order_desc',
  'percentage_threshold',
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
  'show_value',
  'sort_series_ascending',
  'sort_series_type',
  'stack',
  'time_compare',
  'time_grain_sqla',
  'tooltipSortByMetric',
  'tooltipTimeFormat',
  'timeseries_limit_metric',
  'truncateXAxis',
  'truncateYAxis',
  'truncate_metric',
  'url_params',
  'viz_type',
  'xAxisBounds',
  'xAxisLabelRotation',
  'x_axis',
  'x_axis_sort_asc',
  'x_axis_sort_series',
  'x_axis_sort_series_ascending',
  'x_axis_time_format',
  'x_axis_title',
  'x_axis_title_margin',
  'y_axis_bounds',
  'y_axis_format',
  'y_axis_title',
  'y_axis_title_margin',
  'y_axis_title_position',
  'zoomable',
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
    form_data: [
      ...lineChartPayload,
      'area',
      'opacity',
      'markerEnabled',
      'markerSize',
      'seriesType',
    ],
    queries: lineChartQueries,
  },
  {
    viz_name: 'echarts_timeseries_bar',
    form_data: [...lineChartPayload, 'orientation'],
    queries: lineChartQueries,
  },
  {
    viz_name: 'echarts_area',
    form_data: [
      ...lineChartPayload,
      'area',
      'opacity',
      'markerEnabled',
      'markerSize',
      'seriesType',
    ],
    queries: lineChartQueries,
  },
  {
    viz_name: 'table',
    form_data: [
      'adhoc_filters',
      'all_columns',
      'align_pn',
      'allow_rearrange_columns',
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
      'include_search',
      'page_length',
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
      'currency_format',
      'extra_form_data',
      'force',
      'force_timestamp_formatting',
      'header_font_size',
      'metric',
      'number_format',
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
      'currency_format',
      'datasource',
      'date_format',
      'donut',
      'extra_form_data',
      'force',
      'groupby',
      'innerRadius',
      'label_type',
      'labels_outside',
      'label_line',
      'legendMargin',
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
      'show_totals',
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
      'logXAxis',
      'logYAxis',
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
      'xAxisBounds',
      'xAxisFormat',
      'x_axis_title',
      'x_axis_title_margin',
      'xAxisLabelRotation',
      'y',
      'yAxisLabelRotation',
      'y_axis_title',
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
      'cumulative',
      'datasource',
      'extra_form_data',
      'groupby',
      'row_limit',
      'link_length',
      'normalized',
      'row_limit',
      'show_legend',
      'url_params',
      'viz_type',
      'x_axis_label',
      'y_axis_label',
    ],
    queries: [],
  },
  {
    viz_name: 'funnel',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'currency_format',
      'datasource',
      'extra_form_data',
      'force',
      'groupby',
      'legendMargin',
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
      'currency_format',
      'datasource',
      'end_angle',
      'extra_form_data',
      'font_size',
      'force',
      'groupby',
      'interval_color_indices',
      'intervals',
      'max_val',
      'metric',
      'min_val',
      'number_format',
      'overlap',
      'result_format',
      'result_type',
      'row_limit',
      'show_axis_tick',
      'show_pointer',
      'show_progress',
      'show_split_line',
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
      'currency_format',
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
      'show_legend',
      'show_value',
      'time_grain_sqla',
      'total_color',
      'url_params',
      'viz_type',
      'x_axis',
      'x_axis_label',
      'x_axis_time_format',
      'x_ticks_layout',
      'y_axis_format',
      'y_axis_label',
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
      'currency_format',
      'datasource',
      'extra_form_data',
      'force',
      'force_timestamp_formatting',
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
    form_data: [
      ...lineChartPayload,
      'area',
      'opacity',
      'markerEnabled',
      'markerSize',
      'seriesType',
    ],
    queries: lineChartQueries,
  },
  {
    viz_name: 'pivot_table_v2',
    form_data: [
      'adhoc_filters',
      'aggregateFunction',
      'colOrder',
      'colSubtotalPosition',
      'colSubTotals',
      'colTotals',
      'combineMetric',
      'conditional_formatting',
      'currency_format',
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
      'rowSubtotalPosition',
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
      'applied_time_extras',
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
      'bar_stacked',
      'order_bars',
      'reduce_x_ticks',
      'show_bar_value',
      'show_controls',
      'x_axis_label',
      'y_axis_bounds',
      'y_axis_label',
      'y_axis_showminmax',
      'dist_bar',
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
      'currency_format',
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
  {
    viz_name: 'mixed_timeseries',
    form_data: [
      'adhoc_filters',
      'adhoc_filters_b',
      'annotation_layers',
      'area',
      'areaB',
      'color_scheme',
      'comparison_type',
      'comparison_type_b',
      'currency_format',
      'currency_format_secondary',
      'datasource',
      'extra_form_data',
      'force',
      'groupby',
      'groupby_b',
      'legendMargin',
      'legendOrientation',
      'legendType',
      'limit',
      'logAxis',
      'logAxisSecondary',
      'markerEnabled',
      'markerEnabledB',
      'markerSize',
      'markerSizeB',
      'metrics',
      'metrics_b',
      'minorSplitLine',
      'minorTicks',
      'min_periods',
      'min_periods_b',
      'opacity',
      'opacityB',
      'order_desc',
      'order_desc_b',
      'resample_method',
      'resample_method_b',
      'resample_rule',
      'resample_rule_b',
      'result_format',
      'result_type',
      'rich_tooltip',
      'rolling_periods',
      'rolling_periods_b',
      'rolling_type',
      'rolling_type_b',
      'row_limit',
      'row_limit_b',
      'series_limit',
      'series_limit_b',
      'seriesType',
      'seriesTypeB',
      'show_legend',
      'show_value',
      'show_valueB',
      'stack',
      'stackB',
      'time_compare',
      'time_compare_b',
      'time_grain_sqla',
      'timeseries_limit_metric',
      'timeseries_limit_metric_b',
      'tooltipSortByMetric',
      'tooltipTimeFormat',
      'truncateXAxis',
      'truncateYAxis',
      'truncate_metric',
      'truncate_metric_b',
      'url_params',
      'viz_type',
      'x_axis',
      'x_axis_time_format',
      'x_axis_title_margin',
      'y_axis_bounds',
      'y_axis_bounds_secondary',
      'y_axis_format',
      'y_axis_format_secondary',
      'y_axis_title_margin',
      'y_axis_title_position',
      'yAxisTitleSecondary',
      'zoomable',
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
      'orderby',
      'post_processing',
      'row_limit',
      'series_columns',
      'series_limit',
      'time_offsets',
      'url_params',
    ],
  },
  {
    viz_name: 'treemap_v2',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'currency_format',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'groupby',
      'label_type',
      'metrics',
      'number_format',
      'result_format',
      'result_type',
      'row_limit',
      'show_labels',
      'show_upper_labels',
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
    viz_name: 'box_plot',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'columns',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'groupby',
      'metrics',
      'number_format',
      'result_format',
      'result_type',
      'series_limit',
      'series_limit_metric',
      'temporal_columns_lookup',
      'time_grain_sqla',
      'url_params',
      'viz_type',
      'whiskerOptions',
      'x_axis_title_margin',
      'x_ticks_layout',
      'y_axis_title_margin',
      'y_axis_title_position',
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
      'series_columns',
      'series_limit',
      'series_limit_metric',
      'url_params',
    ],
  },
  {
    viz_name: 'graph_chart',
    form_data: [
      'adhoc_filters',
      'baseEdgeWidth',
      'baseNodeSize',
      'color_scheme',
      'columns',
      'datasource',
      'draggable',
      'edgeLength',
      'edgeSymbol',
      'extra_form_data',
      'force',
      'friction',
      'gravity',
      'layout',
      'legendMargin',
      'legendOrientation',
      'legendType',
      'metrics',
      'repulsion',
      'result_format',
      'result_type',
      'roam',
      'row_limit',
      'selectedMode',
      'showSymbolThreshold',
      'show_legend',
      'source',
      'source_category',
      'target',
      'target_category',
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
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'radar',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'groupby',
      'is_circle',
      'label_position',
      'label_type',
      'legendMargin',
      'legendOrientation',
      'legendType',
      'metrics',
      'number_format',
      'result_format',
      'result_type',
      'row_limit',
      'show_labels',
      'show_legend',
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
      'row_limit',
      'series_limit',
      'series_limit_metric',
      'url_params',
    ],
  },
  {
    viz_name: 'echarts_timeseries_step',
    form_data: [
      'adhoc_filters',
      'annotation_layers',
      'area',
      'color_scheme',
      'comparison_type',
      'currency_format',
      'extra_form_data',
      'force',
      'forecastEnabled',
      'forecastInterval',
      'forecastPeriods',
      'groupby',
      'legendMargin',
      'legendOrientation',
      'legendType',
      'limit',
      'logAxis',
      'markerEnabled',
      'markerSize',
      'metrics',
      'minorSplitLine',
      'minorTicks',
      'only_total',
      'opacity',
      'order_desc',
      'result_format',
      'result_type',
      'rich_tooltip',
      'row_limit',
      'seriesType',
      'show_empty_columns',
      'show_legend',
      'sort_series_ascending',
      'sort_series_type',
      'time_grain_sqla',
      'timeseries_limit_metric',
      'tooltipSortByMetric',
      'tooltipTimeFormat',
      'truncateXAxis',
      'truncateYAxis',
      'truncate_metric',
      'url_params',
      'viz_type',
      'xAxisBounds',
      'xAxisLabelRotation',
      'x_axis',
      'x_axis_sort_asc',
      'x_axis_sort_series',
      'x_axis_sort_series_ascending',
      'x_axis_time_format',
      'x_axis_title_margin',
      'x_axis_title_margin',
      'y_axis_bounds',
      'y_axis_format',
      'y_axis_title_margin',
      'y_axis_title_position',
      'zoomable',
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
      'series_limit_metric',
      'time_offsets',
      'url_params',
    ],
  },
  {
    viz_name: 'tree_chart',
    form_data: [
      'adhoc_filters',
      'child_label_position',
      'datasource',
      'emphasis',
      'extra_form_data',
      'force',
      'id',
      'layout',
      'metric',
      'name',
      'node_label_position',
      'orient',
      'parent',
      'result_format',
      'result_type',
      'roam',
      'root_node_id',
      'row_limit',
      'symbol',
      'symbolSize',
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
      'row_limit',
      'series_limit',
      'url_params',
    ],
  },
  {
    viz_name: 'sunburst_v2',
    form_data: [
      'adhoc_filters',
      'color_scheme',
      'columns',
      'currency_format',
      'datasource',
      'date_format',
      'extra_form_data',
      'force',
      'label_type',
      'linear_color_scheme',
      'metric',
      'number_format',
      'result_format',
      'result_type',
      'row_limit',
      'secondary_metric',
      'show_total',
      'show_labels',
      'show_labels_threshold',
      'show_total',
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
];

export default DvtChartFormPayloads;
