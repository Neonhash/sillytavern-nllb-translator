const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5007;

app.use(bodyParser.json());

// Startseite definieren
app.get('/', (req, res) => {
  res.send('NLLB Local Translator läuft auf Port ' + PORT);
});

console.log("NLLB Local Translator läuft auf http://127.0.0.1:" + PORT);

// Plugin Definition
module.exports = {
  info: {
    id: 'nllb-local',
    name: 'NLLB Local Translator',
    description: 'Lokaler NLLB-Übersetzer',
    pluginType: 'translator',
    type: 'server',
  },
  init: async (router) => {
    router.post('/translate', async (req, res) => {
      const { text, targetLang } = req.body;
      try {
        console.log(`Übersetze Text: ${text} in Sprache: ${targetLang}`);
        res.json({ translatedText: `Übersetzter Text: ${text}` });
      } catch (err) {
        console.error("Übersetzungsfehler:", err);
        res.status(500).json({ error: 'Übersetzungsfehler' });
      }
    });
  }
};

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
