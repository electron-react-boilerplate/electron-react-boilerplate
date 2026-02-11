import { Database } from 'lucide-react';

interface DatabaseData {
  success: boolean;
  fileName?: string;
  tables?: {
    [tableName: string]: {
      rowCount: number;
      columns: Array<{ name: string; type: string; length: number }>;
      data: Array<Record<string, any>>;
    };
  };
  foundTables?: string[];
  missingTables?: string[];
}

interface DatabaseTablesProps {
  databaseData: DatabaseData;
}

export function DatabaseTables({ databaseData }: DatabaseTablesProps) {
  // Table card colors
  const getTableColor = (index: number) => {
    const colors = [
      { bg: '#e3f2fd', text: '#1976d2' },
      { bg: '#e8f5e9', text: '#388e3c' },
      { bg: '#f3e5f5', text: '#7b1fa2' },
      { bg: '#fff3e0', text: '#f57c00' },
    ];
    return colors[index % colors.length];
  };

  return (
    <div>
      {/* Section Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginBottom: '25px' 
      }}>
        <Database size={24} color="#2196F3" />
        <h2 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#333' 
        }}>
          Database Tables Overview
        </h2>
      </div>

      {/* Tables Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {databaseData.foundTables?.map((tableName, index) => {
          const colors = getTableColor(index);
          const tableInfo = databaseData.tables?.[tableName];
          
          return (
            <div
              key={tableName}
              style={{
                padding: '20px',
                backgroundColor: colors.bg,
                borderRadius: '10px',
                border: `1px solid ${colors.bg}`,
                transition: 'transform 0.2s ease',
                cursor: 'default'
              }}
            >
              <div style={{
                fontSize: '14px',
                color: colors.text,
                fontWeight: '500',
                marginBottom: '8px',
                opacity: 0.8,
                wordBreak: 'break-word'
              }}>
                {tableName}
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                color: colors.text
              }}>
                {tableInfo?.rowCount || 0} rows
              </div>
              {tableInfo?.columns && (
                <div style={{
                  marginTop: '10px',
                  fontSize: '12px',
                  color: colors.text,
                  opacity: 0.7
                }}>
                  {tableInfo.columns.length} columns
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Warning for Missing Tables */}
      {databaseData.missingTables && databaseData.missingTables.length > 0 && (
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ffe0b2',
          color: '#f57c00',
          fontSize: '14px'
        }}>
          <strong>⚠️ Warning:</strong> Some required tables were not found: {databaseData.missingTables.join(', ')}
        </div>
      )}

      {/* File Information */}
      <div style={{
        marginTop: '25px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          fontSize: '16px', 
          fontWeight: '600', 
          color: '#333' 
        }}>
          Database Information
        </h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <p style={{ margin: '5px 0' }}>
            <strong>File:</strong> {databaseData.fileName}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Tables Found:</strong> {databaseData.foundTables?.length || 0}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Total Rows:</strong> {
              databaseData.foundTables?.reduce((total, tableName) => {
                const tableInfo = databaseData.tables?.[tableName];
                return total + (tableInfo?.rowCount || 0);
              }, 0) || 0
            }
          </p>
        </div>
      </div>
    </div>
  );
}
