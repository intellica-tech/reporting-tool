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
import { t } from '@superset-ui/core';
import DvtButton from '../DvtButton';
import {
  StyledDvtDeselectDeleteExport,
  StyledDvtDeselectDeleteExportSelects,
  SelectedItemCount,
  ButtonContainer,
} from './dvt-deselect-delete-export.module';

export interface DvtDotTitleProps {
  count: number;
  handleDeselectAll: () => void;
  handleDelete: () => void;
  handleExport?: () => void;
}

const DvtDeselectDeleteExport = ({
  count = 0,
  handleDeselectAll,
  handleDelete,
  handleExport,
}: DvtDotTitleProps) => (
  <StyledDvtDeselectDeleteExport>
    <StyledDvtDeselectDeleteExportSelects>
      <SelectedItemCount>{`${count} ${t('Selected')}`}</SelectedItemCount>
      <DvtButton
        label={t('Deselect All')}
        bold
        colour="primary"
        typeColour="outline"
        size="medium"
        onClick={() => !!count && handleDeselectAll()}
      />
    </StyledDvtDeselectDeleteExportSelects>
    <ButtonContainer>
      <DvtButton
        label={t('Delete')}
        icon="dvt-delete"
        iconToRight
        colour="error"
        size="small"
        onClick={() => !!count && handleDelete()}
      />
      {handleExport && (
        <DvtButton
          label={t('Export')}
          icon="dvt-export"
          iconToRight
          colour="primary"
          bold
          typeColour="powder"
          size="small"
          onClick={() => !!count && handleExport()}
        />
      )}
    </ButtonContainer>
  </StyledDvtDeselectDeleteExport>
);

export default DvtDeselectDeleteExport;
