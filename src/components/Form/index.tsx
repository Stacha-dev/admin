import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Submit } from '../Input/index';
import styles from './styles.module.css';

interface FormProps {
	submitText?: string;
	onSubmit: (data: Object) => void;
	children?: JSX.Element | JSX.Element[];
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
	const { submitText, onSubmit, children } = props;
	const formRef = useRef<HTMLFormElement>(null);
	const { t } = useTranslation('component');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data: any = {};

		if (formRef && formRef.current) {
			const inputs = Array.from(formRef.current.querySelectorAll('input'));

			inputs.forEach((input) => {
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
		<form className={styles.container} onSubmit={handleSubmit} ref={formRef}>
			{children}
			<Submit value={submitText ? submitText : t('form.submit')} />
		</form>
	);
};

Form.defaultProps = {
	submitText: '',
};

export default Form;
