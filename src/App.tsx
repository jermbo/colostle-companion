import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import Navigation from "./components/layout/Navigation";
import Dashboard from "./pages/Dashboard";
import Characters from "./pages/Characters";
import Sessions from "./pages/Sessions";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import "./App.css";
import "./styles/layout.css";
import "./styles/pages.css";

const navItems = [
	{ label: "Dashboard", href: "/", icon: "🏠" },
	{ label: "Characters", href: "/characters", icon: "👤" },
	{ label: "Sessions", href: "/sessions", icon: "🎲" },
	{ label: "Journal", href: "/journal", icon: "📝" },
	{ label: "Settings", href: "/settings", icon: "⚙️" },
];

const App = () => {
	console.log("App rendering with navItems:", navItems);

	return (
		<ThemeProvider>
			<Router>
				<Layout sidebarContent={<Navigation items={navItems} />}>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/characters" element={<Characters />} />
						<Route path="/sessions" element={<Sessions />} />
						<Route path="/journal" element={<Journal />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</Layout>
			</Router>
		</ThemeProvider>
	);
};

export default App;
