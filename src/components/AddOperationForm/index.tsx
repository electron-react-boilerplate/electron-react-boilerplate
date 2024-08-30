import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from 'components/Input';
import Select from 'components/Select';

import { addOperation, editOperation } from 'state/part/partSlice';

import { grindingWheels } from 'integration/grindingWheels';

// Types
import { OptionType } from 'components/Select/interface';
import { Operations } from 'types/part';
import { FormProps } from './interface';
import { Container, Field, SButton } from './style';

const formattedGrindingWheels: OptionType[] = grindingWheels.map((wheel) => ({
  value: wheel.id,
  label: wheel.name,
}));

const AddOperationForm: React.FC<FormProps> = ({
  onButtonClick,
  variation = 'add',
  operationId,
}) => {
  const dispatch = useDispatch();
  const operations = useSelector(
    (state: { part: { operations: Operations } }) => state.part.operations,
  );
  let formValues = { name: '', grindingWheelId: 1, dAngle: '' };
  if (variation === 'edit') {
    const operation = operations.find((op) => op.id === operationId);
    if (operation) {
      formValues = {
        name: operation.name,
        grindingWheelId: operation.grindingWheelId,
        dAngle: operation.dAngle,
      };
    }
  }
  const [formData, setFormData] = useState(formValues);

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

    if (!formData.name) alert('Os campos nome e tipo são obrigatórios');

    if (variation === 'add') dispatch(addOperation({ ...formData }));
    else if (operationId)
      dispatch(editOperation({ id: operationId, operation: formData }));
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
      <SButton onClick={handleClick}>
        {variation === 'add' ? 'Adicionar' : 'Editar'}
      </SButton>
    </Container>
  );
};

export default AddOperationForm;
