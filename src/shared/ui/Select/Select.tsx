// CustomDropdownSelect.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss';

export type SelectType = {
	value: string;
	name: string;
};

interface SelectProps {
	options: SelectType[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	label?: string;
}

const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select an option',
	label,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const toggleDropdown = () => setIsOpen(prev => !prev);

	const handleOptionClick = (val: string) => {
		onChange(val);
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className={styles.wrapper} ref={wrapperRef}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.selectBox} onClick={toggleDropdown}>
				<span>
					{options.find(opt => opt.value === value)?.name || placeholder}
				</span>
				<span className={styles.arrow}>&#9662;</span>
			</div>
			{isOpen && (
				<ul className={styles.dropdown}>
					{options.map(option => (
						<li
							key={option.value}
							className={
								option.value === value ? styles.activeOption : styles.option
							}
							onClick={() => handleOptionClick(option.value)}
						>
							{option.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
