import React from 'react';
import styles from './styles.module.css';

interface SubmitProps {
	value?: string;
}

const Submit = (props: SubmitProps) => {
	const { value } = props;

	return <input className={styles.submit} type="submit" value={value} />;
};

export default Submit;
