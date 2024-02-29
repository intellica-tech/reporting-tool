import { t } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import useFetch from 'src/hooks/useFetch';
import { fetchQueryParamsSearch } from 'src/dvt-utils/fetch-query-params';
import { useAppSelector } from 'src/hooks/useAppSelector';
import DvtButton from 'src/components/DvtButton';
import DvtIconDataLabel from 'src/components/DvtIconDataLabel';
import DvtTable from 'src/components/DvtTable';
import { openModal } from 'src/dvt-redux/dvt-modalReducer';
import {
  StyledRowLevelSecurity,
  StyledRowLevelSecurityButton,
  StyledRowLevelSecurityPagination,
} from './dvt-row-level-security.module';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import { dvtRowLevelSecurityAddStatus } from 'src/dvt-redux/dvt-rowlevelsecurityReducer';
import DvtPagination from 'src/components/DvtPagination';

function DvtRowLevelSecurity() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
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
          value: rowLevelSecuritySelector.changedBy?.value,
        },
      ],
      page: gPage,
    })}`;

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setRowLevelSecurityApiUrl(searchApiUrls(page));
    }
  }, [rowLevelSecuritySelector]);

  useEffect(() => {
    setRowLevelSecurityApiUrl('rowlevelsecurity/');
    setTimeout(() => {
      setRowLevelSecurityApiUrl('');
    }, 500);
  }, []);

  useEffect(() => {
    if (rowLevelSecurityData) {
      const editedData = rowLevelSecurityData.result.map((item: any) => ({
        ...item,
        id: item.id,
        name: item.name,
        filter_type: item.filter_type,
        tables: item.tables[0].table_name,
        roles: item.roles[0].name,
        clause: item.clause,
        modified: item.changed_on_delta_humanized,
        creator: `${item.changed_by.first_name} ${item.changed_by.last_name}`,
      }));
      setCount(rowLevelSecurityData.count);
      setData(editedData);
      console.log('setData');
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
  }, [deleteSuccessStatus, page]);

  useEffect(() => {
    setPage(1);
    if (page === 1) {
      setRowLevelSecurityApiUrl(searchApiUrls(page));
    }
  }, [rowLevelSecuritySelector]);

  const handleDelete = () => {
    const selectedId = selectedRows.map(row => row.id);
    const updatedData = data.filter(item => !selectedId.includes(item.id));

    setData(updatedData);
    setCount(updatedData.length);

    setSelectedRows([]);
    console.log('row', selectedRows);
    console.log('data', data);
    console.log('Deleted!', updatedData);
  };

  const handleModalDelete = (item: any) => {
    dispatch(
      openModal({
        component: 'delete-modal',
        meta: { item, type: 'dashboard', title: 'dashboard' },
      }),
    );
    setRowLevelSecurityApiUrl('');
  };

  const handleEdit = (item: any) => {
    dispatch(
      openModal({
        component: 'edit-dashboard',
        meta: { id: item.id },
      }),
    );
  };

  const headerData = [
    { id: 1, title: t('Name'), field: 'name', checkbox: true },
    { id: 2, title: t('Filter Type'), field: 'filter_type' },
    { id: 3, title: t('Tables'), field: 'tables', flex: 1.5 },
    {
      id: 4,
      title: t('Roles'),
      field: 'roles',
    },
    { id: 5, title: t('Clause'), field: 'clause' },
    { id: 6, title: t('Modified'), field: 'modified' },
    {
      id: 7,
      title: 'Actions',
      showHover: true,
      clicks: [
        {
          icon: 'search',
          click: (item: any) => handleEdit(item),
          popperLabel: t('Show Record'),
        },
        {
          icon: 'edit_alt',
          click: (item: any) => handleEdit(item),
          popperLabel: t('Edit Record'),
        },
        {
          icon: 'trash',
          click: (item: any) => handleModalDelete(item),
          popperLabel: t('Show Record'),
        },
      ],
    },
  ];

  return (
    <StyledRowLevelSecurity>
      <StyledRowLevelSecurityButton>
        <DvtButton
          label="Delete"
          onClick={handleDelete}
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
