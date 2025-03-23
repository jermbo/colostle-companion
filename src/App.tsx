import React from "react";
import "./App.css";
import { GameProvider, useGame } from "./context/GameContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CharacterCreation } from "./pages/CharacterCreation";
import { Dashboard } from "./pages/Dashboard";
import ThemeSwitcher from "./components/ThemeSwitcher";

const AppContent: React.FC = () => {
	const { gameState } = useGame();
	const { character } = gameState;

	// Show character creation if no character exists
	if (!character) {
		return (
			<div className="app-container">
				<div className="app-header">
					<div></div>
					<ThemeSwitcher />
				</div>
				<CharacterCreation />
			</div>
		);
	}

	// Otherwise show the main dashboard
	return <Dashboard />;
};

function App() {
	return (
		<ThemeProvider>
			<GameProvider>
				<AppContent />
			</GameProvider>
		</ThemeProvider>
	);
}

export default App;
