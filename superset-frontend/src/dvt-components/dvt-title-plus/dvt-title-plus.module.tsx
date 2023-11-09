import { styled } from '@superset-ui/core';

const StyledDvtTitlePlus = styled.div`
  width: 186px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px;
  background-color: transparent;
  color: #94a3b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;

const DvtTitlePlusTitle = styled.div`
  display: flex;
  gap: 25px;
  color: #94a3b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
`;

export { StyledDvtTitlePlus, DvtTitlePlusTitle };
