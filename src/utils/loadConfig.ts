import { Config } from 'types/api';

export const defaultConfig: Config = {
  network: {
    ip: '192.168.0.1',
    port: 8193,
  },
  cnc: {
    delRangeStart: 1000,
    delRangeEnd: 1030,
    pmcAddress: 2850,
    pmcAddressBit: 0,
  },
};

export const loadConfig = async () => {
  const savedConfig: Config = await window.electron.store.get('config');

  if (savedConfig) return savedConfig;
  return defaultConfig;
};
