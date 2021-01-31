import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './style.module.css';

interface LinkProps {
	text: string;
	to: string;
	className?: string;
}

const Link = (props: LinkProps): JSX.Element => {
	const { text, to, className } = props;

	return (
		<RouterLink to={to} className={`${styles.container} ${className}`}>
			{text}
		</RouterLink>
	);
};

Link.defaultProps = {
	className: '',
};

export default Link;
