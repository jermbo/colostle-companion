import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterProvider } from "@/lib/store/CharacterContext";
import App from "@/routes";
import "@/styles.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 30, // 30 minutes
		},
	},
});

ReactDOM.createRoot(document.getElementById("app")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CharacterProvider>
				<App />
			</CharacterProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
