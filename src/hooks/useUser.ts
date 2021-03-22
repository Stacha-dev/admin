import { useContext } from 'react';
import { UserContext } from 'contexts';

const useUser = () => useContext(UserContext);

export default useUser;
