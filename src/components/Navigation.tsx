import { Link } from "react-router-dom";

const Navigation = () => {
	return (
		<nav className="border-base-200 border-b">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-shrink-0">
						<Link to="/" className="text-xl font-bold">
							Colostle Companion
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<Link to="/settings" className="hover:text-base-content/80 p-2">
							Settings
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
