import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

import { db } from '../../../firebase/firebase';
import styles from './UserManagement.module.scss';

interface User {
	id: string;
	name: string;
	role: string;
}

const UserManagement: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	// Fetch all users from Firestore
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'users'));
				const usersData = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
				})) as User[];
				setUsers(usersData);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	// Delete user
	const handleDeleteUser = async (userId: string) => {
		try {
			const userDocRef = doc(db, 'users', userId);
			await deleteDoc(userDocRef);
			setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
			alert('User deleted successfully!');
		} catch (error) {
			console.error('Error deleting user:', error);
			alert('Failed to delete user');
		}
	};

	return (
		<section className={styles.userManagement}>
			<h2 className={styles.userManagement__title}>
				<strong>users</strong>
			</h2>
			<input
				type='text'
				placeholder='Найти пользователя по имени'
				value={searchTerm}
				onChange={handleSearch}
				className={styles.userManagement__input}
			/>
			<ul className={styles.userManagement__list}>
				{users
					.filter(user =>
						user.name.toLowerCase().includes(searchTerm.toLowerCase())
					)
					.map(user => (
						<UserManagementLi
							key={user.id}
							user={user}
							handleDeleteUser={handleDeleteUser}
						/>
					))}
			</ul>
		</section>
	);
};

interface UserManagementLiProps {
	user: User;
	handleDeleteUser: (userId: string) => void;
}

const UserManagementLi: React.FC<UserManagementLiProps> = ({
	user,
	handleDeleteUser,
}) => {
	return (
		<li className={styles.userManagement__li}>
			<div>
				{user.name} - {user.role}
			</div>
			<button
				onClick={() => handleDeleteUser(user.id)}
				className={styles.userManagement__btn}
			>
				<RxCross2 />
			</button>
		</li>
	);
};

export default UserManagement;
