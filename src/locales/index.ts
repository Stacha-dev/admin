import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'cs',
	fallbackLng: 'cs',
	debug: process.env.NODE_ENV !== 'production',
	interpolation: {
		escapeValue: false,
	},
	keySeparator: '.',
	react: {
		wait: true,
	},
	resources: {
		cs: {
			translation: {
				form: {
					submit: 'Odeslat',
				},
				common: {
					login: 'Přihlášení',
				},
				login: {
					login: 'Přihlášení',
					username: 'Jméno',
					password: 'Heslo',
				},
			},
		},
	},
});

export default i18n;
