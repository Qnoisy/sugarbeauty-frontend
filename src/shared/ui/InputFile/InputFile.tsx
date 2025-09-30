import { useField } from 'formik';
import { FaFileAlt } from 'react-icons/fa';
import styles from './CustomFileInput.module.scss';
interface InputFileProps {
	label: string;
	name: string;
	setFieldValue: (field: string, value: File | null) => void;
}

const InputFile: React.FC<InputFileProps> = ({
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
		<div className={styles.customFile}>
			<label htmlFor='imageFile' className={styles.customFile__label}>
				<FaFileAlt className={styles.customFile__icon} />
				<span>{label}</span>
			</label>
			<input
				id='imageFile'
				type='file'
				className={styles.customFile__input}
				accept='image/*'
				onChange={handleChange}
			/>
			{meta.touched && meta.error ? (
				<span className={styles.customFile__error}>{meta.error}</span>
			) : null}
		</div>
	);
};

export default InputFile;
