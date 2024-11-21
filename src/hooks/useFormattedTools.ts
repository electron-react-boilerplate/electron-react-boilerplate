import { useState, useEffect } from 'react';
import { GetToolsResponseDataItem } from 'types/api';
import { ToolOptions } from 'components/Select/interface';
import { loadTools } from 'utils/loadTools';

const useFormattedTools = () => {
  const [formattedTools, setFormattedTools] = useState<ToolOptions>([]);

  useEffect(() => {
    const fetchTools = async () => {
      const tools = await loadTools();
      if (tools && tools.length > 0) {
        const fTools = tools
          .filter((tool: GetToolsResponseDataItem) => tool.value !== 0)
          .map((tool: GetToolsResponseDataItem, index: number) => {
            const id = index + 1;
            let label = `Rebolo ${id} (${tool.code.toString()})`;
            if (tool.value === 1) {
              label = `Rebolo ${id} (Externo)`;
            } else if (tool.value === 2) {
              label = `Rebolo ${id} (Interno)`;
            }
            return {
              id,
              label,
              type: tool.value,
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
