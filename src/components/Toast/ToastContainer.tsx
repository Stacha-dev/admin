import React from 'react';
import styles from './styles.module.css';

interface ModalProps {
	children: JSX.Element | JSX.Element[] | null;
}

const ToastContainer = (props: ModalProps): JSX.Element => {
	const { children } = props;

	return <div className={styles.container}>{children}</div>;
};

export default ToastContainer;
