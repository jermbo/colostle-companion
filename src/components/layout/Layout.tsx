import { ReactElement, ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Container from "./Container";

interface Props {
	children: ReactNode;
	className?: string;
	showSidebar?: boolean;
	sidebarContent?: ReactNode;
}

const Layout = ({
	children,
	className = "",
	showSidebar = true,
	sidebarContent,
}: Props): ReactElement => {
	console.log("Layout rendering with sidebarContent:", !!sidebarContent);

	return (
		<div className={`layout ${className}`}>
			<Header>
				<div className="mobile-nav-container">
					<MobileNav>{sidebarContent}</MobileNav>
				</div>
			</Header>

			<div className="layout__content">
				{showSidebar && <Sidebar>{sidebarContent}</Sidebar>}

				<main className="layout__main">
					<Container>{children}</Container>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default Layout;
