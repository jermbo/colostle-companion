import { ReactElement, ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Container from "./Container";
import Navigation from "./Navigation";

interface Props {
	children: ReactNode;
	className?: string;
	sidebarContent?: ReactNode;
}

const navItems = [
	{ label: "Dashboard", href: "/", icon: "🏠" },
	{ label: "Characters", href: "/characters", icon: "👤" },
	{ label: "Sessions", href: "/sessions", icon: "🎲" },
	{ label: "Journal", href: "/journal", icon: "📝" },
	{ label: "Settings", href: "/settings", icon: "⚙️" },
];

const Layout = ({
	children,
	className = "",
	sidebarContent,
}: Props): ReactElement => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className={`layout ${className}`}>
			<Header />

			<div className="layout__content">
				<Sidebar isOpen={isSidebarOpen}>
					{sidebarContent || (
						<Navigation
							items={navItems}
							isCollapsed={!isSidebarOpen}
							onToggleSidebar={toggleSidebar}
						/>
					)}
				</Sidebar>

				<main
					className={`layout__main ${
						!isSidebarOpen ? "layout__main--expanded" : ""
					}`}
				>
					<Container>{children}</Container>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
