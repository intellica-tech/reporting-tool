/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import useFetch from 'src/dvt-hooks/useFetch';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import Icon from 'src/components/Icons/Icon';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtSelect from 'src/components/DvtSelect';
import DvtAceEditor from 'src/components/DvtAceEditor';
import DvtButtonTabs from 'src/components/DvtButtonTabs';
import { useDispatch } from 'react-redux';
import { dvtHomeDeleteSuccessStatus } from 'src/dvt-redux/dvt-homeReducer';
import DvtTable, { DvtTableSortProps } from 'src/components/DvtTable';
import DvtInputSelect from 'src/components/DvtInputSelect';
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
  ColumnsBody,
  ColumnsButtonContainer,
  ModalHeader,
  ModalLabel,
  ModalInfoText,
  ModalButtonContainer,
  ModalNavigationContainer,
} from './dataset-edit.module';

interface InputProps {
  tabs: { label: string; value: string };
  databaseSelection: { label: string; value: string };
  isWarningActive: boolean;
  schemaUrl: string;
  schemaSelection: { label: string; value: string };
  tableUrl: string;
  activeRadio: string;
  databaseList: { label: string; value: string }[];
  schemaList: { label: string; value: string }[];
  tableList: { label: string; value: string }[];
  collapseCalculatedData: any[];
  isEditMode: boolean;
  sourceSqlValue: string;
}

const DvtDatasetEdit = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [calculatedColumn, setCalculatedColumn] = useState<any[]>(
    meta.result.columns.filter((column: any) => column.expression),
  );

  const [metricsColumn, setMetricsColumn] = useState<any[]>(
    meta.result.metrics,
  );

  const column = meta.result.columns.filter(
    (column: any) => !column.expression,
  );

  const [syncApiUrl, setSyncApiUrl] = useState<string>('');

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
    metrics: metricsColumn,
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

  const databaseResponse = useFetch({ url: 'database' });

  const [apiUrl, setApiUrl] = useState<string>('');

  const [input, setInput] = useState<InputProps>({
    tabs: { label: 'Source', value: 'source' },
    databaseSelection: {
      label: meta.result.database.database_name,
      value: meta.result.database.id,
    },
    isWarningActive: true,
    schemaUrl: '',
    schemaSelection: { label: meta.result.schema, value: meta.result.schema },
    tableUrl: '',
    activeRadio: meta.result.main_dttm_col,
    databaseList: [],
    schemaList: [],
    tableList: [],
    collapseCalculatedData: [],
    isEditMode: false,
    sourceSqlValue: meta.result.sql,
  });
  const schemaResponse = useFetch({ url: input.schemaUrl });
  const tableResponse = useFetch({ url: input.tableUrl });

  const ownersFetch = useFetch({
    url: 'dataset/related/owners?q=(filter:%27%27,page:0,page_size:100)',
  });

  const syncApi = useFetch({
    url: syncApiUrl,
  });

  const editDatasetData = useFetch({
    url: apiUrl,
    method: 'PUT',
    body: {
      always_filter_main_dttm: modalData.always_filter_main_dttm,
      cache_timeout: modalData.cache_timeout,
      columns: [
        ...modalData.columns.map((a: any) => ({
          advanced_data_type: a.advanced_data_type,
          column_name: a.column_name,
          description: a.description,
          expression: a.expression,
          extra: JSON.stringify({
            certified_by: a.certified_by,
            details: a.details,
          }),
          filterable: a.filterable,
          groupby: a.groupby,
          id: a.id,
          is_active: a.is_active,
          is_dttm: a.is_dttm,
          python_date_format: a.python_date_format,
          type: a.type,
          uuid: a.uuid,
          verbose_name: a.verbose_name,
        })),
        ...(calculatedColumn || []).map(calculatedColumnItem => ({
          advanced_data_type: calculatedColumnItem.advanced_data_type,
          column_name: calculatedColumnItem.column_name,
          description: calculatedColumnItem.description,
          expression: calculatedColumnItem.expression,
          filterable: calculatedColumnItem.filterable,
          groupby: calculatedColumnItem.groupby,
          id:
            typeof calculatedColumnItem?.id === 'number'
              ? calculatedColumnItem.id
              : undefined,
          is_active: calculatedColumnItem.is_active,
          is_dttm: calculatedColumnItem.is_dttm,
          python_date_format: calculatedColumnItem.python_date_format,
          type: calculatedColumnItem.type,
          verbose_name: calculatedColumnItem.verbose_name,
          uuid: calculatedColumnItem.uuid,
          extra: JSON.stringify({
            certified_by: calculatedColumnItem.certified_by,
            details: calculatedColumnItem.details,
          }),
        })),
      ],
      database_id: modalData.database_id,
      default_endpoint: modalData.default_endpoint,
      description: modalData.description,
      extra: modalData.extra,
      fetch_values_predicate: modalData.fetch_values_predicate,
      filter_select_enabled: modalData.filter_select_enabled,
      is_managed_externally: modalData.is_managed_externally,
      is_sqllab_view: modalData.is_sqllab_view,
      main_dttm_col: modalData.main_dttm_col,
      metrics: metricsColumn.map(item => {
        const idIsNumber = typeof item?.id === 'number';
        return {
          currency: null,
          d3format: null,
          description: item.description,
          expression: item.expression,
          id: idIsNumber ? item.id : undefined,
          extra: '{}',
          metric_name: item.metric_name,
          verbose_name: item.verbose_name,
          warning_text: item.warning_text,
        };
      }),
      normalize_columns: modalData.normalize_columns,
      offset: modalData.offset,
      owners: modalData.owners,
      schema: modalData.schema,
      sql: modalData.sql,
      table_name: modalData.table_name.label,
      template_params: modalData.template_params,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (databaseResponse.data) {
      setInput({
        ...input,
        databaseList: databaseResponse.data.result.map(
          (database: { database_name: any; id: any }) => ({
            label: database.database_name,
            value: database.id,
          }),
        ),
      });
    }
  }, [databaseResponse.data]);

  useEffect(() => {
    if (input.databaseSelection) {
      setInput({
        ...input,
        schemaUrl: `database/${input.databaseSelection.value}/schemas/?q=(force:!t)`,
      });
    }
  }, [input.databaseSelection]);

  useEffect(() => {
    if (schemaResponse.data) {
      setInput({
        ...input,
        schemaList: schemaResponse.data.result.map((item: any, index: any) => ({
          label: item,
          value: index,
        })),
      });
    }
  }, [schemaResponse.data]);

  useEffect(() => {
    if (input.schemaSelection) {
      setInput({
        ...input,
        tableUrl: `database/${input.databaseSelection.value}/tables/?q=(force:!t,schema_name:${input.schemaSelection.label})`,
      });
    }
  }, [input.schemaSelection]);

  useEffect(() => {
    if (tableResponse.data) {
      setInput({
        ...input,
        tableList: tableResponse.data.result.map((item: any) => ({
          label: item.value,
          value: item.value,
        })),
      });
    }
  }, [tableResponse.data]);

  const metricsHeader = [
    { id: 1, title: t('Metric Key'), field: 'metric_name', input: true },
    { id: 2, title: t('Label'), field: 'verbose_name', input: true },
    { id: 3, title: t('SQL expression'), field: 'expression', editor: true },
    {
      id: 4,
      title: t('Action'),
      showHover: true,
      clicks: [
        {
          icon: 'trash',
          click: (row: any) => {
            handleMatricsRemoveItem(row);
          },
          popperLabel: t('Delete'),
        },
      ],
      flex: 0.5,
    },
  ];

  const columnsHeader = [
    {
      id: 0,
      collapse: true,
      title: '',
    },
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
      disabledRadioField: 'is_dttm',
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
          click: (row: any) => {
            handleColumnRemoveItem(row);
          },
          popperLabel: t('Delete'),
        },
      ],
    },
    {
      id: 9,
      field: 'verbose_name',
      title: 'LABEL',
      placeholder: 'Label',
      input: true,
      collapseField: true,
    },
    {
      id: 10,
      field: 'description',
      title: 'DESCRIPTION',
      placeholder: 'Description',
      input: true,
      collapseField: true,
    },
    {
      id: 12,
      field: 'python_date_format',
      title: 'DATETIME FORMAT',
      placeholder: '%Y/%m/%d',
      input: true,
      collapseField: true,
    },
    {
      id: 13,
      field: 'certified_by',
      title: 'CERTIFIED BY',
      placeholder: 'Certified by',
      input: true,
      collapseField: true,
      extra: true,
    },
    {
      id: 14,
      field: 'details',
      title: 'CERTIFICATION DETAILS',
      placeholder: 'Certification details',
      input: true,
      collapseField: true,
      extra: true,
    },
  ];

  const calculatedHeader = [
    {
      id: 0,
      collapse: true,
      title: '',
    },
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
      disabledRadioField: 'is_dttm',
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
          click: (row: any) => {
            handleCalculatedColumnRemoveItem(row);
          },
          popperLabel: t('Delete'),
        },
      ],
    },
    {
      id: 8,
      field: 'expression',
      title: 'SQL EXPRESSION',
      placeholder: 'SELECT ...',
      editor: true,
      collapseField: true,
    },
    {
      id: 9,
      field: 'verbose_name',
      title: 'LABEL',
      placeholder: 'Label',
      input: true,
      collapseField: true,
    },
    {
      id: 10,
      field: 'description',
      title: 'DESCRIPTION',
      placeholder: 'Description',
      input: true,
      collapseField: true,
    },
    {
      id: 11,
      field: 'type',
      title: 'DATA TYPE',
      placeholder: 'Select ...',
      collapseField: true,
      select: true,
      selectData: [
        { label: 'STRING', value: 'STRING' },
        { label: 'NUMERIC', value: 'NUMERIC' },
        { label: 'DATETIME', value: 'DATETIME' },
        { label: 'BOOLEAN', value: 'BOOLEAN' },
      ],
    },
    {
      id: 12,
      field: 'python_date_format',
      title: 'DATETIME FORMAT',
      placeholder: '%Y/%m/%d',
      input: true,
      collapseField: true,
    },
    {
      id: 13,
      field: 'certified_by',
      title: 'CERTIFIED BY',
      placeholder: 'Certified by',
      input: true,
      collapseField: true,
      extra: true,
    },
    {
      id: 14,
      field: 'details',
      title: 'CERTIFICATION DETAILS',
      placeholder: 'Certification details',
      input: true,
      collapseField: true,
      extra: true,
    },
  ];

  const [sort, setSort] = useState<DvtTableSortProps>({
    column: 'id',
    direction: 'desc',
  });

  const ownersOptions: { label: string; value: number }[] =
    ownersFetch.data?.result.map((item: any) => ({
      label: item.text,
      value: item.value,
    })) || [];

  const [autocompleteSelected, setAutocompleteSelected] =
    useState<boolean>(false);

  const handleAddItem = () => {
    const newItem = {
      id: generateId(),
      column_name: '<new column>',
      expression: '<enter SQL expression here>',
      filterable: true,
      groupby: true,
      collapse: true,
    };

    setCalculatedColumn([newItem, ...calculatedColumn]);
  };

  const handleCalculatedColumnRemoveItem = (row: any) => {
    const updatedCalculatedColumn = calculatedColumn.filter(
      item => item.id !== row.id,
    );

    setCalculatedColumn(updatedCalculatedColumn);
  };

  const handleMatricsAddItem = () =>
    setMetricsColumn(prevMetricsColumn => [
      {
        id: generateId(),
        metric_name: '<new metric>',
        verbose_name: '',
        expression: '',
      },
      ...prevMetricsColumn,
    ]);

  const handleMatricsRemoveItem = (row: any) => {
    const updatedMetrics = metricsColumn.filter(item => item.id !== row.id);

    setMetricsColumn(updatedMetrics);
  };

  const handleColumnRemoveItem = (row: { id: any }) => {
    const updatedColumns = modalData.columns.filter(
      (column: { id: any }) => column.id !== row.id,
    );
    setModalData((prevData: any) => ({
      ...prevData,
      columns: updatedColumns,
    }));
  };

  const generateId = () => Math.random().toString(36).slice(2, 11);

  const updateModalDataColumns = (newColumns: any[]) => {
    setModalData((prevData: any) => ({
      ...prevData,
      columns: newColumns,
    }));
  };

  useEffect(() => {
    if (editDatasetData.data?.id) {
      dispatch(dvtHomeDeleteSuccessStatus('Success'));
      onClose();
    }
  }, [editDatasetData.data]);

  useEffect(() => {
    if (!editDatasetData.loading) {
      setApiUrl('');
    }
  }, [editDatasetData.loading]);

  useEffect(() => {
    if (syncApi.data?.result) {
      setModalData((prevData: any) => ({
        ...prevData,
        columns: syncApi.data.result.columns,
      }));
      setSyncApiUrl('');
    }
  }, [syncApi.data]);

  useEffect(() => {
    if (meta.result.owners) {
      const ownersValues = meta.result.owners.map((item: any) => item.id);
      setModalData({ ...modalData, owners: ownersValues });
    }
  }, []);

  return (
    <StyledDatasetEdit>
      <ModalHeader>
        <ModalLabel>
          {t('Edit Dataset')} - {meta.result.table_name}
        </ModalLabel>
      </ModalHeader>
      {input.isWarningActive && (
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
              setInput({ ...input, isWarningActive: false });
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
          active={input.tabs}
          setActive={(v: any) => {
            setInput({ ...input, tabs: v });
          }}
        />
      </ModalNavigationContainer>
      {input.tabs.value === 'source' ? (
        <SourceBody>
          <SourceLockContainer
            onClick={v => {
              setInput({ ...input, isEditMode: !input.isEditMode });
            }}
          >
            <Icon
              fileName={!input.isEditMode ? 'lock_locked' : 'lock_unlocked'}
            />
            <div>{t('Click the lock to make changes.')}</div>
          </SourceLockContainer>
          <SourceCheckboxContainer>
            <DvtCheckbox
              label={t('Physical (Table or view)')}
              checked={!modalData.is_sqllab_view}
              onChange={() => {
                if (!input.isEditMode) {
                  setModalData({ ...modalData, is_sqllab_view: false });
                }
              }}
              disabled={input.isEditMode}
            />

            <DvtCheckbox
              label={t('Virtual (SQL)')}
              checked={modalData.is_sqllab_view}
              onChange={() => {
                if (!input.isEditMode) {
                  setModalData({ ...modalData, is_sqllab_view: true });
                }
              }}
              disabled={input.isEditMode}
            />
          </SourceCheckboxContainer>
          <ModalBreak />
          {!modalData.is_sqllab_view ? (
            <SourceInputContainer>
              <div style={{ fontSize: '14px' }}>{t('Physical')}</div>
              <DvtSelect
                data={input.databaseList}
                label="Database"
                selectedValue={input.databaseSelection}
                setSelectedValue={selection => {
                  setModalData({ ...modalData, database_id: selection.value });
                  setInput({ ...input, databaseSelection: selection });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={input.schemaList}
                label="Schema"
                selectedValue={input.schemaSelection}
                setSelectedValue={selection => {
                  setInput({ ...input, schemaSelection: selection });
                  setModalData({ ...modalData, schema: selection.label });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={input.tableList}
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
                data={input.databaseList}
                label="Database"
                selectedValue={input.databaseSelection}
                setSelectedValue={selection => {
                  setInput({ ...input, databaseSelection: selection });
                  setModalData({ ...modalData, database_id: selection.value });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={input.schemaList}
                label="Schema"
                selectedValue={input.schemaSelection}
                setSelectedValue={selection => {
                  setInput({ ...input, schemaSelection: selection });
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
                value={input.sourceSqlValue}
                onChange={v => setInput({ ...input, sourceSqlValue: v })}
                height="200px"
                fontSize={16}
              />
            </SourceInputContainer>
          )}
        </SourceBody>
      ) : input.tabs.value === 'metrics' ? (
        <ColumnsBody>
          <MetricsButtonContainer>
            <DvtButton
              label={t('Add Item')}
              icon="dvt-add_filled"
              onClick={handleMatricsAddItem}
            />
          </MetricsButtonContainer>
          <DvtTable
            data={metricsColumn}
            setData={setMetricsColumn}
            header={metricsHeader}
          />
        </ColumnsBody>
      ) : input.tabs.value === 'columns' ? (
        <ColumnsBody>
          <ColumnsButtonContainer>
            <DvtButton
              label={t('Sync Columns from Source')}
              icon="dvt-add_filled"
              onClick={() => setSyncApiUrl(`dataset/${meta.id}`)}
            />
          </ColumnsButtonContainer>
          <DvtTable
            data={modalData.columns}
            setData={updateModalDataColumns}
            header={columnsHeader}
            sort={sort}
            setSort={setSort}
            activeRadio={input.activeRadio}
            setActiveRadio={row => {
              setInput({ ...input, activeRadio: row });
            }}
          />
        </ColumnsBody>
      ) : input.tabs.value === 'calculated_columns' ? (
        <ColumnsBody>
          <MetricsButtonContainer>
            <DvtButton
              label={t('Add Item')}
              icon="dvt-add_filled"
              onClick={handleAddItem}
            />
          </MetricsButtonContainer>
          <DvtTable
            data={calculatedColumn}
            setData={setCalculatedColumn}
            header={calculatedHeader}
            sort={sort}
            setSort={setSort}
            activeRadio={input.activeRadio}
            setActiveRadio={row => {
              setInput({ ...input, activeRadio: row });
            }}
          />
        </ColumnsBody>
      ) : input.tabs.value === 'settings' ? (
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
              onChange={() => {
                setAutocompleteSelected(!autocompleteSelected);
              }}
            />
            <DvtAceEditor
              mode="sql"
              placeholder="SELECT..."
              value={input.sourceSqlValue}
              onChange={v => setInput({ ...input, sourceSqlValue: v })}
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
            <DvtInputSelect
              data={ownersOptions}
              label="Owners"
              selectedValues={modalData.owners}
              setSelectedValues={selection =>
                setModalData({ ...modalData, owners: selection })
              }
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
          onClick={() => setApiUrl(`dataset/${meta.id}`)}
          typeColour="powder"
          size="medium"
        />
      </ModalButtonContainer>
    </StyledDatasetEdit>
  );
};

export default DvtDatasetEdit;
