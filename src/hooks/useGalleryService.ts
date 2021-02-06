import { useCallback, useMemo } from 'react';
import { useLoading, useUser } from './index';
import { GalleryService } from '../services/Tardis';

const useGalleryService = () => {
	const { showLoading } = useLoading();
	const { user } = useUser();
	const galleryService = useMemo(() => new GalleryService(), []);

	const handleError = useCallback(
		(error: Error) => {
			console.error(error);
			showLoading(false);
		},
		[showLoading]
	);

	const fetchById = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				const response = await galleryService.getById(id);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const fetchByTag = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				const response = await galleryService.getByTag(id);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const find = useCallback(
		async (key: string, value: string) => {
			try {
				showLoading(true);
				const response = await galleryService.find(key, value);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const create = useCallback(
		async (title: string, description: string, tag?: number) => {
			try {
				showLoading(true);
				const response = await galleryService.create({ title, description, tag }, user.token);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading, user]
	);

	const edit = useCallback(
		async (id: number, title: string, description: string) => {
			try {
				showLoading(true);
				const response = await galleryService.edit(id, { title, description }, user.token);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading, user]
	);

	const remove = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				const response = await galleryService.remove(id, user.token);
				showLoading(false);
				return response;
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, galleryService, showLoading, user]
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
