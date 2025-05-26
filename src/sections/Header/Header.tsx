import { Burger } from '../../components/BottomNav/Burger';
import { BurgerModal } from '../../components/BottomNav/BurgerModal';
import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { CustomNav } from '../../components/UI/CustomNav';
import useCustomMediaQueries from '../../hooks/useCustomMediaQueries';
import { menuItems } from '../../router';
import styles from './Header.module.scss';
import { Search } from './Search';

// interface HeaderProps {

// }

export const Header = () => {
	const { isDesktop } = useCustomMediaQueries();
	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.header__row}>
					{isDesktop && (
						<div className={styles.header__logo}>
							<Logo />
							<CustomNav items={menuItems} />
						</div>
					)}
					<Search />
					{isDesktop && <Burger />}
				</div>
				<BurgerModal>
					<CustomNav customStyles={styles.customNav__style} items={menuItems} />
				</BurgerModal>
			</Container>
		</header>
	);
};
