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
				menu: {
					login: 'Přihlášení',
					dashboard: 'Home',
					slideshow: 'Slideshow',
				},
				form: {
					submit: 'Odeslat',
					upload: 'Nahrát',
				},
				pages: {
					login: {
						login: 'Přihlášení',
						username: 'Jméno',
						password: 'Heslo',
					},
					slideshow: {
						upload: 'Nahrát',
						content: 'Obsah',
						delete: 'Smazat',
					},
				},
			},
		},
	},
});

export default i18n;
