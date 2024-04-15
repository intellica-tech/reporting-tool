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
import { SelectedTablesProps } from 'src/components/DvtList';

interface DvtSqlhubState {
  selectedTables: SelectedTablesProps[];
  sqlQuery: string;
}

const initialState: DvtSqlhubState = {
  selectedTables: [],
  sqlQuery: '',
};

const dvtSqlhubSlice = createSlice({
  name: 'dvt-sqlhub',
  initialState,
  reducers: {
    dvtSqlhubSetSelectedTables: (state, action: PayloadAction<any>) => ({
      ...state,
      selectedTables: [...state.selectedTables, action.payload],
    }),
    dvtSqlhubSetSelectedTableRemove: (
      state,
      action: PayloadAction<string>,
    ) => ({
      ...state,
      selectedTables: state.selectedTables.filter(
        i => i.title !== action.payload,
      ),
    }),
    dvtSqlhubSetSelectedTablesClear: (state, action: PayloadAction) => ({
      ...state,
      selectedTables: [],
    }),
    dvtSqlhubSetSqlQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      sqlQuery: action.payload,
    }),
    dvtSaveDatasetSqlQuery: (state, action: PayloadAction<string>) => ({
      ...state,
      datasetQuery: action.payload,
    }),
  },
});

export const {
  dvtSqlhubSetSelectedTables,
  dvtSqlhubSetSelectedTableRemove,
  dvtSqlhubSetSelectedTablesClear,
  dvtSqlhubSetSqlQuery,
  dvtSaveDatasetSqlQuery,
} = dvtSqlhubSlice.actions;

export default dvtSqlhubSlice.reducer;
