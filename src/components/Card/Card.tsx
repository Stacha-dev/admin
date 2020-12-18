import React from 'react';
import styles from './style.module.css';

interface ICard {
	title?: string;
	children?: JSX.Element | JSX.Element[];
}

const Card: React.FC<ICard> = (props): JSX.Element => {
	const { title, children } = props;

	return (
		<section className={styles.container}>
			{title && (
				<div className={styles.header}>
					<div className={styles.title}>{title}</div>
				</div>
			)}
			<div className={styles.body}>{children}</div>
		</section>
	);
};

export default Card;
