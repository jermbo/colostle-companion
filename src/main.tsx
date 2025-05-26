import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterProvider } from "@/lib/store/CharacterContext";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "@/styles.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 30, // 30 minutes
		},
	},
});

const router = createRouter({
	routeTree,
	context: {
		queryClient,
	},
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById("app")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CharacterProvider>
				<RouterProvider router={router} />
			</CharacterProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
