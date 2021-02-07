import React from 'react';
import styles from './styles.module.css';

interface ListProps {
	data: object[];
	columns: { key: string; render?: (item: any, index: number) => void }[];
	header?: string[];
	className?: string;
}

const List = (props: ListProps): JSX.Element => {
	const { data, columns, header, className } = props;

	return (
		<div className={`${styles.container} ${className}`}>
			{header && (
				<div className={styles.header}>
					{header.map((item) => (
						<div key={item}>{item}</div>
					))}
				</div>
			)}
			{data?.map((row: any, index: number) => (
				<div
					className={`${styles.row} ${styles.striped}`}
					key={row.id}
					style={{ gridTemplateColumns: '1fr '.repeat(columns.length) }}>
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
	header: [],
	className: '',
};

export default List;
