import React from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  color: string;
  bgColor: string;
  borderColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
