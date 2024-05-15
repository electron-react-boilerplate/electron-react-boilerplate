export interface SubMenuItem {
  name: string;
  action: () => void;
}

export interface MoreMenuProps {
  submenuItems: SubMenuItem[];
}
