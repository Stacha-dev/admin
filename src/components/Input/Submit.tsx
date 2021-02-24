import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

interface SubmitProps {
	value?: string;
	disabled?: boolean;
}

const Submit = (props: SubmitProps) => {
	const { value, disabled } = props;
	const { t } = useTranslation('component');

	return (
		<input
			className={styles.submit}
			type="submit"
			value={value || (t('input.submit') as string)}
			disabled={disabled}
		/>
	);
};

Submit.defaultProps = {
	disabled: false,
};

export default Submit;
