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

const StyledSecond = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.dvt.backgroundColor.opacity};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const StyledSecondContainer = styled.div`
  position: relative;
  border-radius: 12px;
  height: 450px;
  width: 600px;
  padding: 28px;
  padding-top: 16px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
`;

const StyledTimeRangeCenter = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 192px);
  padding: 20px 0;
  gap: 20px;
`;

const StyledTimeRangeCenterLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  margin-bottom: 10px;
`;

const StyledTimeRangeCenterTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTimeRangeCenterBottom = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dvt.text.bold};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  gap: 15px;
`;

export {
  StyledTimeRangeCenter,
  StyledTimeRangeCenterTop,
  StyledTimeRangeCenterBottom,
  StyledTimeRangeCenterLabel,
  ButtonContainer,
  StyledSecond,
  StyledSecondContainer,
};
