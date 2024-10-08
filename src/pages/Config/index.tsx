import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Breadcrumbs from 'components/Breadcrumbs';
import Icon from 'components/Icon';
import { Label } from 'components/Input/style';

import { Config as ConfigType } from 'types/api';
import { loadConfig, defaultConfig } from 'utils/loadConfig';

import { colors } from 'styles/global.styles';
import {
  Container,
  Content,
  SContentBlock,
  Title,
  SInput,
  SSubTitle,
  Field,
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
  const [formData, setFormData] = useState({
    ip: defaultConfig.network.ip,
    port: defaultConfig.network.port,
    delRangeStart: defaultConfig.cnc.delRangeStart,
    delRangeEnd: defaultConfig.cnc.delRangeEnd,
    pmcAddress: defaultConfig.cnc.pmcAddress,
    pmcAddressBit: defaultConfig.cnc.pmcAddressBit,
  });
  const [editState, setEditState] = useState({
    ip: {
      edit: false,
      error: false,
    },
    port: {
      edit: false,
      error: false,
    },
    delRangeStart: {
      edit: false,
      error: false,
    },
    delRangeEnd: {
      edit: false,
      error: false,
    },
    pmcAddress: {
      edit: false,
      error: false,
    },
    pmcAddressBit: {
      edit: false,
      error: false,
    },
  });

  type EditStateKeys = keyof typeof editState;

  const fieldsNetwork: {
    label: string;
    name: EditStateKeys;
    type: string;
    placeholder: string;
  }[] = [
    {
      label: 'Endereço de IP',
      name: 'ip',
      type: 'text',
      placeholder: '192.168.0.1',
    },
    { label: 'Porta', name: 'port', type: 'number', placeholder: '8193' },
  ];

  const fieldsCnc: {
    label: string;
    name: EditStateKeys;
    type: string;
    placeholder: string;
  }[] = [
    {
      label: 'ID do programa inicial',
      name: 'delRangeStart',
      type: 'number',
      placeholder: '1000',
    },
    {
      label: 'ID do programa final',
      name: 'delRangeEnd',
      type: 'number',
      placeholder: '1010',
    },
    {
      label: 'Endereço PMC de segurança',
      name: 'pmcAddress',
      type: 'number',
      placeholder: '2850',
    },
    {
      label: 'Bit do endereço PMC de segurança',
      name: 'pmcAddressBit',
      type: 'number',
      placeholder: '0',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const loadedConfig: ConfigType = await loadConfig();
      setFormData({
        ip: loadedConfig.network.ip,
        port: loadedConfig.network.port,
        delRangeStart: loadedConfig.cnc.delRangeStart,
        delRangeEnd: loadedConfig.cnc.delRangeEnd,
        pmcAddress: loadedConfig.cnc.pmcAddress,
        pmcAddressBit: loadedConfig.cnc.pmcAddressBit,
      });
      setLoaded(true);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const configData: ConfigType = {
      network: {
        ip: formData.ip,
        port: formData.port,
      },
      cnc: {
        delRangeStart: formData.delRangeStart,
        delRangeEnd: formData.delRangeEnd,
        pmcAddress: formData.pmcAddress,
        pmcAddressBit: formData.pmcAddressBit,
      },
    };

    await window.electron.store.set('config', configData);
  };

  const validateField = (fieldId: string, value: string | number): boolean => {
    switch (fieldId) {
      case 'ip': {
        const ipRegex =
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(value.toString());
      }
      case 'port': {
        const port = typeof value === 'string' ? parseInt(value, 10) : value;
        return port > 0 && port <= 65535;
      }
      case 'delRangeStart': {
        const numValue =
          typeof value === 'string' ? parseInt(value, 10) : value;
        if (numValue > formData.delRangeEnd) return false;
        return true;
      }
      case 'delRangeEnd': {
        const numValue =
          typeof value === 'string' ? parseInt(value, 10) : value;
        if (numValue < formData.delRangeStart) return false;
        return true;
      }
      case 'pmcAddress':
      case 'pmcAddressBit':
        return !Number.isNaN(parseInt(value.toString(), 10));
      default:
        return false;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = (field: EditStateKeys) => {
    if (editState[field].edit && !validateField(field, formData[field])) {
      setEditState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          error: true,
        },
      }));
    } else {
      setEditState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          edit: !prevState[field].edit,
          error: false,
        },
      }));
      handleSubmit();
    }
  };

  // Render functions
  const renderEditIcon = (field: EditStateKeys) => {
    return editState[field].edit ? (
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
    name: EditStateKeys;
    type: string;
    placeholder: string;
  }) => (
    <React.Fragment key={name}>
      <Label>{label}:</Label>
      <Field>
        <SInput
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={!editState[name].edit}
          error={editState[name].error}
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
          {fieldsNetwork.map((field) => renderField(field))}
        </SContentBlock>
        <SContentBlock>
          <SSubTitle>CNC</SSubTitle>
          {fieldsCnc.map((field) => renderField(field))}
        </SContentBlock>
      </Content>
    </Container>
  );
};

export default Config;
