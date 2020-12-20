import React from 'react';
import styles from './styles.module.css';

interface IPage {
	children?: JSX.Element | JSX.Element[];
}

const Page: React.FC<IPage> = (props) => {
	const { children } = props;

	return <main className={styles.container}>{children}</main>;
};

export default Page;
