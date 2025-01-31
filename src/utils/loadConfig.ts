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
    tool1Var: 51000,
    tool1fixedDiamond: 51507,
    tool1refractableDiamond: 51517,
    tool1dressingDisc: 51527,
    tool1fixedDressingRoller: 51537,
    tool1sCtrlMovableDressingRoller: 51547,
    tool2Var: 52000,
    tool2fixedDiamond: 52507,
    tool2refractableDiamond: 52527,
    tool2dressingDisc: 52527,
    tool2fixedDressingRoller: 52537,
    tool2sCtrlMovableDressingRoller: 52547,
    tool3Var: 53000,
    tool3fixedDiamond: 53507,
    tool3refractableDiamond: 53527,
    tool3dressingDisc: 53527,
    tool3fixedDressingRoller: 53537,
    tool3sCtrlMovableDressingRoller: 53547,
    tool4Var: 54000,
    tool4fixedDiamond: 54507,
    tool4refractableDiamond: 54527,
    tool4dressingDisc: 54527,
    tool4fixedDressingRoller: 54537,
    tool4sCtrlMovableDressingRoller: 54547,
  },
};

export const loadConfig = async () => {
  const savedConfig: Config = await window.electron.store.get('config');

  if (savedConfig) return savedConfig;
  return defaultConfig;
};
