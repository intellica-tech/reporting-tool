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
import AceEditor from 'react-ace';
import {
  StyledJsonEditor,
  StyledJsonEditorLabel,
} from './dvt-json-editor.module';

import 'brace/mode/json';
import 'ace-builds/src-noconflict/theme-xcode';

export interface DvtJsonEditorProps {
  label?: string;
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  height?: string;
  name?: string;
}

const DvtJsonEditor = ({
  label,
  placeholder = '',
  value,
  onChange,
  height = '169px',
  name = '',
}: DvtJsonEditorProps) => (
  <StyledJsonEditor>
    {label && <StyledJsonEditorLabel>{label}</StyledJsonEditorLabel>}
    <AceEditor
      mode="json"
      theme="xcode"
      style={{
        borderRadius: 4,
        fontFamily: `Menlo, Consolas, "Courier New", "Ubuntu Mono", source-code-pro, "Lucida Console", monospace`,
      }}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      fontSize={12}
      tabSize={2}
      showGutter={false}
      width="100%"
      height={height}
      enableLiveAutocompletion
      highlightActiveLine
      showPrintMargin={false}
    />
  </StyledJsonEditor>
);

export default DvtJsonEditor;
