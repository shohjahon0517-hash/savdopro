const PDFDocument = require('pdfkit');

const generateReceiptText = (sale) => {
  const lines = [
    '=== Savdo Pro ===',
    'Sotuv cheki',
    `Sana: ${new Date(sale.createdAt).toLocaleString()}`,
    '------------------------------'
  ];

  sale.items.forEach((item) => {
    lines.push(`${item.name} x${item.quantity} = ${item.total} so'm`);
  });

  lines.push('------------------------------');
  lines.push(`Subtotal: ${sale.subtotal} so'm`);
  lines.push(`Chegirma: ${sale.discount} so'm`);
  lines.push(`Soliq: ${sale.tax} so'm`);
  lines.push(`Umumiy: ${sale.total} so'm`);
  lines.push(`Tolov turi: ${sale.paymentMethod}`);
  lines.push('Tashakkur!');

  return lines.join('\n');
};

const generateReceiptPDF = (sale) => {
  const doc = new PDFDocument({ size: 'A5', margin: 30 });
  const buffers = [];

  doc.on('data', (chunk) => buffers.push(chunk));

  doc.fontSize(18).text('Savdo Pro', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text('Sotuv cheki');
  doc.text(`Sana: ${new Date(sale.createdAt).toLocaleString()}`);
  doc.moveDown();

  sale.items.forEach((item) => {
    doc.text(`${item.name} x${item.quantity} - ${item.total} so'm`);
  });

  doc.moveDown();
  doc.text(`Subtotal: ${sale.subtotal} so'm`);
  doc.text(`Chegirma: ${sale.discount} so'm`);
  doc.text(`Soliq: ${sale.tax} so'm`);
  doc.text(`Umumiy: ${sale.total} so'm`);
  doc.text(`Tolov turi: ${sale.paymentMethod}`);
  doc.end();

  return Buffer.concat(buffers);
};

module.exports = { generateReceiptText, generateReceiptPDF };
