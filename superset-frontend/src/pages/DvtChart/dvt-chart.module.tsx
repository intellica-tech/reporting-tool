import { styled } from '@superset-ui/core';

const StyledChart = styled.div`
  display: flex;
  height: -webkit-fill-available;
`;

const CreateChart = styled.div`
  min-width: 570px;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  padding: 16px;
  box-shadow: 0 0 3px ${({ theme }) => theme.colors.dvt.boxShadow.base};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CreateChartTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 10px;
`;

const CreateChartCenter = styled.div`
  flex: 1;
  margin-bottom: 15px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-right: 10px;
  max-height: calc(100vh - 365px);

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
`;

const CreateChartCenterCollapseInGap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CreateChartCenterCollapseInGapFlexRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-end;
  gap: 10px;
`;

const CreateChartBottom = styled.div`
  display: flex;
  justify-content: center;
`;

const RightPreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: -webkit-fill-available;
  width: -moz-available;
`;

const RightPreviewTop = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 400px;
`;

const RightPreviewTopChartScreen = styled.div`
  height: 100%;
  width: 100%;
`;

const RightPreviewBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const RightPreviewBottomTabItem = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.dvt.border.base};
  flex: 1;
  margin-top: 6px;
`;

const RightPreviewBottomTableScroll = styled.div`
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  max-height: calc(100vh - 670px);
  max-width: calc(100vw - 940px);

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
  height: 32vh;
  justify-content: center;
`;

export {
  StyledChart,
  CreateChart,
  CreateChartTop,
  CreateChartCenter,
  CreateChartCenterCollapseInGap,
  CreateChartCenterCollapseInGapFlexRow,
  CreateChartBottom,
  RightPreview,
  RightPreviewTop,
  RightPreviewTopChartScreen,
  RightPreviewBottom,
  RightPreviewBottomTabItem,
  RightPreviewBottomTableScroll,
  SpinnerContainer,
};
