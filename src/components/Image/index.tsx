import React, { useMemo } from 'react';
import { ISource } from '../../services/Tardis/types';
import styles from './styles.module.css';

interface ImageProps {
	srcSet: ISource;
	sizes?: string;
	alt: string;
	className?: string;
}

const Image = (props: ImageProps): JSX.Element => {
	const { srcSet, sizes, alt, className } = props;

	const source = useMemo(
		() =>
			srcSet &&
			Object.entries(srcSet['image/jpeg'])
				.map(([width, path]) =>
					process.env.NODE_ENV === 'development'
						? `${process.env.REACT_APP_DOMAIN_STAGING}${path} ${width}w, `
						: `${path} ${width}w, `
				)
				.join(','),
		[srcSet]
	);

	return <img srcSet={source} sizes={sizes} alt={alt} className={`${styles.container} ${className}`} />;
};

Image.defaultProps = {
	sizes: '',
	className: '',
};

export default Image;
