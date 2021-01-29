import React, { forwardRef } from 'react';
import { InputType } from '../../types';
import styles from './styles.module.css';

interface InputProps {
	label?: string;
	name: string;
	type: InputType;
	placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, name, type, placeholder } = props;

	return (
		<label className={styles.label}>
			<span className={styles.labelText}>{label}</span>
			<input className={styles.input} type={type} placeholder={placeholder} name={name} ref={ref} />
		</label>
	);
});

export default Input;
