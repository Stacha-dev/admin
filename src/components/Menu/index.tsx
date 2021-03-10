import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMenuService } from '../../hooks';
import { IMenuItem } from '../../services/Tardis/types';
import styles from './styles.module.css';

interface MenuProps {
	id: number;
}

const Menu = (props: MenuProps): JSX.Element => {
	const { id } = props;
	const [items, setItems] = useState<IMenuItem[]>([]);
	const { fetchMenuById } = useMenuService();

	useEffect(() => {
		fetchMenuById(id).then((data) => data?.items.length && setItems(data?.items));
	}, [fetchMenuById, id]);

	return (
		<div className={styles.container}>
			{items.map((route) => (
				<Link key={route.title} to={route.target} className={styles.item}>
					{route.title}
				</Link>
			))}
		</div>
	);
};

export default Menu;
