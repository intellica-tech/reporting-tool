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
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import DvtTitleCardList from 'src/components/DvtTitleCardList';
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
  {
    id: 4,
    title: t('Action'),
    showHover: true,
    clicks: [
      {
        icon: 'edit_alt',
        click: () => {},
        popperLabel: t('Edit'),
      },
      {
        icon: 'share',
        click: () => {},
        popperLabel: t('Export'),
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
  const activeTab = useAppSelector(state => state.dvtNavbar.viewlist.dashboard);
  const annotationLayerSelector = useAppSelector(
    state => state.dvtSidebar.annotationlayer,
  );
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);

  const searchApiUrl = () => {
    const filterData = [
      { col: 'name', opr: 'name', value: '' },
      {
        col: 'descr',
        opr: 'descr',
        value: '',
      },
    ];

    let filters = '';
    const sort = 'order_column:changed_on_delta_humanized,order_direction:desc';

    const withoutValues = [undefined, null, ''];

    const filteredData = filterData
      .filter(item => !withoutValues.includes(item.value))
      .map(item => `(col:${item.col},opr:${item.opr},value:${item.value})`)
      .join(',');

    if (filterData.filter(item => !withoutValues.includes(item.value)).length) {
      filters = `filters:!(${filteredData}),`;
    }

    return `?q=(${filters}${sort},page:${currentPage - 1},page_size:10)`;
  };

  const annotationLayerApi = useFetch({
    url: `/api/v1/annotation_layer/${searchApiUrl()}`,
  });

  useEffect(() => {
    if (annotationLayerApi) {
      setData(
        annotationLayerApi.result.map((item: any) => ({
          ...item,
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

  const handleSetFavorites = (id: number, isFavorite: boolean) => {
    const updateData = (dataList: any[]) => {
      const newData = dataList.map(item =>
        item.id === id ? { ...item, isFavorite: !isFavorite } : item,
      );
      return newData;
    };

    const action = isFavorite ? 'unselect' : 'select';
    fetch(`/superset/favstar/slice/${id}/${action}/`)
      .then(res => {
        if (res.ok) {
          setData(updatedData => updateData(updatedData));
        } else {
          console.error('Favorite has been failed:', res.status);
        }
      })
      .catch(error => {
        console.error('Favorite has been failed:', error);
      });
  };

  return (
    <StyledDashboardList>
      {activeTab === 'Table' && (
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
            <DvtButton
              label={t('Export')}
              icon="dvt-export"
              iconToRight
              colour="primary"
              bold
              typeColour="powder"
              size="small"
              onClick={() => {}}
            />
          </StyledDashboardButtons>
        </StyledDashboardListButtons>
      )}
      <StyledDashboardTable>
        {activeTab === 'Table' ? (
          <DvtTable
            data={data}
            header={headerData}
            selected={selectedRows}
            setSelected={setSelectedRows}
            checkboxActiveField="id"
          />
        ) : (
          <DvtTitleCardList
            data={data.map((item: any) => ({
              id: item.id,
              title: item.dashboard_title,
              label: item.changed_by_name,
              description: `Modified ${item.created_on_delta_humanized}`,
              isFavorite: item.isFavorite,
              link: item.url,
            }))}
            title="Data"
            setFavorites={(id, isFavorite) =>
              handleSetFavorites(id, isFavorite)
            }
          />
        )}
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
