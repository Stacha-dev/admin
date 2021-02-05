import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGalleryService, useImageService } from '../../hooks';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { FileInput, Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { FileType, InputType, Type } from '../../types';
import { ISource, Direction, IGallery } from '../../services/Tardis/types';

const GalleryDetail: React.FC = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery>();
	const { fetchOneGalleryById, editGallery } = useGalleryService();
	const { uploadImage, orderImage, removeImage } = useImageService();
	const [galleryId, setGalleryId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation();

	const fetchData = () => {
		galleryId > 0 && fetchOneGalleryById(galleryId).then((response) => setGallery(response));
	};
	const handleUpload = (data: any) => uploadImage(data.name, galleryId, data.image).then(() => fetchData());
	const handleOrder = (id: number, direction: Direction) => orderImage(id, direction).then(() => fetchData());
	const handleUpdate = (data: any) => editGallery(galleryId, data.title, data.description);
	const handleDelete = (id: number) => removeImage(id).then(() => fetchData());

	useEffect(() => {
		setGalleryId(() => (id ? parseInt(id, 10) : 0));
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
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Card title={t('page.gallery.detail')}>
					{gallery && (
						<Form onSubmit={handleUpdate}>
							<Input
								type={InputType.text}
								name="title"
								label={t('page.gallery.title')}
								defaultValue={gallery?.title}
							/>
							<Input
								type={InputType.text}
								name="description"
								label={t('page.gallery.description')}
								defaultValue={gallery?.description}
							/>
						</Form>
					)}
				</Card>
				<Card title={t('page.gallery.upload')}>
					<Form onSubmit={handleUpload}>
						<Input type={InputType.text} name="name" label="Název" />
						<FileInput name="image" accept={[FileType.jpg]} />
					</Form>
				</Card>
			</div>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} header={['náhled', 'název', 'akce']} />}
			</Card>
		</Page>
	);
};

export default GalleryDetail;
