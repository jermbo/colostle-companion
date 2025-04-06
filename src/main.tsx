import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./themed-variables.css";
import "./styles/layout.css";
import "./styles/ui.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
