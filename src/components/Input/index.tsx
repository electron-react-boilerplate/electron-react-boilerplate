/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { InputProps } from './interface';
import { Container, Label, SInput } from './style';

const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
  error = false,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <SInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        error={error}
        {...rest}
      />
    </Container>
  );
};

export default Input;
