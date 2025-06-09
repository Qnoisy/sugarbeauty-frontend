import { get, getDatabase, ref } from 'firebase/database';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ListImages from '../../../../components/ListImages/ListImages';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { app } from '../../../../firebase/firebase';
import type { InitialImageInterface } from '../WriteImage/WriteImage';
import styles from './UpdateImage.module.scss';

const UpdateImage: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<InitialImageInterface[]>([]);

	const fetchData = async () => {
		const db = getDatabase(app);
		try {
			const dbRef = ref(db, 'list/images');
			const snapshot = await get(dbRef);
			if (snapshot.exists()) {
				const data = Object.entries(snapshot.val()).map(([id, value]) => ({
					...(value as InitialImageInterface),
					imageId: id,
				}));
				setImagesArray(data);
				{
					console.log(data);
				}
				toast.success('Images loaded successfully');
			} else {
				toast.warn('No images found');
			}
		} catch (error: any) {
			console.error('Error fetching images:', error);
			toast.error(error.message);
		}
	};

	return (
		<div className={styles.updateImage}>
			<h2 className={styles.updateImage__title}>
				<strong>Upload Images</strong>
			</h2>
			<ListImages imagesArray={imagesArray} setImagesArray={setImagesArray} />
			<CustomButton onClick={fetchData} text={'Load Images'} />
		</div>
	);
};

export default UpdateImage;
