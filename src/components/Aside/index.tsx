import React from 'react';
import styles from './styles.module.css';

interface AsideProps {
	children: JSX.Element | JSX.Element[] | undefined;
}

const Aside = (props: AsideProps): JSX.Element => {
	const { children } = props;

	return <div className={styles.container}>{children}</div>;
};

export default Aside;
