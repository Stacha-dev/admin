import React, { forwardRef } from 'react';
import { IInput, InputType } from 'types';
import { withInputValidation } from './withInputValidation';
import styles from './styles.module.css';
import { useLocale } from 'hooks';

interface InputProps extends IInput {
	label?: string;
	value?: string;
	defaultValue?: string | Record<string, string>;
	type: InputType;
	placeholder?: string;
	localized?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, name, value, defaultValue, type, placeholder, required, localized } = props;
	const { locale } = useLocale();

	return (
		<label className={styles.label}>
			{label && <span className={styles.labelText}>{label}</span>}
			<input
				className={styles.input}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				defaultValue={localized ? defaultValue[locale] : defaultValue}
				required={required}
				ref={ref}
				data-locale={localized ? locale : undefined}
			/>
		</label>
	);
});

Input.defaultProps = {
	required: false,
};

export default withInputValidation(Input);
