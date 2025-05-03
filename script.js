// ==UserScript==
// @name         NLLB Local Translator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  SillyTavern plugin: use local NLLB translator
// @author       Anton
// @match        http://127.0.0.1:8000/*
// @match        http://localhost:8000/*
// @grant        none
// ==/UserScript==

(function () {
  console.log("[NLLB Translator] Script aktiv");

  'use strict';

  // Warte auf SillyTavern Plugin-System
  function waitForST(callback) {
    const check = () => {
      if (typeof window.ExtensionPlugin !== 'undefined' &&
          typeof window.ExtensionPlugin.addTranslator === 'function') {
        callback();
      } else {
        setTimeout(check, 1000);
      }
    };
    check();
  }

  waitForST(() => {
    window.ExtensionPlugin.addTranslator({
      id: 'nllb-local',
      label: 'NLLB Local',
      type: 'custom',
      async translate(text, lang) {
        try {
          const response = await fetch('http://127.0.0.1:5007/translate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
          });

          const data = await response.json();
          return data.translated;
        } catch (error) {
          console.error('[NLLB Translation error]:', error);
          return '[Translation error]';
        }
      }
    });
  });
})();
