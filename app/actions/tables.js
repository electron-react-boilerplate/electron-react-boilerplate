export const SAVE_TABLES = 'SAVE_TABLES';

export function saveTables(tables) {
  return {
    type: SAVE_TABLES,
    tables
  };
}
