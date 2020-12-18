import React from 'react';
import { StoreProvider } from './Store';
import { UserProvider } from './contexts/UserContext';
import Navigator from './Navigator';

function App() {
	return (
		<div className="App">
			<StoreProvider>
				<UserProvider>
					<Navigator />
				</UserProvider>
			</StoreProvider>
		</div>
	);
}

export default App;
