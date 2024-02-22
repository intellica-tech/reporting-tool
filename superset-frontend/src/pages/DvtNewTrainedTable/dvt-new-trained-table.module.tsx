import { styled } from '@superset-ui/core';
import Alert from 'src/components/Alert';

const StyledDvtNewTainedTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: -webkit-fill-available;
`;

const StyledNewTainedTableButtons = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding-right: 20px;
  margin-top: auto;
`;

const StyledNewTainedTableIconLabel = styled.div`
  display: flex;
  margin-top: auto;
`;

const StyledAlertInfo = styled(Alert)`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 15px;
  position: relative;
`;

const StyledAlertInfoLink = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export {
  StyledDvtNewTainedTable,
  StyledNewTainedTableButtons,
  StyledNewTainedTableIconLabel,
  StyledAlertInfo,
  StyledAlertInfoLink,
};
