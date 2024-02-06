import { keyframes, styled } from '@superset-ui/core';

const optionsKeyframes = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const StyledProfileMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11px;
`;

const StyledProfile = styled.img`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  width: 48px;
  height: 48px;
`;

const StyledProfileButton = styled.div`
  display: flex;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.dvt.boxShadow.base};
  transform-origin: top;
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  padding: 4px 0;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  border-radius: 16px;
`;

const StyledProfileDropdownMenu = styled.div`
  margin: 20px 22px 0px 22px;
`;

const StyledProfileDropdownMenuLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dvt.text.help};
`;

const DropdownOption = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  padding: 5px 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.dvt.grayscale.light1};
  }
`;

const StyledDropdownMenuLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.dvt.grayscale.light1};
  margin: 10px -20px 0 -20px;
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  z-index: 100;
  min-width: 249px;
`;

export {
  StyledProfile,
  StyledProfileButton,
  StyledProfileMenu,
  DropdownMenu,
  StyledProfileDropdownMenu,
  StyledProfileDropdownMenuLabel,
  DropdownOption,
  StyledDropdownMenuLine,
  StyledDropdown,
};
