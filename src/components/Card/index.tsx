import React from 'react';
import styles from './style.module.css';

interface CardProps {
	title?: string;
	className?: string;
	children?: JSX.Element | JSX.Element[];
}

const Card = (props: CardProps): JSX.Element => {
	const { title, className, children } = props;

	return (
		<section className={`${styles.container} ${className}`}>
			{title && (
				<div className={styles.header}>
					<span className={styles.title}>{title}</span>
				</div>
			)}
			<div className={styles.body}>{children}</div>
		</section>
	);
};

export default Card;
