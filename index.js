require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { generatePDF } = require('./utils/pdf');
const { sendEmail } = require('./utils/email');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook/typeform', async (req, res) => {
  try {
    const response = req.body.form_response;
    const answers = response.answers;

    const emailAnswer = answers.find(ans => ans.type === 'email');
    const prenomAnswer = answers.find(ans => ans.field?.ref === 'prenom');
    const nomAnswer = answers.find(ans => ans.field?.ref === 'nom');
    const dobAnswer = answers.find(ans => ans.field?.ref === 'ddn');

    const email = emailAnswer?.email || null;
    const prenom = prenomAnswer?.text || 'Utilisateur';
    const nom = nomAnswer?.text || 'Nom';
    const dob = dobAnswer?.date || 'Date de Naissance';

    if (!email) {
      console.error('Email manquant dans les réponses.');
      return res.status(400).send('Email manquant');
    }

    const pdfBuffer = await generatePDF({ prenom, nom, dob });
    await sendEmail(email, pdfBuffer);

    res.sendStatus(200);
  } catch (err) {
    console.error('Erreur lors du traitement:', err);
    res.status(500).send('Erreur interne du serveur');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});