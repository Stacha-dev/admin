import React, { forwardRef } from 'react';
import { IInput, InputType } from '../../types';
import { withInputValidation } from './withInputValidation';
import styles from './styles.module.css';

interface InputProps extends IInput {
	label?: string;
	value?: string;
	defaultValue?: string;
	type: InputType;
	placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, name, value, defaultValue, type, placeholder } = props;

	return (
		<label className={styles.label}>
			<span className={styles.labelText}>{label}</span>
			<input
				className={styles.input}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				defaultValue={defaultValue}
				ref={ref}
			/>
		</label>
	);
});

export default withInputValidation(Input);
