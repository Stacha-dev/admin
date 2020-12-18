import React from 'react';
import styles from './styles.module.css';

interface IHeader {
	children?: JSX.Element | JSX.Element[];
}

const Header: React.FC<IHeader> = (props): JSX.Element => {
	const { children } = props;
	return <header className={styles.container}>{children}</header>;
};

export default Header;
