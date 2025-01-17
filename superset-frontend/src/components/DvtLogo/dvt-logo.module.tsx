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

const StyledDvtLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none !important;
`;

const DvtTitle = styled.p`
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  font-size: 23.2px;
  font-weight: 700;
  line-height: 125%;
  letter-spacing: -0.29px;
  margin: 0;
`;

export { StyledDvtLogo, DvtTitle };
