import { useCallback, useMemo } from 'react';
import { useLoading } from './index';
import { IUser, UserService } from '../services/Tardis';

const useUserService = () => {
	const { showLoading } = useLoading();
	const userService = useMemo(() => new UserService(), []);

	const handleError = useCallback((error: Error) => {
		console.error(error);
	}, []);

	const login = useCallback(
		async (username: string, password: string): Promise<IUser> => {
			let user: IUser = { name: '', surname: '', token: '' };
			try {
				showLoading(true);
				user = await userService.login(username, password);
				showLoading(false);
			} catch (error) {
				handleError(error);
			} finally {
				showLoading(false);
			}

			return user;
		},
		[handleError, userService, showLoading]
	);

	return { loginUser: login };
};

export default useUserService;
