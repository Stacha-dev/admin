import React from 'react';
import { Type } from '../../types';
import styles from './style.module.css';

interface ButtonProps {
	text?: string;
	icon?: JSX.Element;
	type: Type;
	onClick: () => void;
	className?: string;
}

const Button = (props: ButtonProps): JSX.Element => {
	const { text, icon, type, onClick, className } = props;

	return (
		<button className={`${styles.container} ${styles[type]} ${className}`} onClick={onClick}>
			{icon}
			{text && <span>{text}</span>}
		</button>
	);
};

Button.defaultProps = {
	className: '',
};

export default Button;
