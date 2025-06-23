const puppeteer = require('puppeteer');

async function generatePDF({ prenom, nom, dob }) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            color: #333;
          }
          .header {
            background-color: #0073e6;
            color: white;
            padding: 10px;
          }
          .content {
            margin: 20px;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pass Sport</h1>
          <h2>Ruban Bleu - Saint Nazaire</h2>
        </div>
        <div class="content">
          <p><strong>Nom:</strong> ${nom}</p>
          <p><strong>Prénom:</strong> ${prenom}</p>
          <p><strong>Date de Naissance:</strong> ${dob}</p>
        </div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
}

module.exports = { generatePDF };