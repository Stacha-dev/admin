import { FileInputProps } from './FileInput';
import { useTranslation } from 'react-i18next';

export const useInputValidation = () => {
	const { t } = useTranslation('component');
	const validate = (input: HTMLInputElement, props: unknown, onError: (error: string) => void) => {
		switch (input?.type) {
			case 'file':
				const fileInputProps = (props as unknown) as FileInputProps;
				const files = Array.from(input.files || []);

				files.forEach((file) => {
					const fileSize = Math.round(file.size / 1024);
					if (fileInputProps.maxFileSize && fileSize > fileInputProps.maxFileSize) {
						onError(t('input.fileSizeError', { maxFileSize: fileInputProps.maxFileSize }));
					} else {
						onError('');
					}
				});
		}
	};

	return { validate };
};
