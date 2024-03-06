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

const StyledSaveDataset = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledSaveDatasetBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
`;

const StyledSaveDatasetButton = styled.div`
  display: flex;
  height: 100%;
  justify-content: end;
  align-items: end;
  gap: 15px;
`;

export { StyledSaveDataset, StyledSaveDatasetButton, StyledSaveDatasetBody };
