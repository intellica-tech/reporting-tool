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
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';

const StyledQueryPreview = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  padding-top: 50px;
  gap: 15px;
`;

const StyledQueryPreviewButtonContainer = styled.div`
  margin-top: auto;
  margin-left: auto;
`;

const SqlContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  flex: 1;
  border-radius: 8px;
`;

const SqlCopyButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export {
  StyledQueryPreview,
  StyledQueryPreviewButtonContainer,
  SqlContainer,
  StyledSyntaxHighlighter,
  SqlCopyButton,
};