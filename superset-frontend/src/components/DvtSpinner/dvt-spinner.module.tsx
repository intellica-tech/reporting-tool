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
  small: 1,
  medium: 1.5,
  large: 2.5,
  xlarge: 4,
};

const sizesBorder = {
  small: 0.15,
  medium: 0.25,
  large: 0.3,
  xlarge: 0.4,
};

const colourFinder = {
  primary: {
    basic: 'base',
  },
  success: {
    basic: 'dark1',
  },
  grayscale: {
    basic: 'base',
  },
  error: {
    basic: 'base',
  },
};

interface StyledDvtSpinnerProps {
  $size: 'small' | 'medium' | 'large' | 'xlarge';
  $colour: 'primary' | 'success' | 'grayscale' | 'error' | 'white';
  $type: 'border' | 'grow';
}

const StyledDvtSpinner = styled.div<StyledDvtSpinnerProps>`
  display: inline-flex;
  min-width: ${({ $size }) => sizes[$size]}rem;
  min-height: ${({ $size }) => sizes[$size]}rem;
  border-radius: 50%;

  ${({ $size, $type, $colour, theme }) =>
    ($type === 'border' &&
      `
    border: ${sizesBorder[$size]}rem solid ${
        $colour === 'white'
          ? theme.colors.grayscale.light5
          : theme.colors.dvt[$colour][colourFinder[$colour].basic]
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
      $colour === 'white'
        ? theme.colors.grayscale.light5
        : theme.colors.dvt[$colour][colourFinder[$colour].basic]
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
