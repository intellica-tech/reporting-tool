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

const sizes = {
  small: 1.5,
  medium: 2,
  large: 3,
};

const colourFinder = {
  primary: {
    basic: 'base',
    powder: 'light3',
  },
  success: {
    basic: 'dark1',
    powder: 'light3',
  },
  grayscale: {
    basic: 'base',
    powder: 'light2',
  },
  error: {
    basic: 'base',
    powder: 'light1',
  },
};

interface StyledDvtSpinnerProps {
  $size: 'small' | 'medium' | 'large';
  $colour: 'primary' | 'success' | 'grayscale' | 'error';
  $typeColour: 'basic' | 'powder';
  $type: 'border' | 'grow';
}

const StyledDvtSpinner = styled.div<StyledDvtSpinnerProps>`
  display: inline-flex;
  min-width: ${({ $size }) => sizes[$size]}rem;
  min-height: ${({ $size }) => sizes[$size]}rem;
  border-radius: 50%;

  ${({ $type, $colour, $typeColour, theme }) =>
    ($type === 'border' &&
      `
    border: 0.25rem solid ${
      theme.colors.dvt[$colour][colourFinder[$colour][$typeColour]]
    };
    border-right-color: transparent;
    animation: spinnerBorder .75s infinite;

    @keyframes spinnerBorder {
        100% {
            transform: rotate(360deg);
        }
    }
`) ||
    ($type === 'grow' &&
      `
    vertical-align: text-bottom;
    background-color: ${
      theme.colors.dvt[$colour][colourFinder[$colour][$typeColour]]
    };
    animation: spinnerGrow .75s infinite;

    @keyframes spinnerGrow {
        0%{
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: scale(0);
        }
    }
`)}
`;

export { StyledDvtSpinner };
