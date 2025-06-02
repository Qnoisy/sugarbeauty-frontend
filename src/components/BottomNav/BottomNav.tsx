import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { menuItems } from '../../router/Routes';
import { ThemeButton } from '../ThemeButton';
import { CustomNav } from '../UI/CustomNav';
import styles from './BottomNav.module.scss';
import { Burger } from './Burger';
import { BurgerModal } from './BurgerModal';

export const BottomNav = () => {
	return (
		<>
			<nav className={styles.bottomNav}>
				<div className={styles.bottomNav__links}>
					<Link to='/' className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
					<Link to='/' className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
				</div>
				<div className={styles.navBurger}>
					<Burger color='var(--burger-color)' />
				</div>
				<div className={styles.bottomNav__links}>
					<ThemeButton />
					<Link to='/' className={styles.bottomNav__link}>
						<BsFillEmojiSmileFill />
					</Link>
				</div>
			</nav>
			<div className={styles.navBurgerBottom}></div>
			<BurgerModal>
				<div style={{ textAlign: 'center' }}>
					<CustomNav className={styles.customNav__style} items={menuItems} />
				</div>
			</BurgerModal>
		</>
	);
};
