import { useState, useEffect } from 'react';
import { Tools } from 'types/api';
import { ToolOptions } from 'components/Select/interface';
import { loadTools } from 'utils/loadTools';
import { TYPE_EXTERNAL, TYPE_INTERNAL } from 'utils/constants';

const useFormattedTools = () => {
  const [formattedTools, setFormattedTools] = useState<ToolOptions>([]);

  useEffect(() => {
    const fetchTools = async () => {
      const tools: Tools = await loadTools();
      if (tools) {
        const toolVars: (keyof Tools)[] = [
          'tool1Var',
          'tool2Var',
          'tool3Var',
          'tool4Var',
        ];
        const fTools = toolVars
          .filter((prop) => tools[prop as keyof Tools] !== 0)
          .map((prop, index) => {
            const id = index + 1;
            let label = `Rebolo ${id} (${tools[prop].toString()})`;
            if (tools[prop] === TYPE_EXTERNAL) {
              label = `Rebolo ${id} (Externo)`;
            } else if (tools[prop] === TYPE_INTERNAL) {
              label = `Rebolo ${id} (Interno)`;
            }
            return {
              id,
              label,
              type: tools[prop],
              value: id,
            };
          });
        setFormattedTools(fTools);
      }
    };

    fetchTools();
  }, []);

  return formattedTools;
};

export default useFormattedTools;
