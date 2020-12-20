import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from '../../components/Form';
import Card from '../../components/Card';
import StoreContext from '../../Store';
import { UserContext, LoadingContext } from '../../contexts';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const Login: React.FC = (): JSX.Element => {
	const { userService } = useContext(StoreContext);
	const { login } = useContext(UserContext);
	const { setLoading } = useContext(LoadingContext);
	const history = useHistory();
	const { t } = useTranslation();
	const handleSubmit = (data: any) => {
		if (data && Object.keys(data).length !== 0) {
			setLoading && setLoading(true);
			userService
				.login(data.username, data.password)
				.then((respose) => {
					login && login(respose);
					history.push('/');
					setLoading && setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setLoading && setLoading(false);
				});
		}
	};

	return (
		<div className={styles.container}>
			<Card title={t('pages.login.login')} className={styles.card}>
				<Form onSubmit={handleSubmit}>
					<Input name="username" type="text" label={t('pages.login.username')} />
					<Input name="password" type="password" label={t('pages.login.password')} />
				</Form>
			</Card>
		</div>
	);
};

export default Login;
