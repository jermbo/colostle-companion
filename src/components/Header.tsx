import { Link } from "@tanstack/react-router";

const Header = () => {
	return (
		<header className="border-b">
			<div className="container mx-auto px-4 py-4">
				<nav className="flex items-center justify-between">
					<Link
						to="/characters"
						className="text-xl font-bold hover:text-primary"
					>
						Colostle Companion
					</Link>
					<div className="flex items-center gap-4">
						<Link to="/characters" className="text-sm hover:text-primary">
							Characters
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
