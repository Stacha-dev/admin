import React, { useContext, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from 'contexts';

const Login = lazy(() => import('pages/Login'));

const Navigation = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
	const { user } = useContext(UserContext);

	return (
		<Router basename="admin">
			<Suspense fallback={false}>
				<Switch>
					{user.token && <Route path="/">{children}</Route>}
					<Route path="/login" component={Login} />
					<Route path="*">
						<Redirect to="/login" />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Navigation;
