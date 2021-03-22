import { useCallback, useMemo } from 'react';
import { useLoading, useUser, useToast } from './index';
import { IImage, ImageService } from 'services/Tardis';
import { useTranslation } from 'react-i18next';

const useImageService = () => {
	const { showLoading } = useLoading();
	const { user } = useUser();
	const { toastMessage } = useToast();
	const { t } = useTranslation(['hook', 'error']);

	const imageService = useMemo(() => new ImageService(), []);

	const handleError = useCallback(
		(code) => {
			toastMessage(t([`error:${code}`, 'error:unspecific']));
		},
		[toastMessage, t]
	);

	const getById = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				return await imageService.getById(id);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading]
	);

	const upload = useCallback(
		async (title: string, gallery: number, image: FileList) => {
			try {
				showLoading(true);
				const data = new FormData();
				data.append('title', title);
				data.append('gallery', gallery.toString());
				data.append('image', image[0]);
				await imageService.upload(data, user.token);
				toastMessage(t('imageService.upload'));
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, t, toastMessage, user.token]
	);

	const edit = useCallback(
		async (id: number, data: { title?: string; ordering?: number; state: boolean }) => {
			try {
				showLoading(true);
				return await imageService.edit(id, data, user.token);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, user.token]
	);

	const order = useCallback(
		async (from: IImage, to: IImage) => {
			try {
				showLoading(true);
				const response = await Promise.all([
					await imageService.edit(from.id, { ordering: to.ordering }, user.token),
					await imageService.edit(to.id, { ordering: from.ordering }, user.token),
				]);
				toastMessage(t('imageService.order'));
				return response;
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, t, toastMessage, user.token]
	);

	const remove = useCallback(
		async (id: number) => {
			try {
				showLoading(true);
				await imageService.delete(id, user.token);
				toastMessage(t('imageService.remove'));
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, t, toastMessage, user.token]
	);

	return { getImageById: getById, uploadImage: upload, editImage: edit, orderImages: order, removeImage: remove };
};

export default useImageService;
