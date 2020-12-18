import React from 'react';
import styles from './styles.module.css';

interface IHeader {
	children?: any;
}

const Header: React.FC<IHeader> = (props): JSX.Element => {
	const { children } = props;
	return (
		<header className={styles.container}>
			<div className={styles.logo}>Logo</div>
			{children}
		</header>
	);
};

export default Header;
