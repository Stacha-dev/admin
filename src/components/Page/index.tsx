import React from 'react';
import styles from './styles.module.css';

interface PageProps {
	children?: JSX.Element | JSX.Element[];
}

const Page = (props: PageProps): JSX.Element => {
	const { children } = props;

	return <main className={styles.container}>{children}</main>;
};

export default Page;
