import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ListImages from '../../../../components/ListImages/ListImages';
import { CustomButton } from '../../../../components/UI/CustomButton';
import CustomSelect, {
	type SelectType,
} from '../../../../components/UI/CustomSelect/CustomSelect';
import useLoadMore from '../../../../hooks/useLoadMore';
import type { InitialImageInterface } from '../WriteImage/WriteImage';
import styles from './UpdateImage.module.scss';

const options: Array<SelectType> = [
	{ value: '3', name: '3' },
	{ value: '6', name: '6' },
	{ value: ' 9', name: '9' },
];

const UpdateImage: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<InitialImageInterface[]>([]);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [itemsPerPage, setItemsPerPage] = useState<string>('3');
	const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
	const [isEnd, setIsEnd] = useState(false);
	const loadMore = useLoadMore(
		imagesArray,
		setImagesArray,
		lastTimestamp,
		setLastTimestamp,
		setIsEnd,
		Number(itemsPerPage)
	);

	useEffect(() => {
		if (inView && !isEnd) {
			loadMore();
		}
	}, [inView]);

	return (
		<div className={styles.updateImage}>
			<h2 className={styles.updateImage__title}>
				<strong>Upload Images</strong>
			</h2>
			<CustomSelect
				options={options}
				label='Выберите количество'
				value={itemsPerPage}
				onChange={value => setItemsPerPage(value)}
			/>

			<ListImages imagesArray={imagesArray} setImagesArray={setImagesArray} />
			<div style={{ width: '100%', height: ' 40px' }} ref={ref}></div>
			<CustomButton onClick={loadMore} text='Load More' disabled={isEnd} />
		</div>
	);
};

export default UpdateImage;
