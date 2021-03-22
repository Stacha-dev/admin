import React from 'react';
import { UserProvider, LoadingProvider, ToastProvider } from 'contexts';
import Navigation from 'components/Navigation';
import Menu from 'components/Menu';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Main from 'components/Main';
import { routes } from './routes';
import { Switch, Route } from 'react-router-dom';

const App = (): JSX.Element => (
	<LoadingProvider>
		<UserProvider>
			<ToastProvider dismissTimeout={2500}>
				<Navigation>
					<Header>
						<Menu id={1} />
					</Header>
					<Main>
						<Switch>
							{routes.map(({ path, component, exact }) => (
								<Route key={path} exact={exact} path={path} component={component} />
							))}
						</Switch>
					</Main>
					<Footer />
				</Navigation>
			</ToastProvider>
		</UserProvider>
	</LoadingProvider>
);

export default App;
