import React, { useMemo, useRef, useState, useEffect } from 'react';
import { ISource } from 'services/Tardis/types';
import styles from './styles.module.css';

interface ImageProps {
	source: ISource;
	alt: string;
	className?: string;
}

const Image = (props: ImageProps): JSX.Element => {
	const { source, alt, className } = props;
	const [width, setWidth] = useState<number>(0);
	const imageRef = useRef<HTMLImageElement>(null);

	const srcSet = useMemo(
		(): string =>
			source &&
			Object.entries(source['image/jpeg'])
				.map(([width, path]) =>
					process.env.NODE_ENV === 'development'
						? `${process.env.REACT_APP_DOMAIN_STAGING}${path} ${width}w, `
						: `${path} ${width}w, `
				)
				.join(','),
		[source]
	);

	useEffect(() => {
		imageRef.current && setWidth(imageRef.current.width);
	}, [imageRef]);

	return (
		<img
			srcSet={srcSet}
			sizes={`${width}px`}
			alt={alt}
			className={`${styles.container} ${styles.loading} ${className}`}
			loading="lazy"
			ref={imageRef}
		/>
	);
};

export default Image;
