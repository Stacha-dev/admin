import { useContext } from 'react';
import { StoreContext } from '../contexts';

const useStore = () => useContext(StoreContext);

export default useStore;
