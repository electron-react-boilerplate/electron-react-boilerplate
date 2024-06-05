import React from 'react';
import { InputTextProps } from './interface';
import { Container, Label, Input } from './style';

const InputText: React.FC<InputTextProps> = ({
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
      <Input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </Container>
  );
};

export default InputText;
