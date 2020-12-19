import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from '../../components/Form';
import Card from '../../components/Card';
import StoreContext from '../../Store';
import { UserContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const Login: React.FC = (): JSX.Element => {
	const { userService } = useContext(StoreContext);
	const { login } = useContext(UserContext);
	const history = useHistory();
	const { t } = useTranslation();
	const handleSubmit = (data: any) =>
		data &&
		userService
			.login(data.username, data.password)
			.then((respose) => {
				login && login(respose);
				history.push('/');
			})
			.catch((error) => console.log(error));

	return (
		<div className={styles.container}>
			<Card title={t('login.login')} className={styles.card}>
				<Form onSubmit={handleSubmit}>
					<Input name="username" type="text" label={t('pages.login.username')} />
					<Input name="password" type="password" label={t('pages.login.password')} />
				</Form>
			</Card>
		</div>
	);
};

export default Login;
