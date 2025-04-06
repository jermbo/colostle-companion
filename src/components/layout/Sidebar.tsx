import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Sidebar = ({ children }: Props): ReactElement => {
	return (
		<aside className="sidebar">
			<div className="sidebar__content">{children}</div>
		</aside>
	);
};

export default Sidebar;
