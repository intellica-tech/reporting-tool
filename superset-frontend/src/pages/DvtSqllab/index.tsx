/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import {
  dvtSqlhubSetSelectedTableRemove,
  dvtSqlhubSetSelectedTables,
  dvtSqlhubSetSelectedTablesClear,
} from 'src/dvt-redux/dvt-sqlhubReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { t } from '@superset-ui/core';
import useFetch from 'src/hooks/useFetch';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import { StyledSqlhub, StyledSqlhubBottom } from './dvt-sqlhub.module';

const tabs = [
  { label: t('RESULTS'), value: 'results' },
  { label: t('QUERY HISTORY'), value: 'query_history' },
];

const UNTITLED_QUERY = 'Untitled Query';

function DvtSqllab() {
  const dispatch = useDispatch();
  const sqlhubSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqlhub,
  );
  const sqlhubSelector = useAppSelector(state => state.dvtSqlhub);
  const [limit, setLimit] = useState(1000);
  const [sqlValue, setSqlValue] = useState('SELECT ...');
  // const [sqlEditorId, setSqlEditorId] = useState('');
  const [tabActive, setTabActive] = useState<ButtonTabsDataProps>({
    label: t('RESULTS'),
    value: 'results',
  });

  const [getSchemaApiUrl, setGetSchemaApiUrl] = useState('');
  const [getSeeTableSchemaApiUrl, setGetSeeTableSchemaApiUrl] = useState('');
  const [selectedSeeTableSchemaApiUrl, setSelectedSeeTableSchemaApiUrl] =
    useState('');
  // const [tabstateviewPromiseUrl, setTabstateviewPromiseUrl] = useState('');
  const [executePromiseUrl, setExecutePromiseUrl] = useState('');

  const getSchemaApi = useFetch({ url: getSchemaApiUrl });
  const getSeeTableSchemaApi = useFetch({ url: getSeeTableSchemaApiUrl });
  const selectedSeeTableSchemaApi = useFetch({
    url: selectedSeeTableSchemaApiUrl,
  });

  // const formData = new FormData();

  // const formDataObj = {
  //   dbId: sqlhubSidebarSelector.database?.value,
  //   schema: null,
  //   autorun: false,
  //   sql: sqlValue,
  //   queryLimit: limit,
  //   name: UNTITLED_QUERY,
  // };

  // formData.append('dbId', 's');

  // const tabstateviewPromiseApi = useFetch({
  //   url: tabstateviewPromiseUrl,
  //   method: 'POST',
  //   body: formData,
  //   formData: true,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });

  const executePromiseApi = useFetch({
    url: executePromiseUrl,
    method: 'POST',
    body: {
      client_id: '',
      ctas_method: 'TABLE',
      database_id: sqlhubSidebarSelector.database?.value,
      expand_data: true,
      json: true,
      queryLimit: limit,
      runAsync: false,
      schema: sqlhubSidebarSelector.schema?.value,
      select_as_cta: false,
      sql: sqlValue,
      sql_editor_id: '', // sqlEditorId
      tab: UNTITLED_QUERY,
      tmp_table_name: '',
    },
  });

  // useEffect(() => {
  //   if (tabstateviewPromiseApi) {
  //     setSqlEditorId(tabstateviewPromiseApi.id);
  //   }
  // }, [tabstateviewPromiseApi]);

  useEffect(() => {
    if (sqlhubSidebarSelector.database?.value) {
      setGetSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/schemas/?q=(force:!f)`,
      );
      // setTabstateviewPromiseUrl('tabstateview/');
    }
  }, [sqlhubSidebarSelector.database]);

  useEffect(() => {
    if (
      sqlhubSidebarSelector.database?.value &&
      sqlhubSidebarSelector.schema?.value
    ) {
      setGetSeeTableSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/tables/?q=(force:!f,schema_name:${sqlhubSidebarSelector.schema.value})`,
      );
    }
  }, [sqlhubSidebarSelector.database, sqlhubSidebarSelector.schema]);

  useEffect(() => {
    if (
      sqlhubSidebarSelector.database?.value &&
      sqlhubSidebarSelector.schema?.value &&
      sqlhubSidebarSelector.see_table_schema.length
    ) {
      const onlyTitles = sqlhubSelector.selectedTables.map(
        ({ title }: any) => title,
      );
      const findedTitle = sqlhubSidebarSelector.see_table_schema.find(
        (i: any) => !onlyTitles.includes(i),
      );
      if (onlyTitles.length >= sqlhubSidebarSelector.see_table_schema.length) {
        dispatch(
          dvtSqlhubSetSelectedTableRemove(
            onlyTitles.find(
              (t: string) =>
                !sqlhubSidebarSelector.see_table_schema.includes(t),
            ),
          ),
        );
      } else {
        setSelectedSeeTableSchemaApiUrl(
          `database/${sqlhubSidebarSelector.database.value}/table/${findedTitle}/${sqlhubSidebarSelector.schema.value}/`,
        );
      }
    }
  }, [sqlhubSidebarSelector]);

  useEffect(() => {
    if (getSchemaApi) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'schema',
          value: getSchemaApi.result.map((v: string) => ({
            label: v,
            value: v,
          })),
        }),
      );
      setGetSchemaApiUrl('');
    }
  }, [getSchemaApi]);

  useEffect(() => {
    if (getSeeTableSchemaApi) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'see_table_schema',
          value: getSeeTableSchemaApi.result.map((v: any) => ({
            ...v,
            label: v.value,
          })),
        }),
      );
      setGetSeeTableSchemaApiUrl('');
    }
  }, [getSeeTableSchemaApi]);

  useEffect(() => {
    if (selectedSeeTableSchemaApi) {
      dispatch(
        dvtSqlhubSetSelectedTables({
          title: selectedSeeTableSchemaApi.name,
          data: selectedSeeTableSchemaApi.columns,
          selectStar: selectedSeeTableSchemaApi.selectStar,
        }),
      );
      setSelectedSeeTableSchemaApiUrl('');
    }
  }, [selectedSeeTableSchemaApi]);

  useEffect(() => {
    if (executePromiseApi) {
      console.log(executePromiseApi);
    }
  }, [executePromiseApi]);

  const handleRun = () => {
    setExecutePromiseUrl('sqllab/execute/');
    setTimeout(() => {
      setExecutePromiseUrl('');
    }, 500);
  };

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('sqlhub'));
      dispatch(dvtSqlhubSetSelectedTablesClear());
      setSqlValue('');
    },
    [],
  );

  return (
    <StyledSqlhub>
      <DvtTextareaSelectRun
        limit={limit}
        setLimit={setLimit}
        value={sqlValue}
        setValue={setSqlValue}
        clickRun={handleRun}
      />
      <StyledSqlhubBottom>
        <DvtButtonTabs
          active={tabActive}
          setActive={setTabActive}
          data={tabs}
        />
      </StyledSqlhubBottom>
    </StyledSqlhub>
  );
}

export default DvtSqllab;
