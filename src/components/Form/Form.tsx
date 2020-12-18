import React, { useRef } from 'react';

interface IForm {
	onSubmit: (data: object) => void;
	children?: JSX.Element | JSX.Element[];
}

const Form: React.FC<IForm> = (props): JSX.Element => {
	const { onSubmit, children } = props;
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formRef && formRef.current) {
			const inputs = formRef.current.querySelectorAll('input');
			const data = Array.from(inputs)
				.filter((input) => input.name && input.value)
				.map((input) => [input.name, input.value]);
			onSubmit(Object.fromEntries(data));
		}
	};

	return (
		<form onSubmit={handleSubmit} ref={formRef}>
			{children}
			<input type="submit" />
		</form>
	);
};

export default Form;
