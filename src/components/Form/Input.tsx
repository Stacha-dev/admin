import React, { forwardRef } from 'react';
import styles from './styles.module.css';

interface IInput {
	label?: string;
	name: string;
	type: 'text' | 'password';
	placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
	const { label, name, type, placeholder } = props;

	return (
		<label className={styles.label}>
			<span className={styles.labelText}>{label}</span>
			<input className={styles.input} type={type} placeholder={placeholder} name={name} ref={ref} />
		</label>
	);
});

export default Input;
