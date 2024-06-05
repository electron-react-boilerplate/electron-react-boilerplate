import React from 'react';

export interface InputTextProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
