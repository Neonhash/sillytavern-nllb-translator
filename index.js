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
        res.json({ translatedText: `Übersetzter Text: ${text}` });
      } catch (err) {
        res.status(500).json({ error: 'Übersetzungsfehler' });
      }
    });
  }
};
