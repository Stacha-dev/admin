interface SelectProps {
	options: string[];
	onChange: () => void;
}

const Select = (props: SelectProps): JSX.Element => {
	const { options, onChange } = props;

	return (
		<select onChange={onChange}>
			{options.map((option) => (
				<option>{option}</option>
			))}
		</select>
	);
};

export default Select;
