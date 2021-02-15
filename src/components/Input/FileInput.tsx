import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FileType } from '../../types';
import styles from './styles.module.css';

interface FileInputProps {
	name: string;
	accept?: FileType[];
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
	const { name, accept } = props;
	const [files, setFiles] = useState<Array<File>>([]);
	const { t } = useTranslation('component');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const fileInput = inputRef.current;
		const handleChange = () => {
			fileInput?.files?.length && setFiles(Array.from(fileInput?.files));
		};

		fileInput?.addEventListener('change', handleChange);

		return () => {
			fileInput?.removeEventListener('change', handleChange);
		};
	}, [files, inputRef]);

	return (
		<label className={`${styles.input} ${styles.file}`}>
			<IoCloudUploadOutline />
			{files.length ? files.map((file) => file?.name) : t('form.pickFile')}
			<input accept={accept?.join(', ')} type="file" name={name} ref={inputRef} hidden />
		</label>
	);
});

FileInput.defaultProps = {
	accept: [],
};

export default FileInput;
