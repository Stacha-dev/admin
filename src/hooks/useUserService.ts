import { useCallback, useMemo } from 'react';
import { useLoading } from './index';
import { IUser, UserService } from '../services/Tardis';

const useUserService = () => {
	const { setLoading } = useLoading();
	const userService = useMemo(() => new UserService(), []);

	const handleError = useCallback(
		(error: Error) => {
			console.error(error);
			setLoading(false);
		},
		[setLoading]
	);

	const login = useCallback(
		async (username: string, password: string): Promise<IUser> => {
			let user: IUser = { name: '', surname: '', token: '' };
			try {
				setLoading(true);
				user = await userService.login(username, password);
				setLoading(false);
			} catch (error) {
				handleError(error);
			}

			return user;
		},
		[handleError, userService, setLoading]
	);

	return { loginUser: login };
};

export default useUserService;
