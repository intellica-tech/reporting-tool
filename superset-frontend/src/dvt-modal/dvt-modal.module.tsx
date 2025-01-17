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

interface StyledModalProps {
  size: 'small' | 'medium' | 'xsmall';
}

const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.dvt.backgroundColor.opacity};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const StyledModalCard = styled.div<StyledModalProps>`
  position: relative;
  border-radius: 12px;
  width: ${({ size }) =>
    size === 'small' ? '919px' : size === 'medium' ? '1150.68px' : '500px'};
  height: ${({ size }) =>
    size === 'small' ? '683px' : size === 'medium' ? '621.428px' : '250px'};
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
`;

const StyledModalCardClose = styled.div`
  position: absolute;
  top: 23px;
  right: 43.63px;
  cursor: pointer;
  width: 25px;
  height: 25px;
  opacity: 0.3;
  color: ${({ theme }) => theme.colors.dvt.text.bold};

  &:hover {
    opacity: 1;
  }

  &::before,
  &::after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 25px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.dvt.text.bold};
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const StyledModalCardBody = styled.div`
  height: 100%;
`;

export {
  StyledModal,
  StyledModalCard,
  StyledModalCardClose,
  StyledModalCardBody,
};
