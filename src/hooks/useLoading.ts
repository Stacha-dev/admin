import { useContext } from 'react';
import { LoadingContext } from '../contexts';

const useLoading = () => useContext(LoadingContext);

export default useLoading;
