import React from 'react';
import UpdateImage from '../../imagebase/UpdateImage';
import WriteImage from '../../imagebase/WriteImage';

const AdminPanel: React.FC = () => {
	return (
		<div className='container'>
			<h2>🛠 Admin Panel</h2>
			<WriteImage />
			<UpdateImage />
		</div>
	);
};

export default AdminPanel;
