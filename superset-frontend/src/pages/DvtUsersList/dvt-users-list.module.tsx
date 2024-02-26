import { styled } from '@superset-ui/core';

const StyledUsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledAddButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledRefreshButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export { StyledUsersList, StyledAddButton, StyledRefreshButton };
