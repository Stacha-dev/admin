import React, { createContext, useState } from 'react';

interface LoadingContextProps {
	loading: boolean;
	showLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingProviderProps {
	children: JSX.Element | JSX.Element[];
}

const LoadingContext = createContext<LoadingContextProps>({
	loading: false,
	showLoading: () => null,
});

const LoadingProvider = (props: LoadingProviderProps): JSX.Element => {
	const { children } = props;
	const [loading, showLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider
			value={{
				loading,
				showLoading,
			}}>
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingContext;
export { LoadingProvider };
