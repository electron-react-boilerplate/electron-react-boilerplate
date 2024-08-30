import React from 'react';

export interface OptionType {
  value: string | number;
  label: string;
}

export interface SelectComponentProps {
  label: string;
  name: string;
  options: OptionType[];
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
}
