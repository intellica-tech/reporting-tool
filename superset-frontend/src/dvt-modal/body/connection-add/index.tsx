import React, { useEffect, useRef, useState } from 'react';
import useFetch from 'src/hooks/useFetch';
import {
  DvtConnectionData,
  OtherOptions,
} from 'src/dvt-modal/dvtConnectionData';
import { SupersetTheme, t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtInput from 'src/components/DvtInput';
import Icon from 'src/components/Icons/Icon';
import DvtSelect from 'src/components/DvtSelect';
import { Switch } from 'antd';
import DvtPopper from 'src/components/DvtPopper';
import DvtCollapse from 'src/components/DvtCollapse';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtJsonEditor from 'src/components/DvtJsonEditor';
import {
  StyledConnectionAdd,
  StyledConnectionAddHeader,
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
} from './connection-add.module';

const DvtConnectionAdd = ({ onClose }: ModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [supporedDatabase, setSupporedDatabase] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [apiUrl, setApiUrl] = useState<string>('');
  const [exposeCheckbox, setExposeCheckbox] = useState<boolean>(false);
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
  }>({
    host: '',
    port: '',
    database_name: '',
    user_name: '',
    password: '',
    display_name: selectedConnectionType,
    addittional_parameters: '',
    switch: false,
  });

  useEffect(() => {}, [selectedFile]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
  };

  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleConnectionTypeClick = (connectionType: string) => {
    setSelectedConnectionType(connectionType);
    setStep(2);
  };

  const handleSupportedDatabaseSelect = (selectedValue: string) => {
    setSupporedDatabase(selectedValue);
    setTimeout(() => {
      setStep(2);
    }, 800);
  };

  const handleBackButton = () => {
    setSupporedDatabase('');
    setSelectedConnectionType('');
    setStep(1);
  };

  const ConnectionDataFindType = DvtConnectionData.find(
    connection => connection.databaseType === selectedConnectionType,
  );

  const connectionAddData = useFetch({
    url: apiUrl,
    method: 'POST',
    body: {
      configuration_method:
        selectedConnectionType === 'PostgreSQL' ||
        selectedConnectionType === 'MySQL'
          ? 'dynamic_form'
          : 'sqlalchemy_form',
      database_name: selectedConnectionType || supporedDatabase,
      driver: ConnectionDataFindType?.driver,
      engine: ConnectionDataFindType?.engine,
      engine_information: ConnectionDataFindType?.engine_information,
      expose_in_sqllab: true,
      parameters: {
        database: input.database_name,
        host: input.host,
        password: input.password,
        port: input.port,
        username: input.display_name,
        encryption: input.switch,
      },
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (connectionAddData?.message === 'OK') {
      onClose();
    }
  }, [onClose, connectionAddData]);

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

  const setInputValue = (property: string, value: string | boolean) => {
    setInput(prevValues => ({
      ...prevValues,
      [property]: value,
    }));
  };

  return (
    <StyledConnectionAdd>
      <StyledConnectionAddHeader>
        <StyledConnectionAddLabel>Connect a database</StyledConnectionAddLabel>
      </StyledConnectionAddHeader>
      <StyledConnectionAddBody>
        {step === 1 && (
          <StyledConnectionAddDatabaseIconGroup>
            <StyledConnectionAddLabel>
              Select a database to connect
            </StyledConnectionAddLabel>
            <StyledConnectionAddDatabaseIcons>
              {DvtConnectionData.map((connection, index) => (
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
              ))}
            </StyledConnectionAddDatabaseIcons>
            <StyledConnectionAddLabel>
              {t('Or choose from a list of other databases we support: ')}
            </StyledConnectionAddLabel>
            <DvtSelect
              label={t('SUPPORTED DATABASES')}
              placeholder="Choose a database..."
              selectedValue={supporedDatabase}
              setSelectedValue={handleSupportedDatabaseSelect}
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
                          value={input[data.value]}
                          onChange={text => setInputValue(data.value, text)}
                          label={data.title}
                          importantLabel={data.importantLabel}
                          placeholder={data.placeholder}
                          popoverLabel={data.popoverLabel}
                          popoverDirection="right"
                        />
                      )}
                      {data.type === 'password' && (
                        <DvtInput
                          value={input[data.value]}
                          onChange={text => setInputValue(data.value, text)}
                          label={data.title}
                          importantLabel={data.importantLabel}
                          placeholder={data.placeholder}
                          popoverLabel={data.popoverLabel}
                          type="password"
                        />
                      )}
                      {data.type === 'switch' && (
                        <StyledConnectionAddSwitch>
                          <DvtCheckbox
                            label="SSL"
                            checked={input.switch}
                            onChange={bol => setInputValue(data.value, bol)}
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
                            <DvtButton
                              bold
                              label={t('BACK')}
                              onClick={handleBackButton}
                              typeColour="powder"
                            />
                            <DvtButton
                              bold
                              label={t('CONNECT')}
                              onClick={() =>
                                setApiUrl('database/validate_parameters/')
                              }
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
                  <DvtInput
                    value=""
                    onChange={() => {}}
                    label={t('DISPLAY NAME')}
                    popoverLabel={t('Cannot be empty')}
                    popoverDirection="right"
                    importantLabel={t(
                      'Pick a name to help you identify this database.',
                    )}
                  />
                  <DvtInput
                    value=""
                    onChange={() => {}}
                    label={t('SQLALCHEMY URI')}
                    importantLabel={t(
                      'Refer to the for more information on how to structure your URI.',
                    )}
                    placeholder={t(
                      'dialect+driver://username:password@host:port/database',
                    )}
                    popoverLabel={t('Cannot be empty')}
                    popoverDirection="right"
                  />
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
                    <DvtCollapse
                      label="SQL Lab"
                      isOpen={collapseValues.sql}
                      setIsOpen={() => setCollapseValue('sql')}
                    >
                      <StyledConnectionAddSwitch>
                        <DvtCheckbox
                          checked={exposeCheckbox}
                          onChange={setExposeCheckbox}
                          label={t('Expose database in SQL Lab')}
                        />
                        <DvtPopper
                          label={t(
                            'Allow this database to be queried in SQL Lab',
                          )}
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
                      {exposeCheckbox && (
                        <>
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Allow CREATE TABLE AS')}
                            />
                            <DvtPopper
                              label={t(
                                'Allow creation of new tables based on queries',
                              )}
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
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Allow CREATE VIEW AS')}
                            />
                            <DvtPopper
                              label={t(
                                'Allow creation of new views based on queries',
                              )}
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
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Allow DML')}
                            />
                            <DvtPopper
                              label={t(
                                'Allow manipulation of the database using non-SELECT statements such as UPDATE, DELETE, CREATE, etc.',
                              )}
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
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Enable query cost estimation')}
                            />
                            <DvtPopper
                              label={t(
                                'For Bigquery, Presto and Postgres, shows a button to compute cost before running a query.',
                              )}
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
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Allow this database to be explored')}
                            />
                            <DvtPopper
                              label={t(
                                'When enabled, users are able to visualize SQL Lab results in Explore.',
                              )}
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
                          <StyledConnectionAddSwitch>
                            <DvtCheckbox
                              checked={false}
                              onChange={() => {}}
                              label={t('Disable SQL Lab data preview queries')}
                            />
                            <DvtPopper
                              label={t(
                                'Disable data preview when fetching table metadata in SQL Lab. Useful to avoid browser performance issues when using databases with very wide tables.',
                              )}
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
                        </>
                      )}
                    </DvtCollapse>
                    <DvtCollapse
                      label="Performance"
                      isOpen={collapseValues.performance}
                      setIsOpen={() => setCollapseValue('performance')}
                    >
                      <StyledConnectionAddInputGroup>
                        <DvtInput
                          label={t('CHART CACHE TIMEOUT')}
                          value=""
                          onChange={() => {}}
                          placeholder={t('Enter duration in seconds')}
                          popoverDirection="right"
                          popoverLabel={t(
                            'Duration (in seconds) of the caching timeout for charts of this database. A timeout of 0 indicates that the cache never expires. Note this defaults to the global timeout if undefined.',
                          )}
                        />
                        <DvtInput
                          label={t('SCHEMA CACHE TIMEOUT')}
                          value=""
                          onChange={() => {}}
                          placeholder={t('Enter duration in seconds')}
                          popoverDirection="right"
                          popoverLabel={t(
                            'Duration (in seconds) of the metadata caching timeout for schemas of this database. If left unset, the cache never expires.',
                          )}
                        />
                        <DvtInput
                          label={t('TABLE CACHE TIMEOUT')}
                          value=""
                          onChange={() => {}}
                          placeholder={t('Enter duration in seconds')}
                          popoverDirection="right"
                          popoverLabel={t(
                            'Duration (in seconds) of the metadata caching timeout for tables of this database. If left unset, the cache never expires.',
                          )}
                        />
                        <StyledConnectionAddSwitch>
                          <DvtCheckbox
                            checked={false}
                            onChange={() => {}}
                            label={t('Asynchronous query execution')}
                          />
                          <DvtPopper
                            label={t(
                              'Operate the database in asynchronous mode, meaning that the queries are executed on remote workers as opposed to on the web server itself. This assumes that you have a Celery worker setup as well as a results backend. Refer to the installation docs for more information.',
                            )}
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
                        <StyledConnectionAddSwitch>
                          <DvtCheckbox
                            checked={false}
                            onChange={() => {}}
                            label={t('Cancel query on window unload event')}
                          />
                          <DvtPopper
                            label={t(
                              'Terminate running queries when browser window closed or navigated to another page. Available for Presto, Hive, MySQL, Postgres and Snowflake databases.',
                            )}
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
                      </StyledConnectionAddInputGroup>
                    </DvtCollapse>
                    <DvtCollapse
                      label="Security"
                      isOpen={collapseValues.security}
                      setIsOpen={() => setCollapseValue('security')}
                    >
                      <DvtJsonEditor
                        label={t('SECURE EXTRA')}
                        placeholder={t('Secure extra')}
                        value=""
                        onChange={() => {}}
                        height="120px"
                      />

                      <DvtJsonEditor
                        label={t('ROOT CERTIFICATE')}
                        placeholder={t('Secure extra')}
                        value=""
                        onChange={() => {}}
                        height="120px"
                      />
                      <StyledConnectionAddSwitch>
                        <DvtCheckbox
                          checked={false}
                          onChange={() => {}}
                          label={t(
                            'Impersonate logged in user (Presto, Trino, Drill, Hive, and GSheets)',
                          )}
                        />
                        <DvtPopper
                          label={t(
                            'If Presto or Trino, all the queries in SQL Lab are going to be executed as the currently logged on user who must have permission to run them. If Hive and hive.server2.enable.doAs is enabled, will run the queries as service account, but impersonate the currently logged on user via hive.server2.proxy.user property.',
                          )}
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
                      <DvtCheckbox
                        checked={false}
                        onChange={() => {}}
                        label={t('Allow file uploads to database')}
                      />
                      <DvtInput
                        label={t('SCHEMAS ALLOWED FOR FILE UPLOAD')}
                        value=""
                        onChange={() => {}}
                        placeholder={t('schema1,schema2')}
                        popoverDirection="right"
                        popoverLabel={t(
                          'A comma-separated list of schemas that files are allowed to upload to.',
                        )}
                      />
                    </DvtCollapse>
                    <DvtCollapse
                      label="Other"
                      isOpen={collapseValues.other}
                      setIsOpen={() => setCollapseValue('other')}
                    >
                      <DvtJsonEditor
                        label={t('METADATA PARAMETERS')}
                        placeholder={t('Metadata Parameters')}
                        value=""
                        onChange={() => {}}
                        height="120px"
                      />
                      <DvtJsonEditor
                        label={t('ENGINE PARAMETERS')}
                        placeholder={t('Engine Parameters')}
                        value=""
                        onChange={() => {}}
                        height="120px"
                      />
                      <DvtInput
                        label={t('VERSION')}
                        value=""
                        onChange={() => {}}
                        placeholder={t('Version Number')}
                        popoverDirection="right"
                        popoverLabel={t(
                          'Specify the database version. This should be used with Presto in order to enable query cost estimation.',
                        )}
                      />
                    </DvtCollapse>
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
                  onClick={() => setApiUrl('database/validate_parameters/')}
                  size="small"
                />
              </StyledConnectionAddButtons>
            </StyledConnectionAddStep2>
          )}
        {step === 3 && 'Step3'}
      </StyledConnectionAddBody>
    </StyledConnectionAdd>
  );
};

export default DvtConnectionAdd;
