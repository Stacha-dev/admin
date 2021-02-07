import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoCaretDownOutline, IoCaretUpOutline, IoTrashOutline } from 'react-icons/io5';
import Card from '../../../components/Card';
import { FileInput, Form, Input } from '../../../components/Form';
import List from '../../../components/List';
import Image from '../../../components/Image';
import Button from '../../../components/Button';
import Link from '../../../components/Link';
import Aside from '../../../components/Aside';
import { useGalleryService, useImageService } from '../../../hooks';
import { FileType, InputType, Type } from '../../../types';
import type { IGallery, IImage } from '../../../services/Tardis/types';
import { Direction } from '../../../services/Tardis/types';
import styles from '../styles.module.css';

const GalleryDetail = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery>();
	const { fetchGalleryById, editGallery } = useGalleryService();
	const { uploadImage, orderImage, removeImage } = useImageService();
	const [galleryId, setGalleryId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation('page');

	const fetchData = () => {
		galleryId > 0 && fetchGalleryById(galleryId).then((response) => setGallery(response));
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
			render: ({ source, title }: IImage) => {
				return <Image srcSet={source} sizes="3rem" alt={title} className={styles.thumbnail} />;
			},
		},
		{ key: 'title', render: ({ title }: IImage) => <span>{title}</span> },
		{
			key: 'id',
			render: ({ id }: IImage, index: number) => (
				<div className={styles.actionContainer}>
					{index > 0 && (
						<Button
							icon={<IoCaretUpOutline />}
							type={Type.secondary}
							onClick={() => handleOrder(id, Direction.up)}
						/>
					)}
					{gallery && index < gallery?.images.length - 1 && (
						<Button
							icon={<IoCaretDownOutline />}
							type={Type.secondary}
							onClick={() => handleOrder(id, Direction.down)}
						/>
					)}
					<Link to={`/image/${id}`} text="detail" />
					<Button icon={<IoTrashOutline />} type={Type.primary} onClick={() => handleDelete(id)} />
				</div>
			),
		},
	];

	return (
		<>
			<Aside>
				<Card title={t('gallery.detail')}>
					{gallery && (
						<Form onSubmit={handleUpdate}>
							<Input
								type={InputType.text}
								name="title"
								label={t('gallery.title')}
								defaultValue={gallery?.title}
							/>
						</Form>
					)}
				</Card>
				<Card title={t('gallery.upload')}>
					<Form onSubmit={handleUpload}>
						<Input type={InputType.text} name="name" label="Název" />
						<FileInput name="image" accept={[FileType.jpg]} />
					</Form>
				</Card>
			</Aside>
			<Card title={t('gallery.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} />}
			</Card>
		</>
	);
};

export default GalleryDetail;
