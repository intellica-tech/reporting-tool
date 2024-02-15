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
import useFetch from 'src/hooks/useFetch';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';
import { StyledSqlhub } from './dvt-sqlhub.module';

function DvtSqllab() {
  const dispatch = useDispatch();
  const sqlhubSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqlhub,
  );
  const sqlhubSelector = useAppSelector(state => state.dvtSqlhub);
  const [limit, setLimit] = useState(1000);
  const [value, setValue] = useState('');

  const [getSchemaApiUrl, setGetSchemaApiUrl] = useState('');
  const [getSeeTableSchemaApiUrl, setGetSeeTableSchemaApiUrl] = useState('');
  const [selectedSeeTableSchemaApiUrl, setSelectedSeeTableSchemaApiUrl] =
    useState('');

  const getSchemaApi = useFetch({ url: getSchemaApiUrl });
  const getSeeTableSchemaApi = useFetch({ url: getSeeTableSchemaApiUrl });
  const selectedSeeTableSchemaApi = useFetch({
    url: selectedSeeTableSchemaApiUrl,
  });

  useEffect(() => {
    if (sqlhubSidebarSelector.database?.value) {
      setGetSchemaApiUrl(
        `database/${sqlhubSidebarSelector.database.value}/schemas/?q=(force:!f)`,
      );
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

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('sqlhub'));
      dispatch(dvtSqlhubSetSelectedTablesClear());
      setValue('');
    },
    [],
  );

  return (
    <StyledSqlhub>
      <DvtTextareaSelectRun
        limit={limit}
        setLimit={setLimit}
        value={value}
        setValue={setValue}
        clickRun={() => {}}
      />
    </StyledSqlhub>
  );
}

export default DvtSqllab;
