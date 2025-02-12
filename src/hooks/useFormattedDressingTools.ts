import { useState, useEffect } from 'react';
import { DressingToolsQtds } from 'types/api';
import { ToolDressingOptions } from 'components/Select/interface';
import { loadTools } from 'utils/loadTools';

const useFormattedDressingTools = () => {
  const [formattedDressingTools, setFormattedDressingTools] =
    useState<ToolDressingOptions>([]);

  useEffect(() => {
    const fetchDressingTools = async () => {
      const tools: DressingToolsQtds = await loadTools();
      if (tools) {
        const dressingToolVars: (keyof DressingToolsQtds)[] = [
          'tool1fixedDiamondQtd',
          'tool1refractableDiamondQtd',
          'tool1dressingDiscQtd',
          'tool1fixedDressingRollerQtd',
          'tool1sCtrlMovableDressingRollerQtd',
          'tool2fixedDiamondQtd',
          'tool2refractableDiamondQtd',
          'tool2dressingDiscQtd',
          'tool2fixedDressingRollerQtd',
          'tool2sCtrlMovableDressingRollerQtd',
          'tool3fixedDiamondQtd',
          'tool3refractableDiamondQtd',
          'tool3dressingDiscQtd',
          'tool3fixedDressingRollerQtd',
          'tool3sCtrlMovableDressingRollerQtd',
          'tool4fixedDiamondQtd',
          'tool4refractableDiamondQtd',
          'tool4dressingDiscQtd',
          'tool4fixedDressingRollerQtd',
          'tool4sCtrlMovableDressingRollerQtd',
        ];
        const fDressingTools = dressingToolVars
          .filter((prop) => tools[prop as keyof DressingToolsQtds] !== 0)
          .map((prop) => {
            const name = prop;
            const toolId = Number(name.match(/tool(\d)/)?.[1]);
            return {
              name,
              value: tools[prop],
              toolId,
            };
          });
        setFormattedDressingTools(fDressingTools);
      }
    };

    fetchDressingTools();
  }, []);

  return formattedDressingTools;
};

export default useFormattedDressingTools;
