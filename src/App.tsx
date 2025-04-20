import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { CharacterProvider } from "@/context/character-context";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Settings from "@/pages/Settings";
import Create from "@/pages/character/Create";
import Character from "@/pages/character/Character";
import Session from "@/pages/character/Session";
import Hero from "@/components/Hero";
import { CharacterList } from "@/components/CharacterList";
import Footer from "@/components/Footer";
import "@/styles/utils.css";

const App = () => {
	return (
		<ThemeProvider>
			<CharacterProvider>
				<Router>
					<div className="flex min-h-screen flex-col">
						<Navigation />
						<main className="flex-1">
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/character/create" element={<Create />} />
								<Route path="/character/:slug" element={<Character />} />
								<Route path="/character/:slug/session/:sessionId" element={<Session />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</Router>
			</CharacterProvider>
		</ThemeProvider>
	);
};

export default App;
