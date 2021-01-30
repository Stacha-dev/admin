import React from 'react';
import { StoreProvider } from './contexts';
import { UserProvider, LoadingProvider } from './contexts';
import Navigator from './Navigator';

function App() {
	return (
		<div className="App">
			<StoreProvider>
				<LoadingProvider>
					<UserProvider>
						<Navigator />
					</UserProvider>
				</LoadingProvider>
			</StoreProvider>
		</div>
	);
}

export default App;
