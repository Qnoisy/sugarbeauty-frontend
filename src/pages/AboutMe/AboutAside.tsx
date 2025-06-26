import React from 'react';
import { Container } from '../../components/Container';
import styles from '../AboutMe/AboutMe.module.scss';

const AboutAside: React.FC = () => {
	return (
		<div className={styles.aboutAside}>
			<Container className={styles.aboutAside__container}>
				<h2 className={styles.aboutAside__title}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.adipisicing
					elit.
				</h2>
				<ul className={styles.aboutAside__list}>
					<li className={styles.aboutAside__link}>
						<h3 className={styles['aboutAside__link--title']}>
							Lorem ipsum dolor sit amet
						</h3>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
							impedit.
						</span>
					</li>
					<li className={styles.aboutAside__link}>
						<h3 className={styles['aboutAside__link--title']}>
							officia placeat! Neque
						</h3>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
							impedit.
						</span>
					</li>
					<li className={styles.aboutAside__link}>
						<h3 className={styles['aboutAside__link--title']}>
							elit. Nam qui doloribus
						</h3>
						<span>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed,
							impedit.
						</span>
					</li>
				</ul>
			</Container>
		</div>
	);
};

export default AboutAside;
