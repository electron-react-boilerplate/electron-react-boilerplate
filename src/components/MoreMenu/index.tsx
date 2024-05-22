import React, { useEffect, useRef, useState } from 'react';

import Icon from 'components/Icon';

import { colors } from 'styles/global.styles';
import { MoreMenuProps } from './interface';

import { Menu, Button, DropDown, SubMenu, SubButton } from './style';

const MoreMenu: React.FC<MoreMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenSubMenuIndex(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Menu
      ref={menuRef as React.RefObject<HTMLButtonElement>}
      onClick={toggleMenu}
    >
      <Icon
        className="icon-more_vert"
        color={colors.greyFont}
        fontSize="28px"
      />
      {isOpen && (
        <DropDown>
          {menuItems.map((item: any, index: number) => (
            <React.Fragment key={index}>
              {item.subItems ? (
                <Button onClick={(e) => toggleSubMenu(e, index)}>
                  {item.name}
                </Button>
              ) : (
                <Button onClick={item.action}>{item.name}</Button>
              )}
              {openSubMenuIndex === index && (
                <SubMenu>
                  {item.subItems.map((subItem: any, subIndex: number) => (
                    <SubButton
                      key={subIndex}
                      onClick={() => {
                        subItem.action();
                        setOpenSubMenuIndex(null);
                      }}
                    >
                      {subItem.name}
                    </SubButton>
                  ))}
                </SubMenu>
              )}
            </React.Fragment>
          ))}
        </DropDown>
      )}
    </Menu>
  );
};

export default MoreMenu;
