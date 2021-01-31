import React from 'react';
import styles from './styles.module.css';

interface ListProps {
	data: object[];
	columns: { key: string; render?: (item: any, index: number) => void }[];
	header?: string[];
}

const List = (props: ListProps): JSX.Element => {
	const { data, columns, header } = props;

	return (
		<div className={styles.container}>
			{header && (
				<div className={styles.row} style={{ gridTemplateColumns: '1fr '.repeat(columns.length) }}>
					{header.map((item, index) => (
						<div key={index}>{item}</div>
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
							{column.render ? column.render(row[column.key], index) : row[column.key]}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

List.defaultProps = {
	header: [],
};

export default List;
