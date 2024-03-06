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
import { supersetTheme } from '@superset-ui/core';
import { StyledDvtAceEditor } from './dvt-ace-editor.module';

import 'brace/mode/json';
import 'brace/mode/sql';
import 'brace/ext/language_tools';
import 'ace-builds/src-noconflict/theme-xcode';

export interface DvtAceEditorProps {
  mode?: 'json' | 'sql';
  placeholder?: string;
  value: any;
  onChange: (value: any) => void;
  height?: string;
  name?: string;
  fontSize?: number;
  borderRadius?: number;
  border?: boolean;
}

const DvtAceEditor: React.FC<DvtAceEditorProps> = ({
  mode = 'json',
  placeholder = '',
  value,
  onChange,
  height = '169px',
  name = '',
  fontSize = 12,
  borderRadius = 4,
  border = false,
}) => {
  const onBorder = border
    ? {
        boxShadow: `0 0 1px ${supersetTheme.colors.dvt.backgroundColor.opacity}`,
      }
    : {};

  return (
    <StyledDvtAceEditor
      style={{
        height,
        flex: 'auto',
      }}
    >
      <AceEditor
        mode={mode}
        theme="xcode"
        style={{
          borderRadius,
          fontFamily: `Menlo, Consolas, "Courier New", "Ubuntu Mono", source-code-pro, "Lucida Console", monospace`,
          ...onBorder,
        }}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        fontSize={fontSize}
        tabSize={2}
        showGutter={false}
        width="100%"
        height="100%"
        enableLiveAutocompletion
        highlightActiveLine
        showPrintMargin={false}
      />
    </StyledDvtAceEditor>
  );
};

export default DvtAceEditor;
