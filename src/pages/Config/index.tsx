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

  type EditStateKeys = keyof typeof editState;
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

  return (
    <Container className={loaded ? 'loaded' : ''}>
      <Breadcrumbs items={breadcrumbsItems} />
      <Title>Configurações</Title>
      <Content>
        <SContentBlock>
          <SSubTitle>Rede</SSubTitle>
          <Label>IP:</Label>
          <Field>
            <SInput
              type="text"
              name="ip"
              value={formData.ip}
              onChange={handleInputChange}
              placeholder="192.168.0.1"
              disabled={!editState.ip.edit}
              error={editState.ip.error}
            />
            <EditButton type="button" onClick={() => toggleEdit('ip')}>
              {renderEditIcon('ip')}
            </EditButton>
          </Field>
          <Label>Porta:</Label>
          <Field>
            <SInput
              type="number"
              name="port"
              value={formData.port}
              onChange={handleInputChange}
              placeholder="8193"
              disabled={!editState.port.edit}
              error={editState.port.error}
            />
            <EditButton type="button" onClick={() => toggleEdit('port')}>
              {renderEditIcon('port')}
            </EditButton>
          </Field>
        </SContentBlock>
        <SContentBlock>
          <SSubTitle>CNC</SSubTitle>
          <Label>ID do programa inicial:</Label>
          <Field>
            <SInput
              type="number"
              name="delRangeStart"
              value={formData.delRangeStart}
              onChange={handleInputChange}
              placeholder="1000"
              disabled={!editState.delRangeStart.edit}
              error={editState.delRangeStart.error}
            />
            <EditButton
              type="button"
              onClick={() => toggleEdit('delRangeStart')}
            >
              {renderEditIcon('delRangeStart')}
            </EditButton>
          </Field>
          <Label>ID do programa final:</Label>
          <Field>
            <SInput
              type="number"
              name="delRangeEnd"
              value={formData.delRangeEnd}
              onChange={handleInputChange}
              placeholder="1030"
              disabled={!editState.delRangeEnd.edit}
              error={editState.delRangeEnd.error}
            />
            <EditButton type="button" onClick={() => toggleEdit('delRangeEnd')}>
              {renderEditIcon('delRangeEnd')}
            </EditButton>
          </Field>
          <Label>Endereço PMC de segurança (R):</Label>
          <Field>
            <SInput
              type="number"
              name="pmcAddress"
              value={formData.pmcAddress}
              onChange={handleInputChange}
              placeholder="2850"
              disabled={!editState.pmcAddress.edit}
              error={editState.pmcAddress.error}
            />
            <EditButton type="button" onClick={() => toggleEdit('pmcAddress')}>
              {renderEditIcon('pmcAddress')}
            </EditButton>
          </Field>
          <Label>Bit do endereço PMC de segurança:</Label>
          <Field>
            <SInput
              type="number"
              name="pmcAddressBit"
              value={formData.pmcAddressBit}
              onChange={handleInputChange}
              placeholder="0"
              disabled={!editState.pmcAddressBit.edit}
              error={editState.pmcAddressBit.error}
            />
            <EditButton
              type="button"
              onClick={() => toggleEdit('pmcAddressBit')}
            >
              {renderEditIcon('pmcAddressBit')}
            </EditButton>
          </Field>
        </SContentBlock>
        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
      </Content>
    </Container>
  );
};

export default Config;
