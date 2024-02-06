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
// import { useAppSelector } from 'src/hooks/useAppSelector';
import withToasts from 'src/components/MessageToasts/withToasts';
import { useDispatch } from 'react-redux';
import { t } from '@superset-ui/core';
import handleResourceExport from 'src/utils/export';
import { Moment } from 'moment';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
// import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import DvtCalendar from 'src/components/DvtCalendar';
import DvtButton from 'src/components/DvtButton';
import DvtTitleCardList, {
  CardDataProps,
} from 'src/components/DvtTitleCardList';
import {
  StyledDvtWelcome,
  DataContainer,
  CalendarContainer,
} from './dvt-home.module';

const formatDashboardData = (data: any[]) =>
  data.map(item => ({
    id: item.id,
    title: item.dashboard_title,
    label: item.changed_by_name,
    description: `Modified ${item.changed_on_delta_humanized}`,
    isFavorite: false,
    link: item.url,
    favoriteUrl: 'Dashboard',
    paramUrl: 'dashboard',
  }));

const formatDatasetData = (data: any[]) =>
  data.map(item => ({
    id: item.id,
    title: item.table_name,
    label: item.schema,
    description: `Modified ${item.changed_on_delta_humanized}`,
    isFavorite: false,
    link: item.explore_url,
  }));

const formatChartData = (data: any[]) =>
  data.map(item => ({
    id: item.id,
    title: item.slice_name,
    label: item.datasource_type,
    description: `Modified ${item.changed_on_delta_humanized}`,
    isFavorite: false,
    link: item.url,
    favoriteUrl: 'slice',
    paramUrl: 'chart',
  }));

const formatRecentData = (data: any[]) =>
  data.map(item => ({
    id: Math.floor(item.time),
    title: item.item_title,
    label: '',
    description: `Modified ${item.time_delta_humanized}`,
    isFavorite: null,
    link: item.item_url,
  }));

function DvtWelcome() {
  const dispatch = useDispatch();
  const [openCalendar, setOpenCalendar] = useState<boolean>(true);
  const [calendar, setCalendar] = useState<Moment | null>(null);
  const [whatsNewData, setWhatsNewData] = useState<CardDataProps[]>([]);
  const [recentData, setRecentData] = useState<CardDataProps[]>([]);
  const [dashboardFavoriteData, setDashboardFavoriteData] = useState<
    CardDataProps[]
  >([]);
  const [chartFavoriteData, setChartFavoriteData] = useState<CardDataProps[]>(
    [],
  );

  const [favoriteUrl, setFavoriteUrl] = useState<{
    url: string;
    title: string;
    id: number;
  }>({ url: '', title: '', id: 0 });

  // const deleteSuccessStatus = useAppSelector(
  //   state => state.dvtHome.deleteSuccessStatus,
  // );

  const dashboardPromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({ pageSize: 5 })}`,
  });
  const datasetPromise = useFetch({
    url: `dataset/${fetchQueryParamsSearch({ pageSize: 5 })}`,
  });
  const chartPromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({ pageSize: 5 })}`,
  });

  const recentsPromise = useFetch({ url: 'log/recent_activity/1/' });

  const dashboardFavouritePromise = useFetch({
    url: `dashboard/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'dashboard_is_favorite', value: '!t' }],
      pageSize: 5,
    })}`,
  });
  const chartFavouritePromise = useFetch({
    url: `chart/${fetchQueryParamsSearch({
      filters: [{ col: 'id', opr: 'chart_is_favorite', value: '!t' }],
      pageSize: 5,
    })}`,
  });

  const favoritePromise = useFetch({
    url: favoriteUrl.url,
    defaultParam: '/superset/',
  });

  useEffect(() => {
    if (dashboardPromise) {
      setWhatsNewData(state => [
        ...state,
        ...formatDashboardData(dashboardPromise.result),
      ]);
    }
  }, [dashboardPromise]);

  useEffect(() => {
    if (datasetPromise) {
      setWhatsNewData(state => [
        ...state,
        ...formatDatasetData(datasetPromise.result),
      ]);
    }
  }, [datasetPromise]);

  useEffect(() => {
    if (chartPromise) {
      setWhatsNewData(state => [
        ...state,
        ...formatChartData(chartPromise.result),
      ]);
    }
  }, [chartPromise]);

  useEffect(() => {
    if (recentsPromise) {
      setRecentData(formatRecentData(recentsPromise.result));
    }
  }, [recentsPromise]);

  useEffect(() => {
    if (dashboardFavouritePromise) {
      setDashboardFavoriteData(
        formatDashboardData(dashboardFavouritePromise.result),
      );
    }
  }, [dashboardFavouritePromise]);

  useEffect(() => {
    if (chartFavouritePromise) {
      setChartFavoriteData(formatChartData(chartFavouritePromise.result));
    }
  }, [chartFavouritePromise]);

  const handleSetFavorites = (
    id: number,
    isFavorite: boolean,
    title: string,
  ) => {
    setFavoriteUrl({
      url: `favstar/${title}/${id}/${isFavorite ? 'unselect' : 'select'}/`,
      title,
      id,
    });
  };

  useEffect(() => {
    if (favoritePromise) {
      if (favoriteUrl.title === 'Dashboard') {
        setDashboardFavoriteData(state =>
          state.filter(item => item.id !== favoriteUrl.id),
        );
      }
      if (favoriteUrl.title === 'slice') {
        setChartFavoriteData(state =>
          state.filter(item => item.id !== favoriteUrl.id),
        );
      }
    }
  }, [favoritePromise]);

  // useEffect(() => {
  //   if (deleteSuccessStatus === 'chart') {
  //     setChartFavoriteData(state =>
  //       state.filter(item => item.id !== favoriteUrl.id),
  //     );
  //     dispatch(dvtHomeDeleteSuccessStatus(''));
  //   } else if (deleteSuccessStatus === 'dashboard') {
  //     setDashboardFavoriteData(state =>
  //       state.filter(item => item.id !== favoriteUrl.id),
  //     );
  //     dispatch(dvtHomeDeleteSuccessStatus(''));
  //   }
  // }, [deleteSuccessStatus]);

  // const handleEditDashboard = async (item: any) => {
  //   try {
  //     const response = await fetch(`/api/v1/dashboard/${item.id}`);
  //     const editedDashboardData = await response.json();

  //     dispatch(
  //       openModal({
  //         component: 'edit-dashboard',
  //         meta: editedDashboardData,
  //       }),
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleBulkExport = (item: any) => {
    handleResourceExport(item.paramUrl, [item.id], () => {});
  };

  const handleDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: item.paramUrl },
      }),
    );
  };

  // const copyQueryLink = (id: number) => {
  //   addDangerToast(t('Link Copied!'));
  //   navigator.clipboard.writeText(
  //     `${window.location.origin}/sqllab?savedQueryId=${id}`,
  //   );
  // };

  return (
    <StyledDvtWelcome>
      <DataContainer>
        <DvtTitleCardList
          title={t("What's new")}
          data={whatsNewData.map(item => ({
            ...item,
            isFavorite: null,
          }))}
        />
        <DvtTitleCardList title={t('Recent')} data={recentData} />
        <DvtTitleCardList
          title={t('Favorites')}
          data={[...dashboardFavoriteData, ...chartFavoriteData].map(item => ({
            ...item,
            isFavorite: true,
          }))}
          setFavorites={handleSetFavorites}
          dropdown={[
            { label: t('Edit'), icon: 'edit_alt', onClick: () => {} },
            {
              label: t('Export'),
              icon: 'share',
              onClick: (item: any) => {
                handleBulkExport(item);
              },
            },
            {
              label: t('Delete'),
              icon: 'trash',
              onClick: (item: any) => {
                handleDelete(item);
              },
            },
          ]}
        />
        {/* <DvtTitleCardList
          title={t('Most Used')}
          data={[]}
          dropdown={[
            {
              label: t('Share'),
              onClick: (item: any) => {
                if (item.id) {
                  copyQueryLink(item.id);
                }
              },
            },
          ]}
        /> */}
      </DataContainer>
      <CalendarContainer>
        {openCalendar ? (
          <DvtCalendar
            isOpen={openCalendar}
            setIsOpen={setOpenCalendar}
            selectedDate={calendar}
            setSelectedDate={date => date && setCalendar(date)}
          />
        ) : (
          <DvtButton
            label={t('Open Calendar')}
            onClick={() => setOpenCalendar(true)}
          />
        )}
      </CalendarContainer>
    </StyledDvtWelcome>
  );
}

export default withToasts(DvtWelcome);
