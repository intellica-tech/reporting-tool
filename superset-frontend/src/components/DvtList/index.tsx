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
import DvtCollapse from '../DvtCollapse';
import {
  StyledDvtList,
  StyledDvtListScroll,
  StyledDvtListItem,
  StyledDvtListItemText,
} from './dvt-list.module';

interface DataProps {
  name: string;
  type: string;
}

export interface SelectedTablesProps {
  title: string;
  data: DataProps[];
}

export interface DvtListProps {
  data: SelectedTablesProps[];
  deleteClick: (i: SelectedTablesProps) => void;
}

const DvtList: React.FC<DvtListProps> = ({ data, deleteClick }) => {
  const [isOpenArray, setIsOpenArray] = useState<any[string]>(
    data.map(i => i.title) || [],
  );

  const handleIsOpenArray = (t: string) => {
    const findTitle = isOpenArray.includes(t)
      ? isOpenArray.filter((ft: string) => ft !== t)
      : [...isOpenArray, t];
    setIsOpenArray(findTitle);
  };

  return (
    <StyledDvtList>
      <StyledDvtListScroll>
        {data.map((d, i) => (
          <DvtCollapse
            key={i}
            typeDesign="dvt-list"
            label={d.title}
            isOpen={isOpenArray.includes(d.title)}
            setIsOpen={() => handleIsOpenArray(d.title)}
            deleteClick={() => deleteClick(d)}
          >
            {d.data.map((item, index) => (
              <StyledDvtListItem key={index}>
                <StyledDvtListItemText>{item.name}</StyledDvtListItemText>
                <StyledDvtListItemText>{item.type}</StyledDvtListItemText>
              </StyledDvtListItem>
            ))}
          </DvtCollapse>
        ))}
      </StyledDvtListScroll>
    </StyledDvtList>
  );
};

export default DvtList;
