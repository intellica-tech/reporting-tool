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
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';
import {
  StyledDashboardBottom,
  StyledDashboardButtons,
  StyledDashboardCreateDashboard,
  StyledDashboardList,
  StyledDashboardListButtons,
  StyledDashboardPagination,
  StyledDashboardTable,
  StyledDvtSelectButtons,
  StyledSelectedItem,
  StyledSelectedItemCount,
} from './dvtannotationlayerlist.module';

const headerData = [
  {
    id: 1,
    title: t('Name'),
    field: 'name',
    flex: 3,
    checkbox: true,
    urlField: 'url',
  },
  {
    id: 2,
    title: t('Description'),
    field: 'descr',
    urlField: 'descr',
  },
  { id: 3, title: t('Last Modified'), field: 'changed_on_delta_humanized' },
  { id: 4, title: t('Created on'), field: 'created_on' },
  { id: 5, title: t('Created by'), field: 'created_by' },
  {
    id: 6,
    title: t('Action'),
    showHover: true,
    clicks: [
      {
        icon: 'edit_alt',
        click: () => {},
        popperLabel: t('Edit'),
      },
      {
        icon: 'trash',
        click: () => {},
        popperLabel: t('Delete'),
      },
    ],
  },
];

function DvtAnnotationLayerList() {
  const history = useHistory<{ from: string }>();
  const annotationSelector = useAppSelector(
    state => state.dvtSidebar.annotationLayer,
  );
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  const annotationLayerApi = useFetch({
    url: `annotation_layer/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'created_by',
          opr: 'rel_o_m',
          value: annotationSelector.createdBy?.value,
        },
        {
          col: 'name',
          opr: 'ct',
          value: annotationSelector.search,
        },
      ],
      page: currentPage,
    })}`,
  });

  useEffect(() => {
    if (annotationLayerApi) {
      setData(
        annotationLayerApi.result.map((item: any) => ({
          ...item,
          created_on: `${new Date(item.created_on).getDay()}.${new Date(
            item.created_on,
          ).getMonth()}.${new Date(item.created_on).getFullYear()}`,
          created_by: `${item.created_by.first_name} ${item.created_by.last_name}`,
        })),
      );
      setCount(annotationLayerApi.count);
      setSelectedRows([]);
    }
  }, [annotationLayerApi]);

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  const handleCreateAnnotationLayer = () => {
    history.push('/annotationlayer');
  };

  return (
    <StyledDashboardList>
      <StyledDashboardListButtons>
        <StyledDvtSelectButtons>
          <StyledSelectedItem>
            <StyledSelectedItemCount>
              <span>{`${selectedRows.length} Selected`}</span>
            </StyledSelectedItemCount>

            <DvtButton
              label={t('Deselect All')}
              bold
              colour="primary"
              typeColour="outline"
              size="medium"
              onClick={handleDeselectAll}
            />
          </StyledSelectedItem>
        </StyledDvtSelectButtons>
        <StyledDashboardButtons>
          <DvtButton
            label={t('Delete')}
            icon="dvt-delete"
            iconToRight
            colour="error"
            size="small"
            onClick={() => {}}
          />
        </StyledDashboardButtons>
      </StyledDashboardListButtons>
      <StyledDashboardTable>
        <DvtTable
          data={data}
          header={headerData}
          selected={selectedRows}
          setSelected={setSelectedRows}
          checkboxActiveField="id"
        />
      </StyledDashboardTable>
      <StyledDashboardBottom>
        <StyledDashboardCreateDashboard>
          <DvtButton
            label={t('Create a New Annotation Layer')}
            colour="grayscale"
            bold
            typeColour="basic"
            onClick={handleCreateAnnotationLayer}
          />
        </StyledDashboardCreateDashboard>
        <StyledDashboardPagination>
          <DvtPagination
            page={currentPage}
            setPage={setCurrentPage}
            itemSize={count}
            pageItemSize={10}
          />
        </StyledDashboardPagination>
      </StyledDashboardBottom>
    </StyledDashboardList>
  );
}

export default withToasts(DvtAnnotationLayerList);
