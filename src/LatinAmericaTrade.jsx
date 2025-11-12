import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

const t = {
  en: {
    title: 'Latin America Trade',
    subtitle: 'Complete trade finance and logistics platform',
    // ...all other translation keys
  },
  es: {
    title: 'Comercio América Latina',
    subtitle: 'Plataforma completa de financiamiento y logística',
    // ...all other translation keys in Spanish
  }
};

export default function LatinAmericaTrade() {
  const { language } = useLanguage();
  const text = t[language];
  // ... rest of code
}
