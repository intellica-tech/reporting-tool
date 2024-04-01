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
}

const DvtPopper: React.FC<DvtPopperProps> = ({
  label,
  children,
  direction = 'bottom',
  size = 'medium',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const absoluteRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [popperTop, setPopperTop] = useState<number>(0);
  const [popperLeft, setPopperLeft] = useState<number>(0);
  const [popperChildrenScreen, setPopperChildrenScreen] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });
  const [hoveredScreen, setHoveredScreen] = useState<{
    height: number;
    width: number;
  }>({
    height: 0,
    width: 0,
  });

  const handleMouseEnter = () => {
    const divRect = ref.current?.getBoundingClientRect();
    if (!divRect) return;

    const windowScreenX = window.innerWidth;
    const windowScreenY = window.innerHeight;

    const divCenterX = windowScreenX - divRect?.right;
    const divCenterY = windowScreenY - divRect?.bottom;

    setPopperLeft(divCenterX);
    setPopperTop(divCenterY);
    setPopperChildrenScreen({
      height: divRect?.height,
      width: divRect?.width,
    });
    setIsHovered(true);
  };

  useEffect(() => {
    const wheelHandler = () => {
      setIsHovered(false);
    };

    if (isHovered) {
      window.addEventListener('wheel', wheelHandler);
    }

    return () => {
      if (isHovered) {
        window.removeEventListener('wheel', wheelHandler);
      }
    };
  }, [isHovered]);

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

  useEffect(() => {
    if (absoluteRef.current) {
      const refHoveredScreen = absoluteRef.current.getBoundingClientRect();
      setHoveredScreen({
        height: refHoveredScreen.height,
        width: refHoveredScreen.width,
      });
    }
  }, [isHovered]);

  return (
    <StyledPopperGroup
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledPopper ref={ref}>{children}</StyledPopper>
      {isHovered && (
        <StyledPopperAbsolute
          ref={absoluteRef}
          direction={direction}
          popperChildrenScreen={popperChildrenScreen}
          top={popperTop}
          left={popperLeft}
          childWidth={hoveredScreen.width || 0}
          childHeight={hoveredScreen.height || 0}
        >
          <StyledPopperBody
            fontSize={size}
            style={{
              minWidth: setMinWidth(label.length),
              maxWidth: '300px',
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
