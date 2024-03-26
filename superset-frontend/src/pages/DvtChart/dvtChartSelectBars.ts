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
  // {
  //   popoverLabel: 'Big Number with Trendline',
  //   status: 'big_number',
  //   icon: 'dvt-linear_chart',
  // },
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
