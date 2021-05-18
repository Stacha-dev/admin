import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoTrashOutline } from 'react-icons/io5';
import Card from 'components/Card';
import Form from 'components/Form';
import { FileInput, Input, Switch, Textarea } from 'components/Input';
import List from 'components/List';
import Image from 'components/Image';
import Button from 'components/Button';
import Link from 'components/Link';
import Aside from 'components/Aside';
import { useGalleryService, useImageService } from 'hooks';
import { FileType, InputType, Type } from 'types';
import type { IGallery, IImage } from 'services/Tardis/types';
import styles from '../styles.module.css';

const GalleryDetail = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery>();
	const [galleryId, setGalleryId] = useState<number>(0);
	const { fetchGalleryById, editGallery } = useGalleryService();
	const { uploadImage, orderImages, editImage, removeImage } = useImageService();
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation('page');

	const fetchData = () => {
		galleryId > 0 && fetchGalleryById(galleryId).then((response) => setGallery(response));
	};
	const handleUpload = (data: any) =>
		uploadImage(data.name, data.description, galleryId, data.image).then(() => fetchData());
	const handleUpdate = (data: any) => editGallery(galleryId, { title: data.title, description: data.description });
	const handleOrder = (from: IImage, to: IImage) => orderImages(from, to).then(() => fetchData());
	const handleImageStateChange = (id: number, state: boolean) => editImage(id, { state }).then(() => fetchData());
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
			render: ({ source, title }: IImage) => {
				return <Image source={source} alt={title} className={styles.thumbnail} />;
			},
		},
		{ key: 'title', render: ({ title }: IImage) => <span>{title}</span> },
		{
			key: 'id',
			render: ({ id, state }: IImage) => (
				<div className={styles.actionContainer}>
					<Switch onChange={(state: boolean) => handleImageStateChange(id, state)} defaultChecked={state} />
					<Link to={`/image/${id}`} text="detail" />
					<Button icon={<IoTrashOutline />} type={Type.primary} onClick={() => handleDelete(id)} />
				</div>
			),
		},
	];

	return (
		<>
			<Aside>
				<Card title={t('gallery.properties')}>
					{gallery && (
						<Form submitText={t('gallery.save')} onSubmit={handleUpdate}>
							<Input
								type={InputType.text}
								name="title"
								label={t('gallery.title')}
								defaultValue={gallery?.title}
								localized
							/>
							<Textarea
								name="description"
								rows={4}
								label={t('gallery.description')}
								defaultValue={gallery?.description}
							/>
						</Form>
					)}
				</Card>
				<Card title={t('gallery.add')}>
					<Form submitText={t('gallery.upload')} onSubmit={handleUpload}>
						<Input type={InputType.text} name="name" label={t('gallery.title')} />
						<Textarea name="description" label={t('gallery.description')} rows={4} />
						<FileInput name="image" accept={[FileType.jpg]} maxFileSize={5000} required />
					</Form>
				</Card>
			</Aside>
			<Card title={t('gallery.content')} className={styles.content}>
				{gallery && (
					<List data={gallery.images} columns={columns} className={styles.list} onOrder={handleOrder} />
				)}
			</Card>
		</>
	);
};

export default GalleryDetail;
