import { useCallback, useMemo } from 'react';
import { useLoading, useUser, useToast } from './index';
import { ImageService } from '../services/Tardis';
import { useTranslation } from 'react-i18next';

const useImageService = () => {
	const { showLoading } = useLoading();
	const { user } = useUser();
	const { toastMessage } = useToast();
	const { t } = useTranslation('hook');

	const imageService = useMemo(() => new ImageService(), []);

	const handleError = useCallback(
		(error) => {
			switch (error) {
				case 400:
					toastMessage(t(`error.runtime`));
					break;
				case 500:
					toastMessage(t(`error.${error}`));
					break;
				default:
					toastMessage(t(`error.runtime`));
			}
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
				toastMessage(t('imageService.uploadSuccess'));
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, t, toastMessage, user.token]
	);

	const edit = useCallback(
		async (id: number, data: { title?: string; ordering?: number }) => {
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

	return { getImageById: getById, uploadImage: upload, editImage: edit, removeImage: remove };
};

export default useImageService;
