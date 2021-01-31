import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGallery, useImage } from '../../hooks';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { InputType, Type } from '../../types';
import { ISource, Direction, IGallery } from '../../services/Tardis/types';

const GalleryDetail: React.FC = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery>();
	const { fetchOneGalleryById } = useGallery();
	const { uploadImage, orderImage, removeImage } = useImage();
	const [galleryId, setGalleryId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation();

	const fetchData = () => {
		galleryId > 0 && fetchOneGalleryById(galleryId).then((response) => setGallery(response));
	};
	const handleUpload = (data: any) => uploadImage(data.name, galleryId, data.image).then(() => fetchData());
	const handleDelete = (id: number) => removeImage(id).then(() => fetchData());
	const handleOrder = (id: number, direction: Direction) => orderImage(id, direction).then(() => fetchData());

	useEffect(() => {
		setGalleryId(() => (id ? parseInt(id, 10) : 0));
		fetchData();
	}, [id]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [galleryId]);

	const columns = [
		{
			key: 'source',
			render: (item: ISource) => {
				return <Image srcSet={item} sizes="4rem" alt="img" />;
			},
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
		{
			key: 'id',
			render: (id: number, index: number) => (
				<div className={styles.actionContainer}>
					<div className={styles.actionWrapper}>
						{index > 0 && (
							<Button
								text={t('page.gallery.action.up')}
								type={Type.secondary}
								onClick={() => handleOrder(id, Direction.up)}
							/>
						)}
						{gallery && index < gallery?.images.length - 1 && (
							<Button
								text={t('page.gallery.action.down')}
								type={Type.secondary}
								onClick={() => handleOrder(id, Direction.down)}
							/>
						)}
					</div>
					<Button
						text={t('page.gallery.action.delete')}
						type={Type.primary}
						onClick={() => handleDelete(id)}
					/>
				</div>
			),
		},
	];

	return (
		<Page>
			<Card title={t('page.gallery.upload')}>
				<Form onSubmit={handleUpload}>
					<Input type={InputType.text} name="name" />
					<Input type={InputType.file} name="image" />
				</Form>
			</Card>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} header={['náhled', 'název', 'akce']} />}
			</Card>
		</Page>
	);
};

export default GalleryDetail;