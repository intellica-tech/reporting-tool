/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import useResizeDetectorByObserver from 'src/dvt-hooks/useResizeDetectorByObserver';
import useFetch from 'src/dvt-hooks/useFetch';
import { t } from '@superset-ui/core';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import withToasts from 'src/components/MessageToasts/withToasts';
import {
  dvtChartSetQueryContext,
  dvtChartSetSaveDisabled,
  dvtChartSetSelectedChart,
  dvtChartSetSlice,
} from 'src/dvt-redux/dvt-chartReducer';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtButton from 'src/components/DvtButton';
import DvtSelectButton from 'src/components/DvtSelectButton';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import DvtCollapse from 'src/components/DvtCollapse';
import DvtInput from 'src/components/DvtInput';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import DvtSelect from 'src/components/DvtSelect';
import DvtInputSelect from 'src/components/DvtInputSelect';
import DvtInputDrop from 'src/components/DvtInputDrop';
import DvtColorSelect from 'src/components/DvtColorSelect';
import DvtRange from 'src/components/DvtRange';
import DvtSpinner from 'src/components/DvtSpinner';
import DvtSelectColorScheme from 'src/components/DvtSelectColorScheme';
import ChartContainer from 'src/components/Chart/ChartContainer';
import moment from 'moment';
import {
  dvtNavbarChartAddSetVizType,
  dvtNavbarChartsSetTabs,
} from 'src/dvt-redux/dvt-navbarReducer';
import { objectIsEmptyForArray } from 'src/dvt-utils/object-is-empty-for-array';
import openSelectMenuData from 'src/components/DvtOpenSelectMenu/dvtOpenSelectMenuData';
import DvtChartData from './dvtChartData';
import DvtChartCustomize from './dvtChartDataCustomize';
import DvtChartFormPayloads from './dvtChartFormPayloads';
import {
  ChartDefaultSelectBars,
  ChartSelectBarProps,
  ChartSelectBars,
} from './dvtChartSelectBars';
import {
  StyledChart,
  CreateChart,
  CreateChartTop,
  CreateChartCenter,
  CreateChartCenterCollapseInGap,
  CreateChartCenterCollapseInGapFlexRow,
  CreateChartBottom,
  RightPreview,
  RightPreviewTop,
  RightPreviewTopChartScreen,
  RightPreviewBottom,
  RightPreviewBottomTabItem,
  RightPreviewBottomTableScroll,
  SpinnerContainer,
} from './dvt-chart.module';
import { chartFormsOption, forecastSeasonality } from './dvtChartDataOptions';

const DvtChart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedChart = useAppSelector(state => state.dvtChart.selectedChart);
  const modalComponent = useAppSelector(state => state.dvtModal.component);
  const selectedVizType = useAppSelector(
    state => state.dvtNavbar.chartAdd.vizType,
  );
  const chartTabs = useAppSelector(state => state.dvtNavbar.charts.tabs);
  const [selectBars, setSelectBars] = useState<ChartSelectBarProps[]>([]);
  const [active, setActive] = useState<string>('');
  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Results',
    value: 'results',
  });
  const [collapsesIsOpen, setCollapsesIsOpen] = useState<any[]>(['query']);
  const [firstChartCreated, setFirstChartCreated] = useState<boolean>(false);
  const [values, setValues] = useState<any>({
    x_axis: [],
    time_grain_sqla: {
      label: t('Day'),
      value: 'P1D',
    },
    metrics: [],
    metrics_b: [],
    groupby: [],
    groupby_b: [],
    contributionMode: '',
    adhoc_filters: [],
    adhoc_filters_b: [],
    limit: '',
    timeseries_limit_metric: [],
    timeseries_limit_metric_b: [],
    order_desc: true,
    order_desc_b: true,
    row_limit: {
      label: '10000',
      value: '10000',
    },
    row_limit_b: {
      label: '10000',
      value: '10000',
    },
    truncate_metric: true,
    truncate_metric_b: true,
    show_empty_columns: true,
    rolling_type: {
      label: t('None'),
      value: 'None',
    },
    rolling_type_b: {
      label: t('None'),
      value: 'None',
    },
    time_compare: [],
    time_compare_b: [],
    comparison_type: {
      label: t('Actual values'),
      value: 'values',
    },
    comparison_type_b: {
      label: t('Actual values'),
      value: 'values',
    },
    resample_rule: '',
    resample_rule_b: '',
    resample_method: '',
    resample_method_b: '',
    annotation_layers: [],
    forecastEnabled: false,
    forecastPeriods: '10',
    forecastInterval: '0.8',
    forecastSeasonalityYearly: {
      label: t('default'),
      value: 'null',
    },
    forecastSeasonalityWeekly: {
      label: t('default'),
      value: 'null',
    },
    forecastSeasonalityDaily: {
      label: t('default'),
      value: 'null',
    },
    query_mode: { label: t('AGGREGATE'), value: 'aggregate' },
    percent_metrics: [],
    server_pagination: false,
    server_page_length: {
      label: t('10'),
      value: 10,
    },
    show_totals: false,
    all_columns: [],
    order_by_cols: [],
    metric: [],
    sort_by_metric: false,
    subheader: '',
    dimension: [],
    entity: [],
    x: [],
    y: [],
    size: [],
    all_columns_x: [],
    all_columns_y: [],
    linear_color_scheme: chartFormsOption.linear_color_scheme.find(
      f => f.id === 'superset_seq_1',
    ),
    xscale_interval: {
      label: '1',
      value: 1,
    },
    yscale_interval: {
      label: '1',
      value: 1,
    },
    canvas_image_rendering: {
      label: t('pixelated (Sharp)'),
      value: 'pixelated',
    },
    normalize_across: {
      label: t('heatmap'),
      value: 'heatmap',
    },
    left_margin: {
      label: t('auto'),
      value: 'auto',
    },
    bottom_margin: {
      label: t('auto'),
      value: 'auto',
    },
    xAxisBounds: {
      min: '',
      max: '',
    },
    y_axis_bounds: {
      min: '',
      max: '',
    },
    y_axis_format: {
      label: t('Adaptive formatting'),
      value: 'SMART_NUMBER',
    },
    time_format: {
      label: t('Adaptive formatting'),
      value: 'smart_date',
    },
    currency_format: {},
    sort_x_axis: {
      label: t('Axis ascending'),
      value: 'alpha_asc',
    },
    sort_y_axis: {
      label: t('Axis ascending'),
      value: 'alpha_asc',
    },
    show_legend: true,
    show_perc: true,
    show_values: false,
    normalized: false,
    min_periods: '',
    min_periods_b: '',
    rolling_periods: '',
    rolling_periods_b: '',
    compare_lag: '',
    compare_suffix: '',
    show_timestamp: false,
    show_trend_line: true,
    start_y_axis_at_zero: true,
    aggregateFunction: { label: t('Sum'), value: 'Sum' },
    colSubTotals: false,
    colTotals: false,
    combineMetric: false,
    groupbyColumns: [],
    groupbyRows: [],
    metricsLayout: { label: t('COLUMNS'), value: 'COLUMNS' },
    rowSubTotals: false,
    rowTotals: false,
    series_limit: [],
    series_limit_b: [],
    transposePivot: false,
    contribution: false,
    country_fieldtype: {
      label: 'code ISO 3166-1 alpha-2 (cca2)',
      value: 'cca2',
    },
    show_bubbles: false,
    secondary_metric: [],
    max_bubble_size: { label: '25', value: '25' },
    color_picker: { r: 0, g: 122, b: 135, a: 1 },
    color_scheme: { label: 'Superset Colors', id: 'supersetColors' },
    truncateXAxis: true,
    truncateYAxis: true,
    x_axis_title: '',
    x_axis_title_margin: { label: '15', value: 15 },
    x_axis_title_position: {
      label: t('Left'),
      value: 'Left',
    },
    y_axis_title: '',
    y_axis_title_margin: { label: '15', value: 15 },
    y_axis_title_position: {
      label: t('Left'),
      value: 'Left',
    },
    sort_series_type: {
      label: t('Total value'),
      value: 'sum',
    },
    sort_series_ascending: false,
    seriesType: {
      label: t('Line'),
      value: 'line',
    },
    show_value: false,
    stack: {
      label: t('None'),
      value: 'null',
    },
    only_total: true,
    percentage_threshold: '0',
    area: false,
    opacity: 0.2,
    markerEnabled: false,
    markerSize: 6,
    zoomable: false,
    minorTicks: false,
    legendType: {
      label: t('Scroll'),
      value: 'scroll',
    },
    legendOrientation: {
      label: t('Top'),
      value: 'top',
    },
    legendMargin: '',
    x_axis_time_format: {
      label: t('Adaptive formatting'),
      value: 'smart_date',
    },
    xAxisLabelRotation: {
      label: '0°',
      value: 0,
    },
    rich_tooltip: true,
    tooltipSortByMetric: false,
    tooltipTimeFormat: {
      label: t('Adaptive formatting'),
      value: 'smart_date',
    },
    logAxis: false,
    minorSplitLine: false,
    orientation: { label: t('VERTICAL'), value: 'vertical' },
  });
  const [chartApiUrl, setChartApiUrl] = useState('');
  // const [exploreJsonUrl, setExploreJsonUrl] = useState('');
  // const [exploreJsonResultsUrl, setExploreJsonResultsUrl] = useState('');
  const [chartData, setChartData] = useState<any[] | any>([]);
  const [chartStatus, setChartStatus] = useState<
    null | 'failed' | 'loading' | 'success' | 'rendered'
  >(null);
  const [resultHeader, setResultHeader] = useState<any[]>([]);
  const [resultData, setResultData] = useState<any[]>([]);
  const [resultSort, setResultSort] = useState<DvtTableSortProps>({
    column: '',
    direction: 'desc',
  });
  const [sampleApiUrl, setSampleApiUrl] = useState('');
  const [sampleHeader, setSampleHeader] = useState<any[]>([]);
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [sampleLoading, setSampleLoading] = useState<boolean>(false);
  const [sampleSort, setSampleSort] = useState<DvtTableSortProps>({
    column: '',
    direction: 'desc',
  });

  const onlyExploreJson = ['heatmap', 'dist_bar', 'world_map', 'histogram'];

  useEffect(() => {
    if (active === 'bubble_v2' && values.opacity === 0.2) {
      setValues({ ...values, opacity: 0.6 });
    }
    if (
      selectBars.some(f => f.status === 'bubble_v2') &&
      active !== 'bubble_v2' &&
      values.opacity === 0.6
    ) {
      setValues({ ...values, opacity: 0.2 });
    }
  }, [active]);

  useEffect(() => {
    if (selectedVizType) {
      if (
        !ChartDefaultSelectBars.includes(selectedVizType) ||
        !selectBars.length
      ) {
        setSelectBars(
          ChartSelectBars.filter(vf =>
            [selectedVizType, ...ChartDefaultSelectBars].includes(vf.status),
          ),
        );
      }
      setActive(selectedVizType);
    }
  }, [selectedVizType]);

  useEffect(() => {
    if (history.location.search && selectedChart?.form_data) {
      if (history.location.search.split('?slice_id=')[1]) {
        const getFormData = selectedChart.form_data;

        const filtersOnItem = getFormData?.granularity_sqla
          ? [
              {
                id: moment().unix(),
                label:
                  getFormData.time_range === 'No filter'
                    ? `${getFormData.granularity_sqla} (No filter)`
                    : getFormData.time_range,
                values: {
                  saved: '',
                  column: selectedChart.dataset.columns.find(
                    (f: any) => f?.column_name === getFormData.granularity_sqla,
                  ),
                  operator: {
                    label: getFormData.time_range,
                    value: 'TEMPORAL_RANGE',
                  },
                  aggregate: '',
                  option: '',
                  comparator: getFormData.time_range,
                  sql: getFormData.granularity_sqla,
                  expressionType: 'SIMPLE',
                  clause: 'WHERE',
                  filterType: 'time_range',
                },
              },
            ]
          : [];

        const adhocFiltersFormation = (v: any) => {
          const fixOperator = (o: string) => {
            switch (o) {
              case '!=':
                return '<>';
              case '==':
                return '=';
              default:
                return o;
            }
          };

          const operatorFind =
            v.operator === 'TEMPORAL_RANGE'
              ? { label: v.comparator, value: v.operator }
              : [
                  ...openSelectMenuData.operator.having,
                  ...openSelectMenuData.operator.where,
                ].find((f: any) => f.value === fixOperator(v.operator));

          const findColumn = selectedChart?.dataset.columns.find(
            (f: any) => f?.column_name === v.subject,
          );

          const onTimeRange =
            v.operator === 'TEMPORAL_RANGE'
              ? {
                  filterType: 'time_range',
                  addTimeRange: {
                    label: '2024-02-23 ≤ order_date < 2024-03-23',
                    menuLabel: 'last month',
                    range: 'last',
                    selected: 'month',
                    comparator: 'Last month',
                  },
                }
              : {};

          const stringOrNumber =
            typeof v.comparator === 'string'
              ? `'${v.comparator}'`
              : v.comparator;

          const labelSameSql = v.comparator
            ? `${v.subject} ${v.operator} ${
                typeof v.comparator === 'object'
                  ? `(${v.comparator
                      .map((c: any) => (typeof c === 'string' ? `'${c}'` : c))
                      .join(', ')})`
                  : stringOrNumber
              }`
            : v.operator
            ? `${v.subject} ${v.operator}`
            : v.subject;

          return {
            id: moment().unix(),
            label:
              v.operator === 'TEMPORAL_RANGE'
                ? v.comparator === 'No filter'
                  ? `${v.subject} (${v.comparator})`
                  : `${v.comparator} ${v.subject} ${v.comparator}`
                : labelSameSql,
            values: {
              saved: '',
              column: findColumn,
              operator: operatorFind,
              aggregate: '',
              option: v.comparator
                ? typeof v.comparator === 'object'
                  ? v.comparator
                  : { label: v.comparator, value: v.comparator }
                : '',
              comparator: v.comparator ? v.comparator : '',
              sql: v.operator === 'TEMPORAL_RANGE' ? v.subject : labelSameSql,
              expressionType: 'SIMPLE',
              clause: 'WHERE',
              ...onTimeRange,
            },
          };
        };

        const metricsOrColumnsFormation = (v: any) => {
          if (
            selectedChart?.dataset.metrics.some((s: any) => s.metric_name === v)
          ) {
            const findItem = selectedChart.dataset.metrics.find(
              (f: any) => f.metric_name === v,
            );
            return {
              id: moment().unix(),
              label: findItem.expression,
              values: {
                saved: findItem,
                column: '',
                operator: '',
                aggregate: '',
                option: '',
                comparator: '',
                sql: '',
                expressionType: 'SAVED',
                clause: 'WHERE',
              },
            };
          }
          if (typeof v === 'string') {
            const findItem = selectedChart?.dataset.columns.find(
              (f: any) => f?.column_name === v,
            );
            return {
              id: moment().unix(),
              label: findItem?.column_name,
              values: {
                saved: '',
                column: findItem,
                operator: '',
                aggregate: '',
                option: '',
                comparator: '',
                sql: findItem?.column_name,
                expressionType: 'SIMPLE',
                clause: 'WHERE',
              },
            };
          }
          return {
            id: moment().unix(),
            label: v?.label,
            values: {
              saved: '',
              column: v?.column ? v.column : '',
              operator: '',
              aggregate: v?.aggregate
                ? { label: v.aggregate, value: v.aggregate }
                : '',
              option: '',
              comparator: '',
              sql: v?.sqlExpression
                ? v.sqlExpression
                : v?.aggregate
                ? v.aggregate === 'COUNT_DISTINCT'
                  ? `COUNT(DISTINCT ${v.column?.column_name})`
                  : `${v.aggregate}(${v.column?.column_name})`
                : v.column?.column_name,
              expressionType: v?.expressionType ? v.expressionType : '',
              clause: 'WHERE',
            },
          };
        };

        const forecastSeasonalityDefaultOrItem = (item: any) =>
          item
            ? forecastSeasonality.find(f => f.value === item)
            : {
                label: t('default'),
                value: 'null',
              };

        const emptyArrayOrOneFindItem = (item: any) =>
          item ? [metricsOrColumnsFormation(item)] : [];

        const groupbyRowGroupbyColumnFormat = (dataset: any, formData: any) =>
          dataset
            ? (dataset.columns || [])
                .map((item: any) => ({
                  id: item.id,
                  label: item.column_name,
                  values: {
                    aggregate: '',
                    clause: 'WHERE',
                    column: item,
                    comparator: '',
                    expressionType: 'SIMPLE',
                    operator: '',
                    option: '',
                    saved: '',
                    sql: item.column_name,
                  },
                }))
                .filter((item: any) =>
                  formData?.some((dataset: any) => dataset === item.label),
                )
            : [];

        const timeseriesLimitMetricSwitch = (vizType: string) => {
          switch (vizType) {
            case 'bubble_v2':
              return emptyArrayOrOneFindItem(getFormData.orderby);
            case 'pivot_table_v2':
              return emptyArrayOrOneFindItem(getFormData.series_limit_metric);

            default:
              return emptyArrayOrOneFindItem(
                getFormData.timeseries_limit_metric,
              );
          }
        };

        const allColumnsSwitch = (vizType: string) => {
          switch (vizType) {
            case 'histogram':
              return getFormData.all_columns_x
                ? getFormData.all_columns_x.map((v: any) =>
                    metricsOrColumnsFormation(v),
                  )
                : [];

            default:
              return getFormData.all_columns
                ? getFormData.all_columns.map((v: any) =>
                    metricsOrColumnsFormation(v),
                  )
                : [];
          }
        };

        const chartFormsFindOptions = (
          field: string,
          value: any,
          findNameField = 'value',
          optionField?: string,
        ) =>
          getFormData?.[field]
            ? chartFormsOption[optionField || field].find(
                (f: any) => f[findNameField] === getFormData[field],
              )
            : value;

        setSelectBars(
          ChartSelectBars.filter(vf =>
            [getFormData.viz_type, ...ChartDefaultSelectBars].includes(
              vf.status,
            ),
          ),
        );

        setActive(getFormData.viz_type);
        setValues({
          ...values,
          x_axis: emptyArrayOrOneFindItem(getFormData.x_axis),
          time_grain_sqla: chartFormsFindOptions('time_grain_sqla', {
            label: t('Day'),
            value: 'P1D',
          }),
          metrics: getFormData?.metrics
            ? getFormData.metrics.map((v: any) => metricsOrColumnsFormation(v))
            : [],
          metrics_b: getFormData?.metrics_b
            ? getFormData.metrics_b.map((v: any) =>
                metricsOrColumnsFormation(v),
              )
            : [],
          groupby: getFormData?.groupby
            ? getFormData.groupby.map((v: any) => metricsOrColumnsFormation(v))
            : [],
          groupby_b: getFormData?.groupby_b
            ? getFormData.groupby_b.map((v: any) =>
                metricsOrColumnsFormation(v),
              )
            : [],
          contributionMode: chartFormsFindOptions('contributionMode', ''),
          adhoc_filters: [
            ...filtersOnItem,
            ...(getFormData?.adhoc_filters
              ? getFormData.adhoc_filters.map((v: any) =>
                  adhocFiltersFormation(v),
                )
              : []),
          ],
          adhoc_filters_b: [
            ...filtersOnItem,
            ...(getFormData?.adhoc_filters_b
              ? getFormData.adhoc_filters_b.map((v: any) =>
                  adhocFiltersFormation(v),
                )
              : []),
          ],
          limit: getFormData?.limit
            ? {
                label: String(getFormData.limit),
                value: String(getFormData.limit),
              }
            : '',
          timeseries_limit_metric: timeseriesLimitMetricSwitch(
            getFormData.viz_type,
          ),
          timeseries_limit_metric_b: getFormData.timeseries_limit_metric_b
            ? emptyArrayOrOneFindItem(getFormData.timeseries_limit_metric_b)
            : [],
          order_desc: getFormData?.order_desc !== false,
          order_desc_b: getFormData?.order_desc_b !== false,
          row_limit: getFormData?.row_limit
            ? {
                label: String(getFormData.row_limit),
                value: String(getFormData.row_limit),
              }
            : {
                label: '10000',
                value: '10000',
              },
          row_limit_b: getFormData?.row_limit_b
            ? {
                label: String(getFormData.row_limit_b),
                value: String(getFormData.row_limit_b),
              }
            : {
                label: '10000',
                value: '10000',
              },
          truncate_metric: getFormData?.truncate_metric !== false,
          truncate_metric_b: getFormData?.truncate_metric_b !== false,
          show_empty_columns: true,
          rolling_type: chartFormsFindOptions('rolling_type', {
            label: t('None'),
            value: 'None',
          }),
          rolling_type_b: chartFormsFindOptions(
            'rolling_type_b',
            {
              label: t('None'),
              value: 'None',
            },
            'value',
            'rolling_type',
          ),
          time_compare: getFormData?.time_compare
            ? getFormData?.time_compare
            : [],
          time_compare_b: getFormData?.time_compare_b
            ? getFormData?.time_compare_b
            : [],
          comparison_type: chartFormsFindOptions('comparison_type', {
            label: t('Actual values'),
            value: 'values',
          }),
          comparison_type_b: chartFormsFindOptions(
            'comparison_type_b',
            {
              label: t('Actual values'),
              value: 'values',
            },
            'value',
            'comparison_type',
          ),
          resample_rule: chartFormsFindOptions('resample_rule', ''),
          resample_rule_b: chartFormsFindOptions(
            'resample_rule_b',
            '',
            'value',
            'resample_rule',
          ),
          resample_method: chartFormsFindOptions('resample_method', ''),
          resample_method_b: chartFormsFindOptions(
            'resample_method_b',
            '',
            'value',
            'resample_method',
          ),
          annotation_layers: [],
          forecastEnabled: getFormData?.forecastEnabled
            ? getFormData.forecastEnabled
            : false,
          forecastPeriods: getFormData?.forecastPeriods
            ? getFormData.forecastPeriods
            : '10',
          forecastInterval: getFormData?.forecastInterval
            ? getFormData.forecastInterval
            : '0.8',
          forecastSeasonalityYearly: forecastSeasonalityDefaultOrItem(
            getFormData?.forecastSeasonalityYearly,
          ),
          forecastSeasonalityWeekly: forecastSeasonalityDefaultOrItem(
            getFormData?.forecastSeasonalityWeekly,
          ),
          forecastSeasonalityDaily: forecastSeasonalityDefaultOrItem(
            getFormData?.forecastSeasonalityDaily,
          ),
          query_mode:
            getFormData?.query_mode === 'raw'
              ? { label: t('RAW RECORDS'), value: 'raw' }
              : { label: t('AGGREGATE'), value: 'aggregate' },
          percent_metrics: getFormData.percent_metrics
            ? getFormData.percent_metrics.map((v: any) =>
                metricsOrColumnsFormation(v),
              )
            : [],
          server_pagination: getFormData?.server_pagination
            ? getFormData.server_pagination
            : false,
          server_page_length: getFormData?.server_page_length
            ? {
                label: String(getFormData.server_page_length),
                value: getFormData.server_page_length,
              }
            : {
                label: t('10'),
                value: 10,
              },
          show_totals: false,
          all_columns: allColumnsSwitch(getFormData.viz_type),
          order_by_cols: [],
          metric: emptyArrayOrOneFindItem(getFormData.metric),
          sort_by_metric: getFormData?.sort_by_metric
            ? getFormData.sort_by_metric
            : false,
          subheader: getFormData?.subheader ? getFormData.subheader : '',
          dimension: emptyArrayOrOneFindItem(getFormData.series),
          entity: emptyArrayOrOneFindItem(getFormData.entity),
          x: emptyArrayOrOneFindItem(getFormData.x),
          y: emptyArrayOrOneFindItem(getFormData.y),
          size: emptyArrayOrOneFindItem(getFormData.size),
          all_columns_x: emptyArrayOrOneFindItem(getFormData.all_columns_x),
          all_columns_y: emptyArrayOrOneFindItem(getFormData.all_columns_y),
          linear_color_scheme: chartFormsFindOptions(
            'linear_color_scheme',
            chartFormsOption.linear_color_scheme.find(
              f => f.id === 'superset_seq_1',
            ),
            'id',
          ),
          xscale_interval: chartFormsFindOptions('xscale_interval', {
            label: '1',
            value: 1,
          }),
          yscale_interval: chartFormsFindOptions('yscale_interval', {
            label: '1',
            value: 1,
          }),
          canvas_image_rendering: chartFormsFindOptions(
            'canvas_image_rendering',
            {
              label: t('pixelated (Sharp)'),
              value: 'pixelated',
            },
          ),
          normalize_across: chartFormsFindOptions('normalize_across', {
            label: t('heatmap'),
            value: 'heatmap',
          }),
          left_margin: chartFormsFindOptions('left_margin', {
            label: t('auto'),
            value: 'auto',
          }),
          bottom_margin: chartFormsFindOptions('bottom_margin', {
            label: t('auto'),
            value: 'auto',
          }),
          xAxisBounds: getFormData?.xAxisBounds
            ? {
                min:
                  getFormData?.xAxisBounds[0] === null
                    ? ''
                    : getFormData?.xAxisBounds[0],
                max:
                  getFormData?.xAxisBounds[1] === null
                    ? ''
                    : getFormData?.xAxisBounds[1],
              }
            : { min: '', max: '' },
          y_axis_bounds: getFormData?.y_axis_bounds
            ? {
                min:
                  getFormData?.y_axis_bounds[0] === null
                    ? ''
                    : getFormData?.y_axis_bounds[0],
                max:
                  getFormData?.y_axis_bounds[1] === null
                    ? ''
                    : getFormData?.y_axis_bounds[1],
              }
            : { min: '', max: '' },
          y_axis_format: chartFormsFindOptions('y_axis_format', {
            label: t('Adaptive formatting'),
            value: 'SMART_NUMBER',
          }),
          time_format: chartFormsFindOptions('time_format', {
            label: t('Adaptive formatting'),
            value: 'smart_date',
          }),
          currency_format: getFormData?.currency_format
            ? {
                symbolPosition: getFormData?.currency_format?.symbolPosition
                  ? chartFormsOption.currency_format.symbolPosition.find(
                      f =>
                        f.value === getFormData.currency_format.symbolPosition,
                    )
                  : '',
                symbol: getFormData?.currency_format?.symbol
                  ? chartFormsOption.currency_format.symbol.find(
                      f => f.value === getFormData.currency_format.symbol,
                    )
                  : '',
              }
            : {},
          sort_x_axis: chartFormsFindOptions('sort_x_axis', {
            label: t('Axis ascending'),
            value: 'alpha_asc',
          }),
          sort_y_axis: chartFormsFindOptions('sort_y_axis', {
            label: t('Axis ascending'),
            value: 'alpha_asc',
          }),
          show_legend: getFormData?.show_legend !== false,
          show_perc: getFormData?.show_perc !== false,
          show_values: getFormData?.show_values
            ? getFormData.show_values
            : false,
          normalized: getFormData?.normalized ? getFormData.normalized : false,
          compare_lag: getFormData?.compare_lag ? getFormData.compare_lag : '',
          compare_suffix: getFormData?.compare_suffix
            ? getFormData.compare_suffix
            : '',
          show_timestamp: getFormData?.show_timestamp
            ? getFormData.show_timestamp
            : false,
          show_trend_line: getFormData?.show_trend_line !== false,
          start_y_axis_at_zero: getFormData?.start_y_axis_at_zero !== false,
          rolling_periods: getFormData?.rolling_periods
            ? getFormData.rolling_periods
            : '',
          rolling_periods_b: getFormData?.rolling_periods_b
            ? getFormData.rolling_periods_b
            : '',
          min_periods: getFormData?.min_periods ? getFormData.min_periods : '',
          min_periods_b: getFormData?.min_periods_b
            ? getFormData.min_periods_b
            : '',
          aggregateFunction: {
            label: getFormData.aggregateFunction,
            value: getFormData.aggregateFunction,
          },
          colSubTotals: getFormData.colSubTotals,
          colTotals: getFormData.colTotals,
          combineMetric: getFormData.combineMetric,
          groupbyColumns: groupbyRowGroupbyColumnFormat(
            selectedChart.dataset,
            getFormData.groupbyColumns,
          ),
          groupbyRows: groupbyRowGroupbyColumnFormat(
            selectedChart.dataset,
            getFormData.groupbyRows,
          ),
          metricsLayout: {
            label: getFormData.metricsLayout,
            value: getFormData.metricsLayout,
          },
          rowSubTotals: getFormData.rowSubTotals,
          rowTotals: getFormData.rowTotals,
          series_limit: {
            label: getFormData.series_limit,
            value: getFormData.series_limit,
          },
          series_limit_b: {
            label: getFormData.series_limit_b,
            value: getFormData.series_limit_b,
          },
          transposePivot: getFormData.transposePivot,
          contribution: getFormData.contribution,
          columns: groupbyRowGroupbyColumnFormat(
            selectedChart.dataset,
            getFormData.columns,
          ),
          country_fieldtype: chartFormsFindOptions(
            'country_fieldtype',
            'country_fieldtype',
            'value',
          ),
          show_bubbles: getFormData.show_bubbles,
          secondary_metric: emptyArrayOrOneFindItem(
            getFormData.secondary_metric,
          ),
          color_picker: getFormData.color_picker,
          color_scheme: chartFormsFindOptions(
            'country_color_scheme',
            chartFormsOption.country_color_scheme.find(
              f => f.id === getFormData.color_scheme,
            ),
            'id',
          ),
          max_bubble_size: {
            label: getFormData.max_bubble_size,
            value: getFormData.max_bubble_size,
          },
          truncateXAxis: getFormData?.truncateXAxis
            ? getFormData.truncateXAxis
            : false,
          truncateYAxis: getFormData?.truncateYAxis
            ? getFormData.truncateYAxis
            : false,
          x_axis_title: getFormData?.x_axis_title
            ? getFormData.x_axis_title
            : '',
          x_axis_title_margin: chartFormsFindOptions('x_axis_title_margin', {
            label: '15',
            value: 15,
          }),
          x_axis_title_position:
            getFormData.viz_type === 'echarts_timeseries_bar' &&
            getFormData?.orientation === 'horizontal'
              ? chartFormsFindOptions('y_axis_title_position', {
                  label: t('Left'),
                  value: 'Left',
                })
              : {
                  label: t('Left'),
                  value: 'Left',
                },
          y_axis_title: getFormData?.y_axis_title
            ? getFormData.y_axis_title
            : '',
          y_axis_title_margin: chartFormsFindOptions('y_axis_title_margin', {
            label: '15',
            value: 15,
          }),
          y_axis_title_position:
            getFormData.viz_type === 'echarts_timeseries_bar' &&
            getFormData?.orientation === 'horizontal'
              ? {
                  label: t('Left'),
                  value: 'Left',
                }
              : chartFormsFindOptions('y_axis_title_position', {
                  label: t('Left'),
                  value: 'Left',
                }),
          sort_series_type: chartFormsFindOptions('sort_series_type', {
            label: t('Total value'),
            value: 'sum',
          }),
          sort_series_ascending: getFormData?.sort_series_ascending
            ? getFormData.sort_series_ascending
            : false,
          seriesType: chartFormsFindOptions('seriesType', {
            label: t('Line'),
            value: 'line',
          }),
          show_value: getFormData?.show_value ? getFormData.show_value : false,
          stack: chartFormsFindOptions('stack', {
            label: t('None'),
            value: 'null',
          }),
          only_total: getFormData?.only_total !== false,
          percentage_threshold: getFormData?.percentage_threshold,
          area: getFormData?.area ? getFormData.area : false,
          opacity: getFormData?.opacity
            ? getFormData.opacity
            : active === 'bubble_v2'
            ? 0.6
            : 0.2,
          markerEnabled: getFormData?.markerEnabled
            ? getFormData.markerEnabled
            : false,
          markerSize: getFormData?.markerSize ? getFormData.markerSize : 6,
          zoomable: getFormData?.zoomable ? getFormData.zoomable : false,
          minorTicks: getFormData?.minorTicks ? getFormData.minorTicks : false,
          legendType: chartFormsFindOptions('legendType', {
            label: t('Scroll'),
            value: 'scroll',
          }),
          legendOrientation: chartFormsFindOptions('legendOrientation', {
            label: t('Top'),
            value: 'top',
          }),
          legendMargin: getFormData?.legendMargin
            ? getFormData.legendMargin
            : '',
          x_axis_time_format: chartFormsFindOptions(
            'x_axis_time_format',
            {
              label: t('Adaptive formatting'),
              value: 'smart_date',
            },
            'value',
            'time_format',
          ),
          xAxisLabelRotation: chartFormsFindOptions('xAxisLabelRotation', {
            label: '0°',
            value: 0,
          }),
          rich_tooltip: getFormData?.rich_tooltip !== false,
          tooltipSortByMetric: getFormData?.tooltipSortByMetric
            ? getFormData.tooltipSortByMetric
            : false,
          tooltipTimeFormat: chartFormsFindOptions(
            'tooltipTimeFormat',
            {
              label: t('Adaptive formatting'),
              value: 'smart_date',
            },
            'value',
            'time_format',
          ),
          logAxis: getFormData?.logAxis ? getFormData.logAxis : false,
          minorSplitLine: getFormData?.minorSplitLine
            ? getFormData.minorSplitLine
            : false,
          orientation:
            getFormData?.orientation === 'horizontal'
              ? { label: t('HORIZONTAL'), value: 'horizontal' }
              : { label: t('VERTICAL'), value: 'vertical' },
        });

        setChartStatus('loading');
        setChartApiUrl(
          onlyExploreJson.includes(getFormData.viz_type)
            ? 'explore_json/'
            : 'chart/data',
        );

        // {"slice_id":${
        //     history.location.search.split('?slice_id=')[1]
        //   }

        // setChartApiUrl(
        //   `chart/data/?form_data=%7B%22slice_id%22%3A${
        //     history.location.search.split('?slice_id=')[1]
        //   }%7D`,
        // );

        // setExploreJsonUrl(
        //   `explore_json/?form_data=%7B%22slice_id%22%3A${
        //     history.location.search.split('?slice_id=')[1]
        //   }%7D`,
        // );
        // setExploreJsonResultsUrl(
        //   `explore_json/?form_data=%7B%22slice_id%22%3A${
        //     history.location.search.split('?slice_id=')[1]
        //   }%7D&results=true`,
        // );
      } else {
        setActive('table');
      }
    }
  }, [history.location.search, selectedChart?.form_data]);

  const metricsFormation = (valueKey: string) =>
    values[valueKey].map((v: any) =>
      v.values.saved?.metric_name
        ? v.values.saved.metric_name
        : {
            expressionType: v.values.expressionType,
            column: v.values.column?.column_name ? v.values.column : null,
            aggregate: v.values.aggregate?.value
              ? v.values.aggregate.value
              : null,
            sqlExpression:
              v.values.column?.column_name || v.values.saved?.metric_name
                ? null
                : v.values.sql,
            datasourceWarning: false,
            hasCustomLabel: false,
            label: v.label,
            optionName: `metric_${Math.random()
              .toString(36)
              .substring(2, 15)}_${Math.random()
              .toString(36)
              .substring(2, 15)}`,
          },
    );

  const withoutValueForNull = (vl: any) =>
    vl?.value ? (vl.value === 'null' ? null : vl.value) : undefined;

  const postProcessingAggregates = (
    data: any[],
    labelAndValueSame?: boolean,
  ) => {
    const result = {};

    data.forEach(item => {
      result[item.label] = labelAndValueSame
        ? item.label
        : { operator: 'mean' };
    });

    return result;
  };

  const droppedOnlyLabels = (dataKey: string) =>
    values[dataKey].map((ac: any) =>
      ac.values.expressionType === 'SQL'
        ? {
            expressionType: ac.values.expressionType,
            label: ac.label,
            sqlExpression: ac.values.sql,
          }
        : ac.label,
    );

  const droppedOnlyLabelOrYear = (
    dataKey: string,
    defaultTimeGrain?: boolean,
  ) =>
    values[dataKey].map((ac: any) =>
      ac.values.column?.is_dttm
        ? {
            timeGrain: defaultTimeGrain ? 'P1D' : values.time_grain_sqla?.value,
            columnType: 'BASE_AXIS',
            sqlExpression: ac.label,
            label: ac.label,
            expressionType: 'SQL',
          }
        : active === 'mixed_timeseries'
        ? {
            timeGrain: defaultTimeGrain ? 'P1D' : values.time_grain_sqla?.value,
            columnType: 'BASE_AXIS',
            sqlExpression: ac.label,
            label: ac.label,
            expressionType: 'SQL',
          }
        : ac.values.expressionType === 'SQL'
        ? {
            expressionType: ac.values.expressionType,
            label: ac.label,
            sqlExpression: ac.values.sql,
          }
        : ac.values.sql,
    );

  const postProcessingRename =
    values.metrics.length === 1 && values.groupby.length
      ? {
          operation: 'rename',
          options: {
            columns: {
              [values.metrics[0].label]: null,
            },
            level: 0,
            inplace: true,
          },
        }
      : {};

  const postProcessingRollingChartActives = [
    'echarts_timeseries_line',
    'echarts_timeseries_bar',
    'echarts_area',
    'big_number',
    'echarts_timeseries_scatter',
  ];

  const postProcessingRollingTypeOperatorSwitch = (vl: string) => {
    switch (vl) {
      case 'mean':
      case 'std':
      case 'sum':
        return {
          min_periods: values.min_periods ? Number(values.min_periods) : 0,
          rolling_type: vl,
          window: values.rolling_periods ? Number(values.rolling_periods) : 1,
        };
      case 'cumsum':
        return {
          operator: 'sum',
        };
      default:
        return {};
    }
  };

  const postProcessingRollingType = {
    operation: values.rolling_type.value === 'cumsum' ? 'cum' : 'rolling',
    options: {
      columns: postProcessingAggregates(
        active === 'big_number' ? values.metric : values.metrics,
        true,
      ),
      ...postProcessingRollingTypeOperatorSwitch(values.rolling_type.value),
    },
  };

  const arrayOnlyOneItemFormation = (data: any[]) => {
    const uniqueItems = new Set();
    return data.filter((item: any) => {
      if (item !== null) {
        const serializedItem = JSON.stringify(item);
        if (!uniqueItems.has(serializedItem)) {
          uniqueItems.add(serializedItem);
          return true;
        }
        return false;
      }
      return true;
    });
  };

  const onNullOrUndefinded = [null, undefined];

  const queriesOrderBySwitch = () => {
    switch (active) {
      case 'table':
        return values.order_by_cols;
      case 'big_number_total':
      case 'pie':
      case 'funnel':
      case 'gauge_chart':
        return [[metricsFormation('metric')[0], false]];
      case 'bubble_v2':
        return values.timeseries_limit_metric.length
          ? [[metricsFormation('timeseries_limit_metric')[0], false]]
          : undefined;
      case 'pivot_table_v2':
        return values.timeseries_limit_metric.length
          ? [[metricsFormation('timeseries_limit_metric')[0], false]]
          : [[metricsFormation('metrics')[0], false]];
      case 'histogram':
        return [];
      case 'waterfall':
        return [
          !onNullOrUndefinded.includes(values.groupby[0]?.label) && [
            values.groupby[0]?.label,
            true,
          ],
          [values.x_axis[0]?.label, true],
        ].filter(item => item !== false && item !== null);
      case 'mixed_timeseries':
        return values.timeseries_limit_metric.length
          ? [values.timeseries_limit_metric[0]?.label, false]
          : [];
      default:
        return [[metricsFormation('metrics')[0], false]];
    }
  };

  const queriesColumnsSwitch = () => {
    switch (active) {
      case 'table':
        return arrayOnlyOneItemFormation(droppedOnlyLabels('all_columns'));
      case 'pivot_table_v2':
        return arrayOnlyOneItemFormation([
          ...droppedOnlyLabelOrYear('groupbyColumns'),
          ...droppedOnlyLabelOrYear('groupbyRows'),
        ]);
      case 'bubble_v2':
        return [
          ...droppedOnlyLabels('entity'),
          ...droppedOnlyLabels('dimension'),
        ];
      case 'mixed_timeseries':
        return arrayOnlyOneItemFormation([
          ...droppedOnlyLabelOrYear('x_axis', true),
          ...values.groupby.map((v: any) => v.label),
        ]);
      default:
        return arrayOnlyOneItemFormation([
          ...droppedOnlyLabelOrYear('x_axis'),
          ...droppedOnlyLabels('groupby'),
        ]);
    }
  };

  const queriesMetricsSwitch = () => {
    switch (active) {
      case 'big_number_total':
      case 'pie':
      case 'funnel':
      case 'gauge_chart':
      case 'waterfall':
      case 'big_number':
        return metricsFormation('metric');
      case 'bubble_v2':
        return [
          metricsFormation('x')[0],
          metricsFormation('y')[0],
          metricsFormation('size')[0],
        ];
      default:
        return metricsFormation('metrics');
    }
  };

  const checkObjectFormation = (value: any) => {
    const result = {};
    const objectInArray: any = Object.entries(value);
    for (let i = 0; i < objectInArray.length; i += 1) {
      const element = objectInArray[i];
      if (typeof element[1] === 'object') {
        result[element[0]] = element[1].value;
      }
    }
    return result;
  };

  const checkObjectOrNullArrayFormation = (value: any) =>
    Object.entries(value).map(i => (i[1] ? Number(i[1]) : null));

  const formDataObj = {
    datasource: {
      id: selectedChart?.form_data?.url_params?.datasource_id,
      type: selectedChart?.form_data?.url_params?.datasource_type,
    },
    force: false,
    form_data: {
      datasource: selectedChart?.form_data?.datasource,
      viz_type: active,
      url_params: selectedChart?.form_data?.url_params,
      x_axis: values.x_axis[0]?.label,
      time_grain_sqla: values.time_grain_sqla?.value,
      x_axis_sort_asc: true,
      x_axis_sort_series: 'name',
      x_axis_sort_series_ascending: true,
      metrics: metricsFormation('metrics'),
      metrics_b: metricsFormation('metrics_b'),
      groupby: droppedOnlyLabels('groupby'),
      groupby_b: droppedOnlyLabels('groupby_b'),
      adhoc_filters: values.adhoc_filters.map((v: any) => ({
        expressionType: v.values.expressionType,
        subject: v.values.column.column_name,
        operator: v.values.operator.value,
        operatorId: v.values.column.python_date_format
          ? undefined
          : v.values.operator.value,
        comparator: v.values.comparator,
        clause: v.values.clause,
        sqlExpression: null,
        isExtra: false,
        isNew: false,
        datasourceWarning: false,
        filterOptionName: `filter_${Math.random()
          .toString(36)
          .substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
      })),
      adhoc_filters_b: values.adhoc_filters_b.map((v: any) => ({
        expressionType: v.values.expressionType,
        subject: v.values.column.column_name,
        operator: v.values.operator.value,
        operatorId: v.values.column.python_date_format
          ? undefined
          : v.values.operator.value,
        comparator: v.values.comparator,
        clause: v.values.clause,
        sqlExpression: null,
        isExtra: false,
        isNew: false,
        datasourceWarning: false,
        filterOptionName: `filter_${Math.random()
          .toString(36)
          .substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
      })),
      order_desc: values.order_desc,
      order_desc_b: values.order_desc_b,
      row_limit: Number(values.row_limit.value),
      row_limit_b: Number(values.row_limit.value),
      truncate_metric: values.truncate_metric,
      truncate_metric_b: values.truncate_metric_b,
      show_empty_columns: values.show_empty_columns,
      comparison_type: values.comparison_type.value,
      comparison_type_b: values.comparison_type_b.value,
      annotation_layers: [],
      forecastPeriods: values.forecastPeriods,
      forecastInterval: values.forecastInterval,
      sort_series_type: values.sort_series_type.value,
      sort_series_ascending: values.sort_series_ascending ? true : undefined,
      color_scheme: values.color_scheme
        ? values.color_scheme.id
        : 'supersetColors',
      seriesType: values.seriesType.value,
      seriesTypeB: 'line',
      only_total: values.only_total,
      area: values.area,
      opacity: values.opacity,
      opacityB: 0.2,
      markerEnabled: values.markerEnabled,
      markerSize: values.markerEnabled ? values.markerSize : 6,
      markerSizeB: 6,
      orientation:
        active === 'echarts_timeseries_bar'
          ? values.orientation.value
          : 'vertical',
      show_legend: values.show_legend,
      legendMargin: values.show_legend
        ? values.legendMargin
          ? Number(values.legendMargin)
          : null
        : null,
      legendOrientation: values.show_legend
        ? values.legendOrientation.value
        : 'top',
      legendType: values.show_legend ? values.legendType.value : 'scroll',
      max_bubble_size: values.max_bubble_size
        ? values.max_bubble_size.value
        : '25',
      x_axis_time_format: values.x_axis_time_format.value,
      rich_tooltip: values.rich_tooltip,
      tooltipSortByMetric: values.rich_tooltip
        ? values.tooltipSortByMetric
        : false,
      tooltipTimeFormat: values.tooltipTimeFormat.value,
      y_axis_format: values.y_axis_format.value,
      truncateXAxis: values.truncateXAxis,
      truncateYAxis: values.truncateYAxis,
      xAxisBounds: checkObjectOrNullArrayFormation(values.xAxisBounds),
      y_axis_bounds:
        active === 'heatmap'
          ? checkObjectOrNullArrayFormation(values.y_axis_bounds)
          : values.truncateYAxis
          ? checkObjectOrNullArrayFormation(values.y_axis_bounds)
          : [null, null],
      extra_form_data: {},
      force: false,
      result_format: 'json',
      result_type: 'full',
      timeseries_limit_metric: values.timeseries_limit_metric.length
        ? metricsFormation('timeseries_limit_metric')[0]
        : undefined,
      timeseries_limit_metric_b: values.timeseries_limit_metric_b.length
        ? metricsFormation('timeseries_limit_metric_b')[0]
        : undefined,
      cache_timeout: undefined,
      contributionMode: withoutValueForNull(values.contributionMode),
      currency_format: checkObjectFormation(values.currency_format),
      forecastEnabled: values.forecastEnabled,
      forecastSeasonalityDaily: withoutValueForNull(
        values.forecastSeasonalityDaily,
      ),
      forecastSeasonalityWeekly: withoutValueForNull(
        values.forecastSeasonalityWeekly,
      ),
      forecastSeasonalityYearly: withoutValueForNull(
        values.forecastSeasonalityYearly,
      ),
      limit: withoutValueForNull(values.limit),
      logAxis: values.logAxis,
      min_periods: values.min_periods ? Number(values.min_periods) : undefined,
      min_periods_b: values.min_periods_b
        ? Number(values.min_periods_b)
        : undefined,
      minorSplitLine: values.minorSplitLine ? values.minorSplitLine : undefined,
      minorTicks: values.minorTicks ? values.minorTicks : undefined,
      percentage_threshold:
        values.show_value && !values.only_total
          ? Number(values.percentage_threshold)
          : undefined,
      resample_method: withoutValueForNull(values.resample_method),
      resample_method_b: withoutValueForNull(values.resample_method_b),
      resample_rule: withoutValueForNull(values.resample_rule),
      resample_rule_b: withoutValueForNull(values.resample_rule_b),
      rolling_periods: values.rolling_periods
        ? values.rolling_periods
        : undefined,
      rolling_periods_b: values.rolling_periods_b
        ? values.rolling_periods_b
        : undefined,
      rolling_type: withoutValueForNull(values.rolling_type),
      rolling_type_b: withoutValueForNull(values.rolling_type_b),
      show_value: values.show_value,
      slice_id: undefined,
      stack: values.stack.value === 'null' ? undefined : values.stack.value,
      time_compare: values.time_compare,
      time_compare_b: values.time_compare_b,
      xAxisForceCategorical: undefined,
      xAxisLabelRotation: values.xAxisLabelRotation.value,
      x_axis_sort: undefined,
      x_axis_title: values.x_axis_title ? values.x_axis_title : undefined,
      x_axis_title_margin: values.x_axis_title_margin.value,
      y_axis_title: values.y_axis_title ? values.y_axis_title : undefined,
      y_axis_title_margin: values.y_axis_title_margin.value,
      y_axis_title_position:
        active === 'echarts_timeseries_bar' &&
        values.orientation.value === 'horizontal'
          ? values.x_axis_title_position.value
          : values.y_axis_title_position.value,
      zoomable: values.zoomable ? values.zoomable : undefined,
      header_font_size: 0.4,
      metric: metricsFormation('metric')[0],
      date_format: 'smart_date',
      innerRadius: 30,
      label_type: 'key',
      labels_outside: true,
      number_format: 'SMART_NUMBER',
      outerRadius: 70,
      show_labels: true,
      show_labels_threshold: 5,
      sort_by_metric: values.sort_by_metric,
      subheader: values.subheader,
      subheader_font_size: 0.15,
      time_format:
        active === 'heatmap' ? values.time_format.value : 'smart_date',
      all_columns: droppedOnlyLabels('all_columns'),
      all_columns_x:
        active === 'heatmap'
          ? droppedOnlyLabels('all_columns_x')[0]
          : droppedOnlyLabels('all_columns'),
      all_columns_y: droppedOnlyLabels('all_columns_y')[0],
      color_pn: true,
      query_mode: values.query_mode.value,
      include_time:
        active === 'table' && values.query_mode.value === 'aggregate'
          ? undefined
          : false,
      order_by_cols: values.order_by_cols,
      percent_metrics: metricsFormation('percent_metrics'),
      server_page_length: values.server_page_length.value,
      show_cell_bars: true,
      table_timestamp_format: 'smart_date',
      temporal_columns_lookup: selectedChart?.dataset?.columns.length
        ? Object.fromEntries(
            selectedChart?.dataset?.columns
              ?.filter((item: any) => item.is_dttm === true)
              .map((item: any) => [item.column_name, true]),
          )
        : {},
      server_pagination: values.server_pagination,
      entity:
        active === 'world_map'
          ? values.entity[0]?.label
            ? values.entity[0].label
            : undefined
          : droppedOnlyLabels('entity')[0],
      orderby: values.timeseries_limit_metric.length
        ? metricsFormation('timeseries_limit_metric')[0]
        : undefined,
      series: droppedOnlyLabels('dimension')[0],
      size: metricsFormation('size')[0],
      tooltipSizeFormat: 'SMART_NUMBER',
      x: metricsFormation('x')[0],
      xAxisFormat: 'SMART_NUMBER',
      y: metricsFormation('y')[0],
      show_tooltip_labels: true,
      tooltip_label_type: 5,
      linear_color_scheme: values.linear_color_scheme.id,
      xscale_interval: values.xscale_interval.value,
      yscale_interval: values.yscale_interval.value,
      canvas_image_rendering: values.canvas_image_rendering.value,
      normalize_across: values.normalize_across.value,
      left_margin: values.left_margin.value,
      bottom_margin: values.bottom_margin.value,
      sort_x_axis: values.sort_x_axis.value,
      sort_y_axis: values.sort_y_axis.value,
      show_perc: values.show_perc,
      show_values: values.show_values,
      normalized: values.normalized,
      animation: true,
      end_angle: -45,
      font_size: 15,
      overlap: true,
      show_pointer: true,
      show_progress: true,
      split_number: 10,
      start_angle: 225,
      value_formatter: '{value}',
      decrease_color: { r: 224, g: 67, b: 85, a: 1 },
      increase_color: { r: 90, g: 193, b: 137, a: 1 },
      total_color: { r: 102, g: 102, b: 102, a: 1 },
      x_ticks_layout: 'auto',
      color_picker: values.color_picker
        ? values.color_picker
        : { r: 0, g: 122, b: 135, a: 1 },
      compare_lag: values.compare_lag,
      compare_suffix: values.compare_suffix,
      show_timestamp: values.show_timestamp,
      show_trend_line: values.show_trend_line,
      start_y_axis_at_zero: values.start_y_axis_at_zero,
      aggregateFunction: values.aggregateFunction.value,
      colOrder: 'key_a_to_z',
      colSubTotals: values.colSubTotals,
      colTotals: values.colTotals,
      combineMetric: values.combineMetric,
      groupbyColumns: values?.groupbyColumns
        ? values.groupbyColumns.map((v: any) => v.label)
        : [],
      groupbyRows: values?.groupbyRows
        ? values.groupbyRows.map((v: any) => v.label)
        : [],
      metricsLayout: values.metricsLayout.value,
      rowOrder: 'key_a_to_z',
      rowSubTotals: values.rowSubTotals,
      rowTotals: values.rowTotals,
      series_limit_metric: values.timeseries_limit_metric.length
        ? metricsFormation('timeseries_limit_metric')[0]
        : undefined,
      transposePivot: values.transposePivot,
      valueFormat: 'SMART_NUMBER',
      series_limit: values.series_limit ? Number(values.series_limit.value) : 0,
      series_limit_b: values.series_limit_b
        ? Number(values.series_limit_b.value)
        : 0,
      contribution: values.contribution,
      columns:
        active === 'dist_bar' && values?.columns
          ? values?.columns.map((v: any) => v.label)
          : [],
      show_bubbles: values.show_bubbles,
      country_fieldtype: values.country_fieldtype?.value,
      secondary_metric: metricsFormation('secondary_metric')[0],
      y_axis_bounds_secondary: [null, null],
      y_axis_format_secondary: 'SMART_NUMBER',
      link_length: 5,
    },
    queries: [
      {
        filters: values.adhoc_filters
          .filter((v: any) => v.values.expressionType !== 'SQL')
          .map((v: any) => ({
            col: v.values.column.column_name,
            op: v.values.operator.value,
            val: v.values.comparator,
          })),
        extras: {
          time_grain_sqla:
            active === 'bubble_v2' ? undefined : values.time_grain_sqla?.value,
          having: values.adhoc_filters
            .filter(
              (v: any) =>
                v.values.expressionType === 'SQL' &&
                v.values.clause === 'HAVING',
            )
            .map((v: any) => `(${v.values.sql})`)
            .join(' AND '),
          where: values.adhoc_filters
            .filter(
              (v: any) =>
                v.values.expressionType === 'SQL' &&
                v.values.clause === 'WHERE',
            )
            .map((v: any) => `(${v.values.sql})`)
            .join(' AND '),
        },
        applied_time_extras: {},
        columns: queriesColumnsSwitch(),
        metrics: queriesMetricsSwitch(),
        orderby: queriesOrderBySwitch(),
        annotation_layers: [],
        row_limit: Number(values.row_limit.value),
        series_columns: droppedOnlyLabels('groupby'),
        series_limit: values.series_limit?.value
          ? Number(values.series_limit.value)
          : 0,
        order_desc: active === 'pivot_table_v2' ? values.order_desc : true,
        url_params: selectedChart?.form_data?.url_params,
        custom_params: {},
        custom_form_data: {},
        time_offsets:
          active === 'mixed_timeseries' && values.time_compare
            ? values.time_compare
            : [],
        post_processing:
          active === 'table'
            ? []
            : [
                {
                  operation: 'pivot',
                  options: {
                    index: [values.x_axis[0]?.label],
                    columns: values.groupby.map((vg: any) => vg.values.sql),
                    aggregates: postProcessingAggregates(
                      active === 'big_number' ? values.metric : values.metrics,
                    ),
                    drop_missing_columns: false,
                  },
                },
                ...(Object.keys(postProcessingRename).length !== 0
                  ? [postProcessingRename]
                  : []),
                ...(postProcessingRollingChartActives.includes(active) &&
                values.rolling_type.value !== 'None'
                  ? [postProcessingRollingType]
                  : []),
                {
                  operation: 'flatten',
                },
              ],
        series_limit_metric: values.timeseries_limit_metric.length
          ? metricsFormation('timeseries_limit_metric')[0]
          : undefined,
      },
      ...(active === 'mixed_timeseries'
        ? [
            {
              filters: values.adhoc_filters_b
                .filter((v: any) => v.values.expressionType !== 'SQL')
                .map((v: any) => ({
                  col: v.values.column.column_name,
                  op: v.values.operator.value,
                  val: v.values.comparator,
                })),
              extras: {
                time_grain_sqla: values.time_grain_sqla?.value,
                having: values.adhoc_filters_b
                  .filter(
                    (v: any) =>
                      v.values.expressionType === 'SQL' &&
                      v.values.clause === 'HAVING',
                  )
                  .map((v: any) => `(${v.values.sql})`)
                  .join(' AND '),
                where: values.adhoc_filters_b
                  .filter(
                    (v: any) =>
                      v.values.expressionType === 'SQL' &&
                      v.values.clause === 'WHERE',
                  )
                  .map((v: any) => `(${v.values.sql})`)
                  .join(' AND '),
              },
              applied_time_extras: {},
              columns: arrayOnlyOneItemFormation([
                ...droppedOnlyLabelOrYear('x_axis'),
                ...values.groupby_b.map((v: any) => v.label),
              ]),
              metrics: metricsFormation('metrics_b'),
              orderby: values.timeseries_limit_metric_b.length
                ? [[metricsFormation('timeseries_limit_metric_b')[0], false]]
                : undefined,
              annotation_layers: [],
              row_limit: Number(values.row_limit_b.value),
              series_columns: droppedOnlyLabels('groupby_b'),
              series_limit: values.series_limit_b?.value
                ? Number(values.series_limit_b.value)
                : 0,
              url_params: selectedChart?.form_data?.url_params,
              custom_params: {},
              custom_form_data: {},
              time_offsets: values.time_compare_b ? values.time_compare_b : [],
              post_processing: [
                {
                  operation: 'pivot',
                  options: {
                    index: [values.x_axis[0]?.label],
                    columns: values.groupby_b.map((vg: any) => vg.values.sql),
                    aggregates: postProcessingAggregates(values.metrics_b),
                    drop_missing_columns: false,
                  },
                },
                ...(Object.keys(postProcessingRename).length !== 0
                  ? [postProcessingRename]
                  : []),
                ...(postProcessingRollingChartActives.includes(active) &&
                values.rolling_type.value !== 'None'
                  ? [postProcessingRollingType]
                  : []),
                {
                  operation: 'flatten',
                },
              ],
            },
          ]
        : []),
    ],
    result_format: 'json',
    result_type: 'full',
    series_limit_metric: values.timeseries_limit_metric[0]?.saved?.metric_name,
  };

  const onlyVizChartFindFormPayload = (formKey: string) => {
    let result: any;
    const findChartForm: any = DvtChartFormPayloads.find(
      fv => fv.viz_name === active,
    );

    const onSortByMetric = findChartForm?.form_data.includes('sort_by_metric');

    if (Array.isArray(formDataObj[formKey])) {
      result = formDataObj[formKey].map((q: any) => {
        const filteredQuery = {};
        findChartForm?.[formKey].forEach((key: any) => {
          if (
            q.hasOwnProperty(key) &&
            !(
              (onSortByMetric ? !values.sort_by_metric : false) &&
              key === 'orderby'
            )
          ) {
            filteredQuery[key] = q[key];
          }
        });

        return filteredQuery;
      });
    } else {
      const objResult = {};
      findChartForm?.[formKey].forEach((key: any) => {
        if (formDataObj[formKey].hasOwnProperty(key)) {
          objResult[key] = formDataObj[formKey][key];
        }
      });

      result = objResult;
    }

    return result;
  };

  useEffect(() => {
    if (modalComponent === 'save-chart') {
      dispatch(
        dvtChartSetQueryContext({
          ...formDataObj,
          form_data: onlyVizChartFindFormPayload('form_data'),
          queries: onlyVizChartFindFormPayload('queries'),
        }),
      );
    }
  }, [modalComponent]);

  const formData = new FormData();
  formData.append(
    'form_data',
    JSON.stringify(onlyVizChartFindFormPayload('form_data')),
  );

  const chartConfig = onlyExploreJson.includes(active)
    ? {
        defaultParam: '/',
        headers: {
          'Content-Disposition': 'form-data; name="form_data"',
        },
        body: formData,
        formData: true,
        withoutJson: true,
      }
    : {
        body: {
          ...formDataObj,
          form_data: onlyVizChartFindFormPayload('form_data'),
          queries: objectIsEmptyForArray(
            onlyVizChartFindFormPayload('queries'),
          ),
        },
      };

  const chartResultsConfig = onlyExploreJson.includes(active)
    ? {
        defaultParam: '/',
        headers: {
          'Content-Disposition': 'form-data; name="form_data"',
        },
        body: formData,
        formData: true,
        withoutJson: true,
      }
    : {
        body: {
          ...formDataObj,
          form_data: {
            ...onlyVizChartFindFormPayload('form_data'),
            result_type: 'results',
          },
          queries: objectIsEmptyForArray(
            onlyVizChartFindFormPayload('queries'),
          ),
          result_type: 'results',
        },
      };

  const chartFullPromise = useFetch({
    url: chartApiUrl,
    method: 'POST',
    ...chartConfig,
  });

  const resultUrlExploreJson =
    chartApiUrl && onlyExploreJson.includes(active)
      ? `${chartApiUrl}?results=true`
      : chartApiUrl;

  const chartResultsPromise = useFetch({
    url: resultUrlExploreJson,
    method: 'POST',
    ...chartResultsConfig,
  });

  const chartSamplePromise = useFetch({
    url: sampleApiUrl,
    method: 'POST',
    body: {},
  });

  useEffect(() => {
    if (chartFullPromise.data) {
      const resultChartRender = onlyExploreJson.includes(active)
        ? [chartFullPromise.data]
        : chartFullPromise.data.result;
      setChartData(resultChartRender);
      setChartStatus('success');
    }
    if (chartFullPromise.error) {
      setChartStatus('failed');
      const errorOrMessage = onlyExploreJson.includes(active)
        ? 'error'
        : 'message';
      if (chartFullPromise.error?.errors) {
        setChartData(chartFullPromise.error.errors);
      } else if (chartFullPromise.error?.[errorOrMessage]) {
        setChartData([
          {
            error: chartFullPromise.error[errorOrMessage],
            message: chartFullPromise.error[errorOrMessage],
          },
        ]);
      }
    }
    if (
      (chartFullPromise.data || chartFullPromise.error) &&
      !firstChartCreated
    ) {
      setFirstChartCreated(true);
    }
  }, [chartFullPromise.error, chartFullPromise.data]);

  useEffect(() => {
    if (chartStatus === 'success') {
      setChartStatus('rendered');
    }
  }, [chartStatus]);

  useEffect(() => {
    if (chartResultsPromise.data) {
      const onlyExploreJsonResult = onlyExploreJson.includes(active)
        ? chartResultsPromise.data
        : chartResultsPromise.data.result.length
        ? chartResultsPromise.data.result[0]
        : { colnames: [], data: [] };
      const firstObjectItem = onlyExploreJsonResult?.colnames;
      const headerFormation = firstObjectItem.map((v: any, i: number) => ({
        id: i,
        title: v,
        field: v,
        sort: true,
      }));
      setResultHeader(headerFormation);
      setResultData(onlyExploreJsonResult.data);
    }
    if (chartResultsPromise.error) {
      setResultData([]);
    }
  }, [chartResultsPromise.data, chartResultsPromise.error]);

  useEffect(() => {
    if (!chartFullPromise.loading && !chartResultsPromise.loading) {
      setChartApiUrl('');
    }
  }, [chartFullPromise.loading, chartResultsPromise.loading]);

  useEffect(() => {
    if (!sampleLoading) {
      setSampleApiUrl('');
    }
  }, [sampleLoading]);

  useEffect(() => {
    if (resultData.length && tabs.value === 'samples') {
      setSampleLoading(true);
      setSampleApiUrl(
        `datasource/samples?force=false&datasource_type=${selectedChart?.form_data?.url_params?.datasource_type}&datasource_id=${selectedChart?.form_data?.url_params?.datasource_id}`,
      );
    }
  }, [resultData.length, tabs.value]);

  useEffect(() => {
    if (chartSamplePromise.data) {
      const firstObjectItem = chartSamplePromise.data.result?.colnames;
      const headerFormation = firstObjectItem.map((v: any, i: number) => ({
        id: i,
        title: v,
        field: v,
        sort: true,
      }));
      setSampleHeader(headerFormation);
      setSampleData(chartResultsPromise.data.result.data);
    }
    if (chartSamplePromise.error || chartSamplePromise.data) {
      setSampleLoading(false);
    }
  }, [chartSamplePromise.data, chartSamplePromise.error]);

  const sortFormationForTable = (data: any[], sort: any) =>
    data.sort((a, b) => {
      if (typeof a[sort.column] === 'string') {
        return sort.direction === 'asc'
          ? a[sort.column].localeCompare(b[sort.column])
          : b[sort.column].localeCompare(a[sort.column]);
      }
      return sort.direction === 'asc'
        ? a[sort.column] - b[sort.column]
        : b[sort.column] - a[sort.column];
    });

  useEffect(() => {
    if (resultSort.column) {
      setResultData(sortFormationForTable(resultData, resultSort));
    }
  }, [resultSort]);

  useEffect(() => {
    if (sampleSort.column) {
      setResultData(sortFormationForTable(sampleData, sampleSort));
    }
  }, [sampleSort]);

  useEffect(
    () => () => {
      dispatch(dvtChartSetSelectedChart({}));
      dispatch(dvtChartSetSlice({ id: '', name: '' }));
    },
    [],
  );

  const {
    ref: chartPanelRef,
    observerRef: resizeObserverRef,
    width: chartPanelWidth,
    height: chartPanelHeight,
  } = useResizeDetectorByObserver();

  const createChartDisableds = (vizType: string, active?: string) => {
    switch (vizType) {
      case 'echarts_timeseries_line':
      case 'echarts_timeseries_bar':
      case 'echarts_area':
        return !(values.x_axis.length && values.metrics.length);
      case 'table':
        return values.query_mode.value === 'aggregate'
          ? !(
              !!values.groupby.length ||
              !!values.metrics.length ||
              !!values.percent_metrics.length
            )
          : !values.all_columns.length;
      case 'big_number_total':
      case 'pie':
      case 'funnel':
      case 'gauge_chart':
        return !values.metric.length;
      case 'histogram':
        return !values.all_columns.length;
      case 'heatmap':
        return !(
          values.all_columns_x.length &&
          values.all_columns_y.length &&
          values.metric.length
        );
      case 'bubble_v2':
        return !(
          values.entity.length &&
          values.x.length &&
          values.y.length &&
          values.size.length
        );
      case 'big_number':
        return !(values.metric.length && values.x_axis.length);
      case 'waterfall':
        return !(values.metric.length && values.x_axis.length);
      case 'pivot_table_v2':
        return !values.metrics.length;
      case 'dist_bar':
        return !(values.metrics.length && values.groupby.length);
      case 'world_map':
        return !(values.entity.length && values.metric.length);
      case 'mixed_timeseries':
        if (active) {
          if (active === 'sharedQueryFields') {
            return !values.x_axis.length;
          }
          if (active === 'queryA') {
            return !values.metrics.length;
          }
          if (active === 'queryB') {
            return !values.metrics_b.length;
          }
        }
        return !(
          values.x_axis.length &&
          values.metrics.length &&
          values.metrics_b.length
        );
      default:
        return false;
    }
  };

  const anotherFormsNoError = (vizType: string) => {
    switch (vizType) {
      case 'table':
        return values.query_mode.value === 'aggregate'
          ? !!values.groupby.length ||
              !!values.metrics.length ||
              !!values.percent_metrics.length
          : false;

      default:
        return false;
    }
  };

  useEffect(() => {
    dispatch(dvtChartSetSaveDisabled(createChartDisableds(active)));
  }, [createChartDisableds(active)]);

  const handleViewAllChart = () => {
    dispatch(
      openModal({
        component: 'view-all-charts',
      }),
    );
  };

  const DataOrCustomize =
    chartTabs.value === 'customize' ? DvtChartCustomize : DvtChartData;

  useEffect(
    () => () => {
      dispatch(dvtNavbarChartAddSetVizType(''));
      dispatch(
        dvtNavbarChartsSetTabs({
          label: t('Data'),
          value: 'data',
        }),
      );
    },
    [],
  );

  return (
    <StyledChart>
      <CreateChart>
        <CreateChartTop>
          <DvtSelectButton
            activeButton={active}
            setActiveButton={setActive}
            data={selectBars}
          />
          <DvtButton
            label={t('View all charts')}
            onClick={handleViewAllChart}
            typeColour="outline"
          />
        </CreateChartTop>
        <CreateChartCenter>
          {DataOrCustomize.find(
            cItem => cItem.chart_name === active,
          )?.collapses.map((item, index) => (
            <DvtCollapse
              key={index}
              label={item.collapse_label}
              popoverLabel={item.collapse_popper}
              popperError={item.collapse_popper_error}
              popperErrorSuccess={
                !createChartDisableds(active, item.collapse_active)
              }
              popoverDirection="bottom"
              isOpen={collapsesIsOpen.includes(item.collapse_active)}
              setIsOpen={bln =>
                bln
                  ? setCollapsesIsOpen([
                      ...collapsesIsOpen,
                      item.collapse_active,
                    ])
                  : collapsesIsOpen.includes(item.collapse_active)
                  ? setCollapsesIsOpen(
                      collapsesIsOpen.filter(f => f !== item.collapse_active),
                    )
                  : setCollapsesIsOpen([
                      ...collapsesIsOpen,
                      item.collapse_active,
                    ])
              }
            >
              <CreateChartCenterCollapseInGap>
                {item.forms
                  .filter(fi =>
                    item.tabs_name && item.tabs_actives
                      ? [
                          item.tabs_name,
                          ...item.tabs_actives[values[item.tabs_name].value],
                        ].includes(fi.name)
                      : fi,
                  )
                  .map((fItem, fIndex) => (
                    <div key={fIndex}>
                      {fItem.status === 'tabs' && (
                        <DvtButtonTabs
                          data={fItem.options?.length ? fItem.options : []}
                          active={
                            values[fItem.name] || { label: '', value: '' }
                          }
                          setActive={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                        />
                      )}
                      {fItem.status === 'input' && (
                        <DvtInput
                          label={fItem.label}
                          placeholder={fItem.placeholder}
                          popoverLabel={fItem.popper}
                          number={fItem.number}
                          value={values[fItem.name] || ''}
                          onChange={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                        />
                      )}
                      {fItem.status === 'select' && (
                        <DvtSelect
                          label={fItem.label}
                          placeholder={fItem.placeholder}
                          popoverLabel={fItem.popper}
                          selectedValue={values[fItem.name] || ''}
                          setSelectedValue={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          data={fItem.options || []}
                          typeDesign="form"
                          maxWidth
                        />
                      )}
                      {fItem.status === 'multiple-select' && (
                        <DvtInputSelect
                          label={fItem.label}
                          placeholder={fItem.placeholder}
                          // popoverLabel={fItem.popper}
                          selectedValues={values[fItem.name] || []}
                          setSelectedValues={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          data={fItem.options}
                          typeDesign="form"
                        />
                      )}
                      {fItem.status === 'color-select' && (
                        <DvtSelectColorScheme
                          label={fItem.label}
                          placeholder={fItem.placeholder}
                          popoverLabel={fItem.popper}
                          selectedValue={values[fItem.name] || ''}
                          setSelectedValue={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          data={fItem.optionsColor || []}
                          maxWidth
                        />
                      )}
                      {fItem.status === 'input-drop' && (
                        <DvtInputDrop
                          label={fItem.label}
                          placeholder={
                            fItem.multiple
                              ? t('Drop columns/metrics here or click')
                              : t('Drop columns here or click')
                          }
                          popoverLabel={fItem.popper}
                          popperError={fItem.popperError}
                          anotherFormNoError={anotherFormsNoError(active)}
                          droppedData={values?.[fItem.name] || []}
                          setDroppedData={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          type={fItem?.type || 'normal'}
                          savedType={fItem?.savedType || 'metric'}
                          simpleType={fItem?.simpleType || 'normal'}
                          multiple={fItem.multiple}
                          savedData={
                            fItem?.savedType === 'expressions'
                              ? selectedChart?.dataset?.columns
                                  .filter(
                                    (fi: { expression: any }) => fi.expression,
                                  )
                                  .map((item: { column_name: string }) => ({
                                    metric_name: item.column_name,
                                  }))
                              : selectedChart?.dataset?.metrics
                          }
                          columnData={selectedChart?.dataset?.columns}
                          datasourceApi={`datasource/${selectedChart?.form_data?.url_params?.datasource_type}/${selectedChart?.form_data?.url_params?.datasource_id}`}
                        />
                      )}
                      {fItem.status === 'checkbox' && (
                        <DvtCheckbox
                          label={fItem.label}
                          checked={values[fItem.name] || false}
                          onChange={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                        />
                      )}
                      {fItem.status === 'two-input' && (
                        <CreateChartCenterCollapseInGapFlexRow>
                          {fItem.values?.map((vfItem: any, vfIndex: number) => (
                            <DvtInput
                              key={vfIndex}
                              label={vfIndex === 0 ? fItem.label : ''}
                              popoverLabel={vfIndex === 0 ? fItem.popper : ''}
                              placeholder={vfItem.placeholder}
                              number={vfItem.number}
                              value={values?.[fItem.name]?.[vfItem.name] || ''}
                              onChange={v =>
                                setValues({
                                  ...values,
                                  [fItem.name]: {
                                    ...values[fItem.name],
                                    [vfItem.name]: v,
                                  },
                                })
                              }
                            />
                          ))}
                        </CreateChartCenterCollapseInGapFlexRow>
                      )}
                      {fItem.status === 'two-select' && (
                        <CreateChartCenterCollapseInGapFlexRow>
                          {fItem.values?.map((vfItem: any, vfIndex: number) => (
                            <DvtSelect
                              key={vfIndex}
                              label={vfIndex === 0 ? fItem.label : ''}
                              popoverLabel={vfIndex === 0 ? fItem.popper : ''}
                              placeholder={vfItem.placeholder}
                              selectedValue={
                                values?.[fItem.name]?.[vfItem.name] || ''
                              }
                              setSelectedValue={v =>
                                setValues({
                                  ...values,
                                  [fItem.name]: {
                                    ...values[fItem.name],
                                    [vfItem.name]: v,
                                  },
                                })
                              }
                              data={vfItem.options || []}
                              typeDesign="form"
                              maxWidth
                              onShowClear
                            />
                          ))}
                        </CreateChartCenterCollapseInGapFlexRow>
                      )}
                      {fItem.status === 'color' && (
                        <DvtColorSelect
                          label={fItem.label}
                          popoverLabel={fItem.popper}
                          value={
                            values[fItem.name] || { r: 0, g: 0, b: 0, a: 0 }
                          }
                          setValue={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                        />
                      )}
                      {fItem.status === 'range' && (
                        <DvtRange
                          label={fItem.label}
                          popoverLabel={fItem.popper}
                          value={values[fItem.name] || 0}
                          setValue={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          min={fItem.rangeConfig?.min || 0}
                          max={fItem.rangeConfig?.max || 0}
                          step={fItem.rangeConfig?.step || 0}
                        />
                      )}
                    </div>
                  ))}
              </CreateChartCenterCollapseInGap>
            </DvtCollapse>
          ))}
        </CreateChartCenter>
        <CreateChartBottom>
          <DvtButton
            label={firstChartCreated ? t('Update Chart') : t('Create Chart')}
            loading={chartFullPromise.loading}
            disabled={createChartDisableds(active)}
            bold
            onClick={() => {
              setChartStatus('loading');
              setChartApiUrl(
                onlyExploreJson.includes(active)
                  ? 'explore_json/'
                  : 'chart/data',
              );
            }}
          />
        </CreateChartBottom>
      </CreateChart>
      <RightPreview>
        <RightPreviewTop ref={resizeObserverRef}>
          {firstChartCreated ? (
            <RightPreviewTopChartScreen ref={chartPanelRef}>
              <ChartContainer
                width={chartPanelWidth}
                height={chartPanelHeight}
                ownState={undefined}
                annotationData={undefined}
                chartAlert={null}
                chartStackTrace={null}
                chartId={0}
                chartStatus={chartStatus} // failed, loading, success, rendered
                triggerRender={false}
                force={false}
                datasource={selectedChart?.dataset}
                // errorMessage={<div>Error</div>}
                formData={formDataObj.form_data}
                // latestQueryFormData={formDataObj.form_data}
                onQuery={() => {}}
                queriesResponse={chartData}
                chartIsStale={false}
                timeout={60}
                triggerQuery={false}
                vizType={active}
              />
              {/* {console.log({
                chartStatus,
                datasource: selectedChart?.dataset,
                formData: formDataObj.form_data,
                queriesResponse: chartData,
              })} */}
            </RightPreviewTopChartScreen>
          ) : (
            <>
              {chartFullPromise.loading ? (
                <SpinnerContainer>
                  <DvtSpinner type="grow" size="xlarge" />
                </SpinnerContainer>
              ) : (
                <DvtIconDataLabel
                  label={t('Add required control values to preview chart')}
                  description={t(
                    'Select values in highlighted field(s) in the control panel. Then run the query by clicking on the "Create chart" button.',
                  )}
                  icon="square"
                />
              )}
            </>
          )}
        </RightPreviewTop>
        <RightPreviewBottom>
          <DvtButtonTabs
            data={[
              { label: t('Results'), value: 'results' },
              { label: t('Samples'), value: 'samples' },
            ]}
            active={tabs}
            setActive={setTabs}
          />
          <RightPreviewBottomTabItem>
            {chartResultsPromise.loading || sampleLoading ? (
              <SpinnerContainer>
                <DvtSpinner type="grow" size="xlarge" />
              </SpinnerContainer>
            ) : (
              <>
                {(tabs.value === 'results' && resultData.length) ||
                (tabs.value === 'samples' && sampleData.length) ? (
                  <RightPreviewBottomTableScroll>
                    {tabs.value === 'results' ? (
                      <DvtTable
                        header={resultHeader}
                        data={resultData}
                        sort={resultSort}
                        setSort={setResultSort}
                      />
                    ) : (
                      <DvtTable
                        header={sampleHeader}
                        data={sampleData}
                        sort={sampleSort}
                        setSort={setSampleSort}
                      />
                    )}
                  </RightPreviewBottomTableScroll>
                ) : (
                  <DvtIconDataLabel
                    label={t('Run a query to display results')}
                    icon="file"
                  />
                )}
              </>
            )}
          </RightPreviewBottomTabItem>
        </RightPreviewBottom>
      </RightPreview>
    </StyledChart>
  );
};

export default withToasts(DvtChart);
