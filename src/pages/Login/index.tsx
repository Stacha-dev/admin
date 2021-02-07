import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from '../../components/Form';
import Card from '../../components/Card';
import { UserContext } from '../../contexts';
import { useLoading, useUserService } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { InputType } from '../../types';
import styles from './styles.module.css';

const Login: React.FC = (): JSX.Element => {
	const { loginUser } = useUserService();
	const { login } = useContext(UserContext);
	const { showLoading } = useLoading();
	const history = useHistory();
	const { t } = useTranslation('page');

	const handleSubmit = (data: any) => {
		if (data && Object.keys(data).length !== 0) {
			showLoading && showLoading(true);
			loginUser(data.username, data.password)
				.then((respose) => {
					login(respose);
					history.push('/');
					showLoading && showLoading(false);
				})
				.catch((error) => {
					console.log(error);
					showLoading && showLoading(false);
				});
		}
	};

	return (
		<div className={styles.container}>
			<Card title={t('login.login')} className={styles.card}>
				<Form submitText={t('login.logIn')} onSubmit={handleSubmit}>
					<Input name="username" type={InputType.text} label={t('login.username')} />
					<Input name="password" type={InputType.password} label={t('login.password')} />
				</Form>
			</Card>
		</div>
	);
};

export default Login;
