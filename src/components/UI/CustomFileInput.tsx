import { useField } from 'formik';

interface CustomFileInputProps {
	label: string;
	name: string;
	setFieldValue: (field: string, value: File | null) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
	label,
	name,
	setFieldValue,
}) => {
	const [, meta] = useField(name);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setFieldValue(name, event.target.files[0]);
		}
	};

	return (
		<div>
			<label>{label}</label>
			<input type='file' accept='image/*' onChange={handleChange} />
			{meta.touched && meta.error ? (
				<span style={{ color: 'red' }}>{meta.error}</span>
			) : null}
		</div>
	);
};

export default CustomFileInput;
