import React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import Dashboard from './Dashboard/Dashboard';
import UpdateImage from './imagebase/UpdateImage/UpdateImage';
import WriteImage from './imagebase/WriteImage/WriteImage';

const AdminPanel: React.FC = () => {
	return (
		<FormContainer title='Admin Panel'>
			<Dashboard />
			<WriteImage />
			<UpdateImage />
		</FormContainer>
	);
};

export default AdminPanel;
