interface SelectProps {
	options: string[];
}

const Select = (props: SelectProps): JSX.Element => {
	const { options } = props;

	return (
		<select>
			{options.map((option) => (
				<option>{option}</option>
			))}
		</select>
	);
};

export default Select;
