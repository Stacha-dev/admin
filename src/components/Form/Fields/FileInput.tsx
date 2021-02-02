import React, { forwardRef } from 'react';
import { FileType } from '../../../types';
import styles from './styles.module.css';

interface FileInputProps {
	name: string;
	accept?: FileType[];
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
	const { name, accept } = props;

	return (
		<label className={styles.label}>
			<input className={styles.input} accept={accept?.join(', ')} type="file" name={name} ref={ref} />
		</label>
	);
});

FileInput.defaultProps = {
	accept: [],
};

export default FileInput;
