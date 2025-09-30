import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormContainer from '../../../components/FormContainer/FormContainer';
import { GoogleSign } from '../../../widgets/GoogleSign';
import styles from '../../components/FormContainer/FormContainer.module.scss';
import { CustomButton } from '../../components/UI/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput';

import auth, { db } from '../../../app/config/firebase';
import {
	setError,
	setLoading,
	setUser,
} from '../../../app/redux/reducers/UserSlice';
import { initialValuesSignUp, SignUpSchema } from '../../../app/utils/shema';
import { useAppDispatch } from '../../hooks/redux';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleSignUp = async (values: {
		name: string;
		email: string;
		password: string;
	}) => {
		dispatch(setLoading(true));
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				values.email,
				values.password
			);

			await updateProfile(user, { displayName: values.name });

			const userData = {
				name: values.name,
				email: values.email,
				photoURL: user.photoURL || null,
			};

			await setDoc(doc(db, 'users', user.uid), userData);

			const token = await user.getIdToken();

			dispatch(
				setUser({
					...userData,
					id: user.uid,
					token,
				})
			);

			toast.success('Rejestracja zakończona sukcesem!');
			navigate('/profile');
		} catch (error: any) {
			console.error('Sign up error:', error);

			if (error.code === 'auth/email-already-in-use') {
				toast.error('Ten email jest już zarejestrowany.');
				dispatch(setError('Email jest już używany.'));
			} else {
				toast.error('Błąd podczas rejestracji. Spróbuj ponownie.');
				dispatch(setError('Błąd podczas rejestracji.'));
			}
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<FormContainer
			initialValues={initialValuesSignUp}
			validationSchema={SignUpSchema}
			onSubmit={(values, { resetForm }) => {
				handleSignUp(values);
				resetForm();
			}}
			title='Zarejestruj się'
		>
			<CustomInput label='Imię' name='name' placeholder='Wpisz swoje imię' />
			<CustomInput
				label='E-mail'
				name='email'
				placeholder='Wpisz adres e-mail'
				type='email'
			/>
			<CustomInput
				label='Hasło'
				name='password'
				placeholder='Wpisz hasło'
				type='password'
			/>
			<GoogleSign />
			<Link to='/signIn' className={styles.form__link}>
				<strong>
					Masz konto? <span>Zaloguj się</span>
				</strong>
			</Link>
			<CustomButton type='submit' text='Załóż konto' />
		</FormContainer>
	);
};

export default SignUp;
