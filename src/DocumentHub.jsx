import React, { useState } from 'react';
import { FileText, Upload, Download, Edit, Trash2, Send } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const DocumentHub = () => {
  const { language } = useLanguage();
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Organic Certification - USDA.pdf', type: 'Certification', size: '2.3 MB', date: '2024-10-15', status: 'Signed', signers: 3 },
    { id: 2, name: 'Purchase Agreement - Walmart MX.pdf', type: 'Contract', size: '1.8 MB', date: '2024-10-20', status: 'Pending', signers: 2 },
    { id: 3, name: 'PrimusGFS Audit Report.pdf', type: 'Audit', size: '4.5 MB', date: '2024-10-25', status: 'Signed', signers: 4 },
    { id: 4, name: 'Export License - Chile.pdf', type: 'License', size: '980 KB', date: '2024-11-01', status: 'Draft', signers: 0 }
  ]);

  const templates = [
    { id: 1, name: 'Purchase Order', category: 'Trade' },
    { id: 2, name: 'Supply Agreement', category: 'Contract' },
    { id: 3, name: 'Certificate of Origin', category: 'Export' },
    { id: 4, name: 'Phytosanitary Certificate', category: 'Export' },
    { id: 5, name: 'Invoice Template', category: 'Finance' }
  ];

  const getStatusColor = (status) => {
    if (status === 'Signed') return { bg: '#d1fae5', text: '#065f46' };
    if (status === 'Pending') return { bg: '#fef3c7', text: '#92400e' };
    return { bg: '#f3f4f6', text: '#6b7280' };
  };

  const t = {
    en: {
      title: 'Document Hub',
      subtitle: 'E-signature, contracts & compliance management',
      myDocs: 'My Documents',
      templates: 'Document Templates',
      uploadNew: 'Upload New',
      name: 'Document Name',
      type: 'Type',
      size: 'Size',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      signers: 'Signers',
      useTemplate: 'Use Template',
      download: 'Download',
      edit: 'Edit',
      delete: 'Delete',
      send: 'Send for Signature'
    },
    es: {
      title: 'Centro de Documentos',
      subtitle: 'Firma electrÃ³nica, contratos y cumplimiento',
      myDocs: 'Mis Documentos',
      templates: 'Plantillas',
      uploadNew: 'Subir Nuevo',
      name: 'Nombre',
      type: 'Tipo',
      size: 'TamaÃ±o',
      date: 'Fecha',
      status: 'Estado',
      actions: 'Acciones',
      signers: 'Firmantes',
      useTemplate: 'Usar Plantilla',
      download: 'Descargar',
      edit: 'Editar',
      delete: 'Eliminar',
      send: 'Enviar para Firma'
    }
  };

  const text = t[language];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{text.title}</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>{text.subtitle}</p>
        </div>
        {/* ...rest unchanged... */}
        {/* (PASTE THE REST OF YOUR CODE HERE) */}
      </div>
    </div>
  );
};

export default DocumentHub;
