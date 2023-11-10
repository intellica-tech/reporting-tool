import { styled } from '@superset-ui/core';

const StyledDvtTitleTotal = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  background-color: transparent;
`;

const DvtTitle = styled.h6`
  color: ${({theme}) => theme.colors.dvt.text.bold};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.2px;
`;
const DvtTotal = styled.div`
  color:${({theme}) => theme.colors.dvt.text.label};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  padding-top: 1px;
`;

export { StyledDvtTitleTotal, DvtTotal, DvtTitle };
