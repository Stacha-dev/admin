import { useContext } from 'react';
import { LocaleContext } from 'contexts';

const useLocale = () => useContext(LocaleContext);

export default useLocale;
