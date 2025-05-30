import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaGoogle } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth, { db } from '../../firebase/firebase';
import styles from './GoogleSign.module.scss';

export const GoogleSign: React.FC = () => {
	const navigate = useNavigate();

	const handleGoogleSign = async () => {
		const provider = new GoogleAuthProvider();

		try {
			const { user } = await signInWithPopup(auth, provider);
			const token = await user.getIdToken();
			const name = user.displayName || 'Anonymous';
			const email = user.email!;
			const photoURL = user.photoURL || null;

			const userDocRef = doc(db, 'users', user.uid);
			const userDoc = await getDoc(userDocRef);

			let role = 'user';
			if (!userDoc.exists()) {
				await setDoc(userDocRef, { name, email, role, photoURL });
				toast.success('Konto utworzone przez Google!');
			} else {
				role = userDoc.data()?.role || 'user';
				toast.info('Witamy ponownie!');
			}

			localStorage.setItem(
				'user',
				JSON.stringify({ name, email, id: user.uid, token, role, photoURL })
			);

			navigate('/profile');
		} catch (error: any) {
			console.error('Google sign-in error:', error.message);
			toast.error('Błąd przy logowaniu przez Google');
		}
	};

	return (
		<button
			onClick={handleGoogleSign}
			type='button'
			className={styles.google__sign}
		>
			<FaGoogle className={styles.google__img} />
			<strong>Kontynuuj z Google</strong>
		</button>
	);
};
