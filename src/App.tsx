import React from "react";
import "./App.css";
import { GameProvider, useGame } from "./context/GameContext";
import { CharacterCreation } from "./pages/CharacterCreation";
import { Dashboard } from "./pages/Dashboard";

const AppContent: React.FC = () => {
	const { gameState } = useGame();
	const { character } = gameState;

	// Show character creation if no character exists
	if (!character) {
		return <CharacterCreation />;
	}

	// Otherwise show the main dashboard
	return <Dashboard />;
};

function App() {
	return (
		<GameProvider>
			<AppContent />
		</GameProvider>
	);
}

export default App;
