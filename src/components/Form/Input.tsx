import React from 'react';
import styles from './styles.module.css';

interface IInput {
	label?: string;
	name: string;
	type: 'text' | 'password';
	placeholder?: string;
}

const Input: React.FC<IInput> = (props) => {
	const { label, name, type, placeholder } = props;

	return (
		<label className={styles.textInput}>
			<span className={styles.label}>{label}</span>
			<input className={styles.input} type={type} placeholder={placeholder} name={name} />
		</label>
	);
};

export default Input;
