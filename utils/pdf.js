const puppeteer = require('puppeteer');

async function generatePDF({ prenom, nom, dateNaissance }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 2em; background-color: #f0f0f0; }
          h1 { color: #003366; }
          p { color: #333; }
          .pass-sport { border: 2px solid #003366; padding: 1em; background-color: #ffffff; }
        </style>
      </head>
      <body>
        <div class="pass-sport">
          <h1>Pass Sport</h1>
          <p>Nom: ${nom}</p>
          <p>Prénom: ${prenom}</p>
          <p>Date de Naissance: ${dateNaissance}</p>
          <p>Merci de votre confiance!</p>
        </div>
      </body>
    </html>
  `);

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();
  return pdfBuffer;
}

module.exports = { generatePDF };