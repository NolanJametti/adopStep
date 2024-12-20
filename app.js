import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Obtenir le répertoire actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utilisation de body-parser pour analyser les données JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route pour enregistrer l'email
app.post('/api/save-email', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email manquant" });
    }

    // Ajout de l'email au fichier CSV
    const csvLine = `${email}\n`;
    fs.appendFile('emails.csv', csvLine, (err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'email" });
        }
        res.status(200).json({ message: "Email enregistré avec succès" });
    });
});


// Route pour récupérer les emails en JSON
app.get('/api/email', (req, res) => {
    fs.readFile('emails.csv', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la lecture des emails" });
        }

        // Transformation des lignes du fichier en tableau
        const emails = data.split('\n').filter(line => line.trim() !== '');
        res.status(200).json({ emails });
    });
});

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
