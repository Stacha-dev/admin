import React from 'react';
import styles from './styles.module.css';

interface IList {
	data?: object[];
	columns: { key: string; render?: (item: any) => void }[];
}

const List: React.FC<IList> = (props): JSX.Element => {
	const { data, columns } = props;

	return (
		<div className={styles.container}>
			{data?.map((row: any) => (
				<div className={styles.row} key={row.id} style={{ gridTemplateColumns: '1fr '.repeat(columns.length) }}>
					{columns.map((column, index) => (
						<div key={index} className={styles.cell}>
							{column.render ? column.render(row[column.key]) : row[column.key]}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default List;
