import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import Icon from 'components/Icon';
import { Label } from 'components/Input/style';

import { Config as ConfigType } from 'types/api';
import { loadConfig } from 'utils/loadConfig';

import { colors } from 'styles/global.styles';
import { FieldKeys, FormState } from './interface';
import {
  fieldsCNCProps,
  fieldsNetworkProps,
  initialState,
  validateField,
  validateFieldObj,
} from './functions';
import {
  Container,
  Content,
  SContentBlock,
  Title,
  SInput,
  SSubTitle,
  Field,
  Message,
  EditButton,
} from './styles';

const breadcrumbsItems = [
  {
    label: 'Configurações',
    url: '/config',
    isActive: true,
  },
];

const Config: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const loadedConfig: ConfigType = await loadConfig();
      setFormState({
        ip: {
          value: loadedConfig.network.ip,
          edit: false,
          error: false,
          message: undefined,
        },
        port: {
          value: loadedConfig.network.port,
          edit: false,
          error: false,
          message: undefined,
        },
        delRangeStart: {
          value: loadedConfig.cnc.delRangeStart,
          edit: false,
          error: false,
          message: undefined,
        },
        delRangeEnd: {
          value: loadedConfig.cnc.delRangeEnd,
          edit: false,
          error: false,
          message: undefined,
        },
        pmcAddress: {
          value: loadedConfig.cnc.pmcAddress,
          edit: false,
          error: false,
          message: undefined,
        },
        pmcAddressBit: {
          value: loadedConfig.cnc.pmcAddressBit,
          edit: false,
          error: false,
          message: undefined,
        },
      });
      setLoaded(true);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const configData: ConfigType = {
      network: {
        ip: formState.ip.value as string,
        port: formState.port.value as number,
      },
      cnc: {
        delRangeStart: formState.delRangeStart.value as number,
        delRangeEnd: formState.delRangeEnd.value as number,
        pmcAddress: formState.pmcAddress.value as number,
        pmcAddressBit: formState.pmcAddressBit.value as number,
      },
    };

    await window.electron.store.set('config', configData);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as {
      name: keyof FormState;
      value: string;
    };

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  const toggleEdit = (field: FieldKeys) => {
    const validateObj: validateFieldObj = validateField(
      field,
      formState[field].value,
      formState,
    );
    if (formState[field].edit && !validateObj.isValid) {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          error: true,
          message: validateObj.message,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          edit: !prevState[field].edit,
          error: false,
          message: undefined,
        },
      }));
      handleSubmit();
    }
  };

  // Render functions
  const renderEditIcon = (field: FieldKeys) => {
    return formState[field].edit ? (
      <Icon
        className="icon-check_circle"
        color={colors.greyFont}
        fontSize="28px"
      />
    ) : (
      <Icon className="icon-create" color={colors.greyFont} fontSize="28px" />
    );
  };

  const renderField = ({
    label,
    name,
    type,
    placeholder,
  }: {
    label: string;
    name: FieldKeys;
    type: string;
    placeholder: string;
  }) => (
    <React.Fragment key={name}>
      <Label>{label}:</Label>
      {formState[name].error && <Message>{formState[name].message}</Message>}
      <Field>
        <SInput
          type={type}
          name={name}
          value={formState[name].value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={!formState[name].edit}
          error={formState[name].error}
        />
        <EditButton type="button" onClick={() => toggleEdit(name)}>
          {renderEditIcon(name)}
        </EditButton>
      </Field>
    </React.Fragment>
  );

  return (
    <Container className={loaded ? 'loaded' : ''}>
      <Breadcrumbs items={breadcrumbsItems} />
      <Title>Configurações</Title>
      <Content>
        <SContentBlock>
          <SSubTitle>Rede</SSubTitle>
          {fieldsNetworkProps.map((field) => renderField(field))}
        </SContentBlock>
        <SContentBlock>
          <SSubTitle>CNC</SSubTitle>
          {fieldsCNCProps.map((field) => renderField(field))}
        </SContentBlock>
      </Content>
    </Container>
  );
};

export default Config;
