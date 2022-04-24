const path = require('path');
const i18next = require('i18next');
const i18nextBackend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');

const initIl8n = () => {
    i18next
        .use(i18nextBackend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
            backend: {
                loadPath: `${path.resolve('./')}/locales/{{lng}}/{{ns}}.json`
            },
            fallbackLng: 'en',
            preload: ['en']
        });

    return i18nextMiddleware.handle(i18next)
}

module.exports = initIl8n;
