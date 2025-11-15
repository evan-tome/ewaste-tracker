import db from '../../config/db.js';
import { Parser as Json2csvParser } from 'json2csv';
import PDFDocument from 'pdfkit';

async function exportView(viewName) {
  const [rows] = await db.query(`SELECT * FROM ${viewName}`);
  return rows;
}

export async function exportViewCSV(req, res) {
  try {
    const { view } = req.params;

    const rows = await exportView(view);

    const parser = new Json2csvParser();
    const csv = parser.parse(rows);

    res.setHeader('Content-Disposition', `attachment; filename=${view}.csv`);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (err) {
    console.error('CSV Export Error:', err);
    res.status(500).json({ message: 'Error exporting view as CSV' });
  }
}

export async function exportViewPDF(req, res) {
  try {
    const { view } = req.params;

    const rows = await exportView(view);

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=${view}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    doc.fontSize(20).text(`View Export: ${view}`, { underline: true });
    doc.moveDown();

    rows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        doc.fontSize(12).text(`${key}: ${row[key]}`);
      });
      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error('PDF Export Error:', err);
    res.status(500).json({ message: 'Error exporting view as PDF' });
  }
}