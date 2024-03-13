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
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import {
  StyledPopper,
  StyledPopperBody,
  StyledPopperGroup,
  StyledPopperAbsolute,
} from './dvt-popper.module';

export interface DvtPopperProps {
  label: string;
  children: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'small' | 'medium';
  nowrap?: boolean;
}

const DvtPopper: React.FC<DvtPopperProps> = ({
  label,
  children,
  direction = 'bottom',
  size = 'medium',
  nowrap = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [childWidth, setChildWidth] = useState<number>(0);

  useEffect(() => {
    if (ref.current) {
      setChildWidth(ref.current.offsetWidth / 2);
    }
  }, [ref]);

  const setMinWidth = (numberic: number) => {
    let fixMinWidth: string | number = 'auto';
    if (numberic > 50 && numberic < 90) {
      fixMinWidth = 150;
    } else if (numberic > 90 && numberic < 150) {
      fixMinWidth = 200;
    } else if (numberic > 150) {
      fixMinWidth = 300;
    } else {
      fixMinWidth = 'auto';
    }
    return fixMinWidth;
  };

  return (
    <StyledPopperGroup
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledPopper ref={ref}>{children} </StyledPopper>
      {isHovered && (
        <StyledPopperAbsolute direction={direction} childWidth={childWidth}>
          <StyledPopperBody
            fontSize={size}
            style={{
              minWidth: setMinWidth(label.length),
              whiteSpace: nowrap ? 'nowrap' : 'inherit',
            }}
          >
            {label}
          </StyledPopperBody>
        </StyledPopperAbsolute>
      )}
    </StyledPopperGroup>
  );
};

export default DvtPopper;
