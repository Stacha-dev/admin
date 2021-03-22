import React, { createContext, useState } from 'react';
import Loading from 'components/Loading';

interface LoadingContextProps {
	showLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingProviderProps {
	children: JSX.Element | JSX.Element[];
}

const LoadingContext = createContext<LoadingContextProps>({
	showLoading: () => null,
});

const LoadingProvider = (props: LoadingProviderProps): JSX.Element => {
	const { children } = props;
	const [loading, showLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider
			value={{
				showLoading,
			}}>
			{loading && <Loading />}
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingContext;
export { LoadingProvider };
