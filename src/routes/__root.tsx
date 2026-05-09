import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import Header from "@/components/Header";

export const Route = createRootRoute({
	component: () => (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="container mx-auto px-4 py-8">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
			<TanStackQueryLayout />
		</div>
	),
});
