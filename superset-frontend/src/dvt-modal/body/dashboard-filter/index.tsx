/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'src/dvt-hooks/useFetch';
import { t } from '@superset-ui/core';
import { ModalProps } from 'src/dvt-modal';
import DvtButton from 'src/components/DvtButton';
import DvtModalHeader from 'src/components/DvtModalHeader';
import Icon from 'src/components/Icons/Icon';
import DvtButtonTabs from 'src/components/DvtButtonTabs';
import DvtSelect from 'src/components/DvtSelect';
import DvtInput from 'src/components/DvtInput';
import DvtCollapse from 'src/components/DvtCollapse';
import DvtCheckbox from 'src/components/DvtCheckbox';
import DvtTextarea from 'src/components/DvtTextarea';
import DvtRadioList from 'src/components/DvtRadioList';
import {
  StyledDashboardBody,
  StyledDashboardFilter,
  StyledDashboardFilterButtonGroup,
  StyledDashboardFilterCollapse,
  StyledDashboardFilterFlexColumnGroup,
  StyledDashboardFilterFlexGroup,
  StyledDashboardFilterLabel,
  StyledDashboardFilterLeft,
  StyledDashboardFilterMenuTabs,
  StyledDashboardFilterRight,
  StyledDashboardFilterScoping,
} from './dashboard-filter-modal.module';
import DvtDropdown from 'src/components/DvtDropdown';

const DvtDashoardFilterModal = ({ meta, onClose }: ModalProps) => {
  const [activeTab, setActiveTab] = useState<any>({
    label: 'Settings',
    value: 'settings',
  });
  const [activeId, setActiveId] = useState<number>(0);
  const [leftMenu, setLeftMenu] = useState<any[]>([
    {
      id: 0,
      type: 'filter',
      filterType: { label: 'Value', value: 'value' },
      filterName: 'untitled',
      dataset: { label: '', value: '' },
      column: { label: '', value: '' },
      filterConfiguration: false,
      filterSettings: false,
      preFilterAvailable: false,
      sortFilter: false,
      description: '',
      filterHasDefault: false,
      filterValueIsRequired: false,
      selectFirstFilter: false,
      canSelectMultiple: true,
      dynamicallySearchAllFilter: false,
      inverseSelection: false,
      activeRadio: 'radio1',
      allPanels: false,
    },
  ]);

  const [apiUrl, setApiUrl] = useState<string>('');

  const datasetData = useFetch({
    url: 'dataset/?q=(columns:!(id,table_name,database.database_name,schema),filters:!((col:table_name,opr:ct,value:%27%27)),order_column:table_name,order_direction:asc,page:0,page_size:100)',
  });

  const columnData = useFetch({
    url: apiUrl,
  });

  useEffect(() => {
    if (leftMenu.find(item => item.id === activeId)?.dataset?.value) {
      setApiUrl(
        `dataset/${
          leftMenu.find(item => item.id === activeId)?.dataset.value
        }?q=(columns:!(columns.column_name,columns.is_dttm,columns.type_generic))`,
      );
    }
  }, [leftMenu.find(item => item.id === activeId)?.dataset]);

  const datasetOptions: { label: string; value: string }[] =
    datasetData.data?.result?.map((item: any) => ({
      label: item.table_name,
      value: item.id,
    })) || [];

  const columnOptions: { label: string; value: string }[] =
    columnData.data?.result.columns?.map((item: any) => ({
      label: item.column_name,
      value: item.is_dttm,
    })) || [];

  const generateId = () => {
    const lastItemId =
      leftMenu.length > 0 ? leftMenu[leftMenu.length - 1].id : 0;
    return lastItemId + 1;
  };

  const handleFilterClick = (type: string) => () => {
    setLeftMenu(prevLeftMenu => [
      ...prevLeftMenu,
      type === 'limit'
        ? {
            id: generateId(),
            type,
            filterType: { label: 'Value', value: 'value' },
            filterName: 'untitled',
            dataset: { label: '', value: '' },
            column: { label: '', value: '' },
            filterConfiguration: false,
            filterSettings: false,
            preFilterAvailable: false,
            sortFilter: false,
            description: '',
            filterHasDefault: false,
            filterValueIsRequired: false,
            selectFirstFilter: false,
            canSelectMultiple: true,
            dynamicallySearchAllFilter: false,
            inverseSelection: false,
            activeRadio: 'radio1',
            allPanels: false,
          }
        : {
            id: generateId(),
            filterName: 'untitled',
            type,
            description: '',
          },
    ]);
  };

  const data = [
    { label: 'Filter', onClick: handleFilterClick('filter') },
    { label: 'Divider', onClick: handleFilterClick('divider') },
  ];

  const handleDeleteItem = (id: number) => {
    setLeftMenu(prevLeftMenu => {
      const updatedMenu = prevLeftMenu.filter(item => item.id !== id);
      return updatedMenu;
    });
  };

  const handleSelectValue = (id: number, selected: any, row: any) => {
    setLeftMenu(prevLeftMenu => {
      const updatedMenu = [...prevLeftMenu];
      const selectedItem = updatedMenu.find(item => item.id === id);
      if (selectedItem) {
        selectedItem[row] = selected;
      }
      return updatedMenu;
    });
  };

  return (
    <StyledDashboardFilter>
      <DvtModalHeader title="Add and edit filters" onClose={onClose} />
      <StyledDashboardBody>
        <StyledDashboardFilterLeft>
          <DvtDropdown
            data={data}
            label="Add  filters and dividers"
            icon="dvt-add_square"
          />
          {leftMenu.map((item: any, index: number) => (
            <StyledDashboardFilterMenuTabs
              key={index}
              onClick={() => {
                setActiveId(item.id);
                setActiveTab({
                  label: 'Settings',
                  value: 'settings',
                });
              }}
            >
              <StyledDashboardFilterLabel active={activeId === item.id}>
                {item.filterName}
              </StyledDashboardFilterLabel>
              <Icon
                fileName="trash"
                onClick={() => handleDeleteItem(item.id)}
              />
            </StyledDashboardFilterMenuTabs>
          ))}
        </StyledDashboardFilterLeft>
        {leftMenu
          .filter(item => item.id === activeId)
          .map((filteredItem: any, index: number) => (
            <StyledDashboardFilterRight key={index}>
              {filteredItem.type === 'filter' ? (
                <>
                  {' '}
                  <DvtButtonTabs
                    data={[
                      { label: 'Settings', value: 'settings' },
                      { label: 'Scoping', value: 'scoping' },
                    ]}
                    active={activeTab}
                    setActive={setActiveTab}
                  />
                  {activeTab.value === 'settings' && (
                    <>
                      <StyledDashboardFilterFlexGroup>
                        <StyledDashboardFilterFlexColumnGroup>
                          <DvtSelect
                            label="Filter Type"
                            data={[
                              { value: 'value', label: 'Value' },
                              { value: 'numerical', label: 'Numerical Range' },
                              { value: 'range', label: 'Time Range' },
                              { value: 'column', label: 'Time Column' },
                              { value: 'grain', label: 'Time Grain' },
                            ]}
                            selectedValue={filteredItem.filterType}
                            setSelectedValue={selected =>
                              handleSelectValue(
                                activeId,
                                selected,
                                'filterType',
                              )
                            }
                          />
                          <DvtInput
                            label="Filter Name"
                            value={filteredItem.filterName}
                            onChange={selected =>
                              handleSelectValue(
                                activeId,
                                selected,
                                'filterName',
                              )
                            }
                            typeDesign="chartsForm"
                          />
                        </StyledDashboardFilterFlexColumnGroup>
                        <StyledDashboardFilterFlexColumnGroup>
                          <DvtSelect
                            data={datasetOptions}
                            label={t('Dataset')}
                            placeholder={t('Select')}
                            selectedValue={filteredItem.dataset}
                            setSelectedValue={selected =>
                              handleSelectValue(activeId, selected, 'dataset')
                            }
                            typeDesign="form"
                          />
                          <DvtSelect
                            data={columnOptions || []}
                            label={t('Column')}
                            placeholder={t('Select')}
                            selectedValue={filteredItem.column}
                            setSelectedValue={selected =>
                              handleSelectValue(activeId, selected, 'column')
                            }
                            typeDesign="form"
                          />
                        </StyledDashboardFilterFlexColumnGroup>
                      </StyledDashboardFilterFlexGroup>
                      <DvtCollapse
                        label="Filter Configuration"
                        isOpen={filteredItem.filterConfiguration}
                        setIsOpen={() => {
                          setLeftMenu(prevLeftMenu => {
                            const updatedMenu = [...prevLeftMenu];
                            const selectedItem = updatedMenu.find(
                              item => item.id === activeId,
                            );
                            if (selectedItem) {
                              selectedItem.filterConfiguration =
                                !filteredItem.filterConfiguration;
                            }
                            return updatedMenu;
                          });
                        }}
                      >
                        <StyledDashboardFilterCollapse>
                          <DvtCheckbox
                            label="Pre-filter available values"
                            checked={filteredItem.preFilterAvailable}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'preFilterAvailable',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Sort filter values"
                            checked={filteredItem.sortFilter}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'sortFilter',
                              );
                            }}
                          />
                        </StyledDashboardFilterCollapse>
                      </DvtCollapse>
                      <DvtCollapse
                        label="Filter Settings"
                        isOpen={filteredItem.filterSettings}
                        setIsOpen={() => {
                          setLeftMenu(prevLeftMenu => {
                            const updatedMenu = [...prevLeftMenu];
                            const selectedItem = updatedMenu.find(
                              item => item.id === activeId,
                            );
                            if (selectedItem) {
                              selectedItem.filterSettings =
                                !filteredItem.filterSettings;
                            }
                            return updatedMenu;
                          });
                        }}
                      >
                        <StyledDashboardFilterCollapse>
                          <DvtTextarea
                            label="Description"
                            value={filteredItem.description}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'description',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Filter has default value"
                            checked={filteredItem.filterHasDefault}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'filterHasDefault',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Filter value is required"
                            checked={filteredItem.filterValueIsRequired}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'filterValueIsRequired',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Select first filter value by default"
                            checked={filteredItem.selectFirstFilter}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'selectFirstFilter',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Can select multiple values"
                            checked={filteredItem.canSelectMultiple}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'canSelectMultiple',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Dynamically search all filter values"
                            checked={filteredItem.dynamicallySearchAllFilter}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'dynamicallySearchAllFilter',
                              );
                            }}
                          />
                          <DvtCheckbox
                            label="Inverse selection"
                            checked={filteredItem.inverseSelection}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'inverseSelection',
                              );
                            }}
                          />
                        </StyledDashboardFilterCollapse>
                      </DvtCollapse>
                      <StyledDashboardFilterButtonGroup>
                        <DvtButton bold label={t('Cancel')} onClick={onClose} />
                        <DvtButton
                          bold
                          colour="grayscale"
                          label={t('Save')}
                          onClick={() => {}}
                        />
                      </StyledDashboardFilterButtonGroup>
                    </>
                  )}
                  {activeTab.value === 'scoping' && (
                    <StyledDashboardFilterScoping>
                      <DvtRadioList
                        data={[
                          { label: 'Apply to all panels', value: 'radio1' },
                          {
                            label: 'Apply to specific panels',
                            value: 'radio2',
                          },
                        ]}
                        active={filteredItem.activeRadio}
                        setActive={selected => {
                          handleSelectValue(activeId, selected, 'activeRadio');
                        }}
                      />
                      {filteredItem.activeRadio === 'radio1' && (
                        <StyledDashboardFilterLabel active={false}>
                          All panels with this column will be affected by this
                          filter
                        </StyledDashboardFilterLabel>
                      )}
                      {filteredItem.activeRadio === 'radio2' && (
                        <>
                          <StyledDashboardFilterLabel active={false}>
                            Only selected panels will be affected by this filter
                          </StyledDashboardFilterLabel>
                          <DvtCheckbox
                            label="All panels"
                            checked={filteredItem.allPanels}
                            onChange={selected => {
                              handleSelectValue(
                                activeId,
                                selected,
                                'allPanels',
                              );
                            }}
                          />
                          {filteredItem.allPanels && (
                            <DvtCheckbox
                              label="Degrees vs Income"
                              checked={filteredItem.allPanels}
                              onChange={() => {}}
                            />
                          )}
                        </>
                      )}
                    </StyledDashboardFilterScoping>
                  )}
                </>
              ) : (
                <>
                  <DvtInput
                    label="Filter Name"
                    value={filteredItem.filterName}
                    onChange={selected =>
                      handleSelectValue(activeId, selected, 'filterName')
                    }
                    typeDesign="chartsForm"
                  />
                  <DvtTextarea
                    label="Description"
                    value={filteredItem.description}
                    onChange={selected => {
                      handleSelectValue(activeId, selected, 'description');
                    }}
                  />
                  <StyledDashboardFilterButtonGroup>
                    <DvtButton bold label={t('Cancel')} onClick={onClose} />
                    <DvtButton
                      bold
                      colour="grayscale"
                      label={t('Save')}
                      onClick={() => {}}
                    />
                  </StyledDashboardFilterButtonGroup>
                </>
              )}
            </StyledDashboardFilterRight>
          ))}
      </StyledDashboardBody>
    </StyledDashboardFilter>
  );
};

export default DvtDashoardFilterModal;
