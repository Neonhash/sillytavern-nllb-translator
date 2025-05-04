// ==UserScript==
// @name         NLLB Local Translator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  SillyTavern plugin: use local NLLB translator
// @author       Anton
// @match        *://localhost:8000/*
// @match        *://localhost:5007/*
// @grant        none
// ==/UserScript==

module.exports = {

  info: {
    id: 'nllb-translator',
    name: 'NLLB Local Translator',
    description: 'Lokaler Übersetzer über NLLB API auf Port 5007',
  },


  init: async (router) => {
    router.post('/translate', async (req, res) => {
      try {
        const response = await fetch('http://127.0.0.1:5007/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: req.body.text })
        });
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error('[NLLB Plugin] Fehler:', error);
        res.status(500).json({ error: 'Übersetzungsfehler' });
      }
    });
  },
};

