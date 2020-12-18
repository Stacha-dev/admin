import React from 'react';
import styles from './styles.module.css';

interface ITextInput {
	label?: string;
	name: string;
	placeholder?: string;
}

const TextInput: React.FC<ITextInput> = (props) => {
	const { label, name, placeholder } = props;

	return (
		<label className={styles.textInput}>
			<span className={styles.label}>{label}</span>
			<input className={styles.input} type="text" placeholder={placeholder} name={name} />
		</label>
	);
};

export default TextInput;
