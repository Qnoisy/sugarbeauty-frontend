import React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import useAdminCheck from '../../hooks/useAdminCheck';
import Dashboard from './Dashboard/Dashboard';
import UserManagement from './UserManagement/UserManagement';

const AdminPanel: React.FC = () => {
	const isAdmin = useAdminCheck();

	if (!isAdmin) {
		return <p>Access denied. Admins only.</p>;
	}

	return (
		<FormContainer title='Admin Panel'>
			<Dashboard />
			<UserManagement />
		</FormContainer>
	);
};

export default AdminPanel;
