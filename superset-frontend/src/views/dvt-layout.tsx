/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { Suspense, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { GlobalStyles } from 'src/GlobalStyles';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Loading from 'src/components/Loading';
import DvtSidebar from 'src/components/DvtSidebar';
import DvtNavbar from 'src/components/DvtNavbar';
import DvtModal from 'src/dvt-modal';
import getBootstrapData from 'src/utils/getBootstrapData';
import ToastContainer from 'src/components/MessageToasts/ToastContainer';
import { routes } from 'src/views/dvt-routes';
import { styled } from '@superset-ui/core';
import { WithNavbarBottom } from 'src/components/DvtNavbar/dvt-navbar-tabs-data';
import useFetch from 'src/hooks/useFetch';
import { dvtAppSetUser } from 'src/dvt-redux/dvt-appReducer';
import { useDispatch } from 'react-redux';

interface StyledLayoutProps {
  navbarInHeight: boolean;
}

interface StyledLayoutWidthProps {
  navbarInHeight: boolean;
  marginLeft: number;
}

const StyledApp = styled.div<StyledLayoutWidthProps>`
  margin-left: ${({ marginLeft }) => marginLeft}px;
  padding-top: ${({ navbarInHeight }) => (navbarInHeight ? 160 : 80)}px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  height: 100vh;
`;

const Main = styled.main<StyledLayoutProps>`
  height: ${({ navbarInHeight }) =>
    `calc(100vh - ${navbarInHeight ? 160 : 80}px)`};
  padding: 25px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    border-radius: 2px;
  }
`;

const bootstrapData = getBootstrapData();

const DvtLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;

  const mainAppSidebarWidth = (pathName: string) => {
    switch (pathName) {
      case '/welcome/':
        return 250;
      case '/dataset/add/':
        return 380;
      case '/sqlhub/':
        return 480;
      default:
        return 300;
    }
  };

  const userPromise = useFetch({ url: 'me/' });

  useEffect(() => {
    if (userPromise) {
      dispatch(dvtAppSetUser(userPromise.result));
    }
  }, [userPromise]);

  return (
    <StyledApp
      navbarInHeight={WithNavbarBottom.includes(pathname)}
      marginLeft={mainAppSidebarWidth(pathname)}
    >
      <GlobalStyles />
      <DvtSidebar
        pathName={pathname}
        minWidth={mainAppSidebarWidth(pathname)}
      />
      <DvtNavbar
        pathName={pathname}
        data={bootstrapData.common.menu_data}
        leftMove={mainAppSidebarWidth(pathname)}
      />
      <DvtModal />
      <Main navbarInHeight={WithNavbarBottom.includes(pathname)}>
        <Switch>
          {routes.map(({ path, Component, props = {}, Fallback = Loading }) => (
            <Route path={path} key={path}>
              <Suspense fallback={<Fallback />}>
                <ErrorBoundary>
                  <Component user={bootstrapData.user} {...props} />
                </ErrorBoundary>
              </Suspense>
            </Route>
          ))}
        </Switch>
      </Main>
      <ToastContainer />
    </StyledApp>
  );
};

export default DvtLayout;
