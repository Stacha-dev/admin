import React, { useContext, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts';
import { routes } from './routes';

const Navigation = ({ children }: { children: JSX.Element }): JSX.Element => {
	const { user } = useContext(UserContext);

	return (
		<Router basename="admin">
			<Suspense fallback={false}>
				<Switch>
					{user.token && <Route path="/">{children}</Route>}
					{routes.map(({ path, component }, index) => (
						<Route key={index} path={path} component={component} />
					))}
					<Route path="*">
						<Redirect to="/login" />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Navigation;
