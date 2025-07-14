import type React from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useLoadMore from '../../hooks/useLoadMore';
import type { InitialImageInterface } from '../../pages/AdminPanel/imagebase/WriteImage';
import styles from './GallerySection.module.scss';

// const slides = [
// 	{ image: 'https://picsum.photos/800/400?random=1' },
// 	{ image: 'https://picsum.photos/800/400?random=2' },
// 	{ image: 'https://picsum.photos/800/400?random=3' },
// 	{ image: 'https://picsum.photos/800/400?random=4' },
// 	{ image: 'https://picsum.photos/800/400?random=5' },
// 	{ image: 'https://picsum.photos/800/400?random=16' },
// 	{ image: 'https://picsum.photos/800/400?random=23' },
// 	{ image: 'https://picsum.photos/800/400?random=32' },
// 	{ image: 'https://picsum.photos/800/400?random=41' },
// 	{ image: 'https://picsum.photos/800/400?random=52' },
// 	{ image: 'https://picsum.photos/800/400?random=16' },
// 	{ image: 'https://picsum.photos/800/400?random=23' },
// 	{ image: 'https://picsum.photos/800/400?random=31' },
// 	{ image: 'https://picsum.photos/800/400?random=42' },
// 	{ image: 'https://picsum.photos/800/400?random=52' },
// 	{ image: 'https://picsum.photos/800/400?random=16' },
// 	{ image: 'https://picsum.photos/800/400?random=23' },
// 	{ image: 'https://picsum.photos/800/400?random=22' },
// 	{ image: 'https://picsum.photos/800/400?random=41' },
// 	{ image: 'https://picsum.photos/800/400?random=40' },
// ];

export const GallerySection: React.FC = () => {
	const [imagesArray, setImagesArray] = useState<InitialImageInterface[]>([]);
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const [itemsPerPage, setItemsPerPage] = useState<string>('6');
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
	console.log(imagesArray);

	useEffect(() => {
		if (inView && !isEnd) {
			loadMore();
		}
	}, [inView]);
	return (
		<div className={styles.gallerySection}>
			<h2 className={styles.gallerySection__title}>
				<strong>Our Gallery</strong>
			</h2>
			<div className={styles.gallerySection__grid}>
				{imagesArray.map(slide => (
					<div key={slide.imageId} className={styles.gallerySection__slide}>
						<img src={slide.imageUrl} alt='Gallery Slide' loading='lazy' />
					</div>
				))}
			</div>
			<div style={{ width: '100%', height: '20px' }} ref={ref}></div>
		</div>
	);
};
