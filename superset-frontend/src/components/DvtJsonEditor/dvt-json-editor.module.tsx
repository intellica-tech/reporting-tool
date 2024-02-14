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

const StyledJsonEditor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .ace_scrollbar-v {
    &::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
      width: 6px;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
      width: 6px;
      border-radius: 12px;
    }
  }

  & .ace_scrollbar-h {
    &::-webkit-scrollbar {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
      height: 6px;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
      height: 6px;
      border-radius: 12px;
    }
  }

  & .ace_scroller.ace_scroll-left {
    box-shadow: none;
  }

  & .ace_placeholder {
    font-family: inherit;
    color: ${({ theme }) => theme.colors.dvt.text.placeholder};
    font-weight: 600;
  }
`;

const StyledJsonEditorLabel = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.label};
  font-size: 12px;
  font-weight: 500;
`;

export { StyledJsonEditor, StyledJsonEditorLabel };
