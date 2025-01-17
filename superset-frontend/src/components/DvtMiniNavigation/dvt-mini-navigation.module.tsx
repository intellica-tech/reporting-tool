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
import { styled } from '@superset-ui/core';
import { Link } from 'react-router-dom';

const StyledDvtMiniNavigation = styled.div`
  display: inline-block;
`;

const DvtMiniNavigationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const DvtMiniNavigationHeaderTitle = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.2px;
`;

interface FadeInIconProps {
  $fadeIn: boolean;
}

const DvtMiniNavigationAnimatedIcon = styled.div<FadeInIconProps>`
  margin-left: 12px;
  transition: all 300ms;
  transform: ${({ $fadeIn }) => ($fadeIn ? 'rotate(90deg)' : 'rotate(0)')};
`;

const DvtMiniNavigationDataLink = styled(Link)`
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dvt.text.label};
`;

export {
  StyledDvtMiniNavigation,
  DvtMiniNavigationHeader,
  DvtMiniNavigationHeaderTitle,
  DvtMiniNavigationAnimatedIcon,
  DvtMiniNavigationDataLink,
};
