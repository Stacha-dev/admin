import React, { useContext, useEffect, useState, useCallback } from 'react';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { Form, Input } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import StoreContext from '../../Store';
import { UserContext, LoadingContext } from '../../contexts';
import type { IGallery } from '../../services/Tardis';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';
import { InputType } from '../../types';
import { ISource } from '../../services/Tardis/types';

const Slideshow: React.FC = (): JSX.Element => {
	const { galleryService, imageService } = useContext(StoreContext);
	const { setLoading } = useContext(LoadingContext);
	const { user } = useContext(UserContext);
	const [gallery, setGallery] = useState<IGallery>();
	const { t } = useTranslation();
	const galleryId = 1;

	const fetchData = useCallback(() => {
		galleryService
			.getOneById(galleryId)
			.then((response) => setGallery(response))
			.catch((error) => console.error(error));
	}, [galleryId, galleryService]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleUpload = (data: any) => {
		setLoading && setLoading(true);
		const formData = new FormData();

		formData.append('file', data.file[0]);
		formData.append('title', data.name);
		formData.append('gallery', '1');

		user &&
			imageService
				.upload(formData, user.token)
				.then((reponse) => {
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

	const handleUp = (ordering: number) => {};

	const columns = [
		{
			key: 'source',
			render: (item: ISource) => {
				return <Image srcSet={item} sizes="4rem" alt="img" />;
			},
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
		{ key: 'ordering', render: (ordering: number) => <Button text="foo" type="primary" /> },
		{
			key: 'id',
			render: (id: number) => (
				<Button
					text={t('pages.slideshow.delete')}
					type="primary"
					onClick={() => handleDelete(id)}
					style={{ marginLeft: 'auto' }}
				/>
			),
		},
	];

	return (
		<Page>
			<Card title={t('pages.slideshow.upload')}>
				<Form onSubmit={handleUpload}>
					<Input type={InputType.text} name="name" />
					<Input type={InputType.file} name="file" />
				</Form>
			</Card>
			<Card title={t('pages.slideshow.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} />}
			</Card>
		</Page>
	);
};

export default Slideshow;
