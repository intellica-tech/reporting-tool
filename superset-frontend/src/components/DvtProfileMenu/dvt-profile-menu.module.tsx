import { keyframes, styled } from '@superset-ui/core';

interface DropdownOptionProps {
  withoutLink: boolean;
}

interface StyledIconCaretRotateProps {
  open: boolean;
}

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
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px ${({ theme }) => theme.colors.dvt.boxShadow.base};
  transform-origin: top;
  animation: ${optionsKeyframes} 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.grayscale.light5};
  border-radius: 16px;
  padding: 20px 10px;
`;

const StyledProfileDropdownMenu = styled.div`
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.dvt.border.base};
    margin-bottom: 12px;
    padding-bottom: 12px;
  }
`;

const StyledProfileDropdownMenuLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dvt.text.label};
  margin-bottom: 4px;
`;

const DropdownOption = styled.div<DropdownOptionProps>`
  display: flex;
  padding-left: 10px;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.grayscale.dark2};

  ${({ withoutLink, theme }) =>
    withoutLink &&
    `
      cursor: pointer;

      &:hover {
        color: ${theme.colors.dvt.primary.base};
      }
  `};
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  z-index: 100;
  min-width: 249px;
`;

const StyledIconCaretRotate = styled.div<StyledIconCaretRotateProps>`
  transition: all 300ms;
  ${({ open }) => open && `transform: rotate(-90deg);`}
`;

export {
  StyledProfile,
  StyledProfileButton,
  StyledProfileMenu,
  DropdownMenu,
  StyledProfileDropdownMenu,
  StyledProfileDropdownMenuLabel,
  DropdownOption,
  StyledDropdown,
  StyledIconCaretRotate,
};
