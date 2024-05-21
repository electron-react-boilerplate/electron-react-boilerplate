import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import InputText from 'components/InputText';
import { addOperation } from 'state/part/partSlice';

import { FormProps } from './interface';
import { Container, Field, SButton } from './style';

const AddOperationForm: React.FC<FormProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('formData', formData);

    if (!formData.name) {
      alert('Os campos nome e tipo são obrigatórios');
      return;
    }

    dispatch(
      addOperation({ ...formData }), // Pass the updated operationData to addOperation
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e);
    onButtonClick();
  };

  return (
    <Container>
      <Field>
        <InputText
          name="name"
          label="Nome:"
          value={formData.name}
          onChange={handleChange}
          placeholder="Operação X1..."
        />
      </Field>
      {/* <InputText
          name="wheel"
          label="Rebolo:"
          value={formData.grindingWheel}
          onChange={handleChange}
        /> */}
      {/* <InputText
        name="angleD"
        value={formData.dAngle}
        onChange={handleChange}
        placeholder="Ângulo D"
      /> */}
      <SButton onClick={handleClick}>Adicionar</SButton>
    </Container>
  );
};

export default AddOperationForm;
