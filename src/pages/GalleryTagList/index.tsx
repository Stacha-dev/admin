import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useStore, useLoading, useUser } from '../../hooks';
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
	const { galleryService, imageService } = useStore();
	const { setLoading } = useLoading();
	const { user } = useUser();
	const [gallery, setGallery] = useState<IGallery[]>();
	const { tag } = useParams<{ tag?: string }>();
	const { t } = useTranslation();

	const fetchData = useCallback(() => {
		if (tag) {
			const tagId = parseInt(tag, 10);
			galleryService
				.getByTag(tagId)
				.then((response) => setGallery(response))
				.catch((error) => console.error(error));
		}
	}, [galleryService, tag]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleCreate = (data: any) => {
		setLoading && setLoading(true);
		/*
		user &&
			galleryService
				.create(formData, user.token)
				.then((reponse) => {
					fetchData();
					setLoading && setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading && setLoading(false);
				});
				*/
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
