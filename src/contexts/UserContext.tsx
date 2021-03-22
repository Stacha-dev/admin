import React, { createContext, useState } from 'react';
import type { IUser } from 'services/Tardis';
import { useUserService, useLoading } from 'hooks';

const UserContext = createContext<{
	user: IUser;
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => void;
}>({
	user: { name: '', surname: '', token: '' },
	login: async (username, password) => false,
	logout: () => null,
});

const UserProvider: React.FC = ({ children }: any) => {
	const [user, setUser] = useState<IUser>({ name: '', surname: '', token: '' });
	const { loginUser } = useUserService();
	const { showLoading } = useLoading();

	const login = async (username: string, password: string): Promise<boolean> => {
		showLoading(true);
		try {
			const user = await loginUser(username, password);
			setUser(user);
			showLoading(false);
			return true;
		} catch (e) {
			showLoading(true);
			return false;
		}
	};

	const logout = () => setUser({ name: '', surname: '', token: '' });

	return (
		<UserContext.Provider
			value={{
				user,
				login,
				logout,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
export { UserProvider };
