import React from 'react';

export interface ButtonProps {
  color: string;
  bgColor: string;
  borderColor?: string;
  onClick: () => void;
  children: React.ReactNode;
}
