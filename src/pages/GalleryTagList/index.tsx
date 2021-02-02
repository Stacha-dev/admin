import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGalleryService, useImageService } from '../../hooks';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Link from '../../components/Link';
import type { IGallery } from '../../services/Tardis';
import { useTranslation } from 'react-i18next';
import { InputType, Type } from '../../types';
import { ISource } from '../../services/Tardis/types';
import styles from './styles.module.css';

const GalleryTagList = (): JSX.Element => {
	const [gallery, setGallery] = useState<IGallery[]>();
	const [galleryTagID, setGalleryTagId] = useState<number>(0);
	const { tag } = useParams<{ tag?: string }>();
	const { t } = useTranslation();
	const { fetchGalleryByTag } = useGalleryService();
	const { removeImage } = useImageService();

	const fetchData = () => {
		galleryTagID > 0 && fetchGalleryByTag(galleryTagID).then((response) => setGallery(response));
	};
	const handleCreate = (data: any) => {};
	const handleDelete = (id: number) => removeImage(id).then(() => fetchData());

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [galleryTagID]);

	useEffect(() => {
		tag && setGalleryTagId(() => parseInt(tag, 10));
	}, [tag]);

	const columns = [
		{
			key: 'source',
			render: (item: ISource) => {
				return (
					<div className={styles.thumbnail}>
						<Image srcSet={item} sizes="4rem" alt="img" className={styles.image} />
					</div>
				);
			},
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
		{
			key: 'id',
			render: (id: number, index: number) => (
				<div className={styles.actionContainer}>
					<Link to={`/gallery/${id}`} text="detail" />
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
				<Form onSubmit={handleCreate}>
					<Input type={InputType.text} name="title" label={t('page.gallery.title')} />
					<Input type={InputType.text} name="description" label={t('page.gallery.description')} />
				</Form>
			</Card>
			<Card title={t('page.gallery.content')} className={styles.content}>
				{gallery && <List data={gallery} columns={columns} header={['náhled', 'název', 'akce']} />}
			</Card>
		</Page>
	);
};

export default GalleryTagList;
