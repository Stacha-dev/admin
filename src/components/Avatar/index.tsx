import React from 'react';
import styles from './styles.module.css';

interface AvatarProps {
	name: string;
	surname: string;
}

const Avatar = (props: AvatarProps): JSX.Element => {
	const { name, surname } = props;

	return (
		<div title={`${name} ${surname}`} className={styles.container}>{`${name && name.charAt(0)}${
			surname && surname.charAt(0)
		}`}</div>
	);
};

export default Avatar;
