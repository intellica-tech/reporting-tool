/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToasts } from 'src/components/MessageToasts/withToasts';
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
import useFetch from 'src/dvt-hooks/useFetch';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtSpinner from 'src/components/DvtSpinner';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import { prepareCopyToClipboardTabularData } from 'src/utils/common';
import {
  StyledSqlhub,
  StyledSqlhubBottom,
  ResultButtonContainer,
  SqlhubTableScroll,
  SpinnerContainer,
} from './dvt-sqlhub.module';

const tabs = [
  { label: t('RESULTS'), value: 'results' },
  { label: t('QUERY HISTORY'), value: 'query_history' },
];

const UNTITLED_QUERY = 'Untitled Query';

function DvtSqllab() {
  const { addDangerToast } = useToasts();
  const dispatch = useDispatch();
  const sqlhubSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqlhub,
  );
  const sqlhubSelector = useAppSelector(state => state.dvtSqlhub);
  const [limit, setLimit] = useState(1000);
  const [sqlValue, setSqlValue] = useState('SELECT ...');
  const [sqlEditorId, setSqlEditorId] = useState('');
  const [tabActive, setTabActive] = useState<ButtonTabsDataProps>({
    label: t('RESULTS'),
    value: 'results',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [resultHeader, setResultHeader] = useState<any[]>([]);
  const [resultData, setResultData] = useState<any[]>([]);
  const [resultSort, setResultSort] = useState<DvtTableSortProps>({
    column: '',
    direction: 'desc',
  });
  const [resultSearch, setResultSearch] = useState<string>('');

  const [getSchemaApiUrl, setGetSchemaApiUrl] = useState('');
  const [getSeeTableSchemaApiUrl, setGetSeeTableSchemaApiUrl] = useState('');
  const [selectedSeeTableSchemaApiUrl, setSelectedSeeTableSchemaApiUrl] =
    useState('');
  const [tabstateviewPromiseUrl, setTabstateviewPromiseUrl] = useState('');
  const [executePromiseUrl, setExecutePromiseUrl] = useState('');

  const getSchemaApi = useFetch({ url: getSchemaApiUrl });
  const getSeeTableSchemaApi = useFetch({ url: getSeeTableSchemaApiUrl });
  const selectedSeeTableSchemaApi = useFetch({
    url: selectedSeeTableSchemaApiUrl,
  });

  const formData = new FormData();

  const formDataObj = {
    dbId: sqlhubSidebarSelector.database?.value,
    schema: null,
    autorun: false,
    sql: sqlValue,
    queryLimit: limit,
    name: UNTITLED_QUERY,
  };

  formData.append('queryEditor', JSON.stringify(formDataObj));

  const tabstateviewPromiseApi = useFetch({
    url: tabstateviewPromiseUrl,
    defaultParam: '/',
    method: 'POST',
    body: formData,
    formData: true,
    headers: {
      'Content-Disposition': 'form-data; name="queryEditor"',
    },
    withoutJson: true,
  });

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
      sql_editor_id: sqlEditorId.toString(),
      tab: UNTITLED_QUERY,
      tmp_table_name: '',
    },
  });

  useEffect(() => {
    if (tabstateviewPromiseApi.data) {
      setSqlEditorId(tabstateviewPromiseApi.data.id);
    }
  }, [tabstateviewPromiseApi.data]);

  useEffect(() => {
    if (sqlhubSidebarSelector.database?.value) {
      setGetSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/schemas/?q=(force:!f)`,
      );
      setTabstateviewPromiseUrl('tabstateview/');
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
    if (getSchemaApi.data) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'schema',
          value: getSchemaApi.data.result.map((v: string) => ({
            label: v,
            value: v,
          })),
        }),
      );
      setGetSchemaApiUrl('');
    }
  }, [getSchemaApi.data]);

  useEffect(() => {
    if (getSeeTableSchemaApi.data) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqlhub',
          key: 'see_table_schema',
          value: getSeeTableSchemaApi.data.result.map((v: any) => ({
            ...v,
            label: v.value,
          })),
        }),
      );
      setGetSeeTableSchemaApiUrl('');
    }
  }, [getSeeTableSchemaApi.data]);

  useEffect(() => {
    if (selectedSeeTableSchemaApi.data) {
      dispatch(
        dvtSqlhubSetSelectedTables({
          title: selectedSeeTableSchemaApi.data.name,
          data: selectedSeeTableSchemaApi.data.columns,
          selectStar: selectedSeeTableSchemaApi.data.selectStar,
        }),
      );
      setSelectedSeeTableSchemaApiUrl('');
    }
  }, [selectedSeeTableSchemaApi.data]);

  useEffect(() => {
    if (executePromiseApi.data?.status === 'success') {
      if (executePromiseApi.data.data.length) {
        const firstObjectItem = Object.keys(executePromiseApi.data.data[0]);
        const headerFormation = firstObjectItem.map((v, i) => ({
          id: i,
          title: v,
          field: v,
          sort: true,
        }));
        setResultHeader(headerFormation);
        setResultData(executePromiseApi.data.data);
      }
      setLoading(false);
    }
  }, [executePromiseApi.data]);

  useEffect(() => {
    if (resultSort.column) {
      setResultData(
        resultData.sort((a, b) => {
          if (typeof a[resultSort.column] === 'string') {
            return resultSort.direction === 'asc'
              ? a[resultSort.column].localeCompare(b[resultSort.column])
              : b[resultSort.column].localeCompare(a[resultSort.column]);
          }
          return resultSort.direction === 'asc'
            ? a[resultSort.column] - b[resultSort.column]
            : b[resultSort.column] - a[resultSort.column];
        }),
      );
    }
  }, [resultSort]);

  const handleRun = () => {
    setLoading(true);
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

  const filteredResultData = resultData?.length
    ? resultData.filter((obj: any) =>
        Object.keys(resultData[0]).some(objKey =>
          String(obj[objKey])
            .toLowerCase()
            .includes(resultSearch.toLowerCase()),
        ),
      )
    : [];

  const getExportCsvUrl = (clientId: string) =>
    `/api/v1/sqllab/export/${clientId}/`;

  const handleCopyToClick = (text: string) => {
    addDangerToast(t('Copied to CSV!'));
    navigator.clipboard.writeText(text);
  };

  // useEffect(() => {
  //   dispatch(dvtSqlhubSetSqlQuery(sqlValue));
  // }, [sqlValue]);

  useEffect(() => {
    setSqlValue(sqlhubSelector.sqlQuery);
  }, [sqlhubSelector.sqlQuery]);

  return (
    <StyledSqlhub>
      <DvtTextareaSelectRun
        limit={limit}
        setLimit={setLimit}
        value={sqlValue}
        setValue={setSqlValue}
        clickRun={handleRun}
        loading={loading}
      />
      <StyledSqlhubBottom>
        <DvtButtonTabs
          active={tabActive}
          setActive={setTabActive}
          data={tabs}
        />
        {loading ? (
          <SpinnerContainer>
            <DvtSpinner type="grow" size="xlarge" />
          </SpinnerContainer>
        ) : (
          <>
            {tabActive.value === 'results' && resultHeader.length !== 0 && (
              <>
                <ResultButtonContainer>
                  <DvtButton
                    label={t('CREATE CHART')}
                    size="small"
                    bold
                    onClick={() => {}}
                  />
                  <DvtButton
                    label={t('DOWNLOAD TO CSV')}
                    size="small"
                    bold
                    onClick={() => {
                      window.location.href = getExportCsvUrl(
                        executePromiseApi.data.query.id,
                      );
                    }}
                  />
                  <DvtButton
                    label={t('COPY TO CLIPBOARD')}
                    icon="file"
                    bold
                    size="small"
                    onClick={() =>
                      handleCopyToClick(
                        prepareCopyToClipboardTabularData(
                          executePromiseApi.data.data,
                          executePromiseApi.data.columns,
                        ),
                      )
                    }
                  />
                  <DvtInput
                    placeholder={t('Filter results')}
                    value={resultSearch}
                    onChange={setResultSearch}
                  />
                </ResultButtonContainer>
                <SqlhubTableScroll>
                  <DvtTable
                    header={resultHeader}
                    data={filteredResultData}
                    sort={resultSort}
                    setSort={setResultSort}
                  />
                </SqlhubTableScroll>
              </>
            )}
          </>
        )}
      </StyledSqlhubBottom>
    </StyledSqlhub>
  );
}

export default DvtSqllab;
