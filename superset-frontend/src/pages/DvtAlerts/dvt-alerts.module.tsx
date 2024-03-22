import { styled } from '@superset-ui/core';

const StyledAlerts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const StyledAlertsButton = styled.div`
  display: flex;
  justify-content: space-between;
  flex: end;
  margin-top: 36px;
`;

export { StyledAlerts, StyledAlertsButton };
