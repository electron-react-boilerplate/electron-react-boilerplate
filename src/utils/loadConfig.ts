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
  tools: {
    tool1Var: 50010,
    tool2Var: 50020,
    tool3Var: 50030,
    tool4Var: 50040,
  },
};

export const loadConfig = async () => {
  const savedConfig: Config = await window.electron.store.get('config');

  if (savedConfig) return savedConfig;
  return defaultConfig;
};
