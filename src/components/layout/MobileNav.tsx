import { ReactElement, ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
	children: ReactNode;
	className?: string;
}

const MobileNav = ({ children, className = "" }: Props): ReactElement => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	// Close menu when route changes
	useEffect(() => {
		setIsOpen(false);
	}, [location]);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div className={`mobile-nav ${className}`}>
			<button
				className="mobile-nav__toggle"
				onClick={toggleMenu}
				aria-expanded={isOpen}
				aria-label="Toggle navigation menu"
			>
				<span className="mobile-nav__icon"></span>
				<span className="mobile-nav__icon"></span>
				<span className="mobile-nav__icon"></span>
			</button>

			<div
				className={`mobile-nav__menu ${isOpen ? "mobile-nav__menu--open" : ""}`}
			>
				<button
					className="mobile-nav__close"
					onClick={closeMenu}
					aria-label="Close navigation menu"
				>
					×
				</button>
				<div className="mobile-nav__content">{children}</div>
			</div>
		</div>
	);
};

export default MobileNav;
