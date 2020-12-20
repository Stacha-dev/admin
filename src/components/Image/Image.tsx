import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface IImage {
	srcset: object;
	sizes?: string;
	alt: string;
}

const Image: React.FC<IImage> = (props): JSX.Element => {
	const { srcset, sizes, alt } = props;
	const [srcSet, setSrcSet] = useState<string>('');

	useEffect(() => {
		setSrcSet(
			Object.entries(srcset)
				.map(([width, path]) =>
					process.env.NODE_ENV === 'development'
						? `https://pc.stacha.dev${path} ${width}w, `
						: `${path} ${width}w, `
				)
				.join(',')
		);
	}, [srcset]);

	return <img srcSet={srcSet} sizes={sizes} alt={alt} className={styles.container} />;
};

export default Image;
