import { styled } from '@superset-ui/core';
import { Link } from 'react-router-dom';

interface StyledDvtCardDetailChartProps {
  added: boolean;
}

const StyledDvtCardDetailChart = styled.div<StyledDvtCardDetailChartProps>`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 19px;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.dvt.grayscale.light2};
  cursor: ${({ added }) => (added ? 'no-drop' : 'move')};
  opacity: ${({ added }) => (added ? 0.7 : 1)};
`;

const StyledDvtCardDetailChartTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  line-height: 100%;
  justify-content: space-between;
  height: 22px;
`;

const StyledDvtCardDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledDvtCardLink = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
  color: ${({ theme }) => theme.colors.dvt.primary.base};
`;

const StyledDvtCardP = styled.p`
  font-size: 15px;
  font-weight: 500;
  line-height: 100%;
  color: ${({ theme }) => theme.colors.dvt.text.label};
  margin: 0;
`;

const StyledDvtCardDetailAdded = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.dvt.primary.light1};
  border-radius: 4px;
  padding: 0 5px;
  font-size: 10px;
  display: flex;
  align-items: center;
`;

export {
  StyledDvtCardDetailChart,
  StyledDvtCardDetailChartTitle,
  StyledDvtCardDetails,
  StyledDvtCardLink,
  StyledDvtCardP,
  StyledDvtCardDetailAdded,
};
