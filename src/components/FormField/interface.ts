import React from 'react';

export type FieldState = {
  value: string | number | undefined;
  error: boolean;
  message: string | undefined;
};

export interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  fieldState: FieldState;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleEdit?: (name: string) => void;
  renderEditIcon?: (name: string) => React.ReactNode;
}
