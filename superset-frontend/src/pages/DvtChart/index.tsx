/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useFetch from 'src/hooks/useFetch';
import { t } from '@superset-ui/core';
import withToasts from 'src/components/MessageToasts/withToasts';
import { dvtChartSetSelectedChart } from 'src/dvt-redux/dvt-chartReducer';
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
import DvtChartData from './dvtChartData';
import {
  StyledChart,
  CreateChart,
  CreateChartTop,
  CreateChartCenter,
  CreateChartCenterCollapseInGap,
  CreateChartBottom,
  RightPreview,
  RightPreviewTop,
  RightPreviewBottom,
  RightPreviewBottomTabItem,
} from './dvt-chart.module';

const selectBars = [
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

const DvtChart = () => {
  const dispatch = useDispatch();
  const selectedChart = useAppSelector(state => state.dvtChart.selectedChart);
  const [active, setActive] = useState<string>('echarts_timeseries_line');
  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Results',
    value: 'results',
  });
  const [collapsesIsOpen, setCollapsesIsOpen] = useState<any[]>(['query']);
  const [values, setValues] = useState<any>({
    x_axis: [],
    time_grain_sqla: '',
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
    comparison_type: '',
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
  });
  const [chartApiUrl, setChartApiUrl] = useState('');

  console.log(values);

  const formData = new FormData();

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
      metrics: values.metrics,
      groupby: values.groupby,
      adhoc_filters: values.adhoc_filters.map((v: any) => ({
        expressionType: 'SIMPLE',
        subject: v.values.column.value,
        operator: v.values.operator.value,
        operatorId: v.values.operator.value,
        comparator: v.values.operator.options,
        clause: 'WHERE',
        sqlExpression: null,
        isExtra: false,
        isNew: false,
        datasourceWarning: false,
        // filterOptionName: 'filter_3pgxj4rlyoz_ud5rg9462gb',
      })),
      order_desc: values.order_desc,
      row_limit: Number(values.row_limit.value),
      truncate_metric: values.truncate_metric,
      show_empty_columns: values.show_empty_columns,
      comparison_type: values.comparison_type.value,
      annotation_layers: [],
      forecastPeriods: values.forecastPeriods,
      forecastInterval: values.forecastInterval,
      x_axis_title_margin: 15,
      y_axis_title_margin: 15,
      y_axis_title_position: 'Left',
      sort_series_type: 'sum',
      color_scheme: 'supersetColors',
      seriesType: 'line',
      only_total: true,
      opacity: 0.2,
      markerSize: 6,
      show_legend: true,
      legendType: 'scroll',
      legendOrientation: 'top',
      x_axis_time_format: 'smart_date',
      rich_tooltip: true,
      tooltipTimeFormat: 'smart_date',
      y_axis_format: 'SMART_NUMBER',
      truncateXAxis: true,
      y_axis_bounds: [null, null],
      extra_form_data: {},
      force: false,
      result_format: 'json',
      result_type: 'results',
      timeseries_limit_metric: {
        expressionType: 'SIMPLE',
        column: {},
        aggregate: values.timeseries_limit_metric[0]?.values?.aggregate?.value,
        sqlExpression: null,
        datasourceWarning: false,
        hasCustomLabel: false,
        label: values.timeseries_limit_metric[0]?.label,
        // optionName: 'metric_e718zbxhzxp_d07oowpmqs4',
      },
    },
    queries: [],
    result_format: 'json',
    result_type: 'full',
  };

  formData.append('datasource', JSON.stringify(formDataObj.datasource));
  formData.append('force', JSON.stringify(formDataObj.force));
  formData.append('form_data', JSON.stringify(formDataObj.form_data));
  formData.append('queries', JSON.stringify(formDataObj.queries));
  formData.append('result_format', JSON.stringify(formDataObj.result_format));
  formData.append('result_type', JSON.stringify(formDataObj.result_type));

  const chartFullPromise = useFetch({
    url: chartApiUrl,
    method: 'POST',
    body: formDataObj,
  });

  formData.append('result_type', JSON.stringify('results'));

  const chartResultsPromise = useFetch({
    url: chartApiUrl,
    method: 'POST',
    body: { ...formDataObj, result_type: 'results' },
  });

  useEffect(() => {
    if (chartFullPromise) {
      console.log(chartFullPromise);
    }
  }, [chartFullPromise]);

  useEffect(() => {
    if (chartResultsPromise) {
      console.log(chartResultsPromise);
    }
  }, [chartResultsPromise]);

  useEffect(
    () => () => {
      dispatch(dvtChartSetSelectedChart({}));
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
                {item.forms.map((fItem, fIndex) => (
                  <div key={fIndex}>
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
                                  label: item.column_name,
                                  value: item.column_name,
                                }))
                            : selectedChart?.dataset?.metrics.map(
                                (item: {
                                  metric_name: string;
                                  expression: any;
                                }) => ({
                                  label: item.expression,
                                  value: item.metric_name,
                                }),
                              )
                        }
                        columnData={selectedChart?.dataset?.columns.map(
                          (item: { column_name: string }) => ({
                            label: item.column_name,
                            value: item.column_name,
                          }),
                        )}
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
            label={t('Create Chart')}
            colour="grayscale"
            onClick={() => setChartApiUrl('chart/data')}
          />
        </CreateChartBottom>
      </CreateChart>
      <RightPreview>
        <RightPreviewTop>
          <DvtIconDataLabel
            label={t('Add required control values to preview chart')}
            description={t(
              'Select values in highlighted field(s) in the control panel. Then run the query by clicking on the "Create chart" button.',
            )}
            icon="square"
          />
        </RightPreviewTop>
        <RightPreviewBottom>
          <DvtButtonTabs
            data={[
              { label: 'Results', value: 'results' },
              { label: 'Samples', value: 'samples' },
            ]}
            active={tabs}
            setActive={setTabs}
          />
          <RightPreviewBottomTabItem>
            <DvtIconDataLabel
              label={t('Run a query to display results')}
              icon="file"
            />
          </RightPreviewBottomTabItem>
        </RightPreviewBottom>
      </RightPreview>
    </StyledChart>
  );
};

export default withToasts(DvtChart);
