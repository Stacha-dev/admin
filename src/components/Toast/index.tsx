import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useAnimation } from '../../hooks';

interface ToastProps {
	text: string;
	dissmisTimeout: number;
	onClose: () => void;
}

const Toast = (props: ToastProps): JSX.Element => {
	const { text, dissmisTimeout, onClose } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const { slideRight, backgroundSlideLeft } = useAnimation(containerRef);

	useEffect(() => {
		slideRight({ duration: 250, fill: 'forwards' });
		backgroundSlideLeft({ duration: dissmisTimeout, fill: 'forwards' });

		const timeout = setTimeout(() => {
			handleClose();
		}, dissmisTimeout);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const handleClose = () => {
		onClose();
	};

	return (
		<div className={styles.container} onClick={handleClose} ref={containerRef}>
			<div className={styles.close}>❌</div>
			<div className={styles.message}>{text}</div>
		</div>
	);
};

export default Toast;
