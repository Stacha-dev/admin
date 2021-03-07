import React, { ChangeEvent } from 'react';
import styles from './styles.module.css';

interface SwitchProps {
	onChange?: (state: boolean) => void;
	defaultChecked?: boolean;
}

const Switch = (props: SwitchProps) => {
	const { onChange, defaultChecked } = props;

	const handleChange = (e: ChangeEvent) => onChange && onChange((e.target as HTMLInputElement).checked);

	return (
		<label className={styles.switch}>
			<input type="checkbox" defaultChecked={defaultChecked || false} onChange={handleChange} />
			<span className={styles.slider}></span>
		</label>
	);
};

export default Switch;
