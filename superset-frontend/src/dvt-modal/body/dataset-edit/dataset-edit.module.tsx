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

const StyledDatasetEdit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 16px 27px;
  height: 60px;
  padding-left: 16px;
  margin-bottom: 0px;
`;

const ModalLabel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-content: center;
  font-weight: bold;
`;

const ModalInfoTextContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 27px;
`;

const ModalInfoText = styled.div``;

const ModalNavigationContainer = styled.div`
  margin-left: 27px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: end;
  align-items: center;
  margin-bottom: 27px;
  margin-right: 27px;
`;

const ModalBreak = styled.br`
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.dark1};
  color: ${({ theme }) => theme.colors.dvt.grayscale.dark1};
  border: solid 1px;
`;

const SourceBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 0px 27px 16px 27px;
  border-radius: 12px;
  padding: 18px 28px;
  gap: 15px;
`;

const SourceLockContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.dvt.grayscale.dark1};
  cursor: pointer;
`;

const SourceCheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SourceInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MetricsButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ColumnsBody = styled.div`
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  margin: 0px 27px 16px 27px;
  border-radius: 12px;
  padding: 18px 28px;
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 6px;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    width: 4px;
    border-radius: 12px;
  }
`;

const ColumnsButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SettingsBody = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 0px 27px 10px 27px;
`;

const SettingsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  width: 100%;
  padding: 10px 16px;
  border-radius: 12px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38vh;
  justify-content: center;
`;

export {
  StyledDatasetEdit,
  ModalHeader,
  ModalLabel,
  ModalInfoTextContainer,
  ModalInfoText,
  ModalNavigationContainer,
  ModalButtonContainer,
  ModalBreak,
  SourceBody,
  SourceLockContainer,
  SourceCheckboxContainer,
  SourceInputContainer,
  MetricsButtonContainer,
  ColumnsBody,
  ColumnsButtonContainer,
  SettingsBody,
  SettingsBlock,
  SpinnerContainer,
};
