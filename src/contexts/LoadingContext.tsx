import React, { createContext, useState } from 'react';

const LoadingContext = createContext<{ loading: boolean; setLoading: React.Dispatch<React.SetStateAction<boolean>> }>({
	loading: false,
	setLoading: () => null,
});

const LoadingProvider: React.FC = ({ children }: any) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider
			value={{
				loading,
				setLoading,
			}}>
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingContext;
export { LoadingProvider };
