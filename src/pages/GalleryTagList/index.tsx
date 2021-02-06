import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { useGalleryService } from '../../hooks';
import Card from '../../components/Card';
import { Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Link from '../../components/Link';
import type { IGallery } from '../../services/Tardis';
import { useTranslation } from 'react-i18next';
import { InputType, Type } from '../../types';
import { IImage } from '../../services/Tardis/types';
import styles from './styles.module.css';

const GalleryTagList = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery[]>();
	const [galleryTagID, setGalleryTagId] = useState<number>(0);
	const { tag } = useParams<{ tag?: string }>();
	const { t } = useTranslation();
	const { findGalleryBy, createGallery, removeGallery } = useGalleryService();

	const fetchData = () => {
		galleryTagID > 0 && findGalleryBy('tag', galleryTagID.toString()).then((response) => setGallery(response));
	};
	const handleCreate = (data: any) =>
		createGallery(data.title, data.description, galleryTagID).then(() => fetchData());
	const handleDelete = (id: number) => removeGallery(id).then(() => fetchData());

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [galleryTagID]);

	useEffect(() => {
		tag && setGalleryTagId(() => parseInt(tag, 10));
	}, [tag]);

	const columns = [
		{
			key: 'thumbnail',
			render: (item: IImage) => {
				return (
					<div className={styles.thumbnail}>
						<Image srcSet={item.source} sizes="4rem" alt="img" className={styles.image} />
					</div>
				);
			},
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
		{ key: 'description', render: (item: string) => <span>{item}</span> },
		{
			key: 'id',
			render: (id: number, index: number) => (
				<div className={styles.actionContainer}>
					<Link to={`/gallery/${id}`} text="detail" />
					<Button icon={<IoTrashOutline />} type={Type.primary} onClick={() => handleDelete(id)} />
				</div>
			),
		},
	];

	return (
		<>
			<Card title={t('page.gallery.upload')}>
				<Form onSubmit={handleCreate}>
					<Input type={InputType.text} name="title" label={t('page.gallery.title')} />
					<Input type={InputType.text} name="description" label={t('page.gallery.description')} />
				</Form>
			</Card>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{gallery && <List data={gallery} columns={columns} header={['náhled', 'název', 'popis', 'akce']} />}
			</Card>
		</>
	);
};

export default GalleryTagList;
