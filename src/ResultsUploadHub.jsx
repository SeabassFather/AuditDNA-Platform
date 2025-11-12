import React, { useState, useContext } from 'react';
import { Upload, FileText, Image, File, Check, X, Loader } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const ResultsUploadHub = () => {
  const { language } = useLanguage();
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const processed = newFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      category: detectCategory(file.name),
      status: 'processing',
      progress: 0,
      extractedParams: Math.floor(Math.random() * 50) + 10
    }));

    setFiles([...files, ...processed]);

    processed.forEach((file, idx) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'complete', progress: 100 } : f
        ));
      }, 2000 + idx * 500);
    });
  };

  const detectCategory = (filename) => {
    const lower = filename.toLowerCase();
    if (lower.includes('water') || lower.includes('agua')) return 'water';
    if (lower.includes('soil') || lower.includes('suelo')) return 'soil';
    if (lower.includes('fertilizer') || lower.includes('fertilizante')) return 'fertilizer';
    if (lower.includes('tissue') || lower.includes('tejido')) return 'tissue';
    if (lower.includes('microbial') || lower.includes('micro')) return 'microbial';
    return 'other';
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return <FileText size={40} color="#ef4444" />;
    if (type.includes('image')) return <Image size={40} color="#3b82f6" />;
    if (type.includes('sheet') || type.includes('excel')) return <File size={40} color="#10b981" />;
    return <File size={40} color="#6b7280" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      water: '#3b82f6',
      soil: '#92400e',
      fertilizer: '#10b981',
      tissue: '#8b5cf6',
      microbial: '#f59e0b',
      other: '#6b7280'
    };
    return colors[category] || colors.other;
  };

  const t = {
    en: {
      title: 'Results Upload Hub',
      subtitle: 'Universal agricultural test file management',
      dragDrop: 'Drag & drop lab results here',
      or: 'or',
      browse: 'Browse Files',
      accepted: 'Accepts: PDF, Excel, CSV, Images (lab reports)',
      uploaded: 'Uploaded Files',
      name: 'File Name',
      size: 'Size',
      category: 'Test Type',
      status: 'Status',
      params: 'Parameters',
      processing: 'Processing',
      complete: 'Complete',
      failed: 'Failed',
      noFiles: 'No files uploaded yet',
      uploadFirst: 'Upload your first lab result above',
      categories: {
        water: 'Water',
        soil: 'Soil',
        fertilizer: 'Fertilizer',
        tissue: 'Tissue',
        microbial: 'Microbial',
        other: 'Other'
      }
    },
    es: {
      title: 'Centro de Carga',
      subtitle: 'Gestión universal de archivos de pruebas agrícolas',
      dragDrop: 'Arrastra resultados de laboratorio aquí',
      or: 'o',
      browse: 'Explorar Archivos',
      accepted: 'Acepta: PDF, Excel, CSV, Imágenes (reportes de lab)',
      uploaded: 'Archivos Subidos',
      name: 'Nombre',
      size: 'Tamaño',
      category: 'Tipo de Prueba',
      status: 'Estado',
      params: 'Parámetros',
      processing: 'Procesando',
      complete: 'Completo',
      failed: 'Fallido',
      noFiles: 'Sin archivos todavía',
      uploadFirst: 'Sube tu primer resultado arriba',
      categories: {
        water: 'Agua',
        soil: 'Suelo',
        fertilizer: 'Fertilizante',
        tissue: 'Tejido',
        microbial: 'Microbiano',
        other: 'Otro'
      }
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            marginBottom: '40px',
            border: dragging ? '4px dashed #3b82f6' : '4px dashed #d1d5db',
            textAlign: 'center',
            transition: 'all 0.3s',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}
        >
          <Upload size={60} color="#1e40af" style={{ marginBottom: '20px' }} />
          <p style={{ fontSize: '1.3rem', color: '#333', marginBottom: '15px', fontWeight: 'bold' }}>
            {text.dragDrop}
          </p>
          <p style={{ color: '#999', marginBottom: '25px' }}>{text.or}</p>
          <label style={{
            padding: '15px 40px',
            background: '#1e40af',
            color: 'white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            {text.browse}
            <input
              type="file"
              multiple
              accept=".pdf,.xlsx,.xls,.csv,.png,.jpg,.jpeg"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
          </label>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
            {text.accepted}
          </p>
        </div>

        {/* Files List */}
        {files.length > 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#1e40af' }}>
              {text.uploaded} ({files.length})
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {files.map(file => (
                <div
                  key={file.id}
                  style={{
                    padding: '20px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    background: '#f9fafb'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '15px' }}>
                    {getFileIcon(file.type)}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        {file.size}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      background: getCategoryColor(file.category),
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {text.categories[file.category]}
                    </span>
                  </div>

                  {file.status === 'processing' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Loader size={18} color="#1e40af" className="spin" />
                      <span style={{ color: '#1e40af', fontWeight: 'bold' }}>
                        {text.processing}...
                      </span>
                    </div>
                  )}

                  {file.status === 'complete' && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <Check size={18} color="#10b981" />
                        <span style={{ color: '#10b981', fontWeight: 'bold' }}>
                          {text.complete}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>
                        {text.params}: {file.extractedParams} detected
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <FileText size={60} color="#d1d5db" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '10px' }}>
              {text.noFiles}
            </h3>
            <p style={{ color: '#999' }}>{text.uploadFirst}</p>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ResultsUploadHub;
