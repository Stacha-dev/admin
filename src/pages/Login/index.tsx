import React from 'react';
import { useHistory } from 'react-router-dom';
import Form from '../../components/Form';
import { Input } from '../../components/Input';
import Card from '../../components/Card';
import { useUser } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { InputType } from '../../types';
import styles from './styles.module.css';

const Login: React.FC = (): JSX.Element => {
	const { login } = useUser();
	const history = useHistory();
	const { t } = useTranslation('page');

	const handleSubmit = (data: any) => {
		if (data && Object.keys(data).length !== 0) {
			login(data.username, data.password).then((isLogged) => {
				if (isLogged) {
					history.push('/');
				}
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
