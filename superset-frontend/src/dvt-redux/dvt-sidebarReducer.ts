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

interface DvtSidebarState {
  reports: {
    owner: any;
    createdBy: any;
    chartType: any;
    dataset: any;
    dashboards: any;
    favorite: any;
    certified: any;
    search: string;
  };
  alerts: {
    createdBy: any;
    owner: any;
    status: any;
    search: string;
  };
  connection: {
    expose_in_sqllab: any;
    allow_run_async: any;
    search: string;
  };
  datasets: {
    owner: any;
    database: any;
    schema: any;
    type: any;
    certified: any;
    search: string;
  };
  datasetAdd: {
    database: any;
    schema: any;
    selectDatabase: any;
  };
  chartAdd: {
    dataset: any;
    recommended_tags: any;
    category: any;
    tags: any;
  };
  chart: {
    search: string;
  };
  dashboard: {
    owner: any;
    createdBy: any;
    status: any;
    favorite: any;
    certified: any;
  };
  annotationLayer: {
    createdBy: any;
    search: string;
  };
  sqlhub: {
    database: any;
    schema: any;
    see_table_schema: any[string];
  };
  data: {
    fetched: {
      alerts: {
        createdBy: boolean;
        owner: boolean;
      };
      reports: {
        owner: boolean;
        createdBy: boolean;
        dataset: boolean;
        dashboards: boolean;
      };
      dashboard: {
        owner: boolean;
        createdBy: boolean;
      };
      annotationLayer: {
        createdBy: boolean;
      };
      datasets: {
        owner: boolean;
        database: boolean;
        schema: boolean;
      };
      datasetAdd: {
        database: boolean;
      };
      chartAdd: {
        dataset: boolean;
      };
      sqlhub: {
        database: boolean;
      };
    };
    alerts: {
      createdBy: any[];
      owner: any[];
    };
    reports: {
      owner: any[];
      createdBy: any[];
      dataset: any[];
      dashboards: any[];
    };
    dashboard: {
      owner: any[];
      createdBy: any[];
    };
    annotationLayer: {
      createdBy: any[];
    };
    datasets: {
      owner: any[];
      database: any[];
      schema: any[];
    };
    datasetAdd: {
      database: any[];
      schema: any[];
      selectDatabase: any[];
    };
    chartAdd: {
      dataset: any[];
    };
    sqlhub: {
      database: any[];
      schema: any[];
      see_table_schema: any[];
    };
  };
}

const INITIAL_STATE = {
  reports: {
    owner: '',
    createdBy: '',
    chartType: '',
    dataset: '',
    dashboards: '',
    favorite: '',
    certified: '',
    search: '',
  },
  alerts: {
    createdBy: '',
    owner: '',
    status: '',
    search: '',
  },
  connection: {
    expose_in_sqllab: '',
    allow_run_async: '',
    search: '',
  },
  datasets: {
    owner: '',
    database: '',
    schema: '',
    type: '',
    certified: '',
    search: '',
  },
  datasetAdd: {
    database: '',
    schema: '',
    selectDatabase: '',
  },
  chartAdd: {
    dataset: '',
    recommended_tags: { label: 'Popular', value: 'popular' },
    category: '',
    tags: '',
  },
  chart: {
    search: '',
  },
  dashboard: {
    owner: '',
    createdBy: '',
    status: '',
    favorite: '',
    certified: '',
  },
  annotationLayer: {
    createdBy: '',
    search: '',
  },
  sqlhub: {
    database: '',
    schema: '',
    see_table_schema: [],
  },
};

const initialState: DvtSidebarState = {
  ...INITIAL_STATE,
  data: {
    fetched: {
      alerts: {
        createdBy: false,
        owner: false,
      },
      reports: {
        owner: false,
        createdBy: false,
        dataset: false,
        dashboards: false,
      },
      dashboard: {
        owner: false,
        createdBy: false,
      },
      annotationLayer: {
        createdBy: false,
      },
      datasets: {
        owner: false,
        database: false,
        schema: false,
      },
      datasetAdd: {
        database: false,
      },
      chartAdd: {
        dataset: false,
      },
      sqlhub: {
        database: false,
      },
    },
    alerts: {
      createdBy: [],
      owner: [],
    },
    reports: {
      owner: [],
      createdBy: [],
      dataset: [],
      dashboards: [],
    },
    dashboard: {
      owner: [],
      createdBy: [],
    },
    annotationLayer: {
      createdBy: [],
    },
    datasets: {
      owner: [],
      database: [],
      schema: [],
    },
    datasetAdd: {
      database: [],
      schema: [],
      selectDatabase: [],
    },
    chartAdd: {
      dataset: [],
    },
    sqlhub: {
      database: [],
      schema: [],
      see_table_schema: [],
    },
  },
};

const dvtSidebarSlice = createSlice({
  name: 'dvt-sidebar',
  initialState,
  reducers: {
    dvtSidebarChartAddSetProperty: (
      state,
      action: PayloadAction<{ chartAdd: DvtSidebarState['chartAdd'] }>,
    ) => ({
      ...state,
      chartAdd: {
        ...state.chartAdd,
        ...action.payload.chartAdd,
      },
    }),
    dvtSidebarSetProperty: (
      state,
      action: PayloadAction<{ pageKey: string; key: string; value: any }>,
    ) => ({
      ...state,
      [action.payload.pageKey]: {
        ...state[action.payload.pageKey],
        [action.payload.key]: action.payload.value,
      },
    }),
    dvtSidebarSetPropertySelectedRemove: (
      state,
      action: PayloadAction<{ pageKey: string; key: string; value: any }>,
    ) => ({
      ...state,
      [action.payload.pageKey]: {
        ...state[action.payload.pageKey],
        [action.payload.key]: state[action.payload.pageKey][
          action.payload.key
        ].filter((s: any) => s !== action.payload.value),
      },
    }),
    dvtSidebarSetPropertyClear: (state, action: PayloadAction<string>) => {
      const keyNames = action.payload;
      const autoDataClear = (key: string) => {
        switch (key) {
          case 'datasetAdd':
            return {
              data: {
                ...state.data,
                datasetAdd: {
                  ...state.data.datasetAdd,
                  schema: [],
                  selectDatabase: [],
                },
              },
            };
          case 'sqlhub':
            return {
              data: {
                ...state.data,
                sqlhub: {
                  ...state.data.sqlhub,
                  schema: [],
                  see_table_schema: [],
                },
              },
            };
          default:
            return {};
        }
      };
      return {
        ...state,
        [action.payload]: INITIAL_STATE[action.payload],
        ...autoDataClear(keyNames),
      };
    },
    dvtSidebarSetDataProperty: (
      state,
      action: PayloadAction<{
        pageKey: string;
        key: string;
        value: any[];
        fetched?: boolean;
      }>,
    ) => {
      const withOrWithoutFetch = action.payload.fetched
        ? {
            fetched: {
              ...state.data.fetched,
              [action.payload.pageKey]: {
                ...state.data.fetched[action.payload.pageKey],
                [action.payload.key]: true,
              },
            },
          }
        : {};

      return {
        ...state,
        data: {
          ...state.data,
          ...withOrWithoutFetch,
          [action.payload.pageKey]: {
            ...state.data[action.payload.pageKey],
            [action.payload.key]: action.payload.value,
          },
        },
      };
    },
  },
});

export const {
  dvtSidebarChartAddSetProperty,
  dvtSidebarSetProperty,
  dvtSidebarSetPropertySelectedRemove,
  dvtSidebarSetPropertyClear,
  dvtSidebarSetDataProperty,
} = dvtSidebarSlice.actions;

export default dvtSidebarSlice.reducer;
