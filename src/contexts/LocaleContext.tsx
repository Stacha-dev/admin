import React, { createContext, useState } from 'react';

interface LocaleContextValues {
	locale: string;
	setLocale: React.Dispatch<React.SetStateAction<string>>;
}

const LocaleContext = createContext<LocaleContextValues>({} as LocaleContextValues);

const LocaleProvider: React.FC = ({ children }: any) => {
	const [locale, setLocale] = useState('default');

	return (
		<LocaleProvider.Provider
			value={{
				locale,
				setLocale,
			}}>
			{children}
		</LocaleProvider.Provider>
	);
};

export default LocaleContext;
export { LocaleProvider };
