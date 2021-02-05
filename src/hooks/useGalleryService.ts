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

	const fetchById = useCallback(
		async (id: number) => {
			try {
				setLoading(true);
				const response = await galleryService.getById(id);
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

	const find = useCallback(
		async (key: string, value: string) => {
			try {
				setLoading(true);
				const response = await galleryService.find(key, value);
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

	const edit = useCallback(
		async (id: number, title: string, description: string) => {
			try {
				setLoading(true);
				const response = await galleryService.edit(id, { title, description }, user.token);
				setLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, setLoading, user]
	);

	const remove = useCallback(
		async (id: number) => {
			try {
				setLoading(true);
				const response = await galleryService.remove(id, user.token);
				setLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, setLoading, user]
	);

	return {
		fetchGalleryById: fetchById,
		fetchGalleryByTag: fetchByTag,
		createGallery: create,
		findGalleryBy: find,
		editGallery: edit,
		removeGallery: remove,
	};
};

export default useGalleryService;
