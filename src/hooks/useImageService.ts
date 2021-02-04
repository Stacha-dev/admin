import { useCallback, useMemo } from 'react';
import { Direction } from '../services/Tardis/types';
import { useLoading, useUser, useToast } from './index';
import { ImageService } from '../services/Tardis';

const useImageService = () => {
	const { setLoading } = useLoading();
	const { user } = useUser();
	const { addToast } = useToast();

	const imageService = useMemo(() => new ImageService(), []);

	const handleError = useCallback(
		(error: Error) => {
			console.error(error);
			setLoading(false);
		},
		[setLoading]
	);

	const upload = useCallback(
		async (title: string, gallery: number, image: FileList) => {
			try {
				setLoading(true);
				const data = new FormData();
				data.append('title', title);
				data.append('gallery', gallery.toString());
				data.append('image', image[0]);

				await imageService.upload(data, user.token);
				setLoading(false);
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, imageService, setLoading, user]
	);

	const order = useCallback(
		async (id: number, direction: Direction) => {
			try {
				setLoading(true);
				await imageService.order(id, direction, user.token);
				setLoading(false);
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, imageService, setLoading, user.token]
	);

	const remove = useCallback(
		async (id: number) => {
			try {
				setLoading(true);
				await imageService.delete(id, user.token);
				addToast('Odstraněno');
				setLoading(false);
			} catch (error) {
				handleError(error);
			}
		},
		[handleError, imageService, setLoading, user]
	);

	return { uploadImage: upload, orderImage: order, removeImage: remove };
};

export default useImageService;
