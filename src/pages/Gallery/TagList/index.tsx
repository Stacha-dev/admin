import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoTrashOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useGalleryService } from 'hooks';
import Card from 'components/Card';
import Form from 'components/Form';
import { Input, Switch, Textarea } from 'components/Input';
import List from 'components/List';
import Image from 'components/Image';
import Button from 'components/Button';
import Link from 'components/Link';
import type { IGallery } from 'services/Tardis';
import { InputType, Type } from 'types';
import styles from '../styles.module.css';

const GalleryTagList = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery[]>();
	const [galleryTagID, setGalleryTagId] = useState<number>(0);
	const { tag } = useParams<{ tag?: string }>();
	const { t } = useTranslation('page');
	const { findGalleryBy, createGallery, editGallery, removeGallery } = useGalleryService();

	const fetchData = () => {
		galleryTagID > 0 && findGalleryBy('tag', galleryTagID.toString()).then((response) => setGallery(response));
	};
	const handleCreate = (data: any) =>
		createGallery(data.title, data.description, galleryTagID).then(() => fetchData());
	const handleStateChange = (id: number, state: boolean) => editGallery(id, { state }).then(() => fetchData());
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
			render: ({ thumbnail }: IGallery) => {
				return (
					<>
						{thumbnail.source && (
							<Image source={thumbnail.source} alt={thumbnail.title} className={styles.thumbnail} />
						)}
					</>
				);
			},
		},
		{ key: 'title', render: ({ title }: IGallery) => <span>{title}</span> },
		{ key: 'description', render: ({ description }: IGallery) => <span>{description}</span> },
		{
			key: 'id',
			render: ({ id, state }: IGallery) => (
				<div className={styles.actionContainer}>
					<Switch onChange={(state: boolean) => handleStateChange(id, state)} defaultChecked={state} />
					<Link to={`/gallery/${id}`} text="detail" />
					<Button icon={<IoTrashOutline />} type={Type.primary} onClick={() => handleDelete(id)} />
				</div>
			),
		},
	];

	return (
		<>
			<Card title={t('gallery.add')}>
				<Form submitText={t('gallery.add')} onSubmit={handleCreate}>
					<Input type={InputType.text} name="title" label={t('gallery.title')} />
					<Textarea name="description" rows={4} label={t('gallery.description')} />
				</Form>
			</Card>
			<Card title={t('gallery.content')} className={styles.content}>
				{gallery && <List data={gallery} columns={columns} className={styles.list} />}
			</Card>
		</>
	);
};

export default GalleryTagList;
