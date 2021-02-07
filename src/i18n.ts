import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n.use(Backend)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: '/admin/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'cs',
		debug: process.env.NODE_ENV !== 'production',
		interpolation: {
			escapeValue: false,
		},
		keySeparator: '.',
	});

export default i18n;