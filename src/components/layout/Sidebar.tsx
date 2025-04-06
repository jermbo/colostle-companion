import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
	isOpen: boolean;
}

const Sidebar = ({ children, isOpen }: Props): ReactElement => {
	return (
		<aside className={`sidebar ${!isOpen ? "sidebar--collapsed" : ""}`}>
			<div className="sidebar__content">{children}</div>
		</aside>
	);
};

export default Sidebar;
