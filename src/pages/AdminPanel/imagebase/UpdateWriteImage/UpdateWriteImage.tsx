import { get, getDatabase, ref, set } from 'firebase/database';
import {
	deleteObject,
	getDownloadURL,
	getStorage,
	ref as storageRef,
	uploadBytes,
} from 'firebase/storage';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomFileInput from '../../../../components/UI/CustomFileInput/CustomFileInput';
import { app } from '../../../../firebase/firebase';

const convertUrlToPath = (url: string): string | null => {
	const match = url.match(/\/o\/(.+)\?alt=media/);
	return match ? decodeURIComponent(match[1]) : null;
};

const UpdateWriteImage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [currentImage, setCurrentImage] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchImage = async () => {
			const db = getDatabase(app);
			const dbRef = ref(db, `list/images/${id}`);

			try {
				const snapshot = await get(dbRef);
				if (snapshot.exists()) {
					setCurrentImage(snapshot.val().imageUrl);
				} else {
					toast.warn('No image found');
				}
			} catch (err: any) {
				console.error('Error fetching image:', err.message);
				toast.error(err.message);
			}
		};

		fetchImage();
	}, [id]);

	const uploadImage = async (file: File): Promise<string | null> => {
		try {
			const storage = getStorage(app);
			const fileRef = storageRef(
				storage,
				`list/images/${Date.now()}-${file.name}`
			);

			await uploadBytes(fileRef, file);
			return await getDownloadURL(fileRef);
		} catch (error) {
			console.error('Error uploading image:', error);
			toast.error('Error uploading image');
			return null;
		}
	};

	const handlerSubmit = async (
		values: { imageFile: File | null },
		{ resetForm }: FormikHelpers<{ imageFile: File | null }>
	) => {
		if (!id || !values.imageFile) {
			toast.error('Invalid image data');
			return;
		}

		const db = getDatabase(app);
		const storage = getStorage(app);
		const dbRef = ref(db, `list/images/${id}`);

		try {
			if (currentImage) {
				const storagePath = convertUrlToPath(currentImage);
				if (storagePath) {
					const oldImageRef = storageRef(storage, storagePath);
					await deleteObject(oldImageRef);
				}
			}

			// Загружаем новое изображение
			const imageUrl = await uploadImage(values.imageFile);
			if (!imageUrl) return;

			// Обновляем запись в БД
			await set(dbRef, { imageId: id, imageUrl });

			toast.success('Image updated successfully');
			navigate('/admin');
		} catch (error: any) {
			console.error('Error updating image:', error);
			toast.error(error.message);
		} finally {
			resetForm();
		}
	};

	return (
		<div className='container'>
			<h2>Update Image</h2>
			{currentImage && <img src={currentImage} alt='Current' width='150' />}
			<Formik
				initialValues={{ imageFile: null } as { imageFile: File | null }}
				onSubmit={handlerSubmit}
			>
				{({ setFieldValue }) => (
					<Form>
						<CustomFileInput
							label='Select new image'
							name='imageFile'
							setFieldValue={setFieldValue}
						/>
						<button type='submit'>Update Image</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default UpdateWriteImage;
