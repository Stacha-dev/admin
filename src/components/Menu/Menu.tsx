import React from 'react';
import { Link } from 'react-router-dom';
import { IRoute } from '../../types';
import styles from './styles.module.css';

interface IMenu {
	routes: Array<IRoute>;
}

const Menu: React.FC<IMenu> = (props): JSX.Element => {
	const { routes } = props;

	return (
		<ul className={styles.container}>
			{routes
				.filter((route) => route.menu)
				.map((route) => (
					<li key={route.name} className={styles.item}>
						<Link to={route.path}>{route.name}</Link>
					</li>
				))}
		</ul>
	);
};

export default Menu;
