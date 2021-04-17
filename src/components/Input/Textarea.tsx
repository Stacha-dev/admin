import React from 'react';
import styles from './styles.module.css';

interface TextareaProps {
	name: string;
	label?: string;
	defaultValue?: string;
	rows?: number;
	cols?: number;
}

const Textarea = (props: TextareaProps): JSX.Element => {
	const { name, label, defaultValue, rows, cols } = props;

	return (
		<label className={styles.label}>
			{label && <span className={styles.labelText}>{label}</span>}
			<textarea
				name={name}
				rows={rows}
				cols={cols}
				className={`${styles.textarea} ${styles.input}`}
				defaultValue={defaultValue}></textarea>
		</label>
	);
};

export default Textarea;
