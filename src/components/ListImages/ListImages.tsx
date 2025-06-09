import { getDatabase, ref, remove } from 'firebase/database';
import { deleteObject, getStorage, ref as storageRef } from 'firebase/storage';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { app } from '../../firebase/firebase';
import type { InitialImageInterface } from '../../pages/AdminPanel/imagebase/WriteImage';
import { CustomButton } from '../UI/CustomButton';

interface ListImagesProps {
	imagesArray: InitialImageInterface[];
	setImagesArray: React.Dispatch<React.SetStateAction<InitialImageInterface[]>>;
}

const ListImages: React.FC<ListImagesProps> = ({
	imagesArray,
	setImagesArray,
}) => {
	const navigate = useNavigate();

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
	);
};

export default ListImages;
