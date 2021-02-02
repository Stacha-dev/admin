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
					realizations: 'Realizace',
					media: 'Média',
					press: 'Press',
				},
				form: {
					submit: 'Odeslat',
					upload: 'Nahrát',
				},
				page: {
					login: {
						login: 'Přihlášení',
						username: 'Jméno',
						password: 'Heslo',
					},
					gallery: {
						upload: 'Nahrát',
						content: 'Obsah',
						title: 'Titulek',
						description: 'Popis',
						action: {
							delete: 'Smazat',
							up: 'Nahoru',
							down: 'Dolů',
							detail: 'Detail',
						},
					},
				},
			},
		},
	},
});

export default i18n;
