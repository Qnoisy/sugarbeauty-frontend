import { CustomNav } from '../../components/UI/CustomNav';
import { menuItems } from '../../router/Routes';
import styles from './Footer.module.scss';

export const FooterNav = () => {
	return (
		<div className={styles.block2}>
			<CustomNav
				items={menuItems}
				className={styles.footer__nav}
				disableAnimation
			/>
		</div>
	);
};
