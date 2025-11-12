// ================================================================
// DOCUMENT GENERATOR FOR CM PRODUCTS INTERNATIONAL
// ================================================================
// Date: 2025-11-12 06:30:52 UTC
// Author: SeabassFather
// Purpose: Generate shipping/finance documents
// Formats: PDF export, Email integration
// ================================================================

import jsPDF from 'jspdf';
import 'jspdf-autotable';

// GENERATE BILL OF LADING (BOL)
export const generateBillOfLading = (orderData, cart) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const bolNumber = `BOL-CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

  // HEADER
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL OF LADING', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`BOL #: ${bolNumber}`, 20, 35);
  doc.text(`Date: ${date}`, 20, 42);

  // SHIPPER
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SHIPPER:', 20, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('CM Products International', 20, 62);
  doc.text('Warehouse, Michoacán, Mexico', 20, 68);
  doc.text('+52-443-XXX-XXXX', 20, 74);

  // CONSIGNEE
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CONSIGNEE:', 120, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(orderData.customerName || 'N/A', 120, 62);
  doc.text(orderData.deliveryAddress || 'N/A', 120, 68);
  doc.text(orderData.phone || 'N/A', 120, 74);

  // CARGO TABLE
  const tableData = cart.map((item, index) => [
    index + 1,
    `${item.nameMX} / ${item.nameUS}`,
    item.hsCode,
    item.quantity,
    `${item.quantity * item.caseWeight} lbs`,
    Math.ceil(item.quantity / item.casesPerPallet)
  ]);

  doc.autoTable({
    startY: 85,
    head: [['#', 'Description', 'HS Code', 'Cases', 'Weight', 'Pallets']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9 }
  });

  // TOTALS
  const finalY = doc.lastAutoTable.finalY + 10;
  const totalCases = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cart.reduce((sum, item) => sum + (item.quantity * item.caseWeight), 0);
  const totalPallets = Math.ceil(totalCases / 24);

  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL CASES: ${totalCases}`, 20, finalY);
  doc.text(`TOTAL WEIGHT: ${totalWeight} lbs`, 20, finalY + 7);
  doc.text(`TOTAL PALLETS: ${totalPallets}`, 20, finalY + 14);

  // SPECIAL INSTRUCTIONS
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('SPECIAL INSTRUCTIONS: Keep frozen at 28-32°F. USDA inspected. Handle with care.', 20, finalY + 25);

  // SIGNATURES
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Shipper Signature: ___________________', 20, finalY + 40);
  doc.text('Carrier Signature: ___________________', 20, finalY + 52);
  doc.text('Receiver Signature: ___________________', 20, finalY + 64);

  // FOOTER
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('CM Products International | Mexico → USA Import Specialists', 105, 285, { align: 'center' });

  return doc;
};

// GENERATE COMMERCIAL INVOICE
export const generateCommercialInvoice = (orderData, cart, totals) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const invoiceNumber = `INV-CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

  // HEADER
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('COMMERCIAL INVOICE', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Invoice #: ${invoiceNumber}`, 20, 35);
  doc.text(`Date: ${date}`, 20, 42);
  doc.text(`Payment Terms: ${orderData.terms || 'NET 60'}`, 20, 49);
  doc.text(`Incoterms: ${orderData.incoterms || 'FOB Los Angeles'}`, 20, 56);

  // SELLER
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SELLER:', 20, 70);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('CM Products International', 20, 77);
  doc.text('Michoacán, Mexico', 20, 83);
  doc.text('RFC: CMPI-XXXXXXXX', 20, 89);

  // BUYER
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BUYER:', 120, 70);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(orderData.customerName || 'N/A', 120, 77);
  doc.text(orderData.deliveryAddress || 'N/A', 120, 83);
  doc.text(orderData.taxId || 'EIN: XX-XXXXXXX', 120, 89);

  // ITEMS TABLE
  const tableData = cart.map((item, index) => [
    index + 1,
    `${item.nameMX} / ${item.nameUS}`,
    item.hsCode,
    item.quantity,
    `${item.caseWeight} lbs`,
    `$${(item.fobLA * item.caseWeight).toFixed(2)}`,
    `$${(item.quantity * item.fobLA * item.caseWeight).toFixed(2)}`
  ]);

  doc.autoTable({
    startY: 100,
    head: [['#', 'Description', 'HS Code', 'Qty', 'Unit Wt', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9 }
  });

  // TOTALS
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'normal');
  doc.text(`Subtotal (FOB LA):`, 120, finalY);
  doc.text(`$${totals.subtotal.toFixed(2)}`, 180, finalY, { align: 'right' });
  
  doc.text(`Freight:`, 120, finalY + 7);
  doc.text(`$${totals.freight.toFixed(2)}`, 180, finalY + 7, { align: 'right' });
  
  doc.text(`Insurance (0.5%):`, 120, finalY + 14);
  doc.text(`$${totals.insurance.toFixed(2)}`, 180, finalY + 14, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`TOTAL:`, 120, finalY + 24);
  doc.text(`$${totals.total.toFixed(2)} USD`, 180, finalY + 24, { align: 'right' });

  // FOOTER
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.text('CM Products International | Authorized Representative', 105, 285, { align: 'center' });

  return doc;
};

// GENERATE MANIFEST
export const generateManifest = (orderData, cart) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const manifestNumber = `MNF-CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CARGO MANIFEST', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Manifest #: ${manifestNumber}`, 20, 35);
  doc.text(`Date: ${date}`, 20, 42);
  doc.text(`Port of Loading: Michoacán, Mexico`, 20, 49);
  doc.text(`Port of Discharge: ${orderData.deliveryAddress || 'N/A'}`, 20, 56);

  const tableData = cart.map((item, index) => [
    index + 1,
    `${item.nameMX} / ${item.nameUS} - Frozen Beef`,
    item.hsCode,
    item.quantity,
    'Cases',
    `${item.quantity * item.caseWeight} lbs`,
    Math.ceil(item.quantity / item.casesPerPallet),
    `$${(item.quantity * item.fobLA * item.caseWeight).toFixed(2)}`,
    'Mexico'
  ]);

  doc.autoTable({
    startY: 70,
    head: [['#', 'Description', 'HS Code', 'Qty', 'Unit', 'Weight', 'Pallets', 'Value', 'Origin']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8 }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  const totalCases = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cart.reduce((sum, item) => sum + (item.quantity * item.caseWeight), 0);
  const totalValue = cart.reduce((sum, item) => sum + (item.quantity * item.fobLA * item.caseWeight), 0);

  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL CASES: ${totalCases}`, 20, finalY);
  doc.text(`TOTAL WEIGHT: ${totalWeight} lbs`, 20, finalY + 7);
  doc.text(`TOTAL VALUE: $${totalValue.toFixed(2)} USD`, 20, finalY + 14);

  return doc;
};

// GENERATE PACKING LIST
export const generatePackingList = (orderData, cart) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const plNumber = `PL-CM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('PACKING LIST', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Packing List #: ${plNumber}`, 20, 35);
  doc.text(`Date: ${date}`, 20, 42);
  doc.text(`Shipper: CM Products International`, 20, 49);
  doc.text(`Consignee: ${orderData.customerName || 'N/A'}`, 20, 56);

  let palletNumber = 0;
  const palletData = [];

  cart.forEach(item => {
    const palletsNeeded = Math.ceil(item.quantity / item.casesPerPallet);
    for (let i = 0; i < palletsNeeded; i++) {
      palletNumber++;
      const casesOnPallet = i < palletsNeeded - 1 ? item.casesPerPallet : item.quantity - (i * item.casesPerPallet);
      palletData.push([
        palletNumber,
        casesOnPallet,
        `${casesOnPallet * item.caseWeight} lbs`,
        '48x40x48 in',
        `${item.nameMX} / ${item.nameUS} - ${casesOnPallet} cases @ ${item.caseWeight} lbs each`
      ]);
    }
  });

  doc.autoTable({
    startY: 70,
    head: [['Pallet #', 'Cases', 'Weight', 'Dimensions', 'Contents']],
    body: palletData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 8 }
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  const totalCases = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = cart.reduce((sum, item) => sum + (item.quantity * item.caseWeight), 0);

  doc.setFont('helvetica', 'bold');
  doc.text(`TOTAL PALLETS: ${palletNumber}`, 20, finalY);
  doc.text(`TOTAL CASES: ${totalCases}`, 20, finalY + 7);
  doc.text(`TOTAL WEIGHT: ${totalWeight} lbs`, 20, finalY + 14);

  return doc;
};

// GENERATE CERTIFICATE OF ORIGIN (USMCA)
export const generateCertificateOfOrigin = (orderData, cart) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();
  const certNumber = `USMCA-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('USMCA CERTIFICATE OF ORIGIN', 105, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Certificate #: ${certNumber}`, 20, 35);
  doc.text(`Date: ${date}`, 20, 42);

  doc.setFont('helvetica', 'bold');
  doc.text('EXPORTER:', 20, 55);
  doc.setFont('helvetica', 'normal');
  doc.text('CM Products International, Michoacán, Mexico', 20, 62);

  doc.setFont('helvetica', 'bold');
  doc.text('PRODUCER:', 20, 75);
  doc.setFont('helvetica', 'normal');
  doc.text('Beef Processor S.A. de C.V., Michoacán, Mexico', 20, 82);

  doc.setFont('helvetica', 'bold');
  doc.text('IMPORTER:', 20, 95);
  doc.setFont('helvetica', 'normal');
  doc.text(orderData.customerName || 'N/A', 20, 102);

  const itemData = cart.map((item, index) => [
    index + 1,
    `${item.nameMX} / ${item.nameUS}`,
    item.hsCode,
    item.quantity,
    'A (Wholly obtained in Mexico)',
    'Mexico'
  ]);

  doc.autoTable({
    startY: 115,
    head: [['#', 'Description', 'HS Code', 'Qty', 'Origin Criterion', 'Country']],
    body: itemData,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9 }
  });

  const finalY = doc.lastAutoTable.finalY + 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('CERTIFICATION:', 20, finalY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  const certText = doc.splitTextToSize(
    'I certify that the goods described above qualify as originating goods under the United States-Mexico-Canada Agreement (USMCA).',
    170
  );
  doc.text(certText, 20, finalY + 7);

  doc.text('Certifier Name: CM Products International', 20, finalY + 25);
  doc.text('Title: Export Manager', 20, finalY + 32);
  doc.text('Signature: _______________________', 20, finalY + 39);
  doc.text(`Date: ${date}`, 20, finalY + 46);

  return doc;
};

// DOWNLOAD ALL DOCUMENTS AS ZIP
export const downloadAllDocuments = (orderData, cart, totals) => {
  const bol = generateBillOfLading(orderData, cart);
  const invoice = generateCommercialInvoice(orderData, cart, totals);
  const manifest = generateManifest(orderData, cart);
  const packingList = generatePackingList(orderData, cart);
  const certOrigin = generateCertificateOfOrigin(orderData, cart);

  bol.save('Bill_of_Lading.pdf');
  setTimeout(() => invoice.save('Commercial_Invoice.pdf'), 500);
  setTimeout(() => manifest.save('Manifest.pdf'), 1000);
  setTimeout(() => packingList.save('Packing_List.pdf'), 1500);
  setTimeout(() => certOrigin.save('Certificate_of_Origin.pdf'), 2000);
};

export default {
  generateBillOfLading,
  generateCommercialInvoice,
  generateManifest,
  generatePackingList,
  generateCertificateOfOrigin,
  downloadAllDocuments
};