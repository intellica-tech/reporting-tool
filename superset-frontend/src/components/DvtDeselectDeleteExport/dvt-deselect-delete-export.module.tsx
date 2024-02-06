import { styled } from '@superset-ui/core';

const StyledDvtDeselectDeleteExport = styled.div`
  display: flex;
  border-radius: 12px;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  padding: 0 20px;
  margin-bottom: 30px;
`;

const StyledDvtDeselectDeleteExportSelects = styled.div`
  display: flex;
  gap: 45px;
`;

const SelectedItemCount = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary.dark3};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export {
  StyledDvtDeselectDeleteExport,
  StyledDvtDeselectDeleteExportSelects,
  SelectedItemCount,
  ButtonContainer,
};
