import React, { useRef, useState } from 'react';
import { supersetTheme } from '@superset-ui/core';
import { useHistory } from 'react-router-dom';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import Icon from '../Icons/Icon';
import {
  DropdownMenu,
  DropdownOption,
  StyledDropdown,
  StyledProfile,
  StyledProfileButton,
  StyledProfileDropdownMenu,
  StyledProfileDropdownMenuLabel,
  StyledProfileMenu,
  StyledIconCaretRotate,
} from './dvt-profile-menu.module';
import DvtProfileMenuData from './dvtProfileMenuData';

export interface DvtProfileMenuProps {
  img: string;
  version: string;
}

const DvtProfileMenu: React.FC<DvtProfileMenuProps> = ({
  img,
  version = '0.0.0',
}) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <StyledProfileMenu>
      <StyledProfileButton onClick={() => setIsOpen(!isOpen)}>
        <StyledProfile src={img} width={48} height={48} alt="Profile" />
        <StyledIconCaretRotate open={isOpen}>
          <Icon
            fileName="caret_down"
            iconSize="xl"
            iconColor={supersetTheme.colors.dvt.text.help}
          />
        </StyledIconCaretRotate>
      </StyledProfileButton>
      {isOpen && (
        <StyledDropdown ref={ref}>
          <DropdownMenu>
            {DvtProfileMenuData.map((m, mIndex) => (
              <StyledProfileDropdownMenu key={mIndex}>
                <StyledProfileDropdownMenuLabel>
                  {m.title}
                </StyledProfileDropdownMenuLabel>
                {m.menu.map((item, index) => (
                  <DropdownOption
                    key={index}
                    onClick={() => {
                      if (item.link) {
                        if (item.link === '/logout/') {
                          window.location.href = item.link;
                        } else {
                          history.push(item.link);
                        }
                        setIsOpen(false);
                      }
                    }}
                    withoutLink={!!item.link}
                  >
                    {item.link ? item.label : `${item.label}${version}`}
                  </DropdownOption>
                ))}
              </StyledProfileDropdownMenu>
            ))}
          </DropdownMenu>
        </StyledDropdown>
      )}
    </StyledProfileMenu>
  );
};

export default DvtProfileMenu;
