import { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';

interface PDFPreviewProps {
  pdfPath: string;
  loading?: boolean;
  onExport: () => void;
  pdfError?: string;
}

export function PDFPreview({ pdfPath, loading = false, onExport, pdfError }: PDFPreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string>('');
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');

  // Load PDF as base64 data URL
  useEffect(() => {
    if (!pdfPath) {
      setPdfDataUrl('');
      return;
    }

    const loadPDF = async () => {
      try {
        const result = await window.electron.ipcRenderer.invoke('read-pdf-file', pdfPath);
        if (result.success) {
          setPdfDataUrl(`data:application/pdf;base64,${result.data}`);
          setError('');
        } else {
          setError('Failed to load PDF file');
        }
      } catch (err) {
        setError('Failed to load PDF file');
        console.error('PDF load error:', err);
      }
    };

    loadPDF();
  }, [pdfPath]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleFullScreen = () => setZoom(100);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '15px',
        marginBottom: '20px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        {/* Zoom Controls */}
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            style={{
              padding: '8px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '6px',
              cursor: zoom <= 50 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: zoom <= 50 ? 0.5 : 1
            }}
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
          
          <span style={{ 
            fontSize: '14px', 
            fontWeight: '500', 
            color: '#666', 
            minWidth: '60px', 
            textAlign: 'center' 
          }}>
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            style={{
              padding: '8px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '6px',
              cursor: zoom >= 200 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              opacity: zoom >= 200 ? 0.5 : 1
            }}
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>
          
          <button
            onClick={handleFullScreen}
            style={{
              padding: '8px',
              backgroundColor: '#f5f5f5',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Reset Zoom"
          >
            <Maximize2 size={18} />
          </button>
        </div> */}

        {/* Right Side Controls */}
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
         
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              disabled
              style={{
                padding: '8px',
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '6px',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.5
              }}
            >
              <ChevronLeft size={18} />
            </button>
            
            <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
              Page {currentPage}
            </span>
            
            <button
              disabled
              style={{
                padding: '8px',
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '6px',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                opacity: 0.5
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            onClick={onExport}
            disabled={loading || !pdfPath}
            style={{
              padding: '10px 24px',
              backgroundColor: loading || !pdfPath ? '#ccc' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading || !pdfPath ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: loading || !pdfPath ? 'none' : '0 2px 8px rgba(33, 150, 243, 0.3)'
            }}
          >
            <Download size={18} />
            Export PDF
          </button>
        </div> */}
      </div>

      {/* PDF Viewer */}
      <div style={{
        flex: 1,
        backgroundColor: '#525659',
        borderRadius: '8px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
        position: 'relative'
      }}>
        {loading ? (
          /* Loading / Generating State */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            color: 'white'
          }}>
            <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: '16px', margin: 0 }}>Generating PDF...</p>
          </div>

        ) : pdfError ? (
          /* PDF Generation Failed — show error inside PDF tab */
          <div style={{
            textAlign: 'center',
            color: 'white',
            padding: '40px',
            maxWidth: '600px'
          }}>
            <div style={{
              backgroundColor: '#c62828',
              borderRadius: '10px',
              padding: '28px 32px',
              marginBottom: '16px'
            }}>
              <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 12px 0' }}>
                ❌ PDF Generation Failed
              </p>
              <p style={{
                fontSize: '13px',
                opacity: 0.9,
                margin: 0,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                textAlign: 'left'
              }}>
                {pdfError}
              </p>
            </div>
            <p style={{ fontSize: '13px', opacity: 0.7, margin: 0 }}>
              Click the "PDF Preview" tab again to retry.
            </p>
          </div>

        ) : pdfDataUrl ? (
          /* PDF loaded — show in iframe (works on both Windows and Linux) */
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto'
          }}>
            <iframe
              src={pdfDataUrl}
              style={{
                width: `${zoom}%`,
                height: `${zoom}%`,
                minWidth: '800px',
                minHeight: '600px',
                border: 'none',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                borderRadius: '4px'
              }}
              title="PDF Preview"
            />
          </div>

        ) : (
          /* No PDF yet (waiting for generation) */
          <div style={{
            textAlign: 'center',
            color: 'white',
            padding: '40px'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>No PDF generated yet</p>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>The PDF will be generated automatically after database upload</p>
          </div>
        )}

        {/* Read error (file could not be read after generation) */}
        {error && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#f44336',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            whiteSpace: 'nowrap'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
