import useAdminCheckFromServer from '../../../hooks/useAdminCheckFromServer';

const AdminPanel = () => {
	const isAdmin = useAdminCheckFromServer();

	return (
		<div>
			<h2>Панель администратора</h2>
			{isAdmin === null ? <p>Загрузка...</p> : <p>✅ Вы администратор</p>}
		</div>
	);
};

export default AdminPanel;
