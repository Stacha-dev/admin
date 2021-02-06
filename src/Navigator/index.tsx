import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { UserContext, LoadingContext } from '../contexts';
import { routes, protectedRoutes } from './routes';
import { menu } from './configuration';
import { Type } from '../types';
import styles from './styles.module.css';

const Navigator: React.FC = (): JSX.Element => {
	const { user, logout } = useContext(UserContext);
	const { loading } = useContext(LoadingContext);

	return (
		<>
			{loading && <Loading />}
			<Router basename="admin">
				<Suspense fallback={false}>
					<Switch>
						{routes.map(({ path, component }, index) => (
							<Route key={index} path={path} component={component} />
						))}
						<>
							<Header>
								<Menu routes={menu} />
								{user && <Button text="Odhlásit" type={Type.secondary} onClick={logout} />}
								{user && <Avatar name={user.name} surname={user.surname} />}
							</Header>
							{protectedRoutes.map(({ path, component, exact }, index) => (
								<ProtectedRoute key={index} exact={exact} path={path} component={component} />
							))}
							<p className={styles.footer}>
								Created with ❤️ by <a href="https://stacha.dev/">Stacha.dev</a> v
								{process.env.REACT_APP_VERSION}
							</p>
						</>
					</Switch>
				</Suspense>
			</Router>
		</>
	);
};

export default Navigator;
