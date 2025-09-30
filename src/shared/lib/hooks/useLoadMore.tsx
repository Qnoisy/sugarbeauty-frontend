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
		if (lastTimestamp === -1) return;

		const db = getDatabase(app);
		const baseRef = ref(db, 'list/images');

		try {
			const q = query(
				baseRef,
				orderByChild('createdAt'),
				...(lastTimestamp !== null ? [startAfter(lastTimestamp)] : []),
				limitToFirst(itemsPerPage)
			);

			const snapshot = await get(q);

			if (snapshot.exists()) {
				const rawData = Object.entries(snapshot.val()).map(([id, value]) => ({
					...(value as InitialImageInterface),
					imageId: id,
				}));

				// Убираем дубликаты
				const uniqueNew = rawData.filter(
					item =>
						!imagesArray.some(existing => existing.imageId === item.imageId)
				);

				// Нет новых — значит достигли конца
				if (uniqueNew.length === 0) {
					setIsEnd(true);
					setLastTimestamp(-1);
					return;
				}

				setImagesArray(prev => [...prev, ...uniqueNew]);

				const lastItem = uniqueNew[uniqueNew.length - 1];
				setLastTimestamp(lastItem.createdAt ?? -1);

				if (uniqueNew.length < itemsPerPage) {
					setIsEnd(true);
					setLastTimestamp(-1);
				}
			} else {
				setIsEnd(true);
				setLastTimestamp(-1);
			}
		} catch (err: any) {
			console.error('loadMore error:', err);
			toast.error(`loadMore error: ${err.message}`);
		}
	}, [
		lastTimestamp,
		setImagesArray,
		setLastTimestamp,
		setIsEnd,
		itemsPerPage,
		imagesArray,
	]);

	return loadMore;
};

export default useLoadMore;
