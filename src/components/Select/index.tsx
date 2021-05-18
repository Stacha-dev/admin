import React from 'react';

interface SelectProps {
	options: string[];
	onChange: (value: string) => void;
}

const Select = (props: SelectProps): JSX.Element => {
	const { options, onChange } = props;
	// @ts-ignore
	const handleChange = (event: React.ChangeEvent) => onChange(event.target.value);

	return (
		<select onChange={handleChange}>
			{options.map((option) => (
				<option>{option}</option>
			))}
		</select>
	);
};

export default Select;
