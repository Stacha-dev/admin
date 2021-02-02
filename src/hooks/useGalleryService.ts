import { useCallback, useMemo } from 'react';
import { useLoading, useUser } from './index';
import { GalleryService } from '../services/Tardis';

const useGalleryService = () => {
	const { setLoading } = useLoading();
	const { user } = useUser();
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

	const create = useCallback(
		async (title: string, description: string, tag?: number) => {
			try {
				setLoading(true);
				const response = await galleryService.create({ title, description, tag }, user.token);
				setLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, setLoading, user]
	);

	return { fetchOneGalleryById: fetchOneById, fetchGalleryByTag: fetchByTag, createGallery: create };
};

export default useGalleryService;
