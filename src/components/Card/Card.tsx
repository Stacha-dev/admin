import React from 'react';
import styles from './style.module.css';

interface ICard {
	title?: string;
	action?: JSX.Element;
	children?: JSX.Element | JSX.Element[];
}

const Card: React.FC<ICard> = (props): JSX.Element => {
	const { title, action, children } = props;

	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{title}</div>
				<div className={styles.action}>{action}</div>
			</div>
			<div className={styles.body}>{children}</div>
		</section>
	);
};

export default Card;
