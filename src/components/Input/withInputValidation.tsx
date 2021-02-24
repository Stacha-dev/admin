import React, { useEffect, useState, useRef } from 'react';
import { useInputValidation } from './useInputValidation';
import styles from './styles.module.css';

export function withInputValidation<P>(Input: React.ComponentType<P>) {
	const InputWithFormInput = (props: P) => {
		const [message, setMessage] = useState<string>('');
		const inputRef = useRef<HTMLInputElement>(null);
		const { validate } = useInputValidation();

		useEffect(() => {
			const input = inputRef?.current;
			const handleChange = () =>
				input &&
				validate(input, props, (error) => {
					setMessage(error);
				});

			input?.addEventListener('change', handleChange);

			return () => {
				input?.removeEventListener('change', handleChange);
			};
		}, [inputRef, props, validate]);

		return (
			<div className={`${styles.container} ${message && styles.error}`}>
				<Input {...props} ref={inputRef} />
				{<span className={styles.message}>{message}</span>}
			</div>
		);
	};
	return InputWithFormInput;
}
