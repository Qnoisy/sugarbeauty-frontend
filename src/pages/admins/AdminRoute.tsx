import { Navigate, Outlet } from 'react-router-dom';
import useAdminCheckFromServer from '../../hooks/useAdminCheckFromServer';

const AdminRoute = () => {
	const { isAdmin, loading } = useAdminCheckFromServer();

	if (loading) return <p>Загрузка...</p>;
	return isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;
