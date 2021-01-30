import React from 'react';
import styles from './styles.module.css';

/**
 * @todo Fix children type
 */
interface HeaderProps {
	children?: JSX.Element | JSX.Element[] | any;
}

const Header = (props: HeaderProps): JSX.Element => {
	const { children } = props;
	return <header className={styles.container}>{children}</header>;
};

export default Header;
