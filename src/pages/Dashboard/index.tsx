import React from 'react';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Dashboard = (): JSX.Element => {
	return (
		<>
			<Card title="Dashboard" className={styles.dashboard}>
				<p>tady bude obsah</p>
			</Card>
		</>
	);
};

export default Dashboard;
