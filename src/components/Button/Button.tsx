import React from 'react';
import styles from './style.module.css';

interface ButtonProps {
	text: string;
	type: 'primary' | 'secondary';
	onClick?: () => void;
	style?: object;
}

const Button = (props: ButtonProps): JSX.Element => {
	const { text, type, onClick, style } = props;

	return (
		<button className={`${styles.container} ${styles[type]}`} onClick={onClick} style={style}>
			{text}
		</button>
	);
};

export default Button;
