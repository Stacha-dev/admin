import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoading, useUser, useToast } from './index';
import { GalleryService } from '../services/Tardis';

const useGalleryService = () => {
	const { showLoading } = useLoading();
	const { user } = useUser();
	const galleryService = useMemo(() => new GalleryService(), []);
	const { toastMessage } = useToast();
	const { t } = useTranslation(['hook', 'error']);

	const handleError = useCallback(
		(code) => {
			toastMessage(t([`error:${code}`, 'error:unspecific']));
		},
		[toastMessage, t]
	);

	const fetchById = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				return await galleryService.getById(id);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const fetchByTag = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				return await galleryService.getByTag(id);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const find = useCallback(
		async (key: string, value: string) => {
			try {
				showLoading(true);
				return await galleryService.find(key, value);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, galleryService, showLoading]
	);

	const create = useCallback(
		async (title: string, description: string, tag?: number) => {
			try {
				showLoading(true);
				return await galleryService.create({ title, description, tag }, user.token);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, galleryService, showLoading, user]
	);

	const edit = useCallback(
		async (id: number, data: { title?: string; description?: string; state?: boolean }) => {
			try {
				showLoading(true);
				const response = await galleryService.edit(id, data, user.token);
				toastMessage(t('galleryService.edit'));
				return response;
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[showLoading, galleryService, user.token, toastMessage, t, handleError]
	);

	const remove = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				return await galleryService.remove(id, user.token);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
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
