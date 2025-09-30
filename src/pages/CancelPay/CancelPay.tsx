import type React from 'react';
import FormContainer from '../../shared/ui/FormContainer/FormContainer';
import styles from './CancelPay.module.scss';

const CancelPay: React.FC = () => {
	return (
		<FormContainer title={'Cancel Pay'}>
			<div className={styles.cancel}>
				<h1>Payment cancelled</h1>
				<p>You can try again.</p>
			</div>
		</FormContainer>
	);
};
export default CancelPay;
