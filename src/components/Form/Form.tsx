import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

interface FormProps {
	onSubmit: (data: Object) => void;
	children?: JSX.Element | JSX.Element[];
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
	const { onSubmit, children } = props;
	const formRef = useRef<HTMLFormElement>(null);
	const { t } = useTranslation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: any = {};

		if (formRef && formRef.current) {
			const inputs = Array.from(formRef.current.querySelectorAll('input'));

			inputs.forEach((input) => {
				console.log(input.type);
				switch (input.type) {
					case 'text':
					case 'password':
						data[input.name] = input.value;
						break;
					case 'file':
						data[input.name] = input.files;
				}
			});
		}

		onSubmit(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
			{children}
			<input className={styles.submit} type="submit" value={`${t('form.submit')}`} />
		</form>
	);
};

export default Form;
