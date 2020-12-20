import React from 'react';
import Page from '../../components/Page';
import Card from '../../components/Card';
import styles from './styles.module.css';

const Dashboard: React.FC = (): JSX.Element => {
	return (
		<Page>
			<Card title="Dashboard" className={styles.dashboard}>
				<p>tady bude obsah</p>
			</Card>
		</Page>
	);
};

export default Dashboard;
