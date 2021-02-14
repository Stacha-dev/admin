import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { UserContext } from '../contexts';
import { routes, protectedRoutes } from './routes';
import { menu } from './configuration';
import { Type } from '../types';

const Navigator: React.FC = (): JSX.Element => {
	const { user, logout } = useContext(UserContext);

	return (
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
						<Main>
							<>
								{protectedRoutes.map(({ path, component, exact }, index) => (
									<ProtectedRoute key={index} exact={exact} path={path} component={component} />
								))}
								<Route path="*">
									<Redirect to="/login" />
								</Route>
							</>
						</Main>
						<Footer />
					</>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Navigator;
