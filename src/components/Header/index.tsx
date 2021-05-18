import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoHomeOutline } from 'react-icons/io5';
import { UserContext } from 'contexts';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import Select from 'components/Select';
import { useLocale } from 'hooks';
import { Type } from 'types';
import styles from './styles.module.css';

interface HeaderProps {
	children?: JSX.Element | JSX.Element[];
}

const Header = (props: HeaderProps): JSX.Element => {
	const { children } = props;
	const { user, logout } = useContext(UserContext);
	const { t } = useTranslation('component');
	const { setLocale } = useLocale();
	const handleLocaleChange = (value: string) => setLocale(value);

	return (
		<header className={styles.container}>
			{children}
			<a href="/" target="blank" className={styles.link}>
				<IoHomeOutline />
			</a>
			<Select options={['en', 'cs']} onChange={handleLocaleChange} />
			{user && <Button text={t('header.logout')} type={Type.secondary} onClick={logout} />}
			{user && <Avatar name={user.name} surname={user.surname} />}
		</header>
	);
};

export default Header;
