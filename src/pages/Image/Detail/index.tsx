import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../../../components/Card';
import { Form, Input } from '../../../components/Form';
import Image from '../../../components/Image';
import { useImageService } from '../../../hooks';
import type { IImage } from '../../../services/Tardis/types';
import { InputType } from '../../../types';
import styles from './styles.module.css';

const ImageDetail = (): JSX.Element => {
	const [image, setImage] = useState<IImage>();
	const { getImageById, editImage } = useImageService();
	const [imageId, setImageId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation();

	const fetchData = () => {
		imageId > 0 && getImageById(imageId).then((response) => setImage(response));
	};
	const handleUpdate = (data: any) => {
		editImage(imageId, data.title).then((data) => console.log(data));
	};

	useEffect(() => {
		setImageId(() => (id ? parseInt(id, 10) : 0));
	}, [id]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageId]);

	return (
		<>
			<Card title={t('page.gallery.detail')}>
				{image && (
					<Form onSubmit={handleUpdate}>
						<Input
							type={InputType.text}
							name="title"
							label={t('page.gallery.title')}
							defaultValue={image?.title}
						/>
					</Form>
				)}
			</Card>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{image && <Image srcSet={image.source} alt={image.title} />}
			</Card>
		</>
	);
};

export default ImageDetail;
