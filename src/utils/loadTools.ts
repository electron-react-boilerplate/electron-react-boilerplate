import { Tools } from 'types/api';

// When refering to the tools, we use index the array index. Index 0 is tool 1, index 1 is tool 2, and so on.
export const defaultTools: Tools = {
  tool1Var: 0,
  tool1fixedDiamondQtd: 0,
  tool1refractableDiamondQtd: 0,
  tool1dressingDiscQtd: 0,
  tool1fixedDressingRollerQtd: 0,
  tool1sCtrlMovableDressingRollerQtd: 0,
  tool2Var: 0,
  tool2fixedDiamondQtd: 0,
  tool2refractableDiamondQtd: 0,
  tool2dressingDiscQtd: 0,
  tool2fixedDressingRollerQtd: 0,
  tool2sCtrlMovableDressingRollerQtd: 0,
  tool3Var: 0,
  tool3fixedDiamondQtd: 0,
  tool3refractableDiamondQtd: 0,
  tool3dressingDiscQtd: 0,
  tool3fixedDressingRollerQtd: 0,
  tool3sCtrlMovableDressingRollerQtd: 0,
  tool4Var: 0,
  tool4fixedDiamondQtd: 0,
  tool4refractableDiamondQtd: 0,
  tool4dressingDiscQtd: 0,
  tool4fixedDressingRollerQtd: 0,
  tool4sCtrlMovableDressingRollerQtd: 0,
};

export const loadTools = async () => {
  const savedTools: Tools = await window.electron.store.get('tools');

  if (savedTools) return savedTools;
  return defaultTools;
};
