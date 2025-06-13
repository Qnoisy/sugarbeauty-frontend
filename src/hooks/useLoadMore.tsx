import {
	get,
	getDatabase,
	limitToFirst,
	orderByChild,
	query,
	ref,
	startAfter,
} from 'firebase/database';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { app } from '../firebase/firebase';
import type { InitialImageInterface } from '../pages/AdminPanel/imagebase/WriteImage';

const useLoadMore = (
	imagesArray: InitialImageInterface[],
	setImagesArray: React.Dispatch<React.SetStateAction<InitialImageInterface[]>>,
	lastTimestamp: number | null,
	setLastTimestamp: (val: number | null) => void,
	setIsEnd: (val: boolean) => void,
	itemsPerPage: number
) => {
	const loadMore = useCallback(async () => {
		if (lastTimestamp === -1) return; // остановка если достигнут конец списка

		const db = getDatabase(app);
		const baseRef = ref(db, 'list/images');

		try {
			const q = query(
				baseRef,
				orderByChild('createdAt'),
				...(lastTimestamp ? [startAfter(lastTimestamp)] : []),
				limitToFirst(itemsPerPage)
			);

			const snapshot = await get(q);

			if (snapshot.exists()) {
				const rawData = Object.entries(snapshot.val()).map(([id, value]) => ({
					...(value as InitialImageInterface),
					imageId: id,
				}));

				setImagesArray(prev => [...prev, ...rawData]);

				const last = rawData[rawData.length - 1];
				setLastTimestamp(last.createdAt!);

				if (rawData.length < itemsPerPage) {
					setIsEnd(true);
					setLastTimestamp(-1); // использовать -1 как признак конца
				}
			} else {
				setIsEnd(true);
				setLastTimestamp(-1);
			}
		} catch (err: any) {
			console.error('loadMore error:', err);
			toast.error(`loadMore error: ${err.message}`);
		}
	}, [lastTimestamp, imagesArray, setImagesArray, setLastTimestamp, setIsEnd]);

	return loadMore;
};

export default useLoadMore;
