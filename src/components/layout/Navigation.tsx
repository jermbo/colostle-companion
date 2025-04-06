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
	isExpanded?: boolean;
	onToggleSidebar?: () => void;
}

const Navigation = ({
	items,
	className = "",
	onToggleSidebar,
	isExpanded = false,
}: Props): ReactElement => {
	return (
		<nav className={`navigation ${className}`}>
			<Button
				variant="icon"
				className="hamburger"
				onClick={onToggleSidebar}
				aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
				aria-expanded={isExpanded}
			>
				<span className="hamburger__line"></span>
				<span className="hamburger__line"></span>
				<span className="hamburger__line"></span>
			</Button>

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

							<span className="navigation__label">{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
