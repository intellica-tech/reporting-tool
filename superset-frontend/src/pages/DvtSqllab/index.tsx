/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarSetDataProperty,
  dvtSidebarSetPropertyClear,
} from 'src/dvt-redux/dvt-sidebarReducer';
import { dvtSqlhubSetSelectedTables } from 'src/dvt-redux/dvt-sqlhubReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import useFetch from 'src/hooks/useFetch';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';
import { StyledSqlhub } from './dvt-sqlhub.module';

function DvtSqllab() {
  const dispatch = useDispatch();
  const sqllabSidebarSelector = useAppSelector(
    state => state.dvtSidebar.sqllab,
  );
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
    if (sqllabSidebarSelector.database?.value) {
      setGetSchemaApiUrl(
        `database/${sqllabSidebarSelector.database.value}/schemas/?q=(force:!f)`,
      );
    }
  }, [sqllabSidebarSelector.database]);

  useEffect(() => {
    if (
      sqllabSidebarSelector.database?.value &&
      sqllabSidebarSelector.schema?.value
    ) {
      setGetSeeTableSchemaApiUrl(
        `database/${sqllabSidebarSelector.database.value}/tables/?q=(force:!f,schema_name:${sqllabSidebarSelector.schema.value})`,
      );
    }
  }, [sqllabSidebarSelector.database, sqllabSidebarSelector.schema]);

  useEffect(() => {
    if (
      sqllabSidebarSelector.database?.value &&
      sqllabSidebarSelector.schema?.value &&
      sqllabSidebarSelector.see_table_schema?.value
    ) {
      setSelectedSeeTableSchemaApiUrl(
        `database/${sqllabSidebarSelector.database.value}/table/${sqllabSidebarSelector.see_table_schema.value}/${sqllabSidebarSelector.schema.value}/`,
      );
    }
  }, [sqllabSidebarSelector]);

  useEffect(() => {
    if (getSchemaApi) {
      dispatch(
        dvtSidebarSetDataProperty({
          pageKey: 'sqllab',
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
          pageKey: 'sqllab',
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
      dispatch(dvtSqlhubSetSelectedTables(selectedSeeTableSchemaApi));
      setSelectedSeeTableSchemaApiUrl('');
    }
  }, [selectedSeeTableSchemaApi]);

  useEffect(
    () => () => {
      dispatch(dvtSidebarSetPropertyClear('sqllab'));
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
