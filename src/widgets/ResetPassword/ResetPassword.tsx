import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type React from 'react';
import { ResetPasswordSchema } from '../../shared/utils/shema';

import { Button } from '../../shared/ui/Button/Button';
import { Container } from '../../shared/ui/Container';
import Input from '../../shared/ui/Input/Input';
import styles from './ResetPassword.module.scss';

const ResetPassword: React.FC = () => {
	const navigate = useNavigate();

	const handleResetPassword = async (email: string) => {
		const auth = getAuth();

		try {
			await sendPasswordResetEmail(auth, email);
			toast.success('Password reset email sent!');
			navigate('/signIn');
		} catch (error) {
			const e = error as Error;
			console.error('Reset email error:', e.message);
			toast.error(e.message || 'Failed to send reset email');
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
						<Input
							label='Email'
							name='email'
							placeholder='Enter your email address'
						/>
						<Button type='submit' text='Send Reset Email' />
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default ResetPassword;
