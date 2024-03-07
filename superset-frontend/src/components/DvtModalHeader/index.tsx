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
import React from 'react';
import {
  StyledDvtModalHeader,
  StyledDvtModalHeaderTitle,
  StyledDvtModalHeaderClose,
} from './dvt-modal-header.module';
import DvtButton from '../DvtButton';

export interface DvtModalHeaderProps {
  title?: string;
  buttonLabel?: string;
  buttonIcon?: string;
  onClick?: () => void;
  onClose: () => void;
}

const DvtModalHeader: React.FC<DvtModalHeaderProps> = ({
  title,
  buttonLabel,
  buttonIcon,
  onClick,
  onClose,
}) => (
  <StyledDvtModalHeader>
    {title && <StyledDvtModalHeaderTitle>{title}</StyledDvtModalHeaderTitle>}
    {buttonLabel && onClick && (
      <DvtButton
        label={buttonLabel}
        typeColour="powder"
        size="small"
        icon={buttonIcon}
        onClick={onClick}
      />
    )}
    <StyledDvtModalHeaderClose onClick={onClose} />
  </StyledDvtModalHeader>
);

export default DvtModalHeader;
