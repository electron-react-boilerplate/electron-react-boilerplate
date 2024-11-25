import React, { ChangeEvent } from 'react';

import { SelectComponentProps } from './interface';
import { Label, Container, SSelect } from './style';

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
      {label && <Label>{label}:</Label>}
      <SSelect name={name} value={value} onChange={handleChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </SSelect>
    </Container>
  );
};

export default SelectComponent;
