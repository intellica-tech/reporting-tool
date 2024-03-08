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
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import {
  StyledChart,
  CreateChart,
  CreateChartTop,
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
  const [active, setActive] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Results',
    value: 'results',
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
          <DvtCheckbox
            label={t('Bar Chart')}
            checked={checked}
            onChange={setChecked}
          />
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
