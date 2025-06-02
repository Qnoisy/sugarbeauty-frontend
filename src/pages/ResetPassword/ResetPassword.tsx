import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type React from 'react';
import { Container } from '../../components/Container';
import { CustomButton } from '../../components/UI/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput';
import { ResetPasswordSchema } from '../../utils/shema';
import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();

	const handleResetPassword = async (email: string) => {
		const auth = getAuth();

		try {
			await sendPasswordResetEmail(auth, email);
			toast.success('Password reset email sent!');
			navigate('/signIn');
		} catch (error: any) {
			console.error('Reset email error:', error.message);
			toast.error(error.message || 'Failed to send reset email');
		}
	};

	return (
		<Container section>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={ResetPasswordSchema}
				onSubmit={values => handleResetPassword(values.email)}
			>
				{({ handleSubmit }) => (
					<Form className={styles.form} onSubmit={handleSubmit}>
						<h2 className={styles.form__title}>
							<strong>Reset Password</strong>
						</h2>
						<CustomInput
							label='Email'
							name='email'
							placeholder='Enter your email address'
						/>
						<CustomButton type='submit' text='Send Reset Email' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default ResetPassword;
