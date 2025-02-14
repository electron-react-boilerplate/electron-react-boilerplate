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

import useFormattedDressingTools from 'hooks/useFormattedDressingTools';

import { ToolOptionItem, ToolOptions } from 'components/Select/interface';
import { addContourPayload, FormProps, IFormData } from './interface';

import {
  Container,
  Field,
  Label,
  RadioButton,
  Button,
  TitleLabel,
} from './style';

const initialFormData: IFormData = {
  name: { value: '', error: false, message: undefined },
  type: { value: undefined, error: false, message: undefined },
  dressingTool: { value: undefined, error: false, message: undefined },
};

const toolNameTranslations: { [key: string]: string } = {
  fixedDiamondQtd: 'Diamante Fixo',
  refractableDiamondQtd: 'Diamante Retrátil',
  dressingDiscQtd: 'Disco de Dressagem',
  fixedDressingRollerQtd: 'Rolo de Dressagem Fixo',
  sCtrlMovableDressingRollerQtd: 'Rolo de Dressagem Móvel',
};

const ContourForm: React.FC<FormProps> = ({ onButtonClick, machining }) => {
  const dispatch = useDispatch();
  const formattedTools = useFormattedTools();
  const fDressingTools = useFormattedDressingTools();
  const availableTypes = Array.from(
    new Set(formattedTools.map((tool: ToolOptionItem) => tool.type)),
  );

  const [formData, setFormData] = useState(initialFormData);
  const [matchedTools, setMatchedTools] = useState<ToolOptions>([]);

  useEffect(() => {
    setMatchedTools(
      formattedTools.filter(
        (tool) => tool.type === Number(formData.type.value),
      ),
    );
  }, [formData.type.value, formattedTools]);

  // useEffect(() => {
  //   console.log('formData', formData);
  // }, [formData]);

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
        if (
          !field.value &&
          (key !== 'dressingTool' || machining === MACHINING_DRESSING)
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

    const contour: addContourPayload = {
      name: formData.name.value as string,
      machining: machining as Machining,
      type: Number(formData.type.value) as ContourType,
      dressingTool: formData.dressingTool?.value as string,
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
      {machining === MACHINING_DRESSING && formData.type.value && (
        <>
          {formData.dressingTool && formData.dressingTool.error && (
            <Message>{formData.dressingTool.message}</Message>
          )}
          <TitleLabel>Ferramenta de Dressagem</TitleLabel>
          <Field>
            {['tool1', 'tool2', 'tool3', 'tool4'].map((toolPrefix, index) => {
              const toolsForPrefix = fDressingTools.filter((tool) =>
                tool.name.startsWith(toolPrefix),
              );
              if (toolsForPrefix.length === 0) return null;

              return (
                <div key={toolPrefix}>
                  {toolsForPrefix.map((tool) => {
                    const noPrefixToolName = tool.name.replace(/tool[1-4]/, '');
                    const translatedToolName =
                      toolNameTranslations[noPrefixToolName];
                    const isMatchedTool = matchedTools.some(
                      (matchedTool) => matchedTool.id === tool.toolId,
                    );
                    if (!isMatchedTool) return null;

                    return (
                      <>
                        <Field>
                          <Label>Rebolo {index + 1}</Label>
                        </Field>
                        <Field key={tool.name}>
                          {[...Array(tool.value)].map((_, i) => (
                            <RadioButton style={{ fontSize: '16px' }}>
                              <input
                                type="radio"
                                value={`${noPrefixToolName.replace('Qtd', '')}${
                                  i + 1
                                }`}
                                name="dressingTool"
                                onChange={(e) => handleChange(e)}
                              />
                              <span />
                              {`${translatedToolName} ${i + 1}`}
                            </RadioButton>
                          ))}
                        </Field>
                      </>
                    );
                  })}
                </div>
              );
            })}
          </Field>
        </>
      )}
      <Button onClick={handleClick}>Cadastrar</Button>
    </Container>
  );
};

export default ContourForm;
