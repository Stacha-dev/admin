import React, { createContext, useCallback, useReducer } from 'react';
import { ToastContainer, Toast } from 'components/Toast';

interface ToastContextProps {
	toastMessage: (text: string) => void;
}

interface ToastProviderProps {
	children: JSX.Element;
	dismissTimeout: number;
}

interface IToast {
	id: number;
	text: string;
}

enum ActionType {
	add = 'ADD',
	dismiss = 'DISMISS',
}

const ToastContext = createContext<ToastContextProps>({ toastMessage: () => null });

const toastReducer = (state: IToast[], action: { type: ActionType; toast: IToast }) => {
	switch (action.type) {
		case ActionType.add:
			return [...state, action.toast];
		case ActionType.dismiss:
			return state.filter((toast: any) => toast.id !== action.toast.id);
	}
};

const ToastProvider = (props: ToastProviderProps): JSX.Element => {
	const { dismissTimeout, children } = props;
	const [state, dispatch] = useReducer(toastReducer, []);

	const toastMessage = useCallback((text: string) => {
		dispatch({ type: ActionType.add, toast: { id: Date.now(), text } });
	}, []);

	const handleDismiss = useCallback((id: number) => {
		dispatch({ type: ActionType.dismiss, toast: { id, text: '' } });
	}, []);

	return (
		<ToastContext.Provider value={{ toastMessage }}>
			{children}
			<ToastContainer>
				{state.map((toast: any) => (
					<Toast
						text={toast.text}
						dissmisTimeout={dismissTimeout}
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
