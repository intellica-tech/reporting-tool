/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from 'src/hooks/useFetch';
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
  StyledDashboardFilterLabel,
  StyledDashboardFilterLeft,
  StyledDashboardFilterMenuTabs,
  StyledDashboardFilterRight,
} from './dashboard-filter-modal.module';

interface InputProps {
  filterType: { label: string; value: string };
  filterName: string;
  dataset: { label: string; value: string };
  column: { label: string; value: string };
  filterConfiguration: boolean;
  filterSettings: boolean;
  preFilterAvailable: boolean;
  sortFilter: boolean;
  description: string;
  filterHasDefault: boolean;
  filterValueIsRequired: boolean;
  selectFirstFilter: boolean;
  canSelectMultiple: boolean;
  dynamicallySearchAllFilter: boolean;
  inverseSelection: boolean;
  activeRadio: string;
}

const DvtDashoardFilterModal = ({ meta, onClose }: ModalProps) => {
  const [input, setInput] = useState<InputProps>({
    filterType: { label: '', value: '' },
    filterName: '',
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
  });

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<any>({
    label: 'Settings',
    value: 'settings',
  });
  const [leftMenu, setLeftMenu] = useState<any[]>([
    {
      label: 'untitled',
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
    if (datasetData?.result) {
      setApiUrl(
        `dataset/${input.dataset.value}?q=(columns:!(columns.column_name,columns.is_dttm,columns.type_generic))`,
      );
    }
  }, [input.dataset]);

  const datasetOptions: { label: string; value: string }[] =
    datasetData?.result.map((item: any) => ({
      label: item.table_name,
      value: item.id,
    }));

  const columnOptions: { label: string; value: string }[] =
    columnData?.result.columns.map((item: any) => ({
      label: item.column_name,
      value: item.is_dttm,
    }));

  return (
    <StyledDashboardFilter>
      <DvtModalHeader title="Add and edit filters" onClose={onClose} />
      <StyledDashboardBody>
        <StyledDashboardFilterLeft>
          <DvtButton
            bold
            colour="primary"
            icon="dvt-add_square"
            label="Add  filters and dividers"
            onClick={() =>
              setLeftMenu(prevLeftMenu => [
                ...prevLeftMenu,
                {
                  label: 'Yeni Veri',
                },
              ])
            }
            typeColour="outline"
          />
          {leftMenu.map((item: any) => (
            <StyledDashboardFilterMenuTabs>
              <StyledDashboardFilterLabel>
                {item.label}
              </StyledDashboardFilterLabel>
              <Icon fileName="trash" />
            </StyledDashboardFilterMenuTabs>
          ))}
        </StyledDashboardFilterLeft>
        <StyledDashboardFilterRight>
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
              <DvtSelect
                label="Filter Type"
                data={[
                  { value: 'value', label: 'Value' },
                  { value: 'numerical', label: 'Numerical Range' },
                  { value: 'range', label: 'Time Range' },
                  { value: 'column', label: 'Time Column' },
                  { value: 'grain', label: 'Time Grain' },
                ]}
                selectedValue={input.filterType}
                setSelectedValue={selected => {
                  setInput({ ...input, filterType: selected });
                }}
              />
              <DvtInput
                label="Filter Name"
                value={input.filterName}
                onChange={selected => {
                  setInput({ ...input, filterName: selected });
                }}
              />
              <DvtSelect
                data={datasetOptions}
                label={t('Dataset')}
                placeholder={t('Select')}
                selectedValue={input.dataset}
                setSelectedValue={selected => {
                  setInput({ ...input, dataset: selected });
                }}
                typeDesign="form"
              />
              <DvtSelect
                data={columnOptions || []}
                label={t('Column')}
                placeholder={t('Select')}
                selectedValue={input.column}
                setSelectedValue={selected => {
                  setInput({ ...input, column: selected });
                }}
                typeDesign="form"
              />
              <DvtCollapse
                label="Filter Configuration"
                isOpen={input.filterConfiguration}
                setIsOpen={() => {
                  setInput({
                    ...input,
                    filterConfiguration: !input.filterConfiguration,
                  });
                }}
              >
                <StyledDashboardFilterCollapse>
                  <DvtCheckbox
                    label="Pre-filter available values"
                    checked={input.preFilterAvailable}
                    onChange={v => {
                      setInput({
                        ...input,
                        preFilterAvailable: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Sort filter values"
                    checked={input.sortFilter}
                    onChange={v => {
                      setInput({
                        ...input,
                        sortFilter: v,
                      });
                    }}
                  />
                </StyledDashboardFilterCollapse>
              </DvtCollapse>
              <DvtCollapse
                label="Filter Settings"
                isOpen={input.filterSettings}
                setIsOpen={() => {
                  setInput({
                    ...input,
                    filterSettings: !input.filterSettings,
                  });
                }}
              >
                {' '}
                <StyledDashboardFilterCollapse>
                  <DvtTextarea
                    label="Description"
                    value={input.description}
                    onChange={selected => {
                      setInput({ ...input, description: selected });
                    }}
                  />
                  <DvtCheckbox
                    label="Filter has default value"
                    checked={input.filterHasDefault}
                    onChange={v => {
                      setInput({
                        ...input,
                        filterHasDefault: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Filter value is required"
                    checked={input.filterValueIsRequired}
                    onChange={v => {
                      setInput({
                        ...input,
                        filterValueIsRequired: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Select first filter value by default"
                    checked={input.selectFirstFilter}
                    onChange={v => {
                      setInput({
                        ...input,
                        selectFirstFilter: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Can select multiple values"
                    checked={input.canSelectMultiple}
                    onChange={v => {
                      setInput({
                        ...input,
                        canSelectMultiple: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Dynamically search all filter values"
                    checked={input.dynamicallySearchAllFilter}
                    onChange={v => {
                      setInput({
                        ...input,
                        dynamicallySearchAllFilter: v,
                      });
                    }}
                  />
                  <DvtCheckbox
                    label="Inverse selection"
                    checked={input.inverseSelection}
                    onChange={v => {
                      setInput({
                        ...input,
                        inverseSelection: v,
                      });
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
            <>
              <DvtRadioList
                data={[
                  { label: 'Apply to all panels', value: 'radio1' },
                  { label: 'Apply to specific panels', value: 'radio2' },
                ]}
                active={input.activeRadio}
                setActive={v => {
                  setInput({
                    ...input,
                    activeRadio: v,
                  });
                }}
              />
              {input.activeRadio === 'radio1' && (
                <StyledDashboardFilterLabel>
                  All panels with this column will be affected by this filter
                </StyledDashboardFilterLabel>
              )}
              {input.activeRadio === 'radio2' && (
                <StyledDashboardFilterLabel>
                  Only selected panels will be affected by this filter
                  <DvtCheckbox
                    label="All panels"
                    checked={false}
                    onChange={() => {}}
                  />
                </StyledDashboardFilterLabel>
              )}
            </>
          )}
        </StyledDashboardFilterRight>
      </StyledDashboardBody>
    </StyledDashboardFilter>
  );
};

export default DvtDashoardFilterModal;
