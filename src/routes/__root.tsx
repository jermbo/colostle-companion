import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<nav className="bg-gray-800 p-4 text-white">
				<div className="container mx-auto flex space-x-4">
					<Link to="/" className="hover:text-gray-300">
						Home
					</Link>
					<Link to="/kitchen-sink/" className="hover:text-gray-300">
						Kitchen Sink
					</Link>
				</div>
			</nav>
			<main className="container mx-auto p-4">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</>
	),
});
