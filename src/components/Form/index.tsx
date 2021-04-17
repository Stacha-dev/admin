import React, { useRef } from 'react';
import { Submit } from 'components/Input';
import styles from './styles.module.css';

interface FormProps {
	submitText?: string;
	onSubmit: (data: Object) => void;
	children?: JSX.Element | JSX.Element[];
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
	const { submitText, onSubmit, children } = props;
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: any = {};

		if (formRef && formRef.current) {
			const inputs = [
				...Array.from(formRef.current.querySelectorAll('input')),
				...Array.from(formRef.current.querySelectorAll('textarea')),
			];

			inputs.forEach((input) => {
				switch (input.type) {
					case 'text':
					case 'textarea':
					case 'password':
						data[input.name] = input.value;
						break;
					case 'file':
						if (input instanceof HTMLInputElement) data[input.name] = input.files;
				}
			});
		}

		onSubmit(data);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit} ref={formRef}>
			{children}
			<Submit value={submitText && submitText} disabled={false} />
		</form>
	);
};

Form.defaultProps = {
	submitText: '',
};

export default Form;
