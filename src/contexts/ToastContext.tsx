import React, { createContext, useState } from 'react';
import Toast from '../components/Toast';
import styles from './styles.module.css';

interface ToastContextProps {
	addToast: (text: string) => void;
}

interface ToastProviderProps {
	children: JSX.Element;
}

const ToastContext = createContext<ToastContextProps>({ addToast: () => null });

const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
	const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);

	const addToast = (text: string) => {
		setToasts(() => [...toasts, { id: Math.random(), text }]);
	};

	const handleClose = (index: number) => {
		setToasts(() => toasts.filter((value, i) => i !== index));
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className={styles.container}>
				{toasts.map((toast, index) => (
					<Toast
						text={toast.text}
						dissmisTimeout={2500}
						key={toast.id.toString()}
						onClose={() => handleClose(index)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export default ToastContext;
export { ToastProvider };
