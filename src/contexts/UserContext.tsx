import React, { createContext, useState } from 'react';
import { IUser } from '../services/Tardis';

const UserContext = createContext<{ user?: IUser; login?: (data: IUser) => void; logout?: () => void }>({});

const UserProvider: React.FC = ({ children }: any) => {
	const [user, setUser] = useState<IUser>({ name: '', surname: '', token: '' });

	const login = (user: IUser) => setUser(user);

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
