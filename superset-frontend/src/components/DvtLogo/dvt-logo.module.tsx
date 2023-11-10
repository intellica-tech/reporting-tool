import { styled } from '@superset-ui/core';

const StyledDvtLogo = styled.div`
  display: flex;
  width: 140px;
  height: 29px;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 9px;
  flex-shrink: 0;
`;

const DvtTitle = styled.div`
  color: ${({ theme }) => theme.colors.dvt.text.bold};
  font-family: Inter;
  font-size: 23.2px;
  font-style: normal;
  font-weight: 700;
  line-height: 125%; /* 29px */
  letter-spacing: -0.29px;
`;

const DvtLogoImg = styled.a`
  width: 27.84px;
  height: 27.84px;
  flex-shrink: 0;
`;

export { StyledDvtLogo, DvtTitle, DvtLogoImg };
