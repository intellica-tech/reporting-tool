/* eslint-disable react-hooks/exhaustive-deps */
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

import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import withToasts from 'src/components/MessageToasts/withToasts';
import {
  StyledChartList,
  StyledDashboard,
  StyledDashboardEdit,
  StyledOpenSelectMenuFilterTabs,
  StyledOpenSelectMenuFilterTabsGroup,
} from './dvtdashboardEdit.module';
import DvtCardDetailChartList, {
  DvtCardDetailChartListProps,
} from 'src/components/DvtCardDetailChartList';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtSelect from 'src/components/DvtSelect';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import useFetch from 'src/hooks/useFetch';

function DvtDashboardList() {
  const dispatch = useDispatch();
  const history = useHistory<{ from: string }>();
  const [activeTab, setActiveTab] = useState<string>('charts');
  const [droppedData, setDroppedData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<DvtCardDetailChartListProps>({
    data: [],
  });

  const getApiData = useFetch({
    url: '/chart/?q=(columns:!(changed_on_delta_humanized,changed_on_utc,datasource_id,datasource_type,datasource_url,datasource_name_text,description_markeddown,description,id,params,slice_name,thumbnail_url,url,viz_type,owners.id,created_by.id),filters:!((col:viz_type,opr:neq,value:filter_box)),order_column:changed_on_delta_humanized,order_direction:desc,page_size:200)',
  });

  useEffect(() => {
    if (getApiData) {
      const mappedData: DvtCardDetailChartListProps = {
        data: getApiData.result.map((item: any) => ({
          labelTitle: item.slice_name,
          vizTypeLabel: item.viz_type,
          datasetLabel: item.datasource_name_text,
          modified: new Date(item.changed_on_delta_humanized),
          datasetLink: `/explore/?datasource_type=${item.datasource_type}&datasource_id=${item.datasource_id}`,
        })),
      };
      setChartData(mappedData);
    }
  }, [getApiData]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedDataString = e.dataTransfer.getData('drag-drop');
    const droppedData = JSON.parse(droppedDataString);

    if (droppedData) {
      setDroppedData((prevData: any | any[]) => {
        const newData = Array.isArray(prevData)
          ? [...prevData, droppedData]
          : [droppedData];
        console.log(newData);
        return newData;
      });
    }
  };

  return (
    <StyledDashboardEdit>
      <StyledDashboard onDragOver={handleDragOver} onDrop={handleDrop}>
        <DvtIconDataLabel
          description="You can create a new chart or use existinh ones from the panel on the right"
          icon="square"
          label="Drag and drop components and charts to the dashboard"
          buttonLabel="+ Create a New Chart"
          buttonClick={() => history.push('/chart/add')}
        />
      </StyledDashboard>
      <StyledChartList>
        <StyledOpenSelectMenuFilterTabsGroup>
          <StyledOpenSelectMenuFilterTabs
            activeTab={activeTab === 'charts'}
            onClick={() => setActiveTab('charts')}
          >
            Charts
          </StyledOpenSelectMenuFilterTabs>
          <StyledOpenSelectMenuFilterTabs
            activeTab={activeTab === 'layoutElements'}
            onClick={() => setActiveTab('layoutElements')}
          >
            Layout Elements
          </StyledOpenSelectMenuFilterTabs>
        </StyledOpenSelectMenuFilterTabsGroup>

        <DvtButton
          label="+ Create a New Chart"
          onClick={() => history.push('/chart/add')}
          size="small"
          typeColour="powder"
        />
        <DvtInput
          handleSearchClick={() => {}}
          onChange={() => {}}
          placeholder="Filter your charts"
          size="small"
          type="text"
          typeDesign="chartsForm"
          value=""
        />

        <DvtSelect
          data={[
            {
              label: 'Failed',
              value: 'failed',
            },
            {
              label: 'Success',
              value: 'success',
            },
          ]}
          placeholder="Short by recent"
          selectedValue=""
          setSelectedValue={() => {}}
        />
        <DvtCardDetailChartList data={chartData.data} />
      </StyledChartList>
    </StyledDashboardEdit>
  );
}

export default withToasts(DvtDashboardList);
