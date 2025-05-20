import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { app } from '../firebase/firebase';

const useAdminCheckFromServer = () => {
	const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth(app);

		const unsubscribe = onAuthStateChanged(auth, async user => {
			if (user) {
				try {
					const token = await user.getIdToken();
					const res = await axios.get('http://localhost:5000/api/is-admin', {
						headers: { Authorization: `Bearer ${token}` },
					});
					setIsAdmin(res.data.admin);
				} catch (err) {
					console.error('Admin check failed:', err);
					setIsAdmin(false);
				} finally {
					setLoading(false);
				}
			} else {
				setIsAdmin(false);
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

	return { isAdmin, loading };
};

export default useAdminCheckFromServer;
