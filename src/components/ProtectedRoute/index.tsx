import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

interface ProtectedRouteProps {
	exact: boolean;
	path: string;
	component: React.FC;
}

/**
 * @todo Fix prop types
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }: any) => {
	const { user } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) => (user && user.token ? <Component {...rest} {...props} /> : <Redirect to="/login" />)}
		/>
	);
};

export default ProtectedRoute;
