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

const StyledViewAllChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledViewAllChartBody = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  gap: 15px;
`;

const StyledInputGrup = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 15px;
`;

const StyledButtonGrup = styled.div`
  display: flex;
  justify-content: end;
  gap: 15px;
`;

const StyledVizTypeGallery = styled.div`
  height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 6px;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    border-radius: 3px;
  }
`;

export {
  StyledViewAllChart,
  StyledInputGrup,
  StyledViewAllChartBody,
  StyledButtonGrup,
  StyledVizTypeGallery,
};
