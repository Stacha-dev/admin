import React from 'react';
import { UserProvider, LoadingProvider } from './contexts';
import Navigator from './Navigator';

function App() {
	return (
		<div className="App">
			<LoadingProvider>
				<UserProvider>
					<Navigator />
				</UserProvider>
			</LoadingProvider>
		</div>
	);
}

export default App;
