export interface ChartSelectBarProps {
  popoverLabel: string;
  status: string;
  icon: string;
}

export const ChartDefaultSelectBars = [
  'echarts_timeseries_line',
  'echarts_timeseries_bar',
  'echarts_area',
  'table',
  'big_number_total',
  'pie',
];

export const ChartSelectBars: ChartSelectBarProps[] = [
  {
    popoverLabel: 'Bubble Chart',
    status: 'bubble_v2',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Funnel Chart',
    status: 'funnel',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Histogram',
    status: 'histogram',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Heatmap',
    status: 'heatmap',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Gauge Chart',
    status: 'gauge_chart',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Waterfall Chart',
    status: 'waterfall',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Big Number with Trendline',
    status: 'big_number',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Scatter Plot',
    status: 'echarts_timeseries_scatter',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Pivot Table',
    status: 'pivot_table_v2',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Bar Chart (legacy)',
    status: 'dist_bar',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'World Map',
    status: 'world_map',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Mixed Chart',
    status: 'mixed_timeseries',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Threemap',
    status: 'treemap_v2',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Box Plot',
    status: 'box_plot',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Graph Chart',
    status: 'graph_chart',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Radar Chart',
    status: 'radar',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Stepped Line',
    status: 'echarts_timeseries_step',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Tree Chart',
    status: 'tree_chart',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Sunburst Chart v2',
    status: 'sunburst_v2',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Line Chart',
    status: 'echarts_timeseries_line',
    icon: 'dvt-diagram',
  },
  {
    popoverLabel: 'Bar Chart',
    status: 'echarts_timeseries_bar',
    icon: 'dvt-chart',
  },
  {
    popoverLabel: 'Area Chart',
    status: 'echarts_area',
    icon: 'dvt-status_up',
  },
  {
    popoverLabel: 'Table',
    status: 'table',
    icon: 'dvt-linear_chart',
  },
  {
    popoverLabel: 'Big Number',
    status: 'big_number_total',
    icon: 'dvt-4k',
  },
  { popoverLabel: 'Pie Chart', status: 'pie', icon: 'dvt-diagram' },
];
