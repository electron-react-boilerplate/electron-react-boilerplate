import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'components/Select';
import FormField from 'components/FormField';

import { addOperation, editOperation } from 'state/part/partSlice';

import useFormattedTools from 'hooks/useFormattedTools';

// Types
import { Operations } from 'types/part';
import { FormProps, IFormData } from './interface';
import { Container, Field, HorizontalField, SButton } from './style';

const initialFormData: IFormData = {
  name: { value: '', error: false, message: undefined },
  // toolId value 1 represents first tool fetched from API, wich has id 1
  toolId: { value: 1, error: false, message: undefined },
  bAxisAngle: { value: 0, error: false, message: undefined },
  xSafetyDistance: { value: 0, error: false, message: undefined },
  zSafetyDistance: { value: 0, error: false, message: undefined },
};

const OperationForm: React.FC<FormProps> = ({
  onButtonClick,
  variation = 'add',
  operationId,
}) => {
  const dispatch = useDispatch();
  const formattedTools = useFormattedTools();
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
  let formValues: IFormData = initialFormData;

  if (variation === 'edit') {
    const operation = operations.find((op) => op.id === operationId);
    if (operation) {
      formValues = {
        name: { value: operation.name, error: false, message: undefined },
        toolId: {
          value: operation.toolId,
          error: false,
          message: undefined,
        },
        bAxisAngle: {
          value: operation.bAxisAngle,
          error: false,
          message: undefined,
        },
        xSafetyDistance: {
          value: operation.xSafetyDistance,
          error: false,
          message: undefined,
        },
        zSafetyDistance: {
          value: operation.zSafetyDistance,
          error: false,
          message: undefined,
        },
      };
    }
  }

  const [formData, setFormData] = useState(formValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
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
        if (
          field.value === '' ||
          field.value === null ||
          field.value === undefined ||
          field.value < 0
        ) {
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

    const operation = {
      name: String(formData.name.value),
      toolId: Number(formData.toolId.value),
      bAxisAngle: Number(formData.bAxisAngle.value),
      xSafetyDistance: Number(formData.xSafetyDistance.value),
      zSafetyDistance: Number(formData.zSafetyDistance.value),
    };

    if (variation === 'add') dispatch(addOperation(operation));
    else if (operationId !== undefined)
      dispatch(editOperation({ id: operationId, operation }));

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
          placeholder="Operação X1..."
          fieldState={formData.name}
          handleInputChange={handleChange}
        />
      </Field>
      <Field>
        <Select
          label="Rebolo"
          name="toolId"
          onChange={handleChange}
          value={formData.toolId.value}
          options={formattedTools}
        />
      </Field>
      <Field>
        <FormField
          name="bAxisAngle"
          label="Ângulo Eixo B"
          type="number"
          placeholder="Valor do ângulo..."
          fieldState={formData.bAxisAngle}
          handleInputChange={handleChange}
        />
      </Field>
      <HorizontalField>
        <Field>
          <FormField
            name="xSafetyDistance"
            label="Distância de Segurança X"
            type="number"
            placeholder="Valor da distância..."
            fieldState={formData.xSafetyDistance}
            handleInputChange={handleChange}
          />
        </Field>
        <Field>
          <FormField
            name="zSafetyDistance"
            label="Distância de Segurança Z"
            type="number"
            placeholder="Valor da distância..."
            fieldState={formData.zSafetyDistance}
            handleInputChange={handleChange}
          />
        </Field>
      </HorizontalField>
      <SButton onClick={handleClick}>
        {variation === 'add' ? 'Adicionar' : 'Editar'}
      </SButton>
    </Container>
  );
};

export default OperationForm;
