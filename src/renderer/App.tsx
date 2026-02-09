import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';

function Hello() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGeneratePDF = async () => {
    setLoading(true);
    setMessage('Generating PDF...');

    try {
      // Generate PDF with default options matching the image
      const result = await window.electron.ipcRenderer.invoke('generate-pdf', {
        systemName: 'SysName',
        date: '10/21/2025',
        pageNumber: 1,
        numberOfSections: 2
      });

      if (result.success) {
        setMessage(`PDF generated successfully: ${result.filePath}`);
        
        // Automatically open the PDF
        setTimeout(async () => {
          await window.electron.ipcRenderer.invoke('open-pdf', result.filePath);
        }, 500);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>Wiring Diagram Generator</h1>
      <div className="flex flex-col">
        <button 
          type="button" 
          onClick={handleGeneratePDF}
          disabled={loading}
          style={{
            fontSize: '16px',
            padding: '12px 24px',
            backgroundColor: loading ? '#ccc' : '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px'
          }}
        >
          {loading ? 'Generating...' : '📄 Generate Wiring Diagram PDF'}
        </button>
        
        {message && (
          <div style={{
            padding: '10px',
            marginTop: '10px',
            backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
            color: message.includes('Error') ? '#c62828' : '#2e7d32',
            borderRadius: '4px',
            maxWidth: '600px',
            margin: '10px auto',
            wordBreak: 'break-all'
          }}>
            {message}
          </div>
        )}
        
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
