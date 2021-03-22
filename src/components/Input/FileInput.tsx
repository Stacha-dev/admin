import React, { useEffect, useState, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FileType, IInput } from 'types';
import { withInputValidation } from './withInputValidation';
import styles from './styles.module.css';

export interface FileInputProps extends IInput {
	accept?: FileType[];
	maxFileSize?: number;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
	const { name, accept, required } = props;
	const [files, setFiles] = useState<Array<File>>([]);
	const { t } = useTranslation('component');

	useEffect(() => {
		const fileInput = (ref as React.MutableRefObject<HTMLInputElement>)?.current;
		const handleChange = () => fileInput?.files?.length && setFiles(() => Array.from(fileInput.files || []));

		fileInput?.addEventListener('change', handleChange);

		return () => {
			fileInput?.removeEventListener('change', handleChange);
		};
	}, [ref]);

	return (
		<label className={`${styles.input} ${styles.file}`}>
			<IoCloudUploadOutline />
			{files.length ? files.map((file) => file?.name) : t('input.pickFile')}
			<input accept={accept?.join(', ')} type="file" name={name} required={required} ref={ref} hidden />
		</label>
	);
});

FileInput.defaultProps = {
	accept: [],
	required: false,
};

export default withInputValidation(FileInput);
