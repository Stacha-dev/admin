import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import Form from 'components/Form';
import { Input, Textarea } from 'components/Input';
import Image from 'components/Image';
import { useImageService } from 'hooks';
import type { IImage } from 'services/Tardis/types';
import { InputType } from 'types';
import styles from './styles.module.css';

const ImageDetail = (): JSX.Element => {
	const [image, setImage] = useState<IImage>();
	const { getImageById, editImage } = useImageService();
	const [imageId, setImageId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation('page');

	const fetchData = () => {
		imageId > 0 && getImageById(imageId).then((response) => setImage(response));
	};
	const handleUpdate = (data: any) => {
		editImage(imageId, data).then(() => fetchData());
	};

	useEffect(() => {
		setImageId(() => (id ? parseInt(id, 10) : 0));
	}, [id]);

	useEffect(() => {
		fetchData();
		console.log(image);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageId]);

	return (
		<>
			<Card title={t('image.properties')}>
				{image && (
					<Form onSubmit={handleUpdate}>
						<Input
							type={InputType.text}
							name="title"
							label={t('gallery.title')}
							defaultValue={image?.title}
						/>
						<Textarea
							name="description"
							label={t('gallery.description')}
							rows={4}
							defaultValue={image?.description}
						/>
					</Form>
				)}
			</Card>
			<Card className={styles.content}>
				{image && <Image source={image.source} alt={image.title} className={styles.image} />}
			</Card>
		</>
	);
};

export default ImageDetail;
