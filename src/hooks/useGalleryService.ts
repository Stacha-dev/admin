import { useCallback, useMemo } from 'react';
import { useLoading } from './index';
import { GalleryService } from '../services/Tardis';

const useGalleryService = () => {
	const { setLoading } = useLoading();
	const galleryService = useMemo(() => new GalleryService(), []);

	const handleError = useCallback(
		(error: Error) => {
			console.error(error);
			setLoading(false);
		},
		[setLoading]
	);

	const fetchOneById = useCallback(
		async (id: number) => {
			try {
				setLoading(true);
				const response = await galleryService.getOneById(id);
				setLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, setLoading]
	);

	const fetchByTag = useCallback(
		async (id: number) => {
			try {
				setLoading(true);
				const response = await galleryService.getByTag(id);
				setLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, setLoading]
	);

	return { fetchOneGalleryById: fetchOneById, fetchGalleryByTag: fetchByTag };
};

export default useGalleryService;
