import { get, getDatabase, ref, remove } from 'firebase/database';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustomButton } from '../../../../components/UI/CustomButton';
import { app } from '../../../../firebase/firebase';
import type { InitialImageInterface } from '../WriteImage/WriteImage';
import styles from './UpdateImage.module.scss';

const UpdateImage: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<InitialImageInterface[]>([]);
	const navigate = useNavigate();

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

	const deleteImage = async (
		imageId: string,
		imageUrl?: string
	): Promise<void> => {
		if (!imageId) return;

		const db = getDatabase(app);
		const storage = getStorage(app);
		const dbRef = ref(db, `list/images/${imageId}`);

		try {
			if (imageUrl) {
				const imageRef = storageRef(storage, imageUrl);
				await deleteObject(imageRef);
			}
			await remove(dbRef);
			setImagesArray(prev => prev.filter(image => image.imageId !== imageId));
			toast.success('Image deleted successfully');
		} catch (err: any) {
			console.error('Error deleting image:', err);
			toast.error(err.message);
		}
	};

	return (
		<div className={styles.updateImage}>
			<h2 className={styles.updateImage__title}>
				<strong>Upload Images</strong>
			</h2>
			<CustomButton onClick={fetchData} text={'Load Images'} />
			<ul>
				{imagesArray.map(image => (
					<li key={image.imageId}>
						<img src={image.imageUrl} alt='Uploaded' width='150' />
						<CustomButton
							onClick={() => navigate(`/admin/update-image/${image.imageId}`)}
							text='Replace'
						/>
						<CustomButton
							onClick={() => deleteImage(image.imageId!, image.imageUrl)}
							text={'Delete'}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UpdateImage;
