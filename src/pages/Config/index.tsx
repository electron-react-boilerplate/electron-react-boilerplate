import React, { useEffect, useState, FormEvent } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import Icon from 'components/Icon';
import Spinner from 'components/Spinner';
import { Label } from 'components/Input/style';
import Modal from 'components/Modal';

import {
  Config as ConfigType,
  GetToolsRequest,
  GetToolsResponse,
  GetToolsResponseData,
  GetToolsResponseDataItem,
} from 'types/api';
import Button from 'components/Button';
import { ModalContent, ModalText } from 'components/SideMenu/styles';

import { loadConfig } from 'utils/loadConfig';
import { loadTools } from 'utils/loadTools';

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
  const [toolsData, setToolsData] = useState<GetToolsResponseData>([]);
  const [isGetToolsLoading, setIsGetToolsLoading] = useState<boolean>(false);
  const [isModalFeedbackOpen, setIsModalFeedbackOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const loadedConfig: ConfigType = await loadConfig();
      const loadedTools: GetToolsResponseData = await loadTools();

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
      setToolsData(loadedTools);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as {
      name: keyof FormState;
      value: string | number;
    };

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: Number.isNaN(Number(value)) ? value : Number(value),
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
  }) => {
    const toolData = toolsData.find(
      (tool: GetToolsResponseDataItem) => tool.code === formState[name].value,
    );

    let displayValue;
    let color = colors.greyDark;
    if (toolData) {
      if (toolData.value === 1) {
        displayValue = 'Externo';
        color = colors.blue;
      } else if (toolData.value === 2) {
        displayValue = 'Interno';
        color = colors.blue;
      } else {
        displayValue = 'Inexistente';
      }
    } else {
      displayValue = 'Inexistente';
    }

    return (
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
            <ContentText color={color}>{displayValue}</ContentText>
          )}
          <EditButton type="button" onClick={() => toggleEdit(name)}>
            {renderEditIcon(name)}
          </EditButton>
        </Field>
      </React.Fragment>
    );
  };

  const getTools = (
    request: GetToolsRequest,
    timeout: number,
  ): Promise<GetToolsResponse> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);

      window.electron.ipcRenderer
        .getTools(request)
        .then((res: GetToolsResponse) => {
          clearTimeout(timer);
          resolve(res);
          return res;
        })
        .catch((error: GetToolsResponse) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  };

  const handleGetTools = async () => {
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

    setIsGetToolsLoading(true);

    try {
      const res: GetToolsResponse = await getTools(request, 100000);

      if (res.statusCode === 200) {
        if (res.data) {
          await window.electron.store.set('tools', res.data);

          console.log('res.data', res.data);
        }
      } else setIsModalFeedbackOpen(true);
    } catch (error) {
      setIsModalFeedbackOpen(true);
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
            <Spinner color={colors.blue} />
          )}
        </SContentBlock>
      </Content>
      <Modal
        title="Erro ao buscar rebolos"
        variation="danger"
        isOpen={isModalFeedbackOpen}
        onClose={() => setIsModalFeedbackOpen(false)}
      >
        <ModalContent>
          <ModalText>
            Houve um erro ao buscar rebolos, verifique a conexão com o serviço
            ou o CNC e tente novamente.
          </ModalText>
        </ModalContent>
        <Button
          onClick={() => setIsModalFeedbackOpen(false)}
          color={colors.red}
          bgColor={colors.white}
          borderColor={colors.red}
        >
          OK
        </Button>
      </Modal>
    </Container>
  );
};

export default Config;
