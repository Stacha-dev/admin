import React, { useContext, useEffect, useState } from 'react';
import Page from '../../components/Page';
import Card from '../../components/Card';
import { Upload } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import StoreContext from '../../Store';
import { UserContext, LoadingContext } from '../../contexts';
import type { IGallery } from '../../services/Tardis';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const Slideshow: React.FC = (): JSX.Element => {
	const { galleryService, imageService } = useContext(StoreContext);
	const { setLoading } = useContext(LoadingContext);
	const { user } = useContext(UserContext);
	const [gallery, setGallery] = useState<IGallery>();
	const { t } = useTranslation();

	const fetchData = () => {
		galleryService
			.getOneById(1)
			.then((response) => setGallery(response))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleUpload = (data: FormData) => {
		setLoading && setLoading(true);
		user &&
			imageService
				.upload(data, user.token)
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

	const columns = [
		{
			key: 'paths',
			render: (item: object) => {
				item && <Image srcset={item} sizes="4rem" alt="img" />;
			},
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
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
				<Upload gallery={1} onSubmit={handleUpload} />
			</Card>
			<Card title={t('pages.slideshow.content')} className={styles.content}>
				{gallery && <List data={gallery.images} columns={columns} />}
			</Card>
		</Page>
	);
};

export default Slideshow;
