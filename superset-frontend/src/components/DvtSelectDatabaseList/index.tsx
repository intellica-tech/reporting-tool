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
import React, { useState } from 'react';
import { t } from '@superset-ui/core';
import DvtInput from '../DvtInput';
import {
  StyledDvtSelectDatabaseList,
  StyledDvtSelectDatabaseListLabel,
  StyledDvtSelectDatabaseListScroll,
  StyledDvtSelectDatabaseListItem,
} from './dvt-select-database-list.module';

interface CardProps {
  extra: string;
  type: string;
  value: string;
}

export interface DvtSelectDatabaseListProps {
  data: CardProps[];
  active: CardProps;
  setActive: (item: CardProps) => void;
}

const DvtSelectDatabaseList = ({
  data,
  active,
  setActive,
}: DvtSelectDatabaseListProps) => {
  const [search, setSearch] = useState<string>('');

  const searchData = data.filter(
    (item: CardProps) => item.value.indexOf(search) === 0,
  );

  return (
    <StyledDvtSelectDatabaseList>
      <StyledDvtSelectDatabaseListLabel>
        {t('Select database table')}
      </StyledDvtSelectDatabaseListLabel>
      <DvtInput
        type="search"
        typeDesign="chartsForm"
        value={search}
        onChange={setSearch}
        placeholder={t('Search tables')}
      />
      <StyledDvtSelectDatabaseListScroll>
        {searchData.map(item => (
          <StyledDvtSelectDatabaseListItem
            active={item.value === active?.value}
            onClick={() => setActive(item)}
          >
            {item.value}
          </StyledDvtSelectDatabaseListItem>
        ))}
      </StyledDvtSelectDatabaseListScroll>
    </StyledDvtSelectDatabaseList>
  );
};

export default DvtSelectDatabaseList;
