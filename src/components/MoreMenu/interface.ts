export interface MenuItem {
  name: string;
  action: () => void;
}

export interface MoreMenuProps {
  menuItems: MenuItem[];
}
