import { GetToolsResponseData } from 'types/api';

// When refering to the tools, we use index the array index. Index 0 is tool 1, index 1 is tool 2, and so on.
export const defaultTools: GetToolsResponseData = [
  {
    code: 50010,
    value: 0,
  },
  {
    code: 50020,
    value: 0,
  },
  {
    code: 50030,
    value: 0,
  },
  {
    code: 50040,
    value: 0,
  },
];

export const loadTools = async () => {
  const savedTools: GetToolsResponseData =
    await window.electron.store.get('tools');

  if (savedTools) return savedTools;
  return defaultTools;
};
