import { Burger } from '../../components/BottomNav/Burger';
import { BurgerModal } from '../../components/BottomNav/BurgerModal';
import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { CustomNav } from '../../components/UI/CustomNav';
import { menuItems } from '../../router/Routes';
import styles from './Header.module.scss';
import { Search } from './Search';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__row}>
					<div className={styles.header__logo}>
						<Logo />
						<CustomNav items={menuItems} color={styles.header__nav} />
					</div>
					<Search />
					<div className={styles.header__burger}>
						<Burger />
					</div>
				</div>
				<BurgerModal>
					<CustomNav
						className={styles.header__modal}
						color={styles['header__modal--color']}
						items={menuItems}
					/>
				</BurgerModal>
			</Container>
		</header>
	);
};
