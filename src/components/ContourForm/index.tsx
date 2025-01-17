import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContourType, Machining } from 'types/part';

import FormField from 'components/FormField';
import { Message } from 'components/FormField/style';

import useFormattedTools from 'hooks/useFormattedTools';
import { addContour } from 'state/part/partSlice';

import { ToolOptionItem } from 'components/Select/interface';
import { addContourPayload, FormProps, IFormData } from './interface';

import { Container, Field, Label, RadioButton, Button } from './style';

const initialFormData: IFormData = {
  name: { value: '', error: false, message: undefined },
  machining: { value: undefined, error: false, message: undefined },
  type: { value: undefined, error: false, message: undefined },
};

const ContourForm: React.FC<FormProps> = ({ onButtonClick }) => {
  const dispatch = useDispatch();
  const formattedTools = useFormattedTools();
  const availableTypes = Array.from(
    new Set(formattedTools.map((tool: ToolOptionItem) => tool.type)),
  );

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
      machining: Number(formData.machining.value) as Machining,
      type: Number(formData.type.value) as ContourType,
    };
    dispatch(
      addContour({
        ...contour,
        machining: Number(formData.machining.value) as Machining,
        type: Number(formData.type.value) as ContourType,
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
        <Label>Usinagem:</Label>
        {formData.machining.error && (
          <Message>{formData.machining.message}</Message>
        )}
        <RadioButton>
          <input
            type="radio"
            value={1}
            name="machining"
            onChange={(e) => handleChange(e)}
            required
          />
          <span />
          Retificação
        </RadioButton>
        <RadioButton>
          <input
            type="radio"
            value={2}
            name="machining"
            onChange={(e) => handleChange(e)}
            required
          />
          <span />
          Dressagem
        </RadioButton>
      </Field>
      <Field>
        <Label>Tipo:</Label>
        {formData.type.error && <Message>{formData.type.message}</Message>}
        {availableTypes.includes(1) && (
          <RadioButton>
            <input
              type="radio"
              value={1}
              name="type"
              onChange={(e) => handleChange(e)}
              required
            />
            <span />
            Externo
          </RadioButton>
        )}
        {availableTypes.includes(2) && (
          <RadioButton>
            <input
              type="radio"
              value={2}
              name="type"
              onChange={(e) => handleChange(e)}
              required
            />
            <span />
            Interno
          </RadioButton>
        )}
      </Field>
      <Button onClick={handleClick}>Cadastrar</Button>
    </Container>
  );
};

export default ContourForm;
