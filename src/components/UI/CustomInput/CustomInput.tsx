import classNames from 'classnames';
import { useField } from 'formik';
import React, { forwardRef } from 'react';
import styles from './CustomInput.module.scss';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
	({ label, name, type = 'text', placeholder, ...props }, ref) => {
		const [field, meta] = useField(name);

		return (
			<div className={styles.inputWrapper}>
				{label && (
					<label htmlFor={name} className={styles.label}>
						<strong>{label}</strong>
					</label>
				)}

				<input
					{...field}
					{...props}
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					ref={ref}
					className={classNames(styles.customInput, {
						[styles.error]: meta.touched && meta.error,
					})}
				/>

				{meta.touched && meta.error && (
					<span className={styles.errorMessage}>{meta.error}</span>
				)}
			</div>
		);
	}
);

export default CustomInput;
