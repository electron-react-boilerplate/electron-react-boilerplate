import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ContourType, Machining } from 'types/part';

import FormField from 'components/FormField';
import { Message } from 'components/FormField/style';

import {
  MACHINING_DRESSING,
  TYPE_EXTERNAL,
  TYPE_INTERNAL,
} from 'utils/constants';

import useFormattedTools from 'hooks/useFormattedTools';
import { addContour } from 'state/part/partSlice';

import { ToolOptionItem } from 'components/Select/interface';
import { addContourPayload, FormProps, IFormData } from './interface';

import { Container, Field, Label, RadioButton, Button } from './style';

const initialFormData: IFormData = {
  name: { value: '', error: false, message: undefined },
  type: { value: undefined, error: false, message: undefined },
};

const ContourForm: React.FC<FormProps> = ({ onButtonClick, machining }) => {
  const dispatch = useDispatch();
  const formattedTools = useFormattedTools();
  const availableTypes = Array.from(
    new Set(formattedTools.map((tool: ToolOptionItem) => tool.type)),
  );

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log('formattedTools', formattedTools);
  }, [formattedTools]);

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
      machining: machining as Machining,
      type: Number(formData.type.value) as ContourType,
    };
    dispatch(
      addContour({
        ...contour,
        machining: machining as Machining,
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
        <Label>Tipo:</Label>
        {formData.type.error && <Message>{formData.type.message}</Message>}
        {availableTypes.includes(TYPE_EXTERNAL) && (
          <RadioButton>
            <input
              type="radio"
              value={TYPE_EXTERNAL}
              name="type"
              onChange={(e) => handleChange(e)}
            />
            <span />
            Externo
          </RadioButton>
        )}
        {availableTypes.includes(TYPE_INTERNAL) && (
          <RadioButton>
            <input
              type="radio"
              value={TYPE_INTERNAL}
              name="type"
              onChange={(e) => handleChange(e)}
            />
            <span />
            Interno
          </RadioButton>
        )}
      </Field>
      {machining === MACHINING_DRESSING && (
        <Field>
          <Label>Tipo:</Label>
          {/* {loadedTools.map((tool) => (
            <RadioButton>
              <input
                type="radio"
                value={tool.}
                name="type"
                onChange={(e) => handleChange(e)}
              />
              <span />
              {tool.name}
            </RadioButton>
          ))} */}
        </Field>
      )}
      <Button onClick={handleClick}>Cadastrar</Button>
    </Container>
  );
};

export default ContourForm;
