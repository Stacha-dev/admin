import React from 'react';
import { IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5';
import styles from './styles.module.css';

interface ListProps {
	data: object[];
	columns: { key: string; render?: (item: any, index: number) => void }[];
	className?: string;
	onOrder?: (from: any, to: any) => void;
}

const List = (props: ListProps): JSX.Element => {
	const { data, columns, className, onOrder } = props;

	return (
		<div className={`${styles.container} ${className}`}>
			{data?.map((row: any, index: number) => (
				<div className={`${styles.row} ${styles.striped}`} key={row.id}>
					{typeof onOrder === 'function' && (
						<div className={styles.orderContainer}>
							{index > 0 && (
								<IoArrowUpOutline
									className={`${styles.arrow} ${styles.up}`}
									onClick={() => onOrder && onOrder(row, data[index - 1])}
								/>
							)}
							{index < data.length - 1 && (
								<IoArrowDownOutline
									className={`${styles.arrow} ${styles.down}`}
									onClick={() => onOrder && onOrder(row, data[index + 1])}
								/>
							)}
						</div>
					)}
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
