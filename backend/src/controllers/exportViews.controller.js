import db from '../../config/db.js';
import { Parser as Json2csvParser } from 'json2csv';
import PDFDocument from 'pdfkit';

// Fetch all rows from a database view.
async function exportView(viewName) {
  const [rows] = await db.query(`SELECT * FROM ${viewName}`); // Query all data from the requested view
  return rows;
}

// Export CSV
export async function exportViewCSV(req, res) {
  try {
    const { view } = req.params;

    const rows = await exportView(view);

    // Convert JSON rows to CSV
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

// Export PDF
export async function exportViewPDF(req, res) {
  try {
    const { view } = req.params;

    const rows = await exportView(view);

    // Set headers for PDF download
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename=${view}.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // Title section
    doc.fontSize(20).text(`View Export: ${view}`, { underline: true });
    doc.moveDown();

    // Write each record to the PDF
    rows.forEach((row) => {
      Object.keys(row).forEach((key) => {
        doc.fontSize(12).text(`${key}: ${row[key]}`);
      });
      doc.moveDown(); // spacing between records
    });

    doc.end();
  } catch (err) {
    console.error('PDF Export Error:', err);
    res.status(500).json({ message: 'Error exporting view as PDF' });
  }
}