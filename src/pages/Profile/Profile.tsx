import { deleteUser, sendPasswordResetEmail, signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormContainer from '../../components/FormContainer/FormContainer';
import { CustomButton } from '../../components/UI/CustomButton';
import auth from '../../firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeUser } from '../../redux/reducers/UserSlice';
import EditName from './EditName/EditName';
import styles from './Profile.module.scss';

export const Profile: React.FC = () => {
	const navigate = useNavigate();
	const user = useAppSelector(state => state.user.user);
	const dispatch = useAppDispatch();
	const handleLogout = async () => {
		try {
			await signOut(auth);
			dispatch(removeUser());
			toast('User has signed out');
			navigate('/signIn');
		} catch (err: any) {
			console.error('Error signing out:', err);
			toast(`Error: ${err.message}`);
		}
	};

	const resetPassword = async () => {
		try {
			if (!user?.email) return;
			await sendPasswordResetEmail(auth, user.email);
			toast('Password reset email sent');
		} catch (err: any) {
			console.error('Error sending password reset email:', err);
			toast(`Error: ${err.message}`);
		}
	};

	const removeAccount = async () => {
		try {
			const firebaseUser = auth.currentUser;
			if (firebaseUser) {
				await deleteUser(firebaseUser);
				toast('Account deleted');
				navigate('/signIn');
			}
		} catch (err: any) {
			console.error('Error deleting account:', err);
			toast(`Error: ${err.message}`);
		}
	};

	if (!user) return <div>Loading user info...</div>;

	return (
		<FormContainer title='Profil'>
			<article className={styles.profile}>
				<header className={styles['profile__header']}>
					<section className={styles['profile__user-info']}>
						<div className={styles['profile__avatar']}>
							<img
								src={user.photoURL || '/img/default-avatar.png'}
								alt={user.name || 'User Photo'}
							/>
						</div>
						<div className={styles['profile__details']}>
							<p className={styles['profile__field']}>
								<strong>imię:</strong> {user.name}
							</p>
							<p className={styles['profile__field']}>
								<strong>E-mail:</strong> {user.email}
							</p>
						</div>
						<div className={styles['profile__actions']}>
							<CustomButton onClick={handleLogout} text='Wyloguj' />
							<CustomButton onClick={resetPassword} text='Reset Password' />
							<CustomButton onClick={removeAccount} text='Delete Account' />
							<CustomButton onClick={() => navigate('/course')} text='Course' />
						</div>
					</section>
				</header>
				<EditName />
			</article>
		</FormContainer>
	);
};

export default Profile;
