import React, { useEffect, useRef } from 'react';
import { FaGripLinesVertical } from 'react-icons/fa';
import { isFunctionDeclaration } from 'typescript';
import styles from './styles.module.css';

interface ListProps {
	data: object[];
	columns: { key: string; render?: (item: any, index: number) => void }[];
	className?: string;
	onRowDrop?: (dragId: number, dropId: number) => void;
}

const List = (props: ListProps): JSX.Element => {
	const { data, columns, className, onRowDrop } = props;
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef?.current;
		const handleDragOver = (event: Event) => event.preventDefault();

		container?.addEventListener('dragover', handleDragOver);

		return () => {
			container?.removeEventListener('drop', handleDragOver);
		};
	}, []);

	return (
		<div className={`${styles.container} ${className}`} ref={containerRef}>
			{data?.map((row: any, index: number) => (
				<div
					className={`${styles.row} ${styles.striped}`}
					key={row.id}
					draggable={typeof onRowDrop === 'function'}
					onDragStart={({ dataTransfer }: React.DragEvent<HTMLDivElement>) =>
						dataTransfer?.setData('id', row.id.toString())
					}
					onDrop={({ dataTransfer }: React.DragEvent<HTMLDivElement>) => {
						const dropId = parseInt(dataTransfer.getData('id'), 10);
						onRowDrop && !isNaN(dropId) && onRowDrop(row.id, dropId);
					}}>
					{onRowDrop && <FaGripLinesVertical className={styles.grip} />}
					{columns.map((column, key) => (
						<div key={key} className={styles.cell}>
							{column.render ? column.render(row, index) : row[column.key]}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

List.defaultProps = {
	className: '',
};

export default List;
