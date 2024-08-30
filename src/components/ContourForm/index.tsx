import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/Input';
import { addContour } from 'state/part/partSlice';
import { ContourType } from 'types/part';

import { addContourPayload, FormProps } from './interface';
import { Container, Field, Label, RadioButton, Button } from './style';

const initialFormData: addContourPayload = { name: '', type: '' };

const ContourForm: React.FC<FormProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<addContourPayload>({
    ...initialFormData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.type) {
      alert('Os campos nome e tipo são obrigatórios');
      return;
    }

    dispatch(
      addContour({
        ...formData,
        type: formData.type as ContourType,
      }),
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
        <Input
          name="name"
          label="Nome:"
          placeholder="Peça PC01..."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Field>
      <Field>
        <Label>Tipo:</Label>
        <RadioButton>
          <input
            type="radio"
            value="Internal"
            name="type"
            onChange={(e) => handleChange(e)}
            required
          />
          <span />
          Interno
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            value="External"
            name="type"
            onChange={(e) => handleChange(e)}
            required
          />
          <span />
          Externo
        </RadioButton>
      </Field>
      <Button onClick={handleClick}>Cadastrar</Button>
    </Container>
  );
};

export default ContourForm;
