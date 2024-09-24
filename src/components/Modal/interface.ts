import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  variation?: 'default' | 'danger';
  children: React.ReactNode;
}
