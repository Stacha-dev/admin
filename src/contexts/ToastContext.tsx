import React, { createContext, useCallback, useState } from 'react';
import { ToastContainer, Toast } from '../components/Toast';

interface ToastContextProps {
	toastMessage: (text: string) => void;
}

interface ToastProviderProps {
	children: JSX.Element;
}

const ToastContext = createContext<ToastContextProps>({ toastMessage: () => null });

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
	const [list, setLists] = useState<{ id: number; text: string }[]>([]);

	const toastMessage = (text: string) => {
		setLists(() => [...list, { id: Math.floor(Math.random() * 100 + 1), text }]);
	};

	const handleDismiss = useCallback(
		(id: number) => {
			setLists(() => list.filter((toast) => toast.id !== id));
		},
		[list]
	);

	return (
		<ToastContext.Provider value={{ toastMessage }}>
			{children}
			<ToastContainer>
				{list.map((toast) => (
					<Toast
						text={toast.text}
						dissmisTimeout={2500}
						key={toast.id.toString()}
						onDismiss={() => handleDismiss(toast.id)}
					/>
				))}
			</ToastContainer>
		</ToastContext.Provider>
	);
};

export default ToastContext;
export { ToastProvider };
