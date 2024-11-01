/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dvtConnectionEditSuccessStatus } from 'src/dvt-redux/dvt-connectionReducer';
import useFetch from 'src/dvt-hooks/useFetch';
import {
  DvtConnectionData,
  OtherConnectionDataOptionProps,
  OtherOptions,
  advancedData,
} from 'src/dvt-modal/dvtConnectionData';
import { SupersetTheme, t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import DvtModalHeader from 'src/components/DvtModalHeader';
import Icon from 'src/components/Icons/Icon';
import DvtSelect from 'src/components/DvtSelect';
import DvtPopper from 'src/components/DvtPopper';
import DvtCollapse from 'src/components/DvtCollapse';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import {
  StyledConnectionAdd,
  StyledConnectionAddBody,
  StyledConnectionAddDatabaseIcon,
  StyledConnectionAddDatabaseIcons,
  StyledConnectionAddDatabaseType,
  StyledConnectionAddSelectFile,
  StyledConnectionAddLabel,
  StyledConnectionAddDatabaseIconGroup,
  StyledConnectionAddStep2,
  StyledConnectionAddSwitch,
  StyledConnectionAddToBasic,
  StyledConnectionAddButtonGroup,
  StyledConnectionAddButton,
  StyledConnectionAddButtons,
  StyledConnectionAddCollapse,
  StyledConnectionAddGroup,
  StyledConnectionAddGroups,
  StyledConnectionAddInputGroup,
  StyledConnectionAddCheckboxGroup,
  StyledConnectionAddGroupStep3,
} from './connection-add.module';
import useFormValidation from 'src/dvt-hooks/useFormValidation';
import connectionCreateValidation from 'src/dvt-validation/dvt-connection-create-validation';
import useFormValidationForSQLAlchemyURI from 'src/dvt-hooks/useFormValidationForSQLAlchemyURI';
import connectionCreateValidationForSQLAlchemyURI from 'src/dvt-validation/dvt-sqlalchemy-connection-create-validation';

const DvtConnectionAdd = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(1);
  const [supporedDatabase, setSupporedDatabase] =
    useState<OtherConnectionDataOptionProps>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiUrl, setApiUrl] = useState<string>('');
  const [selectedConnectionType, setSelectedConnectionType] =
    useState<string>('');
  const [collapseValues, setCollapseValues] = useState<{
    sql: boolean;
    performance: boolean;
    security: boolean;
    other: boolean;
  }>({
    sql: false,
    performance: false,
    security: false,
    other: false,
  });

  const [input, setInput] = useState<{
    host: string;
    port: string;
    database_name: string;
    user_name: string;
    password: string;
    display_name: string;
    addittional_parameters: string;
    switch: boolean;
    Sqlalchemy_Uri: string;
    chart_cache_timeout: string;
    scheme_cache_timeout: string;
    table_cache_timeout: string;
    secure_extra: string;
    root_certificate: string;
    schemes_allowed_for_file: string;
    metadata_parameters: string;
    engine_parameters: string;
    version: string;
  }>({
    host: '',
    port: '',
    database_name: '',
    user_name: '',
    password: '',
    display_name: selectedConnectionType,
    addittional_parameters: '',
    switch: false,
    Sqlalchemy_Uri: '',
    chart_cache_timeout: '',
    scheme_cache_timeout: '',
    table_cache_timeout: '',
    secure_extra: '',
    root_certificate: '',
    schemes_allowed_for_file: '',
    metadata_parameters: '',
    engine_parameters: '',
    version: '',
  });

  const initialValues = {
    host: meta?.isEdit ? meta.result.parameters.host : '',
    port: meta?.isEdit ? meta.result.parameters.port : '',
    database_name: meta?.isEdit ? meta.result.parameters.database : '',
    user_name: meta?.isEdit ? meta.result.parameters.username : '',
    password: meta?.isEdit ? meta.result.parameters.password : '',
    display_name: meta?.isEdit
      ? meta.result.database_name
      : selectedConnectionType,
    addittional_parameters: meta?.isEdit
      ? JSON.stringify(meta.result.parameters.query)
      : '',
    switch: meta?.isEdit ? meta.result.parameters.encryption : false,
  };

  const initialValuesForSQLAlchemyURI = {
    display_name: meta?.isEdit
      ? meta.result.database_name
      : selectedConnectionType,
    sqlalchemy_uri: meta?.isEdit ? meta.result.sqlalchemy_uri : '',
  };

  const { values, errors, handleChange, validateForm } = useFormValidation(
    initialValues,
    connectionCreateValidation,
  );

  const {
    sqlAlchemyValues,
    sqlAlchemyErrors,
    sqlAlchemyHandleChange,
    sqlAlchemyValidateForm,
  } = useFormValidationForSQLAlchemyURI(
    initialValuesForSQLAlchemyURI,
    connectionCreateValidationForSQLAlchemyURI,
  );

  const [checkbox, setcheckbox] = useState<{
    expose: boolean;
    createTable: boolean;
    createView: boolean;
    DML: boolean;
    enableQuery: boolean;
    databaseExplored: boolean;
    disabledSqlLab: boolean;
    asynchronous_query_execution: boolean;
    cancel_query_on_window_unload_event: boolean;
    impersonate_logged_in_user: boolean;
    allow_file_uploads_to_database: boolean;
  }>({
    expose: false,
    createTable: false,
    createView: false,
    DML: false,
    enableQuery: false,
    databaseExplored: false,
    disabledSqlLab: false,
    asynchronous_query_execution: false,
    cancel_query_on_window_unload_event: false,
    impersonate_logged_in_user: false,
    allow_file_uploads_to_database: false,
  });

  useEffect(() => {}, [selectedFile]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConnectionTypeClick = (connectionType: string) => {
    if (connectionType) {
      setSelectedConnectionType(connectionType);
      setStep(2);
    }
  };

  const handleSupportedDatabaseSelect = (
    selectedValue: OtherConnectionDataOptionProps,
  ) => {
    if (selectedValue) {
      setSupporedDatabase(selectedValue);
      setSelectedConnectionType(selectedValue?.label);
      setTimeout(() => {
        setStep(2);
      }, 800);
    }
  };

  const handleBackButton = () => {
    setSupporedDatabase('');
    setSelectedConnectionType('');
    setStep(step - 1);
  };

  useEffect(() => {
    if (meta?.isEdit) {
      DvtConnectionData.find(
        connection =>
          (connection.engine === meta.result.engine ||
            connection.driver === meta.result.driver ||
            connection.engine === meta.result.backend) &&
          setSelectedConnectionType(connection.databaseMetaType),
      );
    }
  }, []);

  const ConnectionDataFindType = DvtConnectionData.find(
    connection => connection.databaseMetaType === selectedConnectionType,
  );

  const connectionAddData = useFetch({
    url: apiUrl,
    method:
      (step === 3 || (step === 2 && selectedConnectionType === 'Trino')) &&
      meta?.isEdit
        ? 'PUT'
        : 'POST',
    body: {
      configuration_method:
        selectedConnectionType === 'PostgreSQL' ||
        selectedConnectionType === 'MySQL'
          ? 'dynamic_form'
          : 'sqlalchemy_form',
      database_name:
        selectedConnectionType === 'Trino'
          ? sqlAlchemyValues.display_name
          : values.display_name,
      driver: ConnectionDataFindType?.driver,
      engine: ConnectionDataFindType?.engine,
      engine_information: ConnectionDataFindType?.engine_information,
      expose_in_sqllab: true,
      extra: ConnectionDataFindType?.extra,
      sqlalchemy_uri: sqlAlchemyValues.sqlalchemy_uri,
      parameters: {
        database: values.database_name,
        host: values.host,
        username: values.user_name,
        password: values.password,
        port: values.port,
        encryption: values.switch,
      },
    },
  });

  useEffect(() => {
    if (step === 2 && connectionAddData.data?.message === 'OK') {
      setStep(3);
    } else if ((step === 3 || step === 2) && connectionAddData.data?.id) {
      onClose();
      dispatch(dvtConnectionEditSuccessStatus('connection'));
    }
  }, [onClose, connectionAddData.data]);

  const setCollapseValue = (category: string) => {
    if (!collapseValues[category]) {
      setCollapseValues(prevValues => ({
        ...prevValues,
        sql: category === 'sql',
        performance: category === 'performance',
        security: category === 'security',
        other: category === 'other',
      }));
    } else {
      setCollapseValues(prevValues => ({
        ...prevValues,
        sql: false,
        performance: false,
        security: false,
        other: false,
      }));
    }
  };

  useEffect(() => {
    if (meta?.isEdit) {
      setStep(2);
    }
  }, [meta]);

  useEffect(() => {
    if (!connectionAddData.loading) {
      setApiUrl('');
    }
  }, [connectionAddData.loading]);

  const handleSubmit = () => {
    if (
      selectedConnectionType === 'PostgreSQL' ||
      selectedConnectionType === 'MySQL'
    ) {
      const isValid = validateForm();
      if (isValid) {
        setApiUrl('database/validate_parameters/');
      }
    } else if (selectedConnectionType === 'Trino') {
      const isValid = sqlAlchemyValidateForm();
      if (isValid) {
        if (meta?.isEdit) setApiUrl(`database/${meta.id}`);
        else setApiUrl('database/');
      }
    }
  };

  return (
    <StyledConnectionAdd>
      <DvtModalHeader title={t('Connect a database')} onClose={onClose} />
      <StyledConnectionAddBody>
        {step === 1 && (
          <StyledConnectionAddDatabaseIconGroup>
            <StyledConnectionAddLabel>
              Select a database to connect
            </StyledConnectionAddLabel>
            <StyledConnectionAddDatabaseIcons>
              {DvtConnectionData.map((connection, index) => {
                if (
                  connection.databaseType === 'PostgreSQL' ||
                  connection.databaseType === 'MySQL'
                ) {
                  return (
                    <StyledConnectionAddDatabaseIcon
                      key={index}
                      onClick={() =>
                        handleConnectionTypeClick(connection.databaseType)
                      }
                    >
                      <Icon fileName="nav_data" style={{ fontSize: '80px' }} />
                      <StyledConnectionAddDatabaseType>
                        {connection.databaseType}
                      </StyledConnectionAddDatabaseType>
                    </StyledConnectionAddDatabaseIcon>
                  );
                }
                return null;
              })}
            </StyledConnectionAddDatabaseIcons>
            <StyledConnectionAddLabel>
              {t('Or choose from a list of other databases we support: ')}
            </StyledConnectionAddLabel>
            <DvtSelect
              label={t('SUPPORTED DATABASES')}
              placeholder="Choose a database..."
              selectedValue={supporedDatabase}
              setSelectedValue={database =>
                handleSupportedDatabaseSelect(database)
              }
              data={OtherOptions}
              typeDesign="form"
            />
            <StyledConnectionAddSelectFile onClick={handleTextClick}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
              Import database from file
            </StyledConnectionAddSelectFile>
          </StyledConnectionAddDatabaseIconGroup>
        )}
        {(selectedConnectionType === 'PostgreSQL' ||
          selectedConnectionType === 'MySQL') &&
          step === 2 && (
            <StyledConnectionAddStep2>
              {ConnectionDataFindType?.data.map(
                (
                  data: {
                    title: string;
                    value: any;
                    type: string;
                    importantLabel: string;
                    placeholder: string;
                    popoverLabel: string;
                  },
                  index,
                ) => (
                  <div key={index}>
                    <React.Fragment key={index}>
                      {data.type === 'text' && (
                        <DvtInput
                          value={values[data.value]}
                          onChange={text => handleChange(data.value, text)}
                          label={data.title}
                          importantLabel={data.importantLabel}
                          placeholder={data.placeholder}
                          popoverLabel={data.popoverLabel}
                          popoverDirection="right"
                          error={errors[data.value]}
                        />
                      )}
                      {data.type === 'password' && (
                        <DvtInput
                          value={values[data.value]}
                          onChange={text => handleChange(data.value, text)}
                          label={data.title}
                          importantLabel={data.importantLabel}
                          placeholder={data.placeholder}
                          popoverLabel={data.popoverLabel}
                          type="password"
                          error={errors[data.value]}
                        />
                      )}
                      {data.type === 'switch' && (
                        <StyledConnectionAddSwitch>
                          <DvtCheckbox
                            label="SSL"
                            checked={values.switch}
                            onChange={bol => handleChange(data.value, bol)}
                          />
                          <DvtPopper
                            label={data.importantLabel}
                            direction="right"
                            size="small"
                          >
                            <Icon
                              fileName="warning"
                              css={(theme: SupersetTheme) => ({
                                color: theme.colors.alert.base,
                              })}
                              iconSize="l"
                            />
                          </DvtPopper>
                        </StyledConnectionAddSwitch>
                      )}
                      {data.type === 'toBasic' && (
                        <StyledConnectionAddButtonGroup>
                          <StyledConnectionAddToBasic>
                            {data.title}
                          </StyledConnectionAddToBasic>
                          <StyledConnectionAddButton>
                            {!meta?.isEdit && (
                              <DvtButton
                                bold
                                label={t('BACK')}
                                onClick={handleBackButton}
                                typeColour="powder"
                                size="small"
                              />
                            )}
                            <DvtButton
                              bold
                              label={t('CONNECT')}
                              onClick={() => {
                                handleSubmit();
                              }}
                            />
                          </StyledConnectionAddButton>
                        </StyledConnectionAddButtonGroup>
                      )}
                    </React.Fragment>
                  </div>
                ),
              )}
            </StyledConnectionAddStep2>
          )}
        {selectedConnectionType !== 'PostgreSQL' &&
          selectedConnectionType !== 'MySQL' &&
          step === 2 && (
            <StyledConnectionAddStep2>
              <StyledConnectionAddGroups>
                <StyledConnectionAddGroup>
                  <StyledConnectionAddLabel>
                    Enter Primary Credentials
                  </StyledConnectionAddLabel>
                  Enter Primary Credentials Need help? Learn how to connect your
                  database here.
                  {ConnectionDataFindType?.data.map(
                    (
                      data: {
                        title: string;
                        value: any;
                        type: string;
                        importantLabel: string;
                        placeholder: string;
                        popoverLabel: string;
                      },
                      index,
                    ) => (
                      <DvtInput
                        key={index}
                        value={sqlAlchemyValues[data.value]}
                        onChange={text =>
                          sqlAlchemyHandleChange(data.value, text)
                        }
                        label={data.title}
                        importantLabel={data.importantLabel}
                        placeholder={data.placeholder}
                        popoverLabel={data.popoverLabel}
                        popoverDirection="right"
                        error={sqlAlchemyErrors[data.value]}
                      />
                    ),
                  )}
                  <DvtButton
                    bold
                    label={t('TEST CONNECTION')}
                    onClick={() => {}}
                    maxWidth
                  />
                </StyledConnectionAddGroup>
                <StyledConnectionAddGroup>
                  <StyledConnectionAddCollapse>
                    <StyledConnectionAddLabel>
                      {t('ADVANCED')}
                    </StyledConnectionAddLabel>
                    {advancedData.map((item, index) => (
                      <div key={index}>
                        <DvtCollapse
                          label={item.title}
                          isOpen={collapseValues[item.value]}
                          setIsOpen={() => setCollapseValue(item.value)}
                        >
                          {item.data.map((dataItem, dataIndex) => (
                            <>
                              {dataItem.type === 'checkbox' && (
                                <StyledConnectionAddSwitch key={dataIndex}>
                                  <DvtCheckbox
                                    checked={checkbox[dataItem.value]}
                                    onChange={bol =>
                                      setcheckbox({
                                        ...checkbox,
                                        [dataItem.value]: bol,
                                      })
                                    }
                                    label={dataItem.label}
                                  />
                                  <DvtPopper
                                    label={dataItem.popoverLabel || ''}
                                    direction="right"
                                    size="small"
                                  >
                                    <Icon
                                      fileName="warning"
                                      css={(theme: SupersetTheme) => ({
                                        color: theme.colors.alert.base,
                                      })}
                                      iconSize="l"
                                    />
                                  </DvtPopper>
                                </StyledConnectionAddSwitch>
                              )}
                              {dataItem.type === 'subcheckbox' &&
                                checkbox.expose && (
                                  <StyledConnectionAddCheckboxGroup>
                                    <StyledConnectionAddSwitch key={dataIndex}>
                                      <DvtCheckbox
                                        checked={checkbox[dataItem.value]}
                                        onChange={bol =>
                                          setcheckbox({
                                            ...checkbox,
                                            [dataItem.value]: bol,
                                          })
                                        }
                                        label={dataItem.label}
                                      />
                                      <DvtPopper
                                        label={dataItem.popoverLabel || ''}
                                        direction="right"
                                        size="small"
                                      >
                                        <Icon
                                          fileName="warning"
                                          css={(theme: SupersetTheme) => ({
                                            color: theme.colors.alert.base,
                                          })}
                                          iconSize="l"
                                        />
                                      </DvtPopper>
                                    </StyledConnectionAddSwitch>
                                  </StyledConnectionAddCheckboxGroup>
                                )}
                              {dataItem.type === 'input' && (
                                <StyledConnectionAddInputGroup>
                                  <DvtInput
                                    label={dataItem.label}
                                    value={input[dataItem.value]}
                                    onChange={text =>
                                      setInput({
                                        ...input,
                                        [dataItem.value]: text,
                                      })
                                    }
                                    placeholder={dataItem.placeholder}
                                    popoverDirection="right"
                                    popoverLabel={dataItem.popoverLabel}
                                  />
                                </StyledConnectionAddInputGroup>
                              )}
                              {dataItem.type === 'jsoneditor' && (
                                <DvtJsonEditor
                                  label={dataItem.label}
                                  placeholder={dataItem.placeholder}
                                  value=""
                                  onChange={() => {}}
                                  height="120px"
                                />
                              )}
                            </>
                          ))}
                        </DvtCollapse>
                      </div>
                    ))}
                  </StyledConnectionAddCollapse>
                </StyledConnectionAddGroup>
              </StyledConnectionAddGroups>
              <StyledConnectionAddButtons>
                <DvtButton
                  bold
                  label={t('BACK')}
                  onClick={handleBackButton}
                  typeColour="powder"
                  size="small"
                />
                <DvtButton
                  bold
                  label={t('CONNECT')}
                  onClick={() => {
                    handleSubmit();
                  }}
                  size="small"
                />
              </StyledConnectionAddButtons>
            </StyledConnectionAddStep2>
          )}
        {step === 3 && (
          <>
            <StyledConnectionAddGroupStep3>
              <StyledConnectionAddCollapse>
                <StyledConnectionAddLabel>
                  {t('Database connected')}
                </StyledConnectionAddLabel>
                {t(
                  'Create a dataset to begin visualizing your data as a chart or go to SQL Lab to query your data.',
                )}
                {advancedData.map((item, index) => (
                  <div key={index}>
                    <DvtCollapse
                      label={item.title}
                      isOpen={collapseValues[item.value]}
                      setIsOpen={() => setCollapseValue(item.value)}
                    >
                      {item.data.map((dataItem, dataIndex) => (
                        <>
                          {dataItem.type === 'checkbox' && (
                            <StyledConnectionAddSwitch key={dataIndex}>
                              <DvtCheckbox
                                checked={checkbox[dataItem.value]}
                                onChange={bol =>
                                  setcheckbox({
                                    ...checkbox,
                                    [dataItem.value]: bol,
                                  })
                                }
                                label={dataItem.label}
                              />
                              <DvtPopper
                                label={dataItem.popoverLabel || ''}
                                direction="right"
                                size="small"
                              >
                                <Icon
                                  fileName="warning"
                                  css={(theme: SupersetTheme) => ({
                                    color: theme.colors.alert.base,
                                  })}
                                  iconSize="l"
                                />
                              </DvtPopper>
                            </StyledConnectionAddSwitch>
                          )}
                          {dataItem.type === 'subcheckbox' && checkbox.expose && (
                            <StyledConnectionAddCheckboxGroup>
                              <StyledConnectionAddSwitch key={dataIndex}>
                                <DvtCheckbox
                                  checked={checkbox[dataItem.value]}
                                  onChange={bol =>
                                    setcheckbox({
                                      ...checkbox,
                                      [dataItem.value]: bol,
                                    })
                                  }
                                  label={dataItem.label}
                                />
                                <DvtPopper
                                  label={dataItem.popoverLabel || ''}
                                  direction="right"
                                  size="small"
                                >
                                  <Icon
                                    fileName="warning"
                                    css={(theme: SupersetTheme) => ({
                                      color: theme.colors.alert.base,
                                    })}
                                    iconSize="l"
                                  />
                                </DvtPopper>
                              </StyledConnectionAddSwitch>
                            </StyledConnectionAddCheckboxGroup>
                          )}
                          {dataItem.type === 'input' && (
                            <StyledConnectionAddInputGroup>
                              <DvtInput
                                label={dataItem.label}
                                value={input[dataItem.value]}
                                onChange={text =>
                                  setInput({
                                    ...input,
                                    [dataItem.value]: text,
                                  })
                                }
                                placeholder={dataItem.placeholder}
                                popoverDirection="right"
                                popoverLabel={dataItem.popoverLabel}
                              />
                            </StyledConnectionAddInputGroup>
                          )}
                          {dataItem.type === 'jsoneditor' && (
                            <DvtJsonEditor
                              label={dataItem.label}
                              placeholder={dataItem.placeholder}
                              value=""
                              onChange={() => {}}
                              height="120px"
                            />
                          )}
                        </>
                      ))}
                    </DvtCollapse>
                  </div>
                ))}
              </StyledConnectionAddCollapse>
            </StyledConnectionAddGroupStep3>
            <StyledConnectionAddButtons>
              <DvtButton
                bold
                label={t('BACK')}
                onClick={handleBackButton}
                typeColour="powder"
                size="small"
              />
              <DvtButton
                bold
                label={t('FINISH')}
                onClick={() =>
                  meta?.isEdit
                    ? setApiUrl(`database/${meta.id}`)
                    : setApiUrl('database/')
                }
                size="small"
                loading={connectionAddData.loading}
              />
            </StyledConnectionAddButtons>
          </>
        )}
      </StyledConnectionAddBody>
    </StyledConnectionAdd>
  );
};

export default DvtConnectionAdd;
