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

interface TableProps {
  $onScrollTable: boolean;
  scrollMaxHeight: string;
}

const StyledTable = styled.div<TableProps>`
  width: 100%;

  ${({ $onScrollTable, scrollMaxHeight }) =>
    $onScrollTable
      ? `
        max-height: ${scrollMaxHeight};
        overflow-x: auto;
      `
      : ''};

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
  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    display: inline-flex;
    width: 15px;
    height: 15px;
    background-color: ${({ theme }) => theme.colors.dvt.primary.base};
    transform: translate(-50%, -50%) scale(1);
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    position: relative;
    background-color: ${({ theme }) => theme.colors.dvt.primary.base};
    border-color: ${({ theme }) => theme.colors.dvt.primary.base};
    height: 24px;
    width: 24px;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    display: inline-flex;
    top: 50%;
    left: calc(50% - 4.5px);
    width: 6px;
    height: 11px;
  }

  .ant-checkbox-inner {
    height: 24px;
    width: 24px;
  }
`;

const StyledTableTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
`;

const StyledTabletHead = styled.thead<TableProps>`
  ${({ $onScrollTable, theme }) =>
    $onScrollTable
      ? `
        position: sticky;
        top: 0;
        background-color: ${theme.colors.grayscale.light5};
        z-index: 1;

      `
      : ''};
`;

const StyledTableIcon = styled.div`
  display: flex;
`;

const StyledTableTr = styled.tr`
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.grayscale.light5};
  height: 56px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dvt.primary.light2};
  }
`;

const StyledTableTitle = styled.tr``;

interface StyledTableThProps {
  flex: number;
}

const StyledTableTh = styled.th<StyledTableThProps>`
  color: ${({ theme }) => theme.colors.grayscale.dark2};
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  padding: 0 3px;
  padding-bottom: 10px;
  width: ${({ flex }) => (flex ? `${flex}%` : 'auto')};

  &:first-of-type {
    padding-left: 30px;
  }
`;

const StyledTableThSort = styled.button`
  background-color: transparent;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
`;

interface StyledTableThSortRotate {
  asc: boolean;
}

const StyledTableThSortRotate = styled.span<StyledTableThSortRotate>`
  display: flex;
  transform: rotate(${({ asc }) => (asc ? '180deg' : '0deg')});
`;

const StyledTableTbody = styled.tbody``;

const StyledTableTd = styled.td`
  color: ${({ theme }) => theme.colors.grayscale.dark2};
  font-size: 14px;
  font-weight: 400;
  padding: 0 5px;
  &:first-of-type {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding-left: 30px;
  }
  &:last-of-type {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const StyledTableCheckbox = styled.div`
  display: inline-flex;
  margin-right: 24px;
`;

const StyledTableUrl = styled.div`
  color: ${({ theme }) => theme.colors.dvt.primary.base};
`;

const StyledTableInput = styled.div`
  margin-right: 14px;
`;

const StyledTableEditor = styled.div`
  margin: 2px 14px;
  width: 100%;
`;

const StyledTableCollapseCheckbox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledTableCollapse = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  padding: 30px 30px 30px 0;
`;

export {
  StyledTable,
  StyledTableTable,
  StyledTabletHead,
  StyledTableTr,
  StyledTableTh,
  StyledTableThSort,
  StyledTableThSortRotate,
  StyledTableTbody,
  StyledTableTd,
  StyledTableTitle,
  StyledTableIcon,
  StyledTableCheckbox,
  StyledTableUrl,
  StyledTableInput,
  StyledTableEditor,
  StyledTableCollapseCheckbox,
  StyledTableCollapse,
};
