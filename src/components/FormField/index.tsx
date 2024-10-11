import React from 'react';
import { Label } from 'components/Input/style';

import { FormFieldProps } from './interface';
import { Field, SInput, Message } from './style';

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  fieldState,
  handleInputChange,
}) => {
  return (
    <React.Fragment key={name}>
      <Label>{label}:</Label>
      {fieldState.error && <Message>{fieldState.message}</Message>}
      <Field>
        <SInput
          type={type}
          name={name}
          value={fieldState.value}
          onChange={handleInputChange}
          placeholder={placeholder}
          error={fieldState.error}
        />
      </Field>
    </React.Fragment>
  );
};

export default FormField;
