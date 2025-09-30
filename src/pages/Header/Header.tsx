import { menuItems } from '../../router/Routes';
import { Container } from '../../shared/ui/Container';
import { Logo } from '../../shared/ui/Logo';
import { Nav } from '../../shared/ui/Nav/Nav';
import { Burger } from '../../widgets/BottomNav/Burger';
import { BurgerModal } from '../../widgets/BottomNav/BurgerModal';
import styles from './Header.module.scss';
import { Search } from './Search';

export const Header = () => {
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__row}>
					<div className={styles.header__logo}>
						<Logo />
						<Nav items={menuItems} color={styles.header__nav} />
					</div>
					<Search />
					<div className={styles.header__burger}>
						<Burger />
					</div>
				</div>
				<BurgerModal>
					<Nav
						className={styles.header__modal}
						color={styles['header__modal--color']}
						items={menuItems}
					/>
				</BurgerModal>
			</Container>
		</header>
	);
};
