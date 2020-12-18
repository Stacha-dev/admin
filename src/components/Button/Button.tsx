import React from 'react';
import styles from './style.module.css';

interface IButton {
	text: string;
	type: 'primary' | 'secondary';
	onClick?: () => void;
}

const Button: React.FC<IButton> = (props): JSX.Element => {
	const { text, type, onClick } = props;

	return (
		<button className={`${styles.container} ${styles[type]}`} onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
