interface BreadcrumbItem {
  label: string;
  url: string;
  isActive: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export type { BreadcrumbItem, BreadcrumbsProps };
