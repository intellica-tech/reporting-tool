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

interface DvtChartState {
  selectedChart: any;
  addTimeRange: any;
  queryContext: any;
  saveDisabled: boolean;
  slice: { id: string; name: string };
}

const initialState: DvtChartState = {
  selectedChart: {},
  addTimeRange: {},
  queryContext: {},
  saveDisabled: true,
  slice: { id: '', name: '' },
};

const dvtChartSlice = createSlice({
  name: 'dvt-chart',
  initialState,
  reducers: {
    dvtChartSetSelectedChart: (state, action: PayloadAction<any>) => ({
      ...state,
      selectedChart: action.payload,
    }),
    dvtChartSetTimeRange: (state, action: PayloadAction<any>) => ({
      ...state,
      addTimeRange: action.payload,
    }),
    dvtChartSetQueryContext: (state, action: PayloadAction<any>) => ({
      ...state,
      queryContext: action.payload,
    }),
    dvtChartSetSaveDisabled: (state, action: PayloadAction<boolean>) => ({
      ...state,
      saveDisabled: action.payload,
    }),
    dvtChartSetSlice: (state, action: PayloadAction<any>) => ({
      ...state,
      slice: action.payload,
    }),
  },
});

export const {
  dvtChartSetSelectedChart,
  dvtChartSetTimeRange,
  dvtChartSetQueryContext,
  dvtChartSetSaveDisabled,
  dvtChartSetSlice,
} = dvtChartSlice.actions;

export default dvtChartSlice.reducer;
