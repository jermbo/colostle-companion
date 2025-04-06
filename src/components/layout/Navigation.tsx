import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

interface NavItem {
	label: string;
	href: string;
	icon?: string;
}

interface Props {
	items: NavItem[];
	className?: string;
	isCollapsed?: boolean;
	onToggleSidebar?: () => void;
}

const Navigation = ({
	items,
	className = "",
	isCollapsed = false,
	onToggleSidebar,
}: Props): ReactElement => {
	return (
		<nav
			className={`navigation ${
				isCollapsed ? "navigation--collapsed" : ""
			} ${className}`}
		>
			{onToggleSidebar && (
				<Button
					variant="icon"
					className={`hamburger ${isCollapsed ? "hamburger--open" : ""}`}
					onClick={onToggleSidebar}
					aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
					aria-expanded={!isCollapsed}
				>
					<span className="hamburger__line"></span>
					<span className="hamburger__line"></span>
					<span className="hamburger__line"></span>
				</Button>
			)}

			<ul className="navigation__list">
				{items.map((item, index) => (
					<li key={index} className="navigation__item">
						<Link
							to={item.href}
							className="navigation__link"
							title={item.label}
						>
							{item.icon && (
								<span className="navigation__icon">{item.icon}</span>
							)}
							{!isCollapsed && (
								<span className="navigation__label">{item.label}</span>
							)}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
