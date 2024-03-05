import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import {
  StyledDatasetEdit,
  StyledDatasetEditBody,
  StyledDatasetEditHeader,
  StyledDatasetEditButtonContainer,
  StyledDatasetEditLabel,
  StyledDatasetEditNavigationContainer,
  ModalBreak,
  InfoText,
  SourceBody,
  SourceLockContainer,
  SourceCheckboxContainer,
  SourceInputContainer,
  SettingsBlock,
  SettingsBody,
  ModalInfoTextContainer,
} from './dataset-edit.module';
import Icon from 'src/components/Icons/Icon';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtSelect from 'src/components/DvtSelect';
import DvtTextareaSelectRun from 'src/components/DvtTextareaSelectRun';

const DvtDatasetEdit = ({ meta, onClose }: ModalProps) => {
  const [isWarningActive, setIsWarningActive] = useState<boolean>(true);
  const [modalData, setModalData] = useState<any>({
    always_filter_main_dttm: meta.result.always_filter_main_dttm,
    cache_timeout: meta.result.cache_timeout,
    columns: meta.result.columns,
    database_id: meta.result.database.id,
    default_endpoint: meta.result.default_endpoint,
    description: meta.result.description,
    extra: meta.result.extra,
    fetch_values_predicate: meta.result.fetch_values_predicate,
    filter_select_enabled: meta.result.filter_select_enabled,
    is_managed_externally: meta.result.is_managed_externally,
    is_sqllab_view: meta.result.is_sqllab_view,
    main_dttm_col: meta.result.main_dttm_col,
    metrics: meta.result.metrics,
    normalize_columns: meta.result.normalize_columns,
    offset: meta.result.offset,
    owners: meta.result.owners,
    schema: meta.result.schema,
    sql: meta.result.sql,
    table_name: meta.result.table_name,
    template_params: meta.result.template_params,
  });

  // Source
  const [databaseSelection, setDatabaseSelection] = useState<any>({
    label: meta.result.database.database_name,
    value: meta.result.database.id,
  });
  const [schemaUrl, setSchemaUrl] = useState<string>('');
  const [schemaSelection, setSchemaSelection] = useState<any>({
    label: meta.result.schema,
    value: meta.result.schema,
  });
  const [tableUrl, setTableUrl] = useState<string>('');
  const [tableSelection, setTableSelection] = useState<any>();

  const [databaseList, setDatabaseList] = useState<any>([]);
  const [schemaList, setSchemaList] = useState<any>([]);
  const [tableList, setTableList] = useState<any>([]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [sourceSqllimit, setSourceSqlLimit] = useState(1000);
  const [sourceSqlValue, setSourceSqlValue] = useState<string>(
    meta.result.sql || 'SELECT ...',
  );
  const [sourceSqlLoading, setSourceSqlLoading] = useState<boolean>(false);
  const handleRunSourceSQL = () => {
    setSourceSqlLoading(true);
    setExecutePromiseUrl('sqllab/execute/');
    setTimeout(() => {
      setExecutePromiseUrl('');
    }, 500);
  };

  const databaseResponse = useFetch({ url: 'database' });
  const schemaResponse = useFetch({ url: schemaUrl });
  const tableResponse = useFetch({ url: tableUrl });

  useEffect(() => {
    if (databaseResponse) {
      setDatabaseList(
        databaseResponse.result.map(database => ({
          label: database.database_name,
          value: database.id,
        })),
      );
    }
  }, [databaseResponse]);

  useEffect(() => {
    if (databaseSelection) {
      setSchemaUrl(`database/${databaseSelection.value}/schemas/?q=(force:!t)`);
    }
  }, [databaseSelection]);

  useEffect(() => {
    if (schemaResponse) {
      setSchemaList(
        schemaResponse.result.map((item, index) => ({
          label: item,
          value: index,
        })),
      );
    }
  }, [schemaResponse]);

  useEffect(() => {
    if (schemaSelection) {
      setTableUrl(
        `database/${databaseSelection.value}/tables/?q=(force:!t,schema_name:${schemaSelection.label})`,
      );
    }
  }, [schemaSelection]);

  useEffect(() => {
    if (tableResponse) {
      setTableList(
        tableResponse.result.map((item, index) => ({
          label: item.value,
          value: index,
        })),
      );
    }
  }, [tableResponse]);

  // Settings
  const [owners, setOwners] = useState<string[]>(
    meta.result.owners.map(owner => ({
      label: owner.first_name,
      value: owner.id,
    })),
  );
  const [autocompleteSelected, setAutocompleteSelected] =
    useState<boolean>(false);
  const [settingsSqlLimit, setSettingsSqlLimit] = useState<number>(1000);
  const [settingsSqlValue, setSettingsSqlValue] =
    useState<string>('SELECT ...');
  const [settingsSqlLoading, setSettingsSqlLoading] = useState<boolean>(false);
  const handleRunSettingsSQL = () => {
    setSettingsSqlLoading(true);
    setExecutePromiseUrl('sqllab/execute/');
    setTimeout(() => {
      setExecutePromiseUrl('');
    }, 500);
  };

  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Source',
    value: 'source',
  });

  return (
    <StyledDatasetEdit>
      <StyledDatasetEditHeader>
        <StyledDatasetEditLabel>
          {t('Edit Dataset')} - {meta.result.table_name}
        </StyledDatasetEditLabel>
      </StyledDatasetEditHeader>
      {isWarningActive && (
        <ModalInfoTextContainer>
          <Icon fileName="warning" />
          <InfoText>
            <b>{t('Be careful.')}</b>
            {t(
              ' Changing these settings will affect all charts using this dataset, including charts owned by other people.',
            )}
          </InfoText>
          <Icon
            fileName="close"
            onClick={() => {
              setIsWarningActive(false);
            }}
          />
        </ModalInfoTextContainer>
      )}
      <StyledDatasetEditNavigationContainer>
        <DvtButtonTabs
          data={[
            { label: 'Source', value: 'source' },
            { label: 'Metrics', value: 'metrics' },
            { label: 'Columns', value: 'columns' },
            { label: 'Calculated Columns', value: 'calculated_columns' },
            { label: 'Settings', value: 'settings' },
          ]}
          active={tabs}
          setActive={setTabs}
        />
      </StyledDatasetEditNavigationContainer>
      {tabs.value === 'source' ? (
        <SourceBody>
          <SourceLockContainer>
            <Icon
              fileName={isEditMode ? 'lock_locked' : 'lock_unlocked'}
              onClick={() => {
                setIsEditMode(!isEditMode);
              }}
            />
            <div>{t('Click the lock to make changes.')}</div>
          </SourceLockContainer>
          <SourceCheckboxContainer>
            <DvtCheckbox
              label={t('Physical (Table or view)')}
              checked={!modalData.is_sqllab_view}
              onChange={selected => {
                setModalData({ ...modalData, is_sqllab_view: false });
              }}
              disabled={!isEditMode}
            />
            <DvtCheckbox
              label={t('Virtual (SQL)')}
              checked={modalData.is_sqllab_view}
              onChange={selected => {
                setModalData({ ...modalData, is_sqllab_view: true });
              }}
              disabled={!isEditMode}
            />
          </SourceCheckboxContainer>
          <ModalBreak />
          {!modalData.is_sqllab_view ? (
            <SourceInputContainer>
              <div style={{ fontSize: '14px' }}>{t('Physical')}</div>
              <DvtSelect
                data={databaseList}
                label="Database"
                selectedValue={databaseSelection}
                setSelectedValue={selection => {
                  setModalData({ ...modalData, database_id: selection.value });
                  setDatabaseSelection(selection);
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={schemaList}
                label="Schema"
                selectedValue={schemaSelection}
                setSelectedValue={selection => {
                  setSchemaSelection(selection);
                  setModalData({ ...modalData, schema: selection.label });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={tableList}
                label="Table"
                selectedValue={tableSelection}
                setSelectedValue={selection => {
                  setModalData({ ...modalData, table_name: selection.label });
                  setTableSelection(selection);
                }}
                typeDesign="form"
              />
            </SourceInputContainer>
          ) : (
            <SourceInputContainer>
              <div style={{ fontSize: '14px' }}>{t('Virtual')}</div>
              <DvtSelect
                data={databaseList}
                label="Database"
                selectedValue={databaseSelection}
                setSelectedValue={selection => {
                  setDatabaseSelection(selection);
                  setModalData({ ...modalData, database_id: selection.value });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={schemaList}
                label="Schema"
                selectedValue={schemaSelection}
                setSelectedValue={selection => {
                  setSchemaSelection(selection);
                  setModalData({ ...modalData, schema: selection.label });
                }}
                typeDesign="form"
              />
              <DvtInput
                label="Name"
                value={modalData.table_name}
                onChange={value =>
                  setModalData({ ...modalData, table_name: value })
                }
                typeDesign="form"
              />
              <DvtTextareaSelectRun
                limit={sourceSqllimit}
                setLimit={setSourceSqlLimit}
                value={sourceSqlValue}
                setValue={setSourceSqlValue}
                clickRun={handleRunSourceSQL}
                loading={sourceSqlLoading}
              />
            </SourceInputContainer>
          )}
        </SourceBody>
      ) : tabs.value === 'metrics' ? (
        <StyledDatasetEditBody>Metrics</StyledDatasetEditBody>
      ) : tabs.value === 'columns' ? (
        <StyledDatasetEditBody>Columns</StyledDatasetEditBody>
      ) : tabs.value === 'calculated_columns' ? (
        <StyledDatasetEditBody>Calculated Columns</StyledDatasetEditBody>
      ) : tabs.value === 'settings' ? (
        <SettingsBody>
          <SettingsBlock>
            <InfoText>{t('Basic')}</InfoText>
            <DvtInput
              label="Description"
              value={modalData.description}
              onChange={value =>
                setModalData({ ...modalData, description: value })
              }
              typeDesign="form"
            />
            <DvtInput
              label="Default URL"
              value={modalData.default_endpoint}
              onChange={value =>
                setModalData({ ...modalData, default_endpoint: value })
              }
              typeDesign="form"
            />
            <InfoText>
              {t(
                'Default URL to redirect to when accessing from the dataset list page',
              )}
            </InfoText>
            <DvtCheckbox
              label="Whether to populate autocomplete filters option"
              checked={autocompleteSelected}
              onChange={selected => {
                setAutocompleteSelected(!autocompleteSelected);
              }}
            />
            <DvtTextareaSelectRun
              limit={settingsSqlLimit}
              setLimit={setSettingsSqlLimit}
              value={settingsSqlValue}
              setValue={setSettingsSqlValue}
              clickRun={handleRunSettingsSQL}
              loading={settingsSqlLoading}
            />
            <InfoText>
              {t(
                'When using "Autocomplete filters", this can be used to improve performance of the query fetching the values. Use this option to apply a predicate (WHERE clause) to the query selecting the distinct values from the table. Typically the intent would be to limit the scan by applying a relative time filter on a partitioned or indexed time-related field.',
              )}
            </InfoText>
            <DvtInput
              label="Extra"
              value={modalData.extra}
              onChange={value => setModalData({ ...modalData, extra: value })}
              typeDesign="form"
            />
            <InfoText>
              {t(
                'Extra data to specify table metadata. Currently supports metadata of the format: `{ "certification": { "certified_by": "Data Platform Team", "details": "This table is the source of truth." }, "warning_markdown": "This is a warning." }`.',
              )}
            </InfoText>
            <DvtSelect
              data={owners}
              label="Owners"
              selectedValue=""
              setSelectedValue={selection => setOwners(selection)}
              typeDesign="form"
            />
          </SettingsBlock>
          <SettingsBlock>
            <InfoText>{t('Advanced')}</InfoText>
            <DvtInput
              label="Cache Timeout"
              value={modalData.cache_timeout}
              onChange={value =>
                setModalData({ ...modalData, cache_timeout: value })
              }
              typeDesign="form"
            />
            <InfoText>
              {t(
                'The duration of time in seconds before the cache is invalidated. Set to -1 to bypass the cache.',
              )}
            </InfoText>
            <DvtInput
              label="Hours Offset"
              value={modalData.offset}
              onChange={value => setModalData({ ...modalData, offset: value })}
              typeDesign="form"
            />
            <InfoText>
              {t(
                'The number of hours, negative or positive, to shift the time column. This can be used to move UTC time to local time.',
              )}
            </InfoText>
            <DvtInput
              label="Template Parameters"
              value={modalData.template_params}
              onChange={value =>
                setModalData({ ...modalData, template_params: value })
              }
              typeDesign="form"
            />
            <InfoText>
              {t(
                'A set of parameters that become available in the query using Jinja templating syntax',
              )}
            </InfoText>
            <InfoText>{t('Normalize Column Names')}</InfoText>
            <DvtCheckbox
              label={t(
                'Allow column names to be changed to case insensitive format, if supported (e.g. Oracle, Snowflake).',
              )}
              checked={modalData.normalize_columns}
              onChange={selected =>
                setModalData({ ...modalData, normalize_columns: selected })
              }
            />
            <InfoText>{t('Always Filter Main Datetime Column')}</InfoText>
            <DvtCheckbox
              label={t(
                'When the secondary temporal columns are filtered, apply the same filter to the main datetime column.',
              )}
              checked={modalData.always_filter_main_dttm}
              onChange={selected =>
                setModalData({
                  ...modalData,
                  always_filter_main_dttm: selected,
                })
              }
            />
          </SettingsBlock>
        </SettingsBody>
      ) : (
        <></>
      )}
      <StyledDatasetEditButtonContainer>
        <DvtButton
          colour="primary"
          label={t('Cancel')}
          onClick={onClose}
          typeColour="basic"
          size="medium"
        />
        <DvtButton
          colour="primary"
          label={t('Save')}
          onClick={() => console.log(modalData)}
          typeColour="powder"
          size="medium"
        />
      </StyledDatasetEditButtonContainer>
    </StyledDatasetEdit>
  );
};

export default DvtDatasetEdit;
