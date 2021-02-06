import React, { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { useAnimation } from '../../hooks';

interface ToastProps {
	text: string;
	dissmisTimeout: number;
	onDismiss: () => void;
}

const Toast = (props: ToastProps): JSX.Element => {
	const { text, dissmisTimeout, onDismiss } = props;
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [backgroundSlideLeft, dissmisTimeout, slideRight]);

	const handleClose = useCallback(() => onDismiss(), [onDismiss]);

	return (
		<div className={styles.wrapper} onClick={handleClose} ref={containerRef}>
			<div className={styles.close}>❌</div>
			<div className={styles.message}>{text}</div>
		</div>
	);
};

export default Toast;
