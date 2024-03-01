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

const StyledDvtAddFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledFormFieldItem = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledFormFieldItemLabel = styled.div`
  width: 219px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  font-size: 14px;
  font-weight: 400;
  padding: 16px;
`;

const StyledFormFieldItemLabelImportant = styled.span`
  color: ${({ theme }) => theme.colors.error.base};
  margin-left: 6px;
`;

const StyledFormFieldItemForm = styled.div`
  flex: 1;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
`;

const StyledFormFieldItemFormDescription = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.help};
  font-size: 12px;
  font-weight: 500;
`;

export {
  StyledDvtAddFormFields,
  StyledFormFieldItem,
  StyledFormFieldItemLabel,
  StyledFormFieldItemLabelImportant,
  StyledFormFieldItemForm,
  StyledFormFieldItemFormDescription,
};
