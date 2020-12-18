import React from 'react';

interface ITextInput {
	label?: string;
	name: string;
	placeholder?: string;
}

const TextInput: React.FC<ITextInput> = (props) => {
	const { label, name, placeholder } = props;

	return (
		<label>
			<span>{label}</span>
			<input type="text" placeholder={placeholder} name={name} />
		</label>
	);
};

export default TextInput;
