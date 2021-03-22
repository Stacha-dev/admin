import { useContext } from 'react';
import { ToastContext } from 'contexts';

const useUser = () => useContext(ToastContext);

export default useUser;
