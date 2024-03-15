import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import useFetch from 'src/hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import Icon from 'src/components/Icons/Icon';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtSelect from 'src/components/DvtSelect';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import {
  StyledDatasetEdit,
  ModalBreak,
  SourceBody,
  SourceLockContainer,
  SourceCheckboxContainer,
  SourceInputContainer,
  SettingsBlock,
  SettingsBody,
  ModalInfoTextContainer,
  MetricsButtonContainer,
  MetricsBody,
  ColumnsBody,
  ColumnsButtonContainer,
  ModalHeader,
  ModalLabel,
  ModalInfoText,
  ModalButtonContainer,
  ModalNavigationContainer,
} from './dataset-edit.module';
import DvtAceEditor from 'src/components/DvtAceEditor';

const DvtDatasetEdit = ({ meta, onClose }: ModalProps) => {
  const [isWarningActive, setIsWarningActive] = useState<boolean>(true);
  const [calculatedColumn, setCalculatedColumn] = useState<any[]>(
    meta.result.columns.filter((column: any) => column.expression),
  );
  const column = meta.result.columns.filter(
    (column: any) => !column.expression,
  );

  const [modalData, setModalData] = useState<any>({
    always_filter_main_dttm: meta.result.always_filter_main_dttm,
    cache_timeout: meta.result.cache_timeout,
    columns: column,
    calculated: calculatedColumn,
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
    table_name: {
      label: meta.result.table_name,
      value: meta.result.table_name,
    },
    template_params: meta.result.template_params,
  });

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
  const [activeRadio, setActiveRadio] = useState<string>(
    meta.result.main_dttm_col,
  );

  const [databaseList, setDatabaseList] = useState<any>([]);
  const [schemaList, setSchemaList] = useState<any>([]);
  const [tableList, setTableList] = useState<any>([]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [sourceSqlValue, setSourceSqlValue] = useState<string>(meta.result.sql);

  const databaseResponse = useFetch({ url: 'database' });
  const schemaResponse = useFetch({ url: schemaUrl });
  const tableResponse = useFetch({ url: tableUrl });

  useEffect(() => {
    if (databaseResponse) {
      setDatabaseList(
        databaseResponse.result.map(
          (database: { database_name: any; id: any }) => ({
            label: database.database_name,
            value: database.id,
          }),
        ),
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
        schemaResponse.result.map((item: any, index: any) => ({
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
        tableResponse.result.map((item: any) => ({
          label: item.value,
          value: item.value,
        })),
      );
    }
  }, [tableResponse]);

  // Metrics
  const metricsHeader = [
    { id: 1, title: t('Metric Key'), field: 'metric_name', input: true },
    { id: 2, title: t('Label'), field: 'verbose_name', input: true },
    { id: 3, title: t('SQL expression'), field: 'expression', editor: true },
  ];

  // Columns
  const columnsHeader = [
    { id: 1, title: t('Column'), field: 'column_name', sort: true },
    { id: 2, title: t('Data Type'), field: 'type', sort: true },
    {
      id: 3,
      title: t('Is Temporal'),
      field: 'is_dttm',
      sort: true,
      checkboxData: true,
    },
    {
      id: 4,
      title: t('Default Datetime'),
      field: 'column_name',
      sort: true,
      radio: true,
    },
    {
      id: 5,
      title: t('Is Filterable'),
      field: 'filterable',
      sort: true,
      checkboxData: true,
    },
    {
      id: 6,
      title: t('Is Dimension'),
      field: 'groupby',
      sort: true,
      checkboxData: true,
    },
    {
      id: 7,
      title: t('Action'),
      showHover: true,
      clicks: [
        {
          icon: 'trash',
          click: (item: any) => handleModalDelete(item),
          popperLabel: t('Delete'),
        },
      ],
    },
  ];

  const calculatedHeader = [
    {
      id: 1,
      title: t('Column'),
      field: 'column_name',
      sort: true,
      input: true,
      flex: 2,
    },
    { id: 2, title: t('Data Type'), field: 'type', sort: true },
    {
      id: 3,
      title: t('Is Temporal'),
      field: 'is_dttm',
      sort: true,
      checkboxData: true,
    },
    {
      id: 4,
      title: t('Default Datetime'),
      field: 'column_name',
      sort: true,
      radio: true,
    },
    {
      id: 5,
      title: t('Is Filterable'),
      field: 'filterable',
      sort: true,
      checkboxData: true,
    },
    {
      id: 6,
      title: t('Is Dimension'),
      field: 'groupby',
      sort: true,
      checkboxData: true,
    },
    {
      id: 7,
      title: t('Action'),
      showHover: true,
      clicks: [
        {
          icon: 'trash',
          click: (item: any) => handleModalDelete(item),
          popperLabel: t('Delete'),
        },
      ],
    },
  ];

  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'id',
    direction: 'desc',
  });

  // Settings
  const [owners, setOwners] = useState<string[]>(
    meta.result.owners.map((owner: { first_name: any; id: any }) => ({
      label: owner.first_name,
      value: owner.id,
    })),
  );
  const [autocompleteSelected, setAutocompleteSelected] =
    useState<boolean>(false);
  const [settingsSqlLimit, setSettingsSqlLimit] = useState<number>(1000);
  const [settingsSqlValue, setSettingsSqlValue] =
    useState<string>('SELECT ...');

  const [tabs, setTabs] = useState<ButtonTabsDataProps>({
    label: 'Source',
    value: 'source',
  });

  console.log('match', calculatedColumn);

  const handleAddItem = () => {
    const newItem = {
      column_name: '<new column>',
      expression: '<enter SQL expression here>',
      filterable: true,
      groupby: true,
      collapse: true,
    };

    setCalculatedColumn([...calculatedColumn, newItem]);
  };

  const fields = [
    { label: 'SQL EXPRESSION', placeholder: 'SELECT ...', type: 'sqlEditor' },
    { label: 'LABEL', placeholder: 'Label', type: 'input' },
    { label: 'DESCRIPTION', placeholder: 'Description', type: 'input' },
    { label: 'DATA TYPE', placeholder: 'Select ...', type: 'select' },
    { label: 'DATETIME FORMAT', placeholder: '%Y/%m/%d', type: 'input' },
    { label: 'CERTIFIED BY', placeholder: 'Certified by', type: 'input' },
  ];

  const updateModalDataColumns = (newColumns: any[]) => {
    setModalData((prevData: any) => ({
      ...prevData,
      columns: newColumns,
    }));
  };

  const updateModalDataMetrics = (newColumns: any[]) => {
    setModalData((prevData: any) => ({
      ...prevData,
      metrics: newColumns,
    }));
  };

  const updateModalDataCalculated = (newColumns: any[]) => {
    setCalculatedColumn(newColumns);
  };

  console.log('columns', modalData.columns);

  return (
    <StyledDatasetEdit>
      <ModalHeader>
        <ModalLabel>
          {t('Edit Dataset')} - {meta.result.table_name}
        </ModalLabel>
      </ModalHeader>
      {isWarningActive && (
        <ModalInfoTextContainer>
          <Icon fileName="warning" />
          <ModalInfoText>
            <b>{t('Be careful.')}</b>
            {t(
              ' Changing these settings will affect all charts using this dataset, including charts owned by other people.',
            )}
          </ModalInfoText>
          <Icon
            fileName="close"
            onClick={() => {
              setIsWarningActive(false);
            }}
          />
        </ModalInfoTextContainer>
      )}
      <ModalNavigationContainer>
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
      </ModalNavigationContainer>
      {tabs.value === 'source' ? (
        <SourceBody>
          <SourceLockContainer
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            <Icon fileName={!isEditMode ? 'lock_locked' : 'lock_unlocked'} />
            <div>{t('Click the lock to make changes.')}</div>
          </SourceLockContainer>
          <SourceCheckboxContainer>
            <DvtCheckbox
              label={t('Physical (Table or view)')}
              checked={!modalData.is_sqllab_view}
              onChange={() => {
                if (!isEditMode) {
                  setModalData({ ...modalData, is_sqllab_view: false });
                }
              }}
              disabled={isEditMode}
            />

            <DvtCheckbox
              label={t('Virtual (SQL)')}
              checked={modalData.is_sqllab_view}
              onChange={() => {
                if (!isEditMode) {
                  setModalData({ ...modalData, is_sqllab_view: true });
                }
              }}
              disabled={isEditMode}
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
                selectedValue={modalData.table_name}
                setSelectedValue={selection => {
                  setModalData({ ...modalData, table_name: selection });
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
                value={modalData.table_name.label}
                onChange={value =>
                  setModalData({
                    ...modalData,
                    table_name: { ...modalData.table_name, label: value },
                  })
                }
                typeDesign="form"
              />
              <DvtAceEditor
                mode="sql"
                placeholder="SELECT..."
                value={sourceSqlValue}
                onChange={setSourceSqlValue}
                height="200px"
                fontSize={16}
              />
            </SourceInputContainer>
          )}
        </SourceBody>
      ) : tabs.value === 'metrics' ? (
        <MetricsBody>
          <MetricsButtonContainer>
            <DvtButton label={t('Add Item')} icon="dvt-add_filled" />
          </MetricsButtonContainer>
          <DvtTable
            data={modalData.metrics}
            setData={updateModalDataMetrics}
            header={metricsHeader}
          />
        </MetricsBody>
      ) : tabs.value === 'columns' ? (
        <ColumnsBody>
          <ColumnsButtonContainer>
            <DvtButton
              label={t('Sync Columns from Source')}
              icon="dvt-add_filled"
            />
          </ColumnsButtonContainer>
          <DvtTable
            data={modalData.columns}
            setData={updateModalDataColumns}
            header={columnsHeader}
            sort={sort}
            setSort={setSort}
            activeRadio={activeRadio}
            setActiveRadio={row => {
              setActiveRadio(row);
            }}
          />
        </ColumnsBody>
      ) : tabs.value === 'calculated_columns' ? (
        <div>
          <DvtButton
            label={t('Add Item')}
            icon="dvt-add_filled"
            onClick={handleAddItem}
          />

          <DvtTable
            data={calculatedColumn}
            setData={updateModalDataCalculated}
            header={calculatedHeader}
            sort={sort}
            setSort={setSort}
            activeRadio={activeRadio}
            setActiveRadio={row => {
              setActiveRadio(row);
            }}
            collapseData={fields}
          />
        </div>
      ) : tabs.value === 'settings' ? (
        <SettingsBody>
          <SettingsBlock>
            <ModalInfoText>{t('Basic')}</ModalInfoText>
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
            <ModalInfoText>
              {t(
                'Default URL to redirect to when accessing from the dataset list page',
              )}
            </ModalInfoText>
            <DvtCheckbox
              label="Whether to populate autocomplete filters option"
              checked={autocompleteSelected}
              onChange={selected => {
                setAutocompleteSelected(!autocompleteSelected);
              }}
            />
            <DvtAceEditor
              mode="sql"
              placeholder="SELECT..."
              value={sourceSqlValue}
              onChange={setSourceSqlValue}
              height="200px"
              fontSize={16}
            />
            <ModalInfoText>
              {t(
                'When using "Autocomplete filters", this can be used to improve performance of the query fetching the values. Use this option to apply a predicate (WHERE clause) to the query selecting the distinct values from the table. Typically the intent would be to limit the scan by applying a relative time filter on a partitioned or indexed time-related field.',
              )}
            </ModalInfoText>
            <DvtInput
              label="Extra"
              value={modalData.extra}
              onChange={value => setModalData({ ...modalData, extra: value })}
              typeDesign="form"
            />
            <ModalInfoText>
              {t(
                'Extra data to specify table metadata. Currently supports metadata of the format: `{ "certification": { "certified_by": "Data Platform Team", "details": "This table is the source of truth." }, "warning_markdown": "This is a warning." }`.',
              )}
            </ModalInfoText>
            <DvtSelect
              data={owners}
              label="Owners"
              selectedValue=""
              setSelectedValue={selection => setOwners(selection)}
              typeDesign="form"
            />
          </SettingsBlock>
          <SettingsBlock>
            <ModalInfoText>{t('Advanced')}</ModalInfoText>
            <DvtInput
              label="Cache Timeout"
              value={modalData.cache_timeout}
              onChange={value =>
                setModalData({ ...modalData, cache_timeout: value })
              }
              typeDesign="form"
            />
            <ModalInfoText>
              {t(
                'The duration of time in seconds before the cache is invalidated. Set to -1 to bypass the cache.',
              )}
            </ModalInfoText>
            <DvtInput
              label="Hours Offset"
              value={modalData.offset}
              onChange={value => setModalData({ ...modalData, offset: value })}
              typeDesign="form"
            />
            <ModalInfoText>
              {t(
                'The number of hours, negative or positive, to shift the time column. This can be used to move UTC time to local time.',
              )}
            </ModalInfoText>
            <DvtInput
              label="Template Parameters"
              value={modalData.template_params}
              onChange={value =>
                setModalData({ ...modalData, template_params: value })
              }
              typeDesign="form"
            />
            <ModalInfoText>
              {t(
                'A set of parameters that become available in the query using Jinja templating syntax',
              )}
            </ModalInfoText>
            <ModalInfoText>{t('Normalize Column Names')}</ModalInfoText>
            <DvtCheckbox
              label={t(
                'Allow column names to be changed to case insensitive format, if supported (e.g. Oracle, Snowflake).',
              )}
              checked={modalData.normalize_columns}
              onChange={selected =>
                setModalData({ ...modalData, normalize_columns: selected })
              }
            />
            <ModalInfoText>
              {t('Always Filter Main Datetime Column')}
            </ModalInfoText>
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
      <ModalButtonContainer>
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
      </ModalButtonContainer>
    </StyledDatasetEdit>
  );
};

export default DvtDatasetEdit;
