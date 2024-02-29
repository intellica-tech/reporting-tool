import { styled } from '@superset-ui/core';

const StyledSqlhub = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSqlhubBottom = styled.div`
  margin-top: 15px;
`;

const SqlhubTableScroll = styled.div`
  margin-top: 15px;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  max-height: 38vh;

  &::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
    width: 8px;
    height: 8px;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.base};
    width: 8px;
    height: 8px;
    border-radius: 12px;
  }

  & table {
    thead th {
      padding-bottom: 10px;

      &:not(:last-of-type) {
        padding-right: 20px;
      }
      &:first-of-type {
        padding-left: 20px;
      }
    }
    tbody {
      & tr {
        height: 32px;
        margin-bottom: 0px;
      }

      & td {
        &:not(:last-of-type) {
          padding-right: 20px;
        }
        &:first-of-type {
          padding-left: 20px;
        }
      }
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 38vh;
  justify-content: center;
`;

export {
  StyledSqlhub,
  StyledSqlhubBottom,
  SqlhubTableScroll,
  SpinnerContainer,
};
