import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Button from 'components/Button';

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
} from './styles';

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

  useEffect(() => {
    const fetchData = async () => {
      const loadedConfig: ConfigType = await loadConfig();
      setFormData({
        ip: loadedConfig.network.ip,
        port: loadedConfig.network.port,
        delRangeStart: loadedConfig.cnc.delRangeStart,
        delRangeEnd: loadedConfig.cnc.delRangeEnd,
        pmcAddress: defaultConfig.cnc.pmcAddress,
        pmcAddressBit: defaultConfig.cnc.pmcAddressBit,
      });
    };
    setLoaded(true);
    fetchData();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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

  return (
    <Container className={loaded ? 'loaded' : ''}>
      <Content>
        <Title>Configurações</Title>
        <form onSubmit={handleSubmit}>
          <SContentBlock>
            <SSubTitle>Rede</SSubTitle>
            <SInput
              label="IP:"
              type="text"
              name="ip"
              value={formData.ip}
              onChange={handleInputChange}
              placeholder="192.168.0.1"
            />
            <SInput
              label="Porta:"
              type="number"
              name="port"
              value={formData.port.toString()}
              onChange={handleInputChange}
              placeholder="8193"
            />
          </SContentBlock>
          <SContentBlock>
            <SSubTitle>CNC</SSubTitle>
            <SInput
              label="ID do programa inicial:"
              type="number"
              name="delRangeStart"
              value={formData.delRangeStart.toString()}
              onChange={handleInputChange}
              placeholder="1000"
            />
            <SInput
              label="ID do programa final:"
              type="number"
              name="delRangeEnd"
              value={formData.delRangeEnd.toString()}
              onChange={handleInputChange}
              placeholder="1030"
            />
            <SInput
              label="Endereço PMC:"
              type="number"
              name="pmcAddress"
              value={formData.pmcAddress.toString()}
              onChange={handleInputChange}
              placeholder="2850"
            />
            <SInput
              label="Bit do endereço PMC:"
              type="number"
              name="pmcAddressBit"
              value={formData.pmcAddressBit.toString()}
              onChange={handleInputChange}
              placeholder="0"
            />
          </SContentBlock>
          <Button type="submit" color={colors.white} bgColor={colors.blue}>
            Salvar
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default Config;
