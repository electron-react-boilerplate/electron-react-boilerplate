import React from 'react';

export interface InputTextProps {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
