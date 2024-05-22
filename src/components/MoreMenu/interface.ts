// mais preciso?
export interface MenuItem {
  name: string;
  action?: () => void;
  subItems?: Array<{
    name: string;
    action: () => void;
  }>;
}

export interface MoreMenuProps {
  menuItems: MenuItem[];
}
