import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormContainer from '../../../components/FormContainer/FormContainer';
import { GoogleSign } from '../../../widgets/GoogleSign';
import styles from '../../components/FormContainer/FormContainer.module.scss';
import { CustomButton } from '../../components/UI/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput';

import {
	setError,
	setLoading,
	setUser,
} from '../../../app/redux/reducers/UserSlice';
import { useAppDispatch } from '../../hooks/redux';

import auth from '../../../app/config/firebase';
import { initialValuesSignIn, SignInSchema } from '../../../app/utils/shema';

const SignIn: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSignIn = async (email: string, password: string) => {
		dispatch(setLoading(true));
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const token = await user.getIdToken();

			dispatch(
				setUser({
					name: user.displayName || '',
					email: user.email || '',
					id: user.uid,
					token,
					photoURL: user.photoURL || null,
				})
			);

			toast.success('Zalogowano pomyślnie!');
			navigate('/profile');
		} catch (error: any) {
			console.error('Sign-in error:', error);
			dispatch(setError(error.message || 'Sign-in failed'));
			toast.error(error.message || 'Błąd logowania');
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<FormContainer
			initialValues={initialValuesSignIn}
			validationSchema={SignInSchema}
			onSubmit={values => handleSignIn(values.email, values.password)}
			title='Zaloguj się'
		>
			<CustomInput
				label='E-mail'
				name='email'
				placeholder='Enter your email address'
			/>
			<CustomInput
				label='Hasło'
				name='password'
				placeholder='Enter your password'
				type='password'
			/>
			<Link to='/resetPassword' className={styles.form__link}>
				<strong>Nie pamiętasz hasła?</strong>
			</Link>
			<Link to='/signUp' className={styles.form__link}>
				<strong>Nie masz konta?</strong>
			</Link>
			<GoogleSign />
			<CustomButton type='submit' text='zaloguj się' />
		</FormContainer>
	);
};

export default SignIn;
