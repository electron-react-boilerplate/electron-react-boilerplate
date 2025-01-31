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

  const [displayValues, setDisplayValues] = useState<{ [key: string]: string }>(
    {},
  );
  const [colorsState, setColorsState] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const loadedConfig: ConfigType = await loadConfig();
      const loadedTools: GetToolsResponseData = await loadTools();

      setFormState((prevState) => ({
        ...prevState,
        ip: {
          ...prevState.ip,
          value: loadedConfig.network.ip,
        },
        port: {
          ...prevState.port,
          value: loadedConfig.network.port,
        },
        delRangeStart: {
          ...prevState.delRangeStart,
          value: loadedConfig.cnc.delRangeStart,
        },
        delRangeEnd: {
          ...prevState.delRangeEnd,
          value: loadedConfig.cnc.delRangeEnd,
        },
        pmcAddress: {
          ...prevState.pmcAddress,
          value: loadedConfig.cnc.pmcAddress,
        },
        pmcAddressBit: {
          ...prevState.pmcAddressBit,
          value: loadedConfig.cnc.pmcAddressBit,
        },
        tool1Var: {
          ...prevState.tool1Var,
          value: loadedConfig.tools.tool1Var,
        },
        tool1fixedDiamond: {
          ...prevState.tool1fixedDiamond,
          value: loadedConfig.tools.tool1fixedDiamond,
        },
        tool1refractableDiamond: {
          ...prevState.tool1refractableDiamond,
          value: loadedConfig.tools.tool1refractableDiamond,
        },
        tool1dressingDisc: {
          ...prevState.tool1dressingDisc,
          value: loadedConfig.tools.tool1dressingDisc,
        },
        tool1fixedDressingRoller: {
          ...prevState.tool1fixedDressingRoller,
          value: loadedConfig.tools.tool1fixedDressingRoller,
        },
        tool1sCtrlMovableDressingRoller: {
          ...prevState.tool1sCtrlMovableDressingRoller,
          value: loadedConfig.tools.tool1sCtrlMovableDressingRoller,
        },
        tool2Var: {
          ...prevState.tool2Var,
          value: loadedConfig.tools.tool2Var,
        },
        tool2fixedDiamond: {
          ...prevState.tool2fixedDiamond,
          value: loadedConfig.tools.tool2fixedDiamond,
        },
        tool2refractableDiamond: {
          ...prevState.tool2refractableDiamond,
          value: loadedConfig.tools.tool2refractableDiamond,
        },
        tool2dressingDisc: {
          ...prevState.tool2dressingDisc,
          value: loadedConfig.tools.tool2dressingDisc,
        },
        tool2fixedDressingRoller: {
          ...prevState.tool2fixedDressingRoller,
          value: loadedConfig.tools.tool2fixedDressingRoller,
        },
        tool2sCtrlMovableDressingRoller: {
          ...prevState.tool2sCtrlMovableDressingRoller,
          value: loadedConfig.tools.tool2sCtrlMovableDressingRoller,
        },
        tool3Var: {
          ...prevState.tool3Var,
          value: loadedConfig.tools.tool3Var,
        },
        tool3fixedDiamond: {
          ...prevState.tool3fixedDiamond,
          value: loadedConfig.tools.tool3fixedDiamond,
        },
        tool3refractableDiamond: {
          ...prevState.tool3refractableDiamond,
          value: loadedConfig.tools.tool3refractableDiamond,
        },
        tool3dressingDisc: {
          ...prevState.tool3dressingDisc,
          value: loadedConfig.tools.tool3dressingDisc,
        },
        tool3fixedDressingRoller: {
          ...prevState.tool3fixedDressingRoller,
          value: loadedConfig.tools.tool3fixedDressingRoller,
        },
        tool3sCtrlMovableDressingRoller: {
          ...prevState.tool3sCtrlMovableDressingRoller,
          value: loadedConfig.tools.tool3sCtrlMovableDressingRoller,
        },
        tool4Var: {
          ...prevState.tool4Var,
          value: loadedConfig.tools.tool4Var,
        },
        tool4fixedDiamond: {
          ...prevState.tool4fixedDiamond,
          value: loadedConfig.tools.tool4fixedDiamond,
        },
        tool4refractableDiamond: {
          ...prevState.tool4refractableDiamond,
          value: loadedConfig.tools.tool4refractableDiamond,
        },
        tool4dressingDisc: {
          ...prevState.tool4dressingDisc,
          value: loadedConfig.tools.tool4dressingDisc,
        },
        tool4fixedDressingRoller: {
          ...prevState.tool4fixedDressingRoller,
          value: loadedConfig.tools.tool4fixedDressingRoller,
        },
        tool4sCtrlMovableDressingRoller: {
          ...prevState.tool4sCtrlMovableDressingRoller,
          value: loadedConfig.tools.tool4sCtrlMovableDressingRoller,
        },
      }));
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
        tool1Var: formState.tool1Var.value as number,
        tool1fixedDiamond: formState.tool1fixedDiamond.value as number,
        tool1refractableDiamond: formState.tool1refractableDiamond
          .value as number,
        tool1dressingDisc: formState.tool1dressingDisc.value as number,
        tool1fixedDressingRoller: formState.tool1fixedDressingRoller
          .value as number,
        tool1sCtrlMovableDressingRoller: formState
          .tool1sCtrlMovableDressingRoller.value as number,
        tool2Var: formState.tool2Var.value as number,
        tool2fixedDiamond: formState.tool2fixedDiamond.value as number,
        tool2refractableDiamond: formState.tool2refractableDiamond
          .value as number,
        tool2dressingDisc: formState.tool2dressingDisc.value as number,
        tool2fixedDressingRoller: formState.tool2fixedDressingRoller
          .value as number,
        tool2sCtrlMovableDressingRoller: formState
          .tool2sCtrlMovableDressingRoller.value as number,
        tool3Var: formState.tool3Var.value as number,
        tool3fixedDiamond: formState.tool3fixedDiamond.value as number,
        tool3refractableDiamond: formState.tool3refractableDiamond
          .value as number,
        tool3dressingDisc: formState.tool3dressingDisc.value as number,
        tool3fixedDressingRoller: formState.tool3fixedDressingRoller
          .value as number,
        tool3sCtrlMovableDressingRoller: formState
          .tool3sCtrlMovableDressingRoller.value as number,
        tool4Var: formState.tool4Var.value as number,
        tool4fixedDiamond: formState.tool4fixedDiamond.value as number,
        tool4refractableDiamond: formState.tool4refractableDiamond
          .value as number,
        tool4dressingDisc: formState.tool4dressingDisc.value as number,
        tool4fixedDressingRoller: formState.tool4fixedDressingRoller
          .value as number,
        tool4sCtrlMovableDressingRoller: formState
          .tool4sCtrlMovableDressingRoller.value as number,
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

  const arrangeToolTypes = React.useCallback(() => {
    const newDisplayValues: { [key: string]: string } = {};
    const newColorsState: { [key: string]: string } = {};

    fieldsToolsProps.forEach((toolVar) => {
      const toolData = toolsData.find(
        (tool: GetToolsResponseDataItem) =>
          tool.code === formState[toolVar.name].value,
      );

      if (toolData) {
        if (toolData.value === 1) {
          newDisplayValues[toolVar.name] = 'Externo';
          newColorsState[toolVar.name] = colors.blue;
        } else if (toolData.value === 2) {
          newDisplayValues[toolVar.name] = 'Interno';
          newColorsState[toolVar.name] = colors.blue;
        } else {
          newDisplayValues[toolVar.name] = 'Inexistente';
          newColorsState[toolVar.name] = colors.greyDark;
        }
      } else {
        newDisplayValues[toolVar.name] = 'Inexistente';
        newColorsState[toolVar.name] = colors.greyDark;
      }
    });

    setDisplayValues(newDisplayValues);
    setColorsState(newColorsState);
  }, [toolsData, formState]);

  useEffect(() => {
    arrangeToolTypes();
  }, [arrangeToolTypes]);

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
    const displayValue = displayValues[name] || 'Inexistente';
    const color = colorsState[name] || colors.greyDark;

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

          setToolsData(res.data);
          arrangeToolTypes();
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
