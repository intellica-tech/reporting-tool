import { styled } from '@superset-ui/core';
const StyledDvtCardDetailChartList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 600px;
`;

const StyledDvtCardDetailChartListScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-y: auto;
  flex-direction: column;

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

export { StyledDvtCardDetailChartList, StyledDvtCardDetailChartListScroll };
