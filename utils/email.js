const nodemailer = require('nodemailer');
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

async function sendEmail(to, pdfBuffer) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Votre Pass Sport',
    text: 'Veuillez trouver ci-joint votre Pass Sport.',
    attachments: [
      {
        filename: 'PassSport.pdf',
        content: pdfBuffer
      }
    ]
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { generatePDF, sendEmail };