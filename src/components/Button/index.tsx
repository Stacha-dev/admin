import React from 'react';
import { Type } from '../../types';
import styles from './style.module.css';

interface ButtonProps {
	text: string;
	type: Type;
	onClick: () => void;
	className?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
	const { text, type, onClick, className } = props;

	return (
		<button className={`${styles.container} ${styles[type]} ${className}`} onClick={onClick}>
			{text}
		</button>
	);
};

Button.defaultProps = {
	className: '',
};

export default Button;
