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
    createdBy: string;
    owner: string;
    status: string;
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
    dataset: string;
    recommended_tags: string;
    category: string;
    tags: string;
  };
  dashboard: {
    owner: any;
    createdBy: any;
    status: any;
    favorite: any;
    certified: any;
  };
  annotationlayer: {
    createdBy: string;
    search: string;
  };
  sqllab: {
    database: any;
    schema: any;
    see_table_schema: any;
  };
  data: {
    fetched: {
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
      annotationlayer: {
        createdBy: boolean;
        search: boolean;
      };
      datasets: {
        owner: boolean;
        database: boolean;
        schema: boolean;
      };
      datasetAdd: {
        database: boolean;
        schema: boolean;
      };
      chartAdd: {
        dataset: boolean;
      };
      sqllab: {
        database: boolean;
        schema: boolean;
        see_table_schema: boolean;
      };
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
    annotationlayer: {
      createdBy: any[];
      search: any[];
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
    sqllab: {
      database: any[];
      schema: any[];
      see_table_schema: any[];
    };
  };
}

const initialState: DvtSidebarState = {
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
    recommended_tags: '',
    category: '',
    tags: '',
  },
  dashboard: {
    owner: '',
    createdBy: '',
    status: '',
    favorite: '',
    certified: '',
  },
  annotationlayer: {
    createdBy: '',
    search: '',
  },
  sqllab: {
    database: '',
    schema: '',
    see_table_schema: '',
  },
  data: {
    fetched: {
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
      annotationlayer: {
        createdBy: false,
        search: false,
      },
      datasets: {
        owner: false,
        database: false,
        schema: false,
      },
      datasetAdd: {
        database: false,
        schema: false,
      },
      chartAdd: {
        dataset: false,
      },
      sqllab: {
        database: false,
        schema: false,
        see_table_schema: false,
      },
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
    annotationlayer: {
      createdBy: [],
      search: [],
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
    sqllab: {
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
    dvtSidebarReportsSetProperty: (
      state,
      action: PayloadAction<{ reports: DvtSidebarState['reports'] }>,
    ) => ({
      ...state,
      reports: {
        ...state.reports,
        ...action.payload.reports,
      },
    }),
    dvtSidebarAlertsSetProperty: (
      state,
      action: PayloadAction<{ alerts: DvtSidebarState['alerts'] }>,
    ) => ({
      ...state,
      alerts: {
        ...state.alerts,
        ...action.payload.alerts,
      },
    }),
    dvtSidebarConnectionSetProperty: (
      state,
      action: PayloadAction<{ connection: DvtSidebarState['connection'] }>,
    ) => ({
      ...state,
      connection: {
        ...state.connection,
        ...action.payload.connection,
      },
    }),
    dvtSidebarChartAddSetProperty: (
      state,
      action: PayloadAction<{ chartAdd: DvtSidebarState['chartAdd'] }>,
    ) => ({
      ...state,
      chartAdd: {
        ...state.connection,
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
    dvtSidebarSetDataProperty: (
      state,
      action: PayloadAction<{ pageKey: string; key: string; value: string }>,
    ) => ({
      ...state,
      data: {
        ...state.data,
        fetched: {
          ...state.data.fetched,
          [action.payload.pageKey]: {
            ...state.data.fetched[action.payload.pageKey],
            [action.payload.key]: true,
          },
        },
        [action.payload.pageKey]: {
          ...state.data[action.payload.pageKey],
          [action.payload.key]: action.payload.value,
        },
      },
    }),
  },
});

export const {
  dvtSidebarReportsSetProperty,
  dvtSidebarAlertsSetProperty,
  dvtSidebarConnectionSetProperty,
  dvtSidebarChartAddSetProperty,
  dvtSidebarSetProperty,
  dvtSidebarSetDataProperty,
} = dvtSidebarSlice.actions;

export default dvtSidebarSlice.reducer;
