import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import Button from 'components/Button';

import { Config as ConfigType } from 'types/api';

import { colors } from 'styles/global.styles';
import { Container, Content, SContentBlock, Title, SInput } from './styles';

const Config: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [formData, setFormData] = useState({
    ip: '',
    port: '',
    delRangeStart: '',
    delRangeEnd: '',
  });

  useEffect(() => {
    const loadConfig = async () => {
      const savedConfig: ConfigType = await window.electron.store.get('config');

      // AJUSTAR para usar configs default caso nao achar nada
      if (savedConfig) {
        setFormData({
          ip: savedConfig.network.ip ? savedConfig.network.ip : '',
          port: savedConfig.network.port
            ? savedConfig.network.port.toString()
            : '',
          delRangeStart: savedConfig.cnc.delRangeStart
            ? savedConfig.cnc.delRangeStart.toString()
            : '',
          delRangeEnd: savedConfig.cnc.delRangeEnd
            ? savedConfig.cnc.delRangeEnd.toString()
            : '',
        });
      }
      setLoaded(true);
    };
    loadConfig();
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
        port: parseInt(formData.port, 10),
      },
      cnc: {
        delRangeStart: parseInt(formData.delRangeStart, 10),
        delRangeEnd: parseInt(formData.delRangeEnd, 10),
      },
    };

    await window.electron.store.set('config', configData);
    console.log('configData:', configData);
  };

  return (
    <Container className={loaded ? 'loaded' : ''}>
      <Content>
        <Title>Configurações</Title>
        <form onSubmit={handleSubmit}>
          <SContentBlock>
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
              type="text"
              name="port"
              value={formData.port}
              onChange={handleInputChange}
              placeholder="8193"
            />
          </SContentBlock>
          <SContentBlock>
            <SInput
              label="ID do programa inicial:"
              type="text"
              name="delRangeStart"
              value={formData.delRangeStart}
              onChange={handleInputChange}
              placeholder="1000"
            />
            <SInput
              label="ID do programa final:"
              type="text"
              name="delRangeEnd"
              value={formData.delRangeEnd}
              onChange={handleInputChange}
              placeholder="1030"
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
