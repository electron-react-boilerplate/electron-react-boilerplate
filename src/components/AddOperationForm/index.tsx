import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';
import Select from 'components/Select';
import { addOperation } from 'state/part/partSlice';

import { grindingWheels } from 'integration/grindingWheels';

import { OptionType } from 'components/Select/interface';
import { FormProps } from './interface';
import { Container, Field, SButton } from './style';

const formattedGrindingWheels: OptionType[] = grindingWheels.map((wheel) => ({
  value: wheel.id,
  label: wheel.name,
}));

const AddOperationForm: React.FC<FormProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    grindingWheelId: 1,
    dAngle: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    let v: string | number = event.target.value;
    if (event.target.name === 'grindingWheelId') {
      v = parseInt(v, 10);
    }
    setFormData({
      ...formData,
      [event.target.name]: v,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Os campos nome e tipo são obrigatórios');
      return;
    }

    dispatch(addOperation({ ...formData }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e);
    onButtonClick();
  };

  return (
    <Container>
      <Field>
        <Input
          name="name"
          label="Nome:"
          value={formData.name}
          onChange={handleChange}
          placeholder="Operação X1..."
        />
      </Field>
      <Field>
        <Select
          label="Rebolo:"
          name="grindingWheelId"
          onChange={handleChange}
          value={formData.grindingWheelId}
          options={formattedGrindingWheels}
        />
      </Field>
      <Field>
        <Input
          type="number"
          name="dAngle"
          label="Ângulo D:"
          value={formData.dAngle.toString()}
          onChange={handleChange}
          placeholder="Valor do ângulo..."
        />
      </Field>
      <SButton onClick={handleClick}>Adicionar</SButton>
    </Container>
  );
};

export default AddOperationForm;
