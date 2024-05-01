import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import InputText from 'components/InputText';
import { addContour } from 'state/part/partSlice';
import { ContourType } from 'types/part';

import { FormProps } from './interface';
import { Container, Field, Label, Select, Button } from './style';

interface addContourPayload {
  name: string;
  type: ContourType | string;
}

const initialFormData: addContourPayload = { name: '', type: '' };

/* Por questões de prazo para a Demo da feira, estou deixando a lógica de adicionar Contorno dentro do
componente ContourForm. O ideal seria que essa lógica fosse movida para o componente pai, WorkGroup. */
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
        <InputText
          name="name"
          label="Nome:"
          placeholder="Peça PC01..."
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Field>
      <Field>
        <Label>Tipo</Label>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          <option value="Internal">Interno</option>
          <option value="External">Externo</option>
        </Select>
      </Field>
      <Button onClick={handleClick}>Cadastrar</Button>
    </Container>
  );
};

export default ContourForm;
