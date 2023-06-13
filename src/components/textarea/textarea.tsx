import React from 'react';
import * as S from './textarea.styled';

const InputTextArea: React.FC<{
  value?: string;
  onChange: (newValue: string) => void;
}> = ({ value, onChange }) => {
  return (
    <S.InputTextArea
      as="textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputTextArea;
