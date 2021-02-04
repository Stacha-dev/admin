import React from 'react';
import { UserProvider, LoadingProvider, ToastProvider } from './contexts';
import Navigator from './Navigator';

function App() {
	return (
		<div className="App">
			<LoadingProvider>
				<UserProvider>
					<ToastProvider>
						<Navigator />
					</ToastProvider>
				</UserProvider>
			</LoadingProvider>
		</div>
	);
}

export default App;
