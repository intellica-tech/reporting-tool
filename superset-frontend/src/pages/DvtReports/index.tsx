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
import { dvtSidebarReportsSetProperty } from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import DvtPagination from 'src/components/DvtPagination';
import DvtTable from 'src/components/DvtTable';
import withToasts from 'src/components/MessageToasts/withToasts';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import DvtTitleCardList from 'src/components/DvtTitleCardList';
import useFetch from 'src/hooks/useFetch';
import { StyledReports, StyledReportsButton } from './dvt-reports.module';

const modifiedData = {
  header: [
    {
      id: 1,
      title: t('Name'),
      field: 'slice_name',
      checkbox: true,
    },
    { id: 2, title: t('Visualization Type'), field: 'viz_type' },
    { id: 3, title: t('Dataset'), field: 'datasource_name_text' },
    { id: 4, title: t('Modified date'), field: 'date' },
    { id: 5, title: t('Modified by'), field: 'changed_by' },
    { id: 6, title: t('Created by'), field: 'created_by' },
    {
      id: 9,
      title: t('Action'),
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
  ],
};

function ReportList() {
  const dispatch = useDispatch();
  const activeTab = useAppSelector(state => state.dvtNavbar.viewlist.tabs);
  const reportsSelector = useAppSelector(state => state.dvtSidebar.reports);
  const [page, setPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [editedData, setEditedData] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  const [data, setData] = useState<any[]>([]);

  const [favoriteApiUrl, setFavoriteApiUrl] = useState('');

  const reportData = useFetch({
    url: `/api/v1/chart/?q=(order_column:changed_on_delta_humanized,order_direction:desc,page:${page},page_size:10)`,
  });
  const favoriteData = useFetch({ url: favoriteApiUrl });

  useEffect(() => {
    if (reportData) {
      const editedDatas = reportData.result.map((item: any) => ({
        ...item,
        date: new Date(item.changed_on_utc).toLocaleString('tr-TR'),
        created_by: `${item.created_by?.first_name} ${item.created_by?.last_name}`,
        changed_by: `${item.changed_by?.first_name} ${item.changed_by?.last_name}`,
        owner: `${item.owners[0]?.first_name} ${item.owners[0]?.last_name}`,
        dashboards: item.dashboards[0]?.dashboard_title,
        certified: item.certified_by,
      }));
      setEditedData(editedDatas);
      setCount(reportData.count);
    }
  }, [reportData]);

  useEffect(() => {
    if (editedData.length > 0) {
      const idGetData = editedData.map((item: { id: number }) => item.id);
      setFavoriteApiUrl(
        `/api/v1/chart/favorite_status/?q=!(${idGetData.join()})`,
      );
    }
  }, [editedData]);

  useEffect(() => {
    if (favoriteData?.result.length > 0) {
      const addedFavoriteData = [];
      const fvrArray = favoriteData.result;

      for (let i = 0; i < fvrArray.length; i += 1) {
        const favoriteItem = fvrArray[i];
        const editedItem = editedData.find(
          (item: any) => item.id === favoriteItem.id,
        );
        addedFavoriteData.push({
          ...editedItem,
          isFavorite: favoriteItem.value,
        });
      }

      setData(addedFavoriteData);
    }
  }, [favoriteData]);

  const clearReports = () => {
    dispatch(
      dvtSidebarReportsSetProperty({
        reports: {
          ...reportsSelector,
          owner: '',
          createdBy: '',
          chartType: '',
          dataset: '',
          dashboards: '',
          favorite: '',
          certified: '',
        },
      }),
    );
  };

  const handleSetFavorites = (id: number, isFavorite: boolean) => {
    const updateData = (dataList: any[]) => {
      const newData = dataList.map(item =>
        item.id === id ? { ...item, isFavorite: !isFavorite } : item,
      );
      return newData;
    };
    fetch(
      `/superset/favstar/slice/${id}/${isFavorite ? 'unselect' : 'select'}/`,
    ).then(res => {
      if (res.status === 200) {
        setData(updatedData => updateData(updatedData));
      }
    });
  };

  const handleDeselectAll = () => {
    setSelectedRows([]);
  };

  return data.length > 0 ? (
    <StyledReports>
      <div>
        {activeTab === 'Table' && (
          <DvtButton
            label={t('Deselect All')}
            bold
            colour="primary"
            typeColour="outline"
            size="medium"
            onClick={handleDeselectAll}
          />
        )}
      </div>
      {activeTab === 'Table' ? (
        <DvtTable
          data={data}
          header={modifiedData.header}
          selected={selectedRows}
          setSelected={setSelectedRows}
          checkboxActiveField="id"
        />
      ) : (
        <DvtTitleCardList
          data={data.map((item: any) => ({
            id: item.id,
            title: item.slice_name,
            label: item.changed_by_name,
            description: item.changed_on_delta_humanized,
            isFavorite: item.isFavorite,
            link: item.url,
          }))}
          title="Data"
          setFavorites={(id, isFavorite) => handleSetFavorites(id, isFavorite)}
        />
      )}
      <StyledReportsButton>
        <DvtButton
          label={t('Create a New Graph/Chart')}
          onClick={() => {}}
          colour="grayscale"
        />
        <DvtPagination
          page={page}
          setPage={setPage}
          itemSize={count}
          pageItemSize={10}
        />
      </StyledReportsButton>
    </StyledReports>
  ) : (
    <StyledReports>
      <DvtIconDataLabel
        label={
          data.length === 0
            ? t('No Alerts Yet')
            : t('No results match your filter criteria')
        }
        buttonLabel={data.length === 0 ? t('Alert') : t('Clear All Filter')}
        buttonClick={() => {
          if (data.length > 0) {
            clearReports();
          }
        }}
      />
    </StyledReports>
  );
}

export default withToasts(ReportList);
