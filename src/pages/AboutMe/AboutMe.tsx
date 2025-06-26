import { Container } from '../../components/Container';
import styles from '../AboutMe/AboutMe.module.scss';
import AboutAside from './AboutAside';

const AboutMe = () => {
	return (
		<div className={styles.aboutMe}>
			<Container section className={styles.aboutMe__container}>
				<div className={styles.aboutMe__content}>
					<h2 className={styles.aboutMe__title}>
						Lorem <span>Lorem, ipsum.</span>
					</h2>
					<h3 className={styles.aboutMe__subTitle}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
						facilis reprehenderit sed dolor quasi animi sequi quaerat quia eum!
					</h3>
				</div>
				<div className={styles.aboutMe__gridImage}>
					<img
						src='/img/frame2.jpg'
						alt=''
						className={styles['aboutMe__img--bot']}
					/>
					<img
						src='/img/frame1.jpg'
						alt=''
						className={styles['aboutMe__img--top']}
					/>
				</div>
			</Container>
			<AboutAside />
		</div>
	);
};

export default AboutMe;
