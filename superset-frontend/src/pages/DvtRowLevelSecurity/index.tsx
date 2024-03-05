/* eslint-disable react-hooks/exhaustive-deps */
import { t } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { useAppSelector } from 'src/hooks/useAppSelector';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtRowLevelSecurityAddStatus } from 'src/dvt-redux/dvt-rowlevelsecurityReducer';
import DvtPagination from 'src/components/DvtPagination';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import {
  StyledRowLevelSecurity,
  StyledRowLevelSecurityButton,
  StyledRowLevelSecurityPagination,
} from './dvt-row-level-security.module';

function DvtRowLevelSecurity() {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'changed_on_delta_humanized',
    direction: 'desc',
  });
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const modalAddSuccess = useAppSelector(
    state => state.dvtRowLevelSecurity.rowLevelSecurityAddStatus,
  );
  const rowLevelSecuritySelector = useAppSelector(
    state => state.dvtSidebar.rowLevelSecurity,
  );
  const deleteSuccessStatus = useAppSelector(
    state => state.dvtHome.deleteSuccessStatus,
  );
  const [rowLevelSecurityApiUrl, setRowLevelSecurityApiUrl] =
    useState<string>('');

  const rowLevelSecurityData = useFetch({
    url: rowLevelSecurityApiUrl,
  });

  const searchApiUrls = (gPage: number) =>
    `rowlevelsecurity/${fetchQueryParamsSearch({
      filters: [
        {
          col: 'name',
          opr: 'sw',
          value: rowLevelSecuritySelector.name,
        },
        {
          col: 'filter_type',
          opr: 'eq',
          value: rowLevelSecuritySelector.filterType?.value,
        },
        {
          col: 'group_key',
          opr: 'sw',
          value: rowLevelSecuritySelector.groupKey,
        },
        {
          col: 'changed_by',
          opr: 'rel_o_m',
          value: rowLevelSecuritySelector.modifiedBy?.value,
        },
      ],
      page: gPage,
      orderColumn: sort.column,
      orderDirection: sort.direction,
    })}`;

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setRowLevelSecurityApiUrl(searchApiUrls(page));
    }
  }, [rowLevelSecuritySelector, sort]);

  useEffect(() => {
    setRowLevelSecurityApiUrl('rowlevelsecurity/');
    setTimeout(() => {
      setRowLevelSecurityApiUrl('');
    }, 500);
  }, []);

  useEffect(() => {
    if (rowLevelSecurityData) {
      const editedData = rowLevelSecurityData.result;
      setCount(rowLevelSecurityData.count);
      setData(editedData);
    }
  }, [rowLevelSecurityData]);

  useEffect(() => {
    if (modalAddSuccess === 'Success') {
      setRowLevelSecurityApiUrl('rowlevelsecurity/');
      setTimeout(() => {
        setRowLevelSecurityApiUrl('');
      }, 500);
      dispatch(dvtRowLevelSecurityAddStatus(''));
    }
  }, [modalAddSuccess]);

  useEffect(() => {
    if (deleteSuccessStatus) {
      dispatch(dvtHomeDeleteSuccessStatus(''));
    }
    setRowLevelSecurityApiUrl(searchApiUrls(page));
  }, [deleteSuccessStatus, page, sort]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setRowLevelSecurityApiUrl(searchApiUrls(page));
    }
  }, [rowLevelSecuritySelector]);

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'rowlevelsecurity', title: 'rules' },
      }),
    );
    setRowLevelSecurityApiUrl('');
  };

  const handleEdit = (item: any) => {
    dispatch(
      openModal({
        component: 'rowlevelsecurity-add-modal',
        meta: { ...item, isEdit: true },
      }),
    );
  };

  const headerData = [
    { id: 1, title: t('Name'), field: 'name', checkbox: true, sort: true },
    { id: 2, title: t('Filter Type'), field: 'filter_type', sort: true },
    { id: 3, title: t('Group Key'), field: 'group_key', flex: 1.5, sort: true },
    { id: 4, title: t('Clause'), field: 'clause', sort: true },
    {
      id: 5,
      title: t('Modified'),
      field: 'changed_on_delta_humanized',
      sort: true,
    },
    {
      id: 6,
      title: 'Actions',
      showHover: true,
      clicks: [
        {
          icon: 'edit_alt',
          click: (item: any) => handleEdit(item),
          popperLabel: t('Edit'),
        },
        {
          icon: 'trash',
          click: (item: any) => handleModalDelete(item),
          popperLabel: t('Delete'),
        },
      ],
    },
  ];

  useEffect(() => {
    return () => {
      setData([]);
    };
  }, []);

  return (
    <StyledRowLevelSecurity>
      <StyledRowLevelSecurityButton>
        <DvtButton
          label="Delete"
          onClick={() => handleModalDelete(selectedRows)}
          colour="error"
          typeColour="basic"
        />
      </StyledRowLevelSecurityButton>
      <div>
        {!rowLevelSecurityData || rowLevelSecurityData.length === 0 ? (
          <DvtIconDataLabel
            label="No Records Found"
            buttonLabel="Add New Record"
          />
        ) : (
          <DvtTable
            data={data}
            header={headerData}
            selected={selectedRows}
            setSelected={setSelectedRows}
            checkboxActiveField="id"
            sort={sort}
            setSort={setSort}
          />
        )}
      </div>
      <StyledRowLevelSecurityPagination>
        <DvtPagination
          page={page}
          itemSize={count}
          pageItemSize={10}
          setPage={setPage}
        />
      </StyledRowLevelSecurityPagination>
    </StyledRowLevelSecurity>
  );
}

export default DvtRowLevelSecurity;
