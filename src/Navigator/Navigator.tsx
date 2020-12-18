import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Menu from '../components/Menu';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { UserContext } from '../contexts';
import { routes, protectedRoutes } from './routes';

const Navigator: React.FC = (): JSX.Element => {
	const { user, logout } = useContext(UserContext);

	return (
		<Router basename="admin">
			<Switch>
				{routes.map(({ path, component }, index) => (
					<Route key={index} path={path} component={component} />
				))}
				<>
					<Header>
						<Menu routes={protectedRoutes} />
						{logout && <Button text="Odhlásit" type="secondary" onClick={logout} />}
						{user && <Avatar name={user.name} surname={user.surname} />}
					</Header>
					{protectedRoutes.map(({ path, component, exact }, index) => (
						<ProtectedRoute key={index} exact={exact} path={path} component={component} />
					))}
				</>
			</Switch>
		</Router>
	);
};

export default Navigator;
