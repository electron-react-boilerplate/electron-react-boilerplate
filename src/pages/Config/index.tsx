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
  GetToolsResponseDataItem,
  Tools,
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
  const [toolsData, setToolsData] = useState<Tools>({} as Tools);
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
      const loadedTools: Tools = await loadTools();

      setFormState((prevState) => ({
        ip: {
          ...prevState.ip,
          value: loadedConfig.network.ip || prevState.ip.value,
        },
        port: {
          ...prevState.port,
          value: loadedConfig.network.port || prevState.port.value,
        },
        delRangeStart: {
          ...prevState.delRangeStart,
          value:
            loadedConfig.cnc.delRangeStart || prevState.delRangeStart.value,
        },
        delRangeEnd: {
          ...prevState.delRangeEnd,
          value: loadedConfig.cnc.delRangeEnd || prevState.delRangeEnd.value,
        },
        pmcAddress: {
          ...prevState.pmcAddress,
          value: loadedConfig.cnc.pmcAddress || prevState.pmcAddress.value,
        },
        pmcAddressBit: {
          ...prevState.pmcAddressBit,
          value:
            loadedConfig.cnc.pmcAddressBit || prevState.pmcAddressBit.value,
        },
        tool1Var: {
          ...prevState.tool1Var,
          value: loadedConfig.tools.tool1Var || prevState.tool1Var.value,
        },
        tool1fixedDiamondQtd: {
          ...prevState.tool1fixedDiamondQtd,
          value:
            loadedConfig.tools.tool1fixedDiamondQtd ||
            prevState.tool1fixedDiamondQtd.value,
        },
        tool1refractableDiamondQtd: {
          ...prevState.tool1refractableDiamondQtd,
          value:
            loadedConfig.tools.tool1refractableDiamondQtd ||
            prevState.tool1refractableDiamondQtd.value,
        },
        tool1dressingDiscQtd: {
          ...prevState.tool1dressingDiscQtd,
          value:
            loadedConfig.tools.tool1dressingDiscQtd ||
            prevState.tool1dressingDiscQtd.value,
        },
        tool1fixedDressingRollerQtd: {
          ...prevState.tool1fixedDressingRollerQtd,
          value:
            loadedConfig.tools.tool1fixedDressingRollerQtd ||
            prevState.tool1fixedDressingRollerQtd.value,
        },
        tool1sCtrlMovableDressingRollerQtd: {
          ...prevState.tool1sCtrlMovableDressingRollerQtd,
          value:
            loadedConfig.tools.tool1sCtrlMovableDressingRollerQtd ||
            prevState.tool1sCtrlMovableDressingRollerQtd.value,
        },
        tool2Var: {
          ...prevState.tool2Var,
          value: loadedConfig.tools.tool2Var || prevState.tool2Var.value,
        },
        tool2fixedDiamondQtd: {
          ...prevState.tool2fixedDiamondQtd,
          value:
            loadedConfig.tools.tool2fixedDiamondQtd ||
            prevState.tool2fixedDiamondQtd.value,
        },
        tool2refractableDiamondQtd: {
          ...prevState.tool2refractableDiamondQtd,
          value:
            loadedConfig.tools.tool2refractableDiamondQtd ||
            prevState.tool2refractableDiamondQtd.value,
        },
        tool2dressingDiscQtd: {
          ...prevState.tool2dressingDiscQtd,
          value:
            loadedConfig.tools.tool2dressingDiscQtd ||
            prevState.tool2dressingDiscQtd.value,
        },
        tool2fixedDressingRollerQtd: {
          ...prevState.tool2fixedDressingRollerQtd,
          value:
            loadedConfig.tools.tool2fixedDressingRollerQtd ||
            prevState.tool2fixedDressingRollerQtd.value,
        },
        tool2sCtrlMovableDressingRollerQtd: {
          ...prevState.tool2sCtrlMovableDressingRollerQtd,
          value:
            loadedConfig.tools.tool2sCtrlMovableDressingRollerQtd ||
            prevState.tool2sCtrlMovableDressingRollerQtd.value,
        },
        tool3Var: {
          ...prevState.tool3Var,
          value: loadedConfig.tools.tool3Var || prevState.tool3Var.value,
        },
        tool3fixedDiamondQtd: {
          ...prevState.tool3fixedDiamondQtd,
          value:
            loadedConfig.tools.tool3fixedDiamondQtd ||
            prevState.tool3fixedDiamondQtd.value,
        },
        tool3refractableDiamondQtd: {
          ...prevState.tool3refractableDiamondQtd,
          value:
            loadedConfig.tools.tool3refractableDiamondQtd ||
            prevState.tool3refractableDiamondQtd.value,
        },
        tool3dressingDiscQtd: {
          ...prevState.tool3dressingDiscQtd,
          value:
            loadedConfig.tools.tool3dressingDiscQtd ||
            prevState.tool3dressingDiscQtd.value,
        },
        tool3fixedDressingRollerQtd: {
          ...prevState.tool3fixedDressingRollerQtd,
          value:
            loadedConfig.tools.tool3fixedDressingRollerQtd ||
            prevState.tool3fixedDressingRollerQtd.value,
        },
        tool3sCtrlMovableDressingRollerQtd: {
          ...prevState.tool3sCtrlMovableDressingRollerQtd,
          value:
            loadedConfig.tools.tool3sCtrlMovableDressingRollerQtd ||
            prevState.tool3sCtrlMovableDressingRollerQtd.value,
        },
        tool4Var: {
          ...prevState.tool4Var,
          value: loadedConfig.tools.tool4Var || prevState.tool4Var.value,
        },
        tool4fixedDiamondQtd: {
          ...prevState.tool4fixedDiamondQtd,
          value:
            loadedConfig.tools.tool4fixedDiamondQtd ||
            prevState.tool4fixedDiamondQtd.value,
        },
        tool4refractableDiamondQtd: {
          ...prevState.tool4refractableDiamondQtd,
          value:
            loadedConfig.tools.tool4refractableDiamondQtd ||
            prevState.tool4refractableDiamondQtd.value,
        },
        tool4dressingDiscQtd: {
          ...prevState.tool4dressingDiscQtd,
          value:
            loadedConfig.tools.tool4dressingDiscQtd ||
            prevState.tool4dressingDiscQtd.value,
        },
        tool4fixedDressingRollerQtd: {
          ...prevState.tool4fixedDressingRollerQtd,
          value:
            loadedConfig.tools.tool4fixedDressingRollerQtd ||
            prevState.tool4fixedDressingRollerQtd.value,
        },
        tool4sCtrlMovableDressingRollerQtd: {
          ...prevState.tool4sCtrlMovableDressingRollerQtd,
          value:
            loadedConfig.tools.tool4sCtrlMovableDressingRollerQtd ||
            prevState.tool4sCtrlMovableDressingRollerQtd.value,
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
        tool1fixedDiamondQtd: formState.tool1fixedDiamondQtd.value as number,
        tool1refractableDiamondQtd: formState.tool1refractableDiamondQtd
          .value as number,
        tool1dressingDiscQtd: formState.tool1dressingDiscQtd.value as number,
        tool1fixedDressingRollerQtd: formState.tool1fixedDressingRollerQtd
          .value as number,
        tool1sCtrlMovableDressingRollerQtd: formState
          .tool1sCtrlMovableDressingRollerQtd.value as number,
        tool2Var: formState.tool2Var.value as number,
        tool2fixedDiamondQtd: formState.tool2fixedDiamondQtd.value as number,
        tool2refractableDiamondQtd: formState.tool2refractableDiamondQtd
          .value as number,
        tool2dressingDiscQtd: formState.tool2dressingDiscQtd.value as number,
        tool2fixedDressingRollerQtd: formState.tool2fixedDressingRollerQtd
          .value as number,
        tool2sCtrlMovableDressingRollerQtd: formState
          .tool2sCtrlMovableDressingRollerQtd.value as number,
        tool3Var: formState.tool3Var.value as number,
        tool3fixedDiamondQtd: formState.tool3fixedDiamondQtd.value as number,
        tool3refractableDiamondQtd: formState.tool3refractableDiamondQtd
          .value as number,
        tool3dressingDiscQtd: formState.tool3dressingDiscQtd.value as number,
        tool3fixedDressingRollerQtd: formState.tool3fixedDressingRollerQtd
          .value as number,
        tool3sCtrlMovableDressingRollerQtd: formState
          .tool3sCtrlMovableDressingRollerQtd.value as number,
        tool4Var: formState.tool4Var.value as number,
        tool4fixedDiamondQtd: formState.tool4fixedDiamondQtd.value as number,
        tool4refractableDiamondQtd: formState.tool4refractableDiamondQtd
          .value as number,
        tool4dressingDiscQtd: formState.tool4dressingDiscQtd.value as number,
        tool4fixedDressingRollerQtd: formState.tool4fixedDressingRollerQtd
          .value as number,
        tool4sCtrlMovableDressingRollerQtd: formState
          .tool4sCtrlMovableDressingRollerQtd.value as number,
      },
    };

    await window.electron.store.set('config', configData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as {
      name: keyof FormState;
      value: string | number;
    };

    let newValue: string | number;
    if (name === 'ip') {
      newValue = value;
    } else if (Number.isNaN(Number(value))) {
      newValue = value;
    } else {
      newValue = Number(value);
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: newValue,
      },
    }));
  };

  const toggleEdit = (field: FieldKeys) => {
    const validateObj: validateFieldObj = validateField(
      field,
      formState[field].value,
      formState,
    );

    // Verifica se o valor da ferramenta já está sendo usado por outra ferramenta
    const isDuplicateToolValue = Object.keys(formState).some(
      (key) =>
        key !== field &&
        formState[key as FieldKeys].value === formState[field].value,
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
    } else if (isDuplicateToolValue) {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          error: true,
          message: 'O valor da ferramenta já está em uso por outra ferramenta.',
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

    fieldsToolsProps.forEach((prop) => {
      const toolVarName = prop.name as keyof Tools;
      const toolValue = toolsData[toolVarName];

      if (
        toolVarName === 'tool1Var' ||
        toolVarName === 'tool2Var' ||
        toolVarName === 'tool3Var' ||
        toolVarName === 'tool4Var'
      ) {
        if (toolValue !== undefined) {
          if (toolValue === 1) {
            newDisplayValues[prop.name] = 'Externo';
            newColorsState[prop.name] = colors.blue;
          } else if (toolValue === 2) {
            newDisplayValues[prop.name] = 'Interno';
            newColorsState[prop.name] = colors.blue;
          } else {
            newDisplayValues[prop.name] = 'Inexistente';
            newColorsState[prop.name] = colors.greyDark;
          }
        } else {
          newDisplayValues[prop.name] = 'Inexistente';
          newColorsState[prop.name] = colors.greyDark;
        }
      } else if (toolValue) {
        newDisplayValues[prop.name] = `Quantidade: ${toolValue.toString()}`;
        newColorsState[prop.name] = colors.blue;
      } else {
        newDisplayValues[prop.name] = 'Inexistente';
        newColorsState[prop.name] = colors.greyDark;
      }
    });

    setDisplayValues(newDisplayValues);
    setColorsState(newColorsState);
  }, [toolsData]);

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
          {Object.keys(toolsData).includes(name) &&
            !['tool1Var', 'tool2Var', 'tool3Var', 'tool4Var'].includes(
              name,
            ) && <ContentText color={color}>{displayValue}</ContentText>}
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
        formState.tool1fixedDiamondQtd.value as number,
        formState.tool1refractableDiamondQtd.value as number,
        formState.tool1dressingDiscQtd.value as number,
        formState.tool1fixedDressingRollerQtd.value as number,
        formState.tool1sCtrlMovableDressingRollerQtd.value as number,
        formState.tool2Var.value as number,
        formState.tool2fixedDiamondQtd.value as number,
        formState.tool2refractableDiamondQtd.value as number,
        formState.tool2dressingDiscQtd.value as number,
        formState.tool2fixedDressingRollerQtd.value as number,
        formState.tool2sCtrlMovableDressingRollerQtd.value as number,
        formState.tool3Var.value as number,
        formState.tool3fixedDiamondQtd.value as number,
        formState.tool3refractableDiamondQtd.value as number,
        formState.tool3dressingDiscQtd.value as number,
        formState.tool3fixedDressingRollerQtd.value as number,
        formState.tool3sCtrlMovableDressingRollerQtd.value as number,
        formState.tool4Var.value as number,
        formState.tool4fixedDiamondQtd.value as number,
        formState.tool4refractableDiamondQtd.value as number,
        formState.tool4dressingDiscQtd.value as number,
        formState.tool4fixedDressingRollerQtd.value as number,
        formState.tool4sCtrlMovableDressingRollerQtd.value as number,
      ],
    };

    setIsGetToolsLoading(true);

    try {
      const res: GetToolsResponse = await getTools(request, 100000);

      if (res.statusCode === 200) {
        if (res.data) {
          const newObject: Tools = {} as Tools;
          res.data.forEach((tool: GetToolsResponseDataItem) => {
            Object.keys(formState).forEach((key) => {
              if (formState[key as keyof FormState].value === tool.code) {
                newObject[key as keyof Tools] = tool.value;
              }
            });
          });

          window.electron.store.set('tools', newObject);
          setToolsData(newObject);
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
              Buscar ferramentas
            </SButton>
          ) : (
            <Spinner color={colors.blue} />
          )}
        </SContentBlock>
      </Content>
      <Modal
        title="Erro ao buscar ferramentas"
        variation="danger"
        isOpen={isModalFeedbackOpen}
        onClose={() => setIsModalFeedbackOpen(false)}
      >
        <ModalContent>
          <ModalText>
            Houve um erro ao buscar ferramentas, verifique a conexão com o
            serviço ou o CNC e tente novamente.
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
