import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContourType } from 'types/part';

import FormField from 'components/FormField';
import { FieldState } from 'components/FormField/interface';
import { Message } from 'components/FormField/style';

import { addContour } from 'state/part/partSlice';
import { addContourPayload, FormProps, CustomFieldState } from './interface';
import { Container, Field, Label, RadioButton, Button } from './style';

const initialFormData: { name: FieldState; type: CustomFieldState } = {
  name: { value: '', error: false, message: undefined },
  type: { value: '', error: false, message: undefined },
};

const ContourForm: React.FC<FormProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name as keyof typeof initialFormData],
        value,
      },
    }));
  };

  const validateFormData = () => {
    let isValid = true;

    const updatedFormData = Object.entries(formData).reduce(
      (acc, [key, field]) => {
        if (!field.value) {
          (acc as any)[key] = {
            ...field,
            error: true,
            message: 'Campo obrigatório',
          };
          isValid = false;
        } else {
          (acc as any)[key] = {
            ...field,
            error: false,
            message: undefined,
          };
        }
        return acc;
      },
      {} as typeof formData,
    );

    setFormData(updatedFormData);
    return isValid;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    const contour: addContourPayload = {
      name: formData.name.value as string,
      type: formData.type.value as ContourType,
    };
    dispatch(
      addContour({
        ...contour,
        type: formData.type.value as ContourType,
      }),
    );

    onButtonClick();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <Container>
      <Field>
        <FormField
          name="name"
          label="Nome"
          type="text"
          placeholder="Peça PC01..."
          fieldState={formData.name}
          handleInputChange={handleChange}
        />
      </Field>
      <Field>
        <Label>Tipo:</Label>
        {formData.type.error && <Message>{formData.type.message}</Message>}
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
