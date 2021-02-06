import { useCallback, useMemo } from 'react';
import { Direction } from '../services/Tardis/types';
import { useLoading, useUser, useToast } from './index';
import { ImageService } from '../services/Tardis';
import { useTranslation } from 'react-i18next';

const useImageService = () => {
	const { showLoading } = useLoading();
	const { user } = useUser();
	const { toastMessage } = useToast();
	const { t } = useTranslation();

	const imageService = useMemo(() => new ImageService(), []);

	const handleError = useCallback(
		(error: Error) => {
			toastMessage(t(`error.${error.message}`));
		},
		[toastMessage, t]
	);

	const upload = useCallback(
		async (title: string, gallery: number, image: FileList) => {
			try {
				showLoading(true);
				const data = new FormData();
				data.append('title', title);
				data.append('gallery', gallery.toString());
				data.append('image', image[0]);
				await imageService.upload(data, 'user.token');
				toastMessage('Nahráno');
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[imageService, showLoading, user]
	);

	const order = useCallback(
		async (id: number, direction: Direction) => {
			try {
				showLoading(true);
				await imageService.order(id, direction, user.token);
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
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[handleError, imageService, showLoading, user]
	);

	return { uploadImage: upload, orderImage: order, removeImage: remove };
};

export default useImageService;
