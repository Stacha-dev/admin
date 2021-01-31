import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

interface MenuProps {
	routes: Array<{ name: string; path: string }>;
}

const Menu = (props: MenuProps): JSX.Element => {
	const { routes } = props;
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			{routes.map((route) => (
				<Link key={route.name} to={route.path} className={styles.item}>
					{t(route.name)}
				</Link>
			))}
		</div>
	);
};

export default Menu;
