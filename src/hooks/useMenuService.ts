import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoading, useToast } from './index';
import { MenuService } from '../services/Tardis';

const useGalleryService = () => {
	const { showLoading } = useLoading();
	const menuService = useMemo(() => new MenuService(), []);
	const { toastMessage } = useToast();
	const { t } = useTranslation(['error']);

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
				return await menuService.getById(id);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}
		},
		[showLoading, menuService, handleError]
	);

	return {
		fetchMenuById: fetchById,
	};
};

export default useGalleryService;
