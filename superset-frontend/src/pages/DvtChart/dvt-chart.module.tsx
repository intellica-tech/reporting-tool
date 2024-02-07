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
`;

const CreateChartBottom = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RightPreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: -webkit-fill-available;
`;

const RightPreviewTop = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

export {
  StyledChart,
  CreateChart,
  CreateChartTop,
  CreateChartBottom,
  RightPreview,
  RightPreviewTop,
  RightPreviewBottom,
  RightPreviewBottomTabItem,
};
