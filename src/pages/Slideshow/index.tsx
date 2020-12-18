import React, { useContext, useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Upload } from '../../components/Form';
import List from '../../components/List';
import Image from '../../components/Image';
import Button from '../../components/Button';
import StoreContext from '../../Store';
import { UserContext } from '../../contexts';
import { IGallery } from '../../services/Tardis';

const Slideshow: React.FC = (): JSX.Element => {
	const { galleryService, imageService } = useContext(StoreContext);
	const { user } = useContext(UserContext);
	const [gallery, setGallery] = useState<IGallery>();

	const fetchData = () => {
		galleryService.getOneById(1).then((response) => setGallery(response));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleSubmit = (data: FormData) => {
		user && imageService.upload(data, user.token).then((reponse) => fetchData());
	};

	const handleDelete = (id: number) => {
		user && imageService.delete(id, user.token).then(() => fetchData());
	};

	const columns = [
		{
			key: 'paths',
			render: (item: object) => <Image srcset={item} sizes="5rem" alt="img" />,
		},
		{ key: 'title', render: (item: string) => <span>{item}</span> },
		{ key: 'status', render: (item: boolean) => <span>{item ? '✔️' : '❌'}</span> },
		{
			key: 'id',
			render: (id: number) => (
				<Button text="Smazat" type="primary" onClick={() => handleDelete(id)} style={{ marginLeft: 'auto' }} />
			),
		},
	];

	return (
		<>
			<Card title="Nový slide">
				<Upload gallery={1} onSubmit={handleSubmit} />
			</Card>
			<Card title="Obsah">
				<List data={gallery?.images} columns={columns} />
			</Card>
		</>
	);
};

export default Slideshow;
