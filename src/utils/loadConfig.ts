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
    tool1fixedDiamondQtd: 51507,
    tool1refractableDiamondQtd: 51517,
    tool1dressingDiscQtd: 51527,
    tool1fixedDressingRollerQtd: 51537,
    tool1sCtrlMovableDressingRollerQtd: 51547,
    tool2Var: 52000,
    tool2fixedDiamondQtd: 52507,
    tool2refractableDiamondQtd: 52517,
    tool2dressingDiscQtd: 52527,
    tool2fixedDressingRollerQtd: 52537,
    tool2sCtrlMovableDressingRollerQtd: 52547,
    tool3Var: 53000,
    tool3fixedDiamondQtd: 53507,
    tool3refractableDiamondQtd: 53517,
    tool3dressingDiscQtd: 53527,
    tool3fixedDressingRollerQtd: 53537,
    tool3sCtrlMovableDressingRollerQtd: 53547,
    tool4Var: 54000,
    tool4fixedDiamondQtd: 54507,
    tool4refractableDiamondQtd: 54517,
    tool4dressingDiscQtd: 54527,
    tool4fixedDressingRollerQtd: 54537,
    tool4sCtrlMovableDressingRollerQtd: 54547,
  },
};

export const loadConfig = async (): Promise<Config> => {
  const savedConfig: Config = await window.electron.store.get('config');

  if (savedConfig) {
    const combinedConfig: Config = {
      network: {
        ip: savedConfig.network?.ip || defaultConfig.network.ip,
        port: savedConfig.network?.port || defaultConfig.network.port,
      },
      cnc: {
        delRangeStart:
          savedConfig.cnc?.delRangeStart || defaultConfig.cnc.delRangeStart,
        delRangeEnd:
          savedConfig.cnc?.delRangeEnd || defaultConfig.cnc.delRangeEnd,
        pmcAddress: savedConfig.cnc?.pmcAddress || defaultConfig.cnc.pmcAddress,
        pmcAddressBit:
          savedConfig.cnc?.pmcAddressBit || defaultConfig.cnc.pmcAddressBit,
      },
      tools: {
        tool1Var: savedConfig.tools?.tool1Var || defaultConfig.tools.tool1Var,
        tool1fixedDiamondQtd:
          savedConfig.tools?.tool1fixedDiamondQtd ||
          defaultConfig.tools.tool1fixedDiamondQtd,
        tool1refractableDiamondQtd:
          savedConfig.tools?.tool1refractableDiamondQtd ||
          defaultConfig.tools.tool1refractableDiamondQtd,
        tool1dressingDiscQtd:
          savedConfig.tools?.tool1dressingDiscQtd ||
          defaultConfig.tools.tool1dressingDiscQtd,
        tool1fixedDressingRollerQtd:
          savedConfig.tools?.tool1fixedDressingRollerQtd ||
          defaultConfig.tools.tool1fixedDressingRollerQtd,
        tool1sCtrlMovableDressingRollerQtd:
          savedConfig.tools?.tool1sCtrlMovableDressingRollerQtd ||
          defaultConfig.tools.tool1sCtrlMovableDressingRollerQtd,
        tool2Var: savedConfig.tools?.tool2Var || defaultConfig.tools.tool2Var,
        tool2fixedDiamondQtd:
          savedConfig.tools?.tool2fixedDiamondQtd ||
          defaultConfig.tools.tool2fixedDiamondQtd,
        tool2refractableDiamondQtd:
          savedConfig.tools?.tool2refractableDiamondQtd ||
          defaultConfig.tools.tool2refractableDiamondQtd,
        tool2dressingDiscQtd:
          savedConfig.tools?.tool2dressingDiscQtd ||
          defaultConfig.tools.tool2dressingDiscQtd,
        tool2fixedDressingRollerQtd:
          savedConfig.tools?.tool2fixedDressingRollerQtd ||
          defaultConfig.tools.tool2fixedDressingRollerQtd,
        tool2sCtrlMovableDressingRollerQtd:
          savedConfig.tools?.tool2sCtrlMovableDressingRollerQtd ||
          defaultConfig.tools.tool2sCtrlMovableDressingRollerQtd,
        tool3Var: savedConfig.tools?.tool3Var || defaultConfig.tools.tool3Var,
        tool3fixedDiamondQtd:
          savedConfig.tools?.tool3fixedDiamondQtd ||
          defaultConfig.tools.tool3fixedDiamondQtd,
        tool3refractableDiamondQtd:
          savedConfig.tools?.tool3refractableDiamondQtd ||
          defaultConfig.tools.tool3refractableDiamondQtd,
        tool3dressingDiscQtd:
          savedConfig.tools?.tool3dressingDiscQtd ||
          defaultConfig.tools.tool3dressingDiscQtd,
        tool3fixedDressingRollerQtd:
          savedConfig.tools?.tool3fixedDressingRollerQtd ||
          defaultConfig.tools.tool3fixedDressingRollerQtd,
        tool3sCtrlMovableDressingRollerQtd:
          savedConfig.tools?.tool3sCtrlMovableDressingRollerQtd ||
          defaultConfig.tools.tool3sCtrlMovableDressingRollerQtd,
        tool4Var: savedConfig.tools?.tool4Var || defaultConfig.tools.tool4Var,
        tool4fixedDiamondQtd:
          savedConfig.tools?.tool4fixedDiamondQtd ||
          defaultConfig.tools.tool4fixedDiamondQtd,
        tool4refractableDiamondQtd:
          savedConfig.tools?.tool4refractableDiamondQtd ||
          defaultConfig.tools.tool4refractableDiamondQtd,
        tool4dressingDiscQtd:
          savedConfig.tools?.tool4dressingDiscQtd ||
          defaultConfig.tools.tool4dressingDiscQtd,
        tool4fixedDressingRollerQtd:
          savedConfig.tools?.tool4fixedDressingRollerQtd ||
          defaultConfig.tools.tool4fixedDressingRollerQtd,
        tool4sCtrlMovableDressingRollerQtd:
          savedConfig.tools?.tool4sCtrlMovableDressingRollerQtd ||
          defaultConfig.tools.tool4sCtrlMovableDressingRollerQtd,
      },
    };

    return combinedConfig;
  }

  return defaultConfig;
};
