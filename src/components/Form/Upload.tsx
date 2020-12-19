import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from './index';
import styles from './styles.module.css';

interface IUpload {
	gallery: number;
	onSubmit: (data: FormData) => void;
}

const Upload: React.FC<IUpload> = (props): JSX.Element => {
	const { gallery, onSubmit } = props;
	const fileRef = useRef<HTMLInputElement>(null);
	const textRef = useRef<HTMLInputElement>(null);
	const { t } = useTranslation();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (textRef && textRef.current && fileRef && fileRef.current && fileRef.current.files) {
			const data = new FormData();

			data.append('file', fileRef.current.files[0]);
			data.append('title', textRef.current.value);
			data.append('gallery', gallery.toString());
			onSubmit(data);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input name="name" type="text" ref={textRef} />
			<input type="file" ref={fileRef} />
			<input className={styles.submit} type="submit" value={`${t('form.upload')}`} />
		</form>
	);
};

export default Upload;
