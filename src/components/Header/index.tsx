import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts';
import Button from '../Button';
import Avatar from '../Avatar';
import { Type } from '../../types';
import styles from './styles.module.css';

interface HeaderProps {
	children?: JSX.Element | JSX.Element[];
}

const Header = (props: HeaderProps): JSX.Element => {
	const { children } = props;
	const { user, logout } = useContext(UserContext);
	const { t } = useTranslation('component');

	return (
		<header className={styles.container}>
			{children}
			{user && <Button text={t('header.logout')} type={Type.secondary} onClick={logout} />}
			{user && <Avatar name={user.name} surname={user.surname} />}
		</header>
	);
};

export default Header;
