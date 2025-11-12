import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportUtils = {
  handleExportPDF: (activeTab, language) => {
    // Each tab's component must expose a getTableData() method; call, then use jsPDF
    const data = window[`get${activeTab}TableData`](language);
    const doc = new jsPDF();
    doc.text(`AuditDNA ${activeTab} Data`, 10, 10);
    doc.autoTable({ head: [data.headers], body: data.rows });
    doc.save(`AuditDNA_${activeTab}_${language}.pdf`);
  },
  handleExportEmail: (activeTab, language) => {
    const data = window[`get${activeTab}TableData`](language);
    const bodyText = data.rows.map(row => row.join(', ')).join('\n');
    window.location.href = `mailto:?subject=AuditDNA ${activeTab} â€” ${language}&body=${encodeURIComponent(bodyText)}`;
  },
  // CSV/Excel exports already handled in excel_export_component
};
