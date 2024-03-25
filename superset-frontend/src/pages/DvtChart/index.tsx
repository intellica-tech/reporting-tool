/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/dvt-hooks/useAppSelector';
import useResizeDetectorByObserver from 'src/dvt-hooks/useResizeDetectorByObserver';
import useFetch from 'src/dvt-hooks/useFetch';
import { t } from '@superset-ui/core';
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
import DvtSpinner from 'src/components/DvtSpinner';
import ChartContainer from 'src/components/Chart/ChartContainer';
import moment from 'moment';
import { dvtNavbarChartAddSetVizType } from 'src/dvt-redux/dvt-navbarReducer';
import openSelectMenuData from 'src/components/DvtOpenSelectMenu/dvtOpenSelectMenuData';
import DvtChartData from './dvtChartData';
import DvtChartFormPayloads from './dvtChartFormPayloads';
import { ChartDefaultSelectBars, ChartSelectBars } from './dvtChartSelectBars';
import {
  StyledChart,
  CreateChart,
  CreateChartTop,
  CreateChartCenter,
  CreateChartCenterCollapseInGap,
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
  const [selectBars, setSelectBars] = useState(
    ChartSelectBars.filter(vf =>
      [selectedVizType, ...ChartDefaultSelectBars].includes(vf.status),
    ),
  );
  const [active, setActive] = useState<string>(selectedVizType);
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
    groupby: [],
    contributionMode: '',
    adhoc_filters: [],
    limit: '',
    timeseries_limit_metric: [],
    order_desc: true,
    row_limit: {
      label: '10000',
      value: '10000',
    },
    truncate_metric: true,
    show_empty_columns: true,
    rolling_type: {
      label: t('None'),
      value: 'null',
    },
    time_compare: [],
    comparison_type: {
      label: t('Actual values'),
      value: 'values',
    },
    resample_rule: '',
    resample_method: '',
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
                    (f: any) => f.column_name === getFormData.granularity_sqla,
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
            (f: any) => f.column_name === v.subject,
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
              (f: any) => f.column_name === v,
            );
            return {
              id: moment().unix(),
              label: findItem.column_name,
              values: {
                saved: '',
                column: findItem,
                operator: '',
                aggregate: '',
                option: '',
                comparator: '',
                sql: findItem.column_name,
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
                  ? `COUNT(DISTINCT ${v.column.column_name})`
                  : `${v.aggregate}(${v.column.column_name})`
                : v.column.column_name,
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

        const timeseriesLimitMetricSwitch = (vizType: string) => {
          switch (vizType) {
            case 'bubble_v2':
              return emptyArrayOrOneFindItem(getFormData.orderby);

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

        setSelectBars(
          ChartSelectBars.filter(vf =>
            [getFormData.viz_type, ...ChartDefaultSelectBars].includes(
              vf.status,
            ),
          ),
        );
        setActive(getFormData.viz_type);
        setValues({
          x_axis: emptyArrayOrOneFindItem(getFormData.x_axis),
          time_grain_sqla: getFormData?.time_grain_sqla
            ? chartFormsOption.time_grain_sqla.find(
                f => f.value === getFormData.time_grain_sqla,
              )
            : {
                label: t('Day'),
                value: 'P1D',
              },
          metrics: getFormData.metrics
            ? getFormData.metrics.map((v: any) => metricsOrColumnsFormation(v))
            : [],
          groupby: getFormData.groupby
            ? getFormData.groupby.map((v: any) => metricsOrColumnsFormation(v))
            : [],
          contributionMode: getFormData?.contributionMode
            ? chartFormsOption.contributionMode.find(
                f => f.value === getFormData.contributionMode,
              )
            : '',
          adhoc_filters: [
            ...filtersOnItem,
            ...(getFormData.adhoc_filters
              ? getFormData.adhoc_filters.map((v: any) =>
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
          order_desc: getFormData?.order_desc !== false,
          row_limit: getFormData?.row_limit
            ? {
                label: String(getFormData.row_limit),
                value: String(getFormData.row_limit),
              }
            : {
                label: '10000',
                value: '10000',
              },
          truncate_metric: true,
          show_empty_columns: true,
          rolling_type: getFormData?.rolling_type
            ? chartFormsOption.rolling_type.find(
                f => f.value === getFormData.rolling_type,
              )
            : {
                label: t('None'),
                value: 'null',
              },
          time_compare: getFormData?.time_compare
            ? getFormData.time_compare
            : [],
          comparison_type: getFormData?.comparison_type
            ? chartFormsOption.comparison_type.find(
                f => f.value === getFormData.comparison_type,
              )
            : {
                label: t('Actual values'),
                value: 'values',
              },
          resample_rule: getFormData?.resample_rule
            ? chartFormsOption.resample_rule.find(
                f => f.value === getFormData.resample_rule,
              )
            : '',
          resample_method: getFormData?.resample_method
            ? chartFormsOption.resample_method.find(
                f => f.value === getFormData.resample_method,
              )
            : '',
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
          subheader: getFormData.subheader ? getFormData.subheader : '',
          dimension: emptyArrayOrOneFindItem(getFormData.series),
          entity: emptyArrayOrOneFindItem(getFormData.entity),
          x: emptyArrayOrOneFindItem(getFormData.x),
          y: emptyArrayOrOneFindItem(getFormData.y),
          size: emptyArrayOrOneFindItem(getFormData.size),
        });

        setChartStatus('loading');
        setChartApiUrl('chart/data');

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

  const postProcessingAggregates = (data: any[]) => {
    const result = {};

    data.forEach(item => {
      result[item.label] = { operator: 'mean' };
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

  const queriesOrderBySwitch = () => {
    switch (active) {
      case 'table':
        return values.order_by_cols;
      case 'big_number_total':
      case 'pie':
      case 'funnel':
        return [[metricsFormation('metric')[0], false]];
      case 'bubble_v2':
        return values.timeseries_limit_metric.length
          ? [[metricsFormation('timeseries_limit_metric')[0], false]]
          : undefined;
      default:
        return [[metricsFormation('metrics')[0], false]];
    }
  };

  const queriesColumnsSwitch = () => {
    switch (active) {
      case 'table':
        return droppedOnlyLabels('all_columns');
      case 'bubble_v2':
        return [
          ...droppedOnlyLabels('entity'),
          ...droppedOnlyLabels('dimension'),
        ];
      default:
        return [
          ...values.x_axis.map((c: any) => ({
            timeGrain: values.time_grain_sqla?.value,
            columnType: 'BASE_AXIS',
            sqlExpression: c.label,
            label: c.label,
            expressionType: 'SQL',
          })),
          ...droppedOnlyLabels('groupby'),
        ];
    }
  };

  const queriesMetricsSwitch = () => {
    switch (active) {
      case 'big_number_total':
      case 'pie':
      case 'funnel':
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
      groupby: droppedOnlyLabels('groupby'),
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
      order_desc: values.order_desc,
      row_limit: Number(values.row_limit.value),
      truncate_metric: values.truncate_metric,
      show_empty_columns: values.show_empty_columns,
      comparison_type: values.comparison_type.value,
      annotation_layers: [],
      forecastPeriods: values.forecastPeriods,
      forecastInterval: values.forecastInterval,
      x_axis_title_margin: active === 'bubble_v2' ? 30 : 15,
      y_axis_title_margin: active === 'bubble_v2' ? 30 : 15,
      y_axis_title_position: 'Left',
      sort_series_type: 'sum',
      color_scheme: 'supersetColors',
      seriesType: 'line',
      only_total: true,
      opacity: active === 'bubble_v2' ? 0.6 : 0.2,
      markerSize: 6,
      orientation: 'vertical',
      show_legend: true,
      legendType: 'scroll',
      legendOrientation: 'top',
      max_bubble_size: '25',
      x_axis_time_format: 'smart_date',
      rich_tooltip: true,
      tooltipTimeFormat: 'smart_date',
      y_axis_format: 'SMART_NUMBER',
      truncateXAxis: true,
      y_axis_bounds: [null, null],
      extra_form_data: {},
      force: false,
      result_format: 'json',
      result_type: 'full',
      timeseries_limit_metric: values.timeseries_limit_metric.length
        ? metricsFormation('timeseries_limit_metric')[0]
        : undefined,
      area: undefined,
      cache_timeout: undefined,
      contributionMode: withoutValueForNull(values.contributionMode),
      currency_format: undefined,
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
      legendMargin: undefined,
      limit: withoutValueForNull(values.limit),
      logAxis: undefined,
      markerEnabled: undefined,
      min_periods: undefined,
      minorSplitLine: undefined,
      minorTicks: undefined,
      percentage_threshold: undefined,
      resample_method: withoutValueForNull(values.resample_method),
      resample_rule: withoutValueForNull(values.resample_rule),
      rolling_periods: undefined,
      rolling_type: withoutValueForNull(values.rolling_type),
      show_value: undefined,
      slice_id: undefined,
      sort_series_ascending: undefined,
      stack: undefined,
      time_compare: values.time_compare,
      tooltipSortByMetric: undefined,
      truncateYAxis: undefined,
      xAxisBounds: undefined,
      xAxisForceCategorical: undefined,
      xAxisLabelRotation: undefined,
      x_axis_sort: undefined,
      x_axis_title: undefined,
      y_axis_title: undefined,
      zoomable: undefined,
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
      time_format: 'smart_date',
      all_columns: droppedOnlyLabels('all_columns'),
      all_columns_x: droppedOnlyLabels('all_columns'),
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
      temporal_columns_lookup: { year: true },
      server_pagination: values.server_pagination,
      entity: droppedOnlyLabels('entity')[0],
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
        series_limit: 0,
        order_desc: true,
        url_params: selectedChart?.form_data?.url_params,
        custom_params: {},
        custom_form_data: {},
        time_offsets: [],
        post_processing:
          active === 'table'
            ? []
            : [
                {
                  operation: 'pivot',
                  options: {
                    index: [values.x_axis[0]?.label],
                    columns: values.groupby.map((vg: any) => vg.values.sql),
                    aggregates: postProcessingAggregates(values.metrics),
                    drop_missing_columns: false,
                  },
                },
                ...(Object.keys(postProcessingRename).length !== 0
                  ? [postProcessingRename]
                  : []),
                {
                  operation: 'flatten',
                },
              ],
        series_limit_metric: values.timeseries_limit_metric.length
          ? metricsFormation('timeseries_limit_metric')[0]
          : undefined,
      },
    ],
    result_format: 'json',
    result_type: 'full',
  };

  const onlyVizChartFindFormPayload = (formKey: string) => {
    let result: any;
    const findChartForm: any = DvtChartFormPayloads.find(
      fv => fv.viz_name === active,
    );

    if (Array.isArray(formDataObj[formKey])) {
      result = formDataObj[formKey].map((q: any) => {
        const filteredQuery = {};
        findChartForm?.[formKey].forEach((key: any) => {
          if (q.hasOwnProperty(key)) {
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

  const chartFullPromise = useFetch({
    url: chartApiUrl,
    method: 'POST',
    body: {
      ...formDataObj,
      form_data: onlyVizChartFindFormPayload('form_data'),
      queries: onlyVizChartFindFormPayload('queries'),
    },
  });

  const chartResultsPromise = useFetch({
    url: chartApiUrl,
    method: 'POST',
    body: {
      ...formDataObj,
      form_data: {
        ...onlyVizChartFindFormPayload('form_data'),
        result_type: 'results',
      },
      queries: onlyVizChartFindFormPayload('queries'),
      result_type: 'results',
    },
  });

  // const formData = new FormData();
  // formData.append(
  //   'form_data',
  //   JSON.stringify(onlyVizChartFindFormPayload('form_data')),
  // );

  // formData.append('force', JSON.stringify(formDataObj.force));
  // formData.append('form_data', JSON.stringify(formDataObj.form_data));
  // formData.append('queries', JSON.stringify(formDataObj.queries));
  // formData.append('result_format', JSON.stringify(formDataObj.result_format));
  // formData.append('result_type', JSON.stringify(formDataObj.result_type));
  // formData.append('result_type', JSON.stringify('results'));

  // const exploreJsonPromise = useFetch({
  //   url: exploreJsonUrl,
  //   defaultParam: '/superset/',
  //   method: 'POST',
  //   headers: {
  //     'Content-Disposition': 'form-data; name="form_data"',
  //   },
  //   body: formData,
  //   formData: true,
  //   withoutJson: true,
  // });

  // const exploreJsonResultsPromise = useFetch({
  //   url: exploreJsonResultsUrl,
  //   defaultParam: '/superset/',
  //   method: 'POST',
  //   headers: {
  //     'Content-Disposition': 'form-data; name="form_data"',
  //   },
  //   body: formData,
  //   formData: true,
  //   withoutJson: true,
  // });

  const chartSamplePromise = useFetch({
    url: sampleApiUrl,
    method: 'POST',
  });

  useEffect(() => {
    if (chartFullPromise.data) {
      setChartData(chartFullPromise.data.result);
      setChartStatus('success');
    }
    if (chartFullPromise.error) {
      setChartStatus('failed');
      if (chartFullPromise.error?.errors) {
        setChartData(chartFullPromise.error.errors);
      } else if (chartFullPromise.error?.message) {
        setChartData([
          {
            error: chartFullPromise.error.message,
            message: chartFullPromise.error.message,
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
      const firstObjectItem = chartResultsPromise.data.result[0].colnames;
      const headerFormation = firstObjectItem.map((v: any, i: number) => ({
        id: i,
        title: v,
        field: v,
        sort: true,
      }));
      setResultHeader(headerFormation);
      setResultData(chartResultsPromise.data.result[0].data);
    }
  }, [chartResultsPromise.data]);

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
      const firstObjectItem = chartSamplePromise.data.result.colnames;
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

  const createChartDisableds = (vizType: string) => {
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
        return !values.metric.length;

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

  useEffect(
    () => () => {
      dispatch(dvtNavbarChartAddSetVizType(''));
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
            nowrap
          />
          <DvtButton
            label={t('View all charts')}
            onClick={() => {}}
            typeColour="outline"
          />
        </CreateChartTop>
        <CreateChartCenter>
          {DvtChartData.find(
            cItem => cItem.chart_name === active,
          )?.collapses.map((item, index) => (
            <DvtCollapse
              key={index}
              label={item.collapse_label}
              popoverLabel={item.collapse_popper}
              popperError={item.collapse_popper_error}
              popperErrorSuccess={values.x_axis.length && values.metrics.length}
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
                          active={values[fItem.name]}
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
                          value={values[fItem.name]}
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
                          selectedValue={values[fItem.name]}
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
                          selectedValues={values[fItem.name]}
                          setSelectedValues={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          data={fItem.options}
                          typeDesign="form"
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
                          droppedData={values[fItem.name]}
                          setDroppedData={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
                          type={fItem?.type || 'normal'}
                          savedType={fItem?.savedType || 'metric'}
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
                          checked={values[fItem.name]}
                          onChange={v =>
                            setValues({ ...values, [fItem.name]: v })
                          }
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
              setChartApiUrl('chart/data');
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
                errorMessage={<div>Error</div>}
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
