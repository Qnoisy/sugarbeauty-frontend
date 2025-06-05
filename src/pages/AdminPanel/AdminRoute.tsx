import { Navigate, Outlet } from 'react-router-dom';
import { CustomLoader } from '../../components/UI/CustomLoader';
import useAdminCheckFromServer from '../../hooks/useAdminCheckFromServer';

const AdminRoute = () => {
	const { isAdmin, loading } = useAdminCheckFromServer();

	if (loading) return <CustomLoader />;
	return isAdmin ? <Outlet /> : <Navigate to='/' replace />;
};

export default AdminRoute;
