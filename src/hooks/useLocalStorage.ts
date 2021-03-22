import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
	const [storage, setData] = useState<string>('');
	const { localStorage } = window;

	const setItem = useCallback(
		(data: string) => {
			localStorage.setItem(key, data);
		},
		[key, localStorage]
	);

	const getItem = useCallback(() => localStorage.getItem(key) || '', [key, localStorage]);

	useEffect(() => {
		const handleStorageUpdate = () => setData(getItem());

		window.addEventListener('storage', handleStorageUpdate);

		return () => {
			window.removeEventListener('storage', handleStorageUpdate);
		};
	}, []);

	return { storage, setItem };
};
