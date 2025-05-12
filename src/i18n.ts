import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: { translation: require('../src/data/locales/en/translation.json') },
            ru: { translation: require('../src/data//locales/ru/translation.json') },
        }
    });

export default i18n;