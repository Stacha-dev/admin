import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import styles from './styles.module.css';

const Dashboard = (): JSX.Element => {
	const { t } = useTranslation('page');

	return <Card title={t('dashboard.welcomeBack')} className={styles.dashboard}></Card>;
};

export default Dashboard;
