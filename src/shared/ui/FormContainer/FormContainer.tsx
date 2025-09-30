// FormContainer.tsx
import { Form, Formik } from 'formik';
import React from 'react';
import { Container } from '../Container';
import styles from './FormContainer.module.scss';

interface FormContainerProps {
	initialValues?: any;
	validationSchema?: any;
	onSubmit?: (values: any, actions: any) => void;
	title: string;
	children?: React.ReactNode;
	isForm?: boolean; // Признак для использования в качестве формы
}

const FormContainer: React.FC<FormContainerProps> = ({
	initialValues,
	validationSchema,
	onSubmit,
	title,
	children,
	isForm = true, // По умолчанию компонент будет формой
}) => {
	// Если это форма, обернем контент в Formik и Form
	if (isForm && initialValues && validationSchema && onSubmit) {
		return (
			<Container section>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ handleSubmit }) => (
						<Form className={styles.form} onSubmit={handleSubmit}>
							<h2 className={styles.form__title}>
								<strong>{title}</strong>
							</h2>
							<div className={styles.form__content}>{children}</div>
						</Form>
					)}
				</Formik>
			</Container>
		);
	}

	return (
		<Container section>
			<div className={styles.form}>
				<h2 className={styles.form__title}>
					<strong>{title}</strong>
				</h2>
			</div>
			<div className={styles.content}>{children}</div>
		</Container>
	);
};

export default FormContainer;
