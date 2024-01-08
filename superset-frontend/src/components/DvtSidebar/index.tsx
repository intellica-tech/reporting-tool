import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  dvtSidebarAlertsSetProperty,
  dvtSidebarConnectionSetProperty,
  dvtSidebarReportsSetProperty,
} from 'src/dvt-redux/dvt-sidebarReducer';
import { useAppSelector } from 'src/hooks/useAppSelector';
import DvtLogo from '../DvtLogo';
import DvtDarkMode from '../DvtDarkMode';
import DvtTitlePlus from '../DvtTitlePlus';
import DvtNavigation from '../DvtNavigation';
import DvtFolderNavigation from '../DvtFolderNavigation';
import DvtSelect from '../DvtSelect';
import DvtNavigationBar from '../DvtNavigationBar';
import DvtSidebarData from './dvtSidebarData';
import { DoubleRightOutlined } from '@ant-design/icons';
import {
  StyledDvtSidebar,
  StyledDvtSidebarHeader,
  StyledDvtSidebarBody,
  StyledDvtSidebarBodyItem,
  StyledDvtSidebarBodySelect,
  StyledDvtSidebarFooter,
  StyledDvtSidebarNavbarLogout,
  StyledDvtSidebarIconGroup,
  StyledDvtSidebarGroup,
  StyledDvtSidebarIcon,
  StyledDvtSidebarRotateIcon
} from './dvt-sidebar.module';
import DvtList from '../DvtList';
import DvtDatePicker from '../DvtDatepicker';
import Icon from '../Icons/Icon';

interface DvtSidebarProps {
  pathName: string;
}

const DvtSidebar: React.FC<DvtSidebarProps> = ({ pathName }) => {
  const dispatch = useDispatch();
  const reportsSelector = useAppSelector(state => state.dvtSidebar.reports);
  const alertsSelector = useAppSelector(state => state.dvtSidebar.alerts);
  const connectionSelector = useAppSelector(
    state => state.dvtSidebar.connection,
  );
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [active, setActive] = useState<string>('test');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathTitles = (pathname: string) => {
    switch (pathname) {
      case '/superset/welcome/':
        return 'Welcome Page';
      case '/dashboard/list/':
        return 'Dashboards';
      case '/alert/list/':
        return 'Alerts';
      case '/report/list/':
        return 'Reports';
      case '/databaseview/list/':
        return 'Connection';
      case '/superset/sqllab/':
        return 'SQL Lab';
      case '/tablemodelview/list/':
        return 'Datasets';
      case '/superset/sqllab/history/':
        return 'SQL History';
      case '/superset/profile/admin/':
        return 'Profile';
      default:
        return '';
    }
  };

  const sidebarDataFindPathname = DvtSidebarData.find(
    (item: { pathname: string }) => item.pathname === pathName,
  );

  const updateReportsProperty = (value: string, propertyName: string) => {
    dispatch(
      dvtSidebarReportsSetProperty({
        reports: {
          ...reportsSelector,
          [propertyName]: value,
        },
      }),
    );
  };

  const updateAlertsProperty = (value: string, propertyName: string) => {
    dispatch(
      dvtSidebarAlertsSetProperty({
        alerts: {
          ...alertsSelector,
          [propertyName]: value,
        },
      }),
    );
  };

  const updateConnectionProperty = (value: string, propertyName: string) => {
    dispatch(
      dvtSidebarConnectionSetProperty({
        connection: {
          ...connectionSelector,
          [propertyName]: value,
        },
      }),
    );
  };

  return (
    <StyledDvtSidebar pathName={pathName}>
      <StyledDvtSidebarHeader>
        <DvtLogo title="AppName" />
      </StyledDvtSidebarHeader>
      {pathTitles(pathName) === 'Welcome Page' && (
        <StyledDvtSidebarBody pathName={pathName}>
          {sidebarDataFindPathname?.data.map((data: any, index: number) => (
            <StyledDvtSidebarBodyItem key={index}>
              {data.titleMenu === 'folder navigation' && (
                <>
                  <DvtTitlePlus title={data.title} />
                  <DvtNavigation data={data.data} />
                </>
              )}
              {data.titleMenu === 'folder' && (
                <>
                  <DvtTitlePlus title={data.title} onClick={() => {}} />
                  <DvtFolderNavigation data={data.data} />
                </>
              )}
              {data.titleMenu === 'shared folder' && (
                <DvtTitlePlus title={data.title} onClick={() => {}} />
              )}
            </StyledDvtSidebarBodyItem>
          ))}
        </StyledDvtSidebarBody>
      )}

      {(pathTitles(pathName) === 'Datasets' ||
        pathTitles(pathName) === 'Dashboards' ||
        pathTitles(pathName) === 'Alerts' ||
        pathTitles(pathName) === 'Reports' ||
        pathTitles(pathName) === 'Connection' ||
        pathTitles(pathName) === 'SQL Lab' ||
        pathTitles(pathName) === 'SQL History') && (
        <StyledDvtSidebarGroup>
          {DvtSidebarData.find(
            (item: { pathname: string }) =>
              item.pathname === '/superset/welcome/',
          )
            ?.data.filter((data: any) => data.titleMenu === 'folder navigation')
            .map((filteredData: any, index: number) => (
              <div key={index}>
                <StyledDvtSidebarIconGroup>
                  {filteredData.data.map((item: any, subIndex: number) => (
                    <StyledDvtSidebarIcon to={item.url} isOpen={isOpen} active={pathName===item.url}>
                      <Icon key={subIndex} fileName={item.fileName} />
                      {isOpen && item.title}
                    </StyledDvtSidebarIcon>
                  ))}
                  <StyledDvtSidebarRotateIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                    <DoubleRightOutlined />
                  </StyledDvtSidebarRotateIcon>
                </StyledDvtSidebarIconGroup>
              </div>
            ))}
          <StyledDvtSidebarBody pathName={pathName}>
            {!isOpen &&
              sidebarDataFindPathname?.data.map(
                (
                  data: {
                    label: string;
                    values: { label: string; value: string }[];
                    placeholder: string;
                    valuesList?: {
                      id: number;
                      title: string;
                      subtitle: string;
                    }[];
                    title: string;
                    datePicker?: boolean;
                    name: string;
                  },
                  index: number,
                ) => (
                  <StyledDvtSidebarBodySelect key={index}>
                    {!data.datePicker && !data.valuesList && (
                      <DvtSelect
                        data={data.values}
                        label={data.label}
                        placeholder={data.placeholder}
                        selectedValue={
                          pathTitles(pathName) === 'Reports'
                            ? reportsSelector[data.name]
                            : pathTitles(pathName) === 'Alerts'
                            ? alertsSelector[data.name]
                            : pathTitles(pathName) === 'Connection'
                            ? connectionSelector[data.name]
                            : undefined
                        }
                        setSelectedValue={value => {
                          if (pathTitles(pathName) === 'Reports') {
                            updateReportsProperty(value, data.name);
                          } else if (pathTitles(pathName) === 'Alerts') {
                            updateAlertsProperty(value, data.name);
                          } else if (pathTitles(pathName) === 'Connection') {
                            updateConnectionProperty(value, data.name);
                          }
                        }}
                        maxWidth
                      />
                    )}
                    {data.valuesList && (
                      <>
                        <DvtSelect
                          data={data.values}
                          label={data.label}
                          placeholder={data.placeholder}
                          selectedValue=""
                          setSelectedValue={() => {}}
                          maxWidth
                        />
                        <DvtList data={data.valuesList} title={data.title} />
                      </>
                    )}
                    {data.datePicker && (
                      <DvtDatePicker
                        isOpen
                        label={data.label}
                        placeholder={data.placeholder}
                        selectedDate={null}
                        setIsOpen={() => {}}
                        setSelectedDate={() => {}}
                        maxWidth
                      />
                    )}
                  </StyledDvtSidebarBodySelect>
                ),
              )}
          </StyledDvtSidebarBody>
        </StyledDvtSidebarGroup>
      )}

      {pathTitles(pathName) === 'Profile' && (
        <StyledDvtSidebarBody pathName={pathName}>
          {sidebarDataFindPathname?.data.map((data: any, index: number) => (
            <StyledDvtSidebarBodyItem key={index}>
              <DvtNavigationBar
                active={active}
                data={data.items}
                setActive={setActive}
              />
              <StyledDvtSidebarNavbarLogout>
                <DvtNavigationBar data={data.itemsLogout} />
              </StyledDvtSidebarNavbarLogout>
            </StyledDvtSidebarBodyItem>
          ))}
        </StyledDvtSidebarBody>
      )}
      {pathTitles(pathName) === 'Welcome Page' && (
        <StyledDvtSidebarFooter>
          <DvtDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
        </StyledDvtSidebarFooter>
      )}
    </StyledDvtSidebar>
  );
};

export default DvtSidebar;
