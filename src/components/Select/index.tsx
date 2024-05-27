import React, { ChangeEvent } from 'react';
import { Label, Container, SSelect } from './style';

interface OptionType {
  value: string;
  label: string;
}

interface SelectComponentProps {
  label: string;
  name: string;
  options: OptionType[];
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  name,
  options,
  onChange,
  value,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  };

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <SSelect name={name} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SSelect>
    </Container>
  );
};

export default SelectComponent;
