import React, { useRef, useState } from 'react';
import { supersetTheme } from '@superset-ui/core';
import useOnClickOutside from 'src/hooks/useOnClickOutsite';
import Icon from '../Icons/Icon';
import {
  DropdownMenu,
  DropdownOption,
  StyledDropdown,
  StyledDropdownMenuLine,
  StyledProfile,
  StyledProfileButton,
  StyledProfileDropdownMenu,
  StyledProfileDropdownMenuLabel,
  StyledProfileMenu,
} from './dvt-profile-menu.module';

export interface OptionProps {
  label: string;
  onClick: (item: any) => void;
  menu?: string;
}

export interface DvtProfileMenuProps {
  img: string;
  data: OptionProps[];
  item?: any;
  menu: string[];
}

const DvtProfileMenu: React.FC<DvtProfileMenuProps> = ({
  img,
  data,
  item = {},
  menu,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setIsOpen(false));
  const dataLength = menu?.length;
  
  return (
    <StyledProfileMenu>
      <StyledProfile src={img} width={48} height={48} alt="Profile" />
      <StyledProfileButton>
        <Icon
          fileName="caret_down"
          iconSize="xl"
          iconColor={supersetTheme.colors.dvt.text.help}
          onClick={() => setIsOpen(!isOpen)}
        />
      </StyledProfileButton>
      <StyledDropdown ref={ref}>
        {isOpen && (
          <DropdownMenu>
            {menu.map((menu, menuIndex) => (
              <StyledProfileDropdownMenu key={menuIndex}>
                <StyledProfileDropdownMenuLabel>
                  {menu}
                </StyledProfileDropdownMenuLabel>
                {data
                  .filter(item => item.menu === menu)
                  .map((data, index) => (
                    <DropdownOption
                      key={index}
                      onClick={() => {
                        data.onClick(item);
                        setIsOpen(false);
                      }}
                    >
                      {data.label}
                    </DropdownOption>
                  ))}
                {dataLength !== undefined && menuIndex !== dataLength - 1 && (
                  <StyledDropdownMenuLine />
                )}
              </StyledProfileDropdownMenu>
            ))}
          </DropdownMenu>
        )}
      </StyledDropdown>
    </StyledProfileMenu>
  );
};

export default DvtProfileMenu;
