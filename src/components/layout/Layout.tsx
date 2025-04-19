import { ReactElement, ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

interface Props {
	children: ReactNode;
	className?: string;
}

const navItems = [
	{ label: "Dashboard", href: "/", icon: "🏠" },
	{ label: "Characters", href: "/characters", icon: "👤" },
	{ label: "Inventory", href: "/inventory", icon: "🎒" },
	{ label: "Sessions", href: "/sessions", icon: "🎲" },
	{ label: "Journal", href: "/journal", icon: "📝" },
	{ label: "Settings", href: "/settings", icon: "⚙️" },
];

const Layout = ({ children, className = "" }: Props): ReactElement => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div
			className={`layout ${className} ${
				!isSidebarOpen ? "--sidebar-open" : ""
			}`}
		>
			<Header />

			<div className="layout__content">
				<Sidebar>
					<Navigation
						items={navItems}
						isExpanded={!isSidebarOpen}
						onToggleSidebar={toggleSidebar}
					/>
				</Sidebar>

				<main className="layout__main">
					<>{children}</>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
