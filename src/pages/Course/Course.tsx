import React from 'react';
// import styles from './Course.module.scss';
import FormContainer from '../../components/FormContainer/FormContainer';
import BuyButton from '../BuyButton/BuyButton';

export const Course: React.FC = () => {
	return (
		<FormContainer title='Course'>
			<BuyButton />
		</FormContainer>
	);
};
