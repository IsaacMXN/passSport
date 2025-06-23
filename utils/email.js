const nodemailer = require('nodemailer');

async function sendEmail(to, pdfBuffer, prenom, nom, dateNaissance) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"Ruban Bleu" <no-reply@rubanbleu.com>',
    to,
    subject: "Votre Pass Sport",
    text: `Bonjour ${prenom} ${nom},\n\nVeuillez trouver ci-joint votre Pass Sport.\n\nDate de naissance: ${dateNaissance}`,
    attachments: [
      {
        filename: 'Pass_Sport.pdf',
        content: pdfBuffer
      }
    ]
  });
}

module.exports = { sendEmail };