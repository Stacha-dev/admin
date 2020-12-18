import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, TextInput } from '../../components/Form';
import StoreContext from '../../Store';
import { UserContext } from '../../contexts';

const Login: React.FC = (): JSX.Element => {
	const { userService } = useContext(StoreContext);
	const { login } = useContext(UserContext);
	const history = useHistory();
	const handleSubmit = (data: any) =>
		data &&
		userService.login(data.username, data.password).then((respose) => {
			login && login(respose);
			history.push('/');
		});

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<TextInput name="username" label="Username" />
				<TextInput name="password" label="Password" />
			</Form>
		</div>
	);
};

export default Login;
