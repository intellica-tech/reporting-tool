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

interface DvtDashboardEditState {
  get: any;
}

const initialState: DvtDashboardEditState = {
  get: {
    id: null,
    dashboard_title: '',
    published: false,
    position_json: null,
  },
};

const dvtDashboardEditSlice = createSlice({
  name: 'dvt-dashboard-edit',
  initialState,
  reducers: {
    dvtChartGetDashboardEdit: (state, action: PayloadAction<any>) => ({
      ...state,
      get: action.payload,
    }),
    dvtChartGetDashboardEditSetValue: (
      state,
      action: PayloadAction<{ key: string; value: any }>,
    ) => ({
      ...state,
      get: {
        ...state.get,
        [action.payload.key]: action.payload.value,
      },
    }),
    dvtChartGetDashboardEditClear: (state, action: PayloadAction) => ({
      ...state,
      get: {
        id: null,
        dashboard_title: '',
        published: false,
        position_json: null,
      },
    }),
  },
});

export const {
  dvtChartGetDashboardEdit,
  dvtChartGetDashboardEditSetValue,
  dvtChartGetDashboardEditClear,
} = dvtDashboardEditSlice.actions;

export default dvtDashboardEditSlice.reducer;