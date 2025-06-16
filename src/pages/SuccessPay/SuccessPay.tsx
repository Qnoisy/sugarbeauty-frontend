import type React from 'react';
import FormContainer from '../../components/FormContainer/FormContainer';
import styles from './SuccessPay.module.scss';

const SuccessPay: React.FC = () => {
	return (
		<FormContainer title='Success'>
			<div className={styles.success}>
				<h1>Payment successful!</h1>
				<p>You can now access the course</p>
			</div>
		</FormContainer>
	);
};
export default SuccessPay;
