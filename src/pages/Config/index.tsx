import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import { Label } from 'components/Input/style';

import { Config as ConfigType, GetToolsRequest, Response } from 'types/api';
import { loadConfig } from 'utils/loadConfig';

import { colors } from 'styles/global.styles';
import { FieldKeys, FormState } from './interface';
import {
  fieldsCNCProps,
  fieldsNetworkProps,
  fieldsToolsProps,
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
  ContentText,
  SButton,
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
  const [isGetToolsLoading, setIsGetToolsLoading] = useState(false);

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
        tool1Var: {
          value: loadedConfig.tools.tool1Var,
          edit: false,
          error: false,
          message: undefined,
        },
        tool2Var: {
          value: loadedConfig.tools.tool2Var,
          edit: false,
          error: false,
          message: undefined,
        },
        tool3Var: {
          value: loadedConfig.tools.tool3Var,
          edit: false,
          error: false,
          message: undefined,
        },
        tool4Var: {
          value: loadedConfig.tools.tool4Var,
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
      tools: {
        // por algum motivo não ta entrando como number
        tool1Var: formState.tool1Var.value as number,
        tool2Var: formState.tool2Var.value as number,
        tool3Var: formState.tool3Var.value as number,
        tool4Var: formState.tool4Var.value as number,
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
        {(name === 'tool1Var' ||
          name === 'tool2Var' ||
          name === 'tool3Var' ||
          name === 'tool4Var') && (
          <ContentText>
            {/* Mudar aqui para descrição dos tipos de rebolo */}
            Inexistente
          </ContentText>
        )}
        <EditButton type="button" onClick={() => toggleEdit(name)}>
          {renderEditIcon(name)}
        </EditButton>
      </Field>
    </React.Fragment>
  );

  const getTools = (
    request: GetToolsRequest,
    timeout: number,
  ): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);

      window.electron.ipcRenderer
        .getTools(request)
        .then((res: Response) => {
          clearTimeout(timer);
          resolve(res);
          return res;
        })
        .catch((error: Response) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  };

  const handleGetTools = async () => {
    // mount request
    const request: GetToolsRequest = {
      network: {
        ip: formState.ip.value as string,
        port: formState.port.value as number,
      },
      pCodeAddresses: [
        formState.tool1Var.value as number,
        formState.tool2Var.value as number,
        formState.tool3Var.value as number,
        formState.tool4Var.value as number,
      ],
    };

    console.log('handleGetTools request', request);
    setIsGetToolsLoading(true);

    try {
      const res: Response = await getTools(request, 100000);
      console.log(res);
    } catch (error) {
      // setResponse(null);
      // setModalFeedbackMessage('Problemas de conexão com o serviço.');
      // setIsModalFeedbackOpen(true);
    } finally {
      setIsGetToolsLoading(false);
    }
  };

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
        <SContentBlock>
          <SSubTitle>Ferramentas</SSubTitle>
          {fieldsToolsProps.map((field) => renderField(field))}
          {!isGetToolsLoading ? (
            <SButton
              onClick={() => handleGetTools()}
              color={colors.white}
              bgColor={colors.blue}
            >
              Buscar rebolos
            </SButton>
          ) : (
            <Spinner />
          )}
        </SContentBlock>
      </Content>
    </Container>
  );
};

export default Config;
