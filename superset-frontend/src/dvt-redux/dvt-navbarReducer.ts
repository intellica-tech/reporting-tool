/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { t } from '@superset-ui/core';
import { ButtonTabsDataProps } from 'src/components/DvtButtonTabs';

interface DvtNavbarState {
  alert: {
    tabs: ButtonTabsDataProps;
  };
  charts: {
    tabs: ButtonTabsDataProps;
  };
  chartAdd: {
    vizType: string;
  };
  viewlist: {
    dashboard: ButtonTabsDataProps;
    reports: ButtonTabsDataProps;
  };
}

const initialState: DvtNavbarState = {
  alert: {
    tabs: {
      label: t('Alerts'),
      value: 'Alert',
    },
  },
  charts: {
    tabs: {
      label: t('Data'),
      value: 'data',
    },
  },
  chartAdd: {
    vizType: '',
  },
  viewlist: {
    dashboard: {
      label: t('Table'),
      value: 'Table',
    },
    reports: {
      label: t('Table'),
      value: 'Table',
    },
  },
};

const dvtNavbarSlice = createSlice({
  name: 'dvt-navbar',
  initialState,
  reducers: {
    dvtNavbarAlertSetTabs: (
      state,
      action: PayloadAction<ButtonTabsDataProps>,
    ) => ({
      ...state,
      alert: {
        ...state.alert,
        tabs: action.payload,
      },
    }),
    dvtNavbarChartsSetTabs: (
      state,
      action: PayloadAction<ButtonTabsDataProps>,
    ) => ({
      ...state,
      charts: {
        ...state.charts,
        tabs: action.payload,
      },
    }),
    dvtNavbarChartAddSetVizType: (state, action: PayloadAction<string>) => ({
      ...state,
      chartAdd: {
        ...state.chartAdd,
        vizType: action.payload,
      },
    }),
    dvtNavbarViewlistTabs: (
      state,
      action: PayloadAction<{ key: string; value: ButtonTabsDataProps }>,
    ) => ({
      ...state,
      viewlist: {
        ...state.viewlist,
        [action.payload.key]: action.payload.value,
      },
    }),
  },
});

export const {
  dvtNavbarAlertSetTabs,
  dvtNavbarChartsSetTabs,
  dvtNavbarChartAddSetVizType,
  dvtNavbarViewlistTabs,
} = dvtNavbarSlice.actions;

export default dvtNavbarSlice.reducer;
