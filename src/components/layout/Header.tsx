import { ReactElement, ReactNode } from "react";
import ThemeToggle from "../ThemeToggle";

interface Props {
	children?: ReactNode;
	className?: string;
}

const Header = ({ children, className = "" }: Props): ReactElement => {
	return (
		<header className={`header ${className}`}>
			<div className="header__container">
				<div className="header__left">{children}</div>
				<div className="header__logo">
					<h1 className="header__title">Colostle Companion</h1>
				</div>
				<div className="header__actions">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
};

export default Header;
