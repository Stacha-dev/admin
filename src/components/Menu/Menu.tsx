import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IRoute } from '../../types';
import styles from './styles.module.css';

interface IMenu {
	routes: Array<IRoute>;
}

const Menu: React.FC<IMenu> = (props): JSX.Element => {
	const { routes } = props;
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			{routes
				.filter((route) => route.menu)
				.map((route) => (
					<Link key={route.name} to={route.path} className={styles.item}>
						{t(route.name)}
					</Link>
				))}
		</div>
	);
};

export default Menu;
