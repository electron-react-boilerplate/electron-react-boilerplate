import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Upload, FileText, Database, Loader2 } from 'lucide-react';
import { PDFPreview } from './components/PDFPreview';
import { DatabaseTables } from './components/DatabaseTables';
import './App.css';

interface DatabaseData {
  success: boolean;
  filePath?: string;
  fileName?: string;
  tables?: any;
  foundTables?: string[];
  missingTables?: string[];
  warning?: string;
  error?: string;
  type?: string;
}

type TabType = 'database' | 'pdf';

function Hello() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [databaseData, setDatabaseData] = useState<DatabaseData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabType>('database');
  const [pdfPath, setPdfPath] = useState<string>('');
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [pdfError, setPdfError] = useState<string>('');

  const handleUploadDatabase = async () => {
    setLoading(true);
    setMessage('Selecting database file...');

    try {
      // Open file dialog
      const selectResult = await window.electron.ipcRenderer.invoke('select-database-file');

      if (selectResult.canceled) {
        setMessage('');
        setLoading(false);
        return;
      }

      if (!selectResult.success) {
        setMessage(`Error: ${selectResult.error}`);
        setLoading(false);
        return;
      }
console.log('selectResult',selectResult);
      const filePath = selectResult.filePath;
      setUploadedFile(filePath);
      setMessage('Reading database...');

      // Read database
      const result: DatabaseData = await window.electron.ipcRenderer.invoke(
        'read-database',
        filePath
      );

      if (result.success) {
        setDatabaseData(result);
        setMessage('✅ Database loaded successfully!');
        
        // Don't auto-generate PDF yet, wait for user to click PDF Preview tab
      } else {
        setDatabaseData(null);
        
        let errorMsg = `❌ Error: ${result.error}\n`;
        
        if (result.type === 'JavaNotFound') {
          errorMsg += '\n📦 Java is required to read Access databases.\n';
          errorMsg += 'Please install Java Runtime Environment (JRE):\n';
          errorMsg += '• Ubuntu/Debian: sudo apt install default-jre\n';
          errorMsg += '• macOS: brew install openjdk\n';
          errorMsg += '• Windows: Download from java.com';
        } else if (result.type === 'CompilationError') {
          errorMsg += '\n📦 Java helper needs to be compiled first.\n';
          errorMsg += '\nPlease run this command in terminal:\n';
          errorMsg += '  cd java-helper && ./setup.sh\n';
          errorMsg += '\nThen restart the app.';
        } else if (result.type === 'ValidationError') {
          errorMsg += '\n⚠️ Please select a valid .accdb file.';
        }
        
        setMessage(errorMsg);
      }
    } catch (error) {
      setMessage(`❌ Unexpected error: ${error}`);
      setDatabaseData(null);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    if (!databaseData || !databaseData.tables) {
      setPdfError('Please upload a database file first.');
      return;
    }

    setPdfError('');
    setGeneratingPDF(true);

    try {
      const result = await window.electron.ipcRenderer.invoke('generate-wiring-diagram', {
        systemName: databaseData.fileName?.replace('.accdb', '').replace('.mdb', '') || 'Wiring Diagram',
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        pageNumber: 1,
        databaseData: databaseData.tables,
      });

      console.log('pdfpath', result);

      if (result.success) {
        setPdfPath(result.filePath);
        setMessage('✅ Wiring diagram generated successfully!');
      } else {
        const errMsg = result.error || 'Unknown error during PDF generation';
        setPdfError(`PDF generation failed: ${errMsg}`);
        setMessage(`⚠️ PDF generation failed: ${errMsg}`);
      }
    } catch (error) {
      const errMsg = String(error);
      setPdfError(`PDF generation failed: ${errMsg}`);
      setMessage(`⚠️ PDF generation failed: ${errMsg}`);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const handleGeneratePDF = async () => {
    setActiveTab('pdf'); // Switch to PDF tab immediately
    
    // If PDF already exists, just show it
    if (pdfPath) {
      return;
    }
    
    // Generate new PDF
    await generatePDF();
  };

  const handleExportPDF = async () => {
    if (!pdfPath) return;
    
    try {
      await window.electron.ipcRenderer.invoke('open-pdf', pdfPath);
      setMessage('✅ PDF opened successfully!');
    } catch (error) {
      setMessage(`❌ Error opening PDF: ${error}`);
    }
  };

  const handleUploadDifferent = () => {
    setDatabaseData(null);
    setUploadedFile('');
    setPdfPath('');
    setPdfError('');
    setMessage('');
    setActiveTab('database');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', fontSize: '28px', fontWeight: '700', margin: '0 0 5px 0' }}>
          Wiring Diagram Generator
        </h1>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
          Upload your database file (“.accdb”) to generate wiring diagrams automatically
        </p>
      </div>

      {/* Main Content */}
      {!databaseData ? (
        /* Upload Section */
        <div style={{ maxWidth: '600px', margin: '40px auto' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '2px dashed #d0d0d0',
            padding: '50px 40px',
            textAlign: 'center',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Upload size={40} color="#2196F3" />
            </div>
            
            <h2 style={{ color: '#333', margin: '0 0 10px 0', fontSize: '22px', fontWeight: '600' }}>
             Upload Access Database File (.accdb)
            </h2>
            
            <p style={{ color: '#888', margin: '0 0 30px 0', fontSize: '14px' }}>
              Click to browse your computer for a .accdb file
            </p>
            
            <button 
              type="button" 
              onClick={handleUploadDatabase}
              disabled={loading}
              style={{
                fontSize: '15px',
                padding: '12px 32px',
                backgroundColor: loading ? '#ccc' : '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                boxShadow: loading ? 'none' : '0 2px 8px rgba(33, 150, 243, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  Processing...
                </>
              ) : (
                'Choose Database File'
              )}
            </button>

            {/* Loading Overlay */}
            {loading && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                color: '#666',
                fontSize: '14px'
              }}>
                <Loader2 size={20} style={{ 
                  animation: 'spin 1s linear infinite',
                  display: 'inline-block',
                  marginRight: '10px',
                  verticalAlign: 'middle'
                }} />
                Reading database file...
              </div>
            )}
          </div>

          {/* Error Messages */}
          {message && message.includes('❌') && (
            <div style={{
              padding: '15px',
              marginTop: '20px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '8px',
              fontSize: '14px',
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              border: '1px solid #ef9a9a'
            }}>
              {message}
            </div>
          )}
        </div>
      ) : (
        /* Database Loaded - Show Tabs and Content */
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* File Info Bar */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Database size={28} color="#2196F3" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {databaseData.fileName}
                </h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>
                  {uploadedFile && `${(new Blob([uploadedFile]).size / 1024).toFixed(2)} KB`} • Loaded successfully
                </p>
              </div>
            </div>
            <button
              onClick={handleUploadDifferent}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#666',
                transition: 'all 0.2s ease'
              }}
            >
              Upload Different File
            </button>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <button
              onClick={() => setActiveTab('database')}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: activeTab === 'database' ? '#2196F3' : 'white',
                color: activeTab === 'database' ? 'white' : '#666',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'database' ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0px 2px 8px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Database size={20} />
              Database Tables
            </button>
            <button
              onClick={() => {
                // When clicking PDF Preview tab
                setActiveTab('pdf');
                // Generate wiring diagram PDF if not already generated
                if (!pdfPath && !generatingPDF && databaseData) {
                  generatePDF();
                }
              }}
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: activeTab === 'pdf' ? '#2196F3' : 'white',
                color: activeTab === 'pdf' ? 'white' : '#666',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: activeTab === 'pdf' ? '0 4px 12px rgba(33, 150, 243, 0.3)' : '0px 2px 8px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {generatingPDF ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Generating...
                </>
              ) : (
                <>
                  <FileText size={20} />
                  PDF Preview
                </>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
            minHeight: '500px'
          }}>
            {activeTab === 'database' ? (
              <DatabaseTables databaseData={databaseData!} />
            ) : (
              <PDFPreview 
                pdfPath={pdfPath}
                loading={generatingPDF}
                onExport={handleExportPDF}
                pdfError={pdfError}
              />
            )}
          </div>
        </div>
      )}
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
