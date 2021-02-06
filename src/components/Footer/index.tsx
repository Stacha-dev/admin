import React from 'react';
import styles from './styles.module.css';

const Footer = (): JSX.Element => (
	<footer className={styles.container}>
		Created with ❤️ by <a href="https://stacha.dev/">Stacha.dev</a> v{process.env.REACT_APP_VERSION}
	</footer>
);

export default Footer;
