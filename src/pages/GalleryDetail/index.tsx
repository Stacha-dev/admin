import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useStore, useLoading, useUser } from '../../hooks';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import type { IGallery } from '../../services/Tardis';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { InputType, Type } from '../../types';
import { ISource, Direction } from '../../services/Tardis/types';

const GalleryDetail: React.FC = (): JSX.Element => {
	const { galleryService, imageService } = useStore();
	const { setLoading } = useLoading();
	const { user } = useUser();
	const [gallery, setGallery] = useState<IGallery>();
	const [galleryId, setGalleryId] = useState<number>(0);
	const { id } = useParams<{ id?: string }>();
	const { t } = useTranslation();

	const fetchData = useCallback(() => {
		galleryId > 0 &&
			galleryService
				.getOneById(galleryId)
				.then((response) => setGallery(response))
				.catch((error) => console.error(error));
	}, [galleryId, galleryService]);

	useEffect(() => {
		setGalleryId(() => (id ? parseInt(id, 10) : 0));
		fetchData();
	}, [id, fetchData]);

	const handleUpload = (data: any) => {
		setLoading && setLoading(true);
		const formData = new FormData();

		formData.append('file', data.file[0]);
		formData.append('title', data.name);
		formData.append('gallery', galleryId.toString());

		user &&
			imageService
				.upload(formData, user.token)
				.then(() => {
					fetchData();
					setLoading && setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading && setLoading(false);
				});
	};

	const handleDelete = (id: number) => {
		setLoading && setLoading(true);
		user &&
			imageService
				.delete(id, user.token)
				.then(() => {
					fetchData();
					setLoading && setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading && setLoading(false);
				});
	};

	const handleOrder = (id: number, direction: Direction) => {
		setLoading && setLoading(true);
		user &&
			imageService
				.order(id, direction, user.token)
				.then(() => {
					fetchData();
					setLoading && setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading && setLoading(false);
				});
	};

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
					<Input type={InputType.file} name="file" />
				</Form>
			</Card>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} header={['náhled', 'název', 'akce']} />}
			</Card>
		</Page>
	);
};

export default GalleryDetail;
