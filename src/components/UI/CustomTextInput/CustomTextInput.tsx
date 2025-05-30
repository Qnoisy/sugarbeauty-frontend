import { useField } from 'formik';
import React from 'react';
interface CustomTextInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
}
const CustomTextInput: React.FC<CustomTextInputProps> = ({
	label,
	...props
}) => {
	const [field, meta] = useField(props);

	return (
		<>
			<label style={{ textAlign: 'center' }} htmlFor={props.id || props.name}>
				{label}
			</label>
			<input {...field} {...props} />
			{meta.touched && meta.error ? (
				<span style={{ color: 'red', fontSize: '12px' }}>{meta.error}</span>
			) : null}
		</>
	);
};

export default CustomTextInput;
