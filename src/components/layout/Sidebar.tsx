import { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
}

const Sidebar = ({
	children,
	className = "",
	isOpen = true,
	onClose,
}: Props): ReactElement => {
	return (
		<aside
			className={`sidebar ${
				isOpen ? "sidebar--open" : "sidebar--closed"
			} ${className}`}
		>
			<div className="sidebar__content">{children}</div>
			{onClose && (
				<button
					className="sidebar__close"
					onClick={onClose}
					aria-label="Close sidebar"
				>
					×
				</button>
			)}
		</aside>
	);
};

export default Sidebar;
