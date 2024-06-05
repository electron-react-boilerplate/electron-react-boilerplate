import React from 'react';
import { InputProps } from './interface';
import { Container, Label, SInput } from './style';

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <SInput
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Container>
  );
};

export default Input;
