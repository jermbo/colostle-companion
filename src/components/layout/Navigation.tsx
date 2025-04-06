import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface NavItem {
	label: string;
	href: string;
	icon?: string;
}

interface Props {
	items: NavItem[];
	className?: string;
}

const Navigation = ({ items, className = "" }: Props): ReactElement => {
	return (
		<nav className={`navigation ${className}`}>
			<ul className="navigation__list">
				{items.map((item, index) => (
					<li key={index} className="navigation__item">
						<Link to={item.href} className="navigation__link">
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
