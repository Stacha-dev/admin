import React, { useContext } from 'react';
import { UserProvider, LoadingProvider, ToastProvider, UserContext } from './contexts';
import Navigation from './Navigation';
import Menu from './components/Menu';
import Header from './components/Header';
import Avatar from './components/Avatar';
import Button from './components/Button';
import Footer from './components/Footer';
import Main from './components/Main';
import { protectedRoutes } from './Navigation/routes';
import { Switch, Route } from 'react-router-dom';
import { menu } from './Navigation/configuration';
import { Type } from './types';

const App = (): JSX.Element => {
	const { user, logout } = useContext(UserContext);
	return (
		<>
			<Header>
				<Menu routes={menu} />
				{user && <Button text="Odhlásit" type={Type.secondary} onClick={logout} />}
				{user && <Avatar name={user.name} surname={user.surname} />}
			</Header>
			<Main>
				<Switch>
					{protectedRoutes.map(({ path, component, exact }, index) => (
						<Route key={index} exact={exact} path={path} component={component} />
					))}
				</Switch>
			</Main>
			<Footer />
		</>
	);
};

const WrappedApp = (): JSX.Element => (
	<div className="App">
		<LoadingProvider>
			<UserProvider>
				<ToastProvider dismissTimeout={2500}>
					<Navigation>
						<App />
					</Navigation>
				</ToastProvider>
			</UserProvider>
		</LoadingProvider>
	</div>
);

export default WrappedApp;
