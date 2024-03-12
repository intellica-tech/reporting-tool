/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
  const [active, setActive] = useState<string>('echarts_timeseries_line');
  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Results',
    value: 'results',
  });
  const [collapsesIsOpen, setCollapsesIsOpen] = useState<any[]>(['query']);
  const [values, setValues] = useState({
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
          )?.collapses.map(item => (
            <DvtCollapse
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
                {item.forms.map(fItem => (
                  <>
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
                        placeholder={fItem.placeholder}
                        popoverLabel={fItem.popper}
                        droppedData={values[fItem.name]}
                        setDroppedData={v =>
                          setValues({ ...values, [fItem.name]: v })
                        }
                        type={fItem?.type || 'x-axis'}
                        multiple={fItem.multiple}
                        savedData={[]}
                        columnData={[]}
                        datasourceApi="datasource/table/7"
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
                  </>
                ))}
              </CreateChartCenterCollapseInGap>
            </DvtCollapse>
          ))}
        </CreateChartCenter>
        <CreateChartBottom>
          <DvtButton
            label={t('Create Chart')}
            colour="grayscale"
            onClick={() => {}}
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
