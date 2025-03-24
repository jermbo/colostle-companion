import React, { useState, useEffect } from "react";
import "./App.css";
import { GameProvider, useGame } from "./context/GameContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CharacterCreation } from "./pages/CharacterCreation";
import { CharacterSelection } from "./pages/CharacterSelection";
import { Dashboard } from "./pages/Dashboard";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { isIndexedDBAvailable } from "./services/indexedDB";

// Database availability check component
const DatabaseCheck: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDBAvailable, setIsDBAvailable] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if IndexedDB is available
		const available = isIndexedDBAvailable();
		setIsDBAvailable(available);
	}, []);

	if (isDBAvailable === null) {
		return (
			<div className="loading-container">Checking database availability...</div>
		);
	}

	if (!isDBAvailable) {
		return (
			<div className="error-container">
				<h1>Database Not Available</h1>
				<p>
					This application requires IndexedDB support to save your character
					data. Your browser may not support IndexedDB, or it might be disabled
					in private browsing mode.
				</p>
				<p>To use this application, please:</p>
				<ul>
					<li>Use a modern browser like Chrome, Firefox, Safari, or Edge</li>
					<li>Make sure you're not in private/incognito browsing mode</li>
					<li>Check that cookies and site data are enabled</li>
				</ul>
			</div>
		);
	}

	return <>{children}</>;
};

// Add save indicator component
const SaveIndicator: React.FC<{ onSave: () => Promise<void> }> = ({
	onSave,
}) => {
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSave = async () => {
		try {
			setSaving(true);
			setError(null);
			await onSave();
			setSaved(true);

			// Reset saved status after a delay
			setTimeout(() => {
				setSaved(false);
			}, 3000);
		} catch (err) {
			setError("Failed to save");
			console.error(err);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="save-indicator">
			{error && <span className="save-error">{error}</span>}
			{saved && <span className="save-success">Saved!</span>}
			<button className="save-button" onClick={handleSave} disabled={saving}>
				{saving ? "Saving..." : "Save Game"}
			</button>
		</div>
	);
};

const AppContent: React.FC = () => {
	const { gameState, startNewGame, saveCurrentGame, isDatabaseInitialized } =
		useGame();
	const { character } = gameState;
	const [showCharacterSelection, setShowCharacterSelection] = useState(true);

	// Handle save action
	const handleSaveGame = async () => {
		if (character) {
			await saveCurrentGame();
		}
	};

	// Auto-save when user is about to leave the page
	useEffect(() => {
		const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
			if (character) {
				// Show the browser's "Are you sure you want to leave?" prompt
				e.preventDefault();
				e.returnValue = "";

				// Try to save before leaving
				try {
					await saveCurrentGame();
				} catch (error) {
					console.error("Failed to auto-save before unload:", error);
				}
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [character, saveCurrentGame]);

	// Show character selection on first load
	useEffect(() => {
		if (!character) {
			setShowCharacterSelection(true);
		}
	}, [character]);

	// Wait for database initialization
	if (!isDatabaseInitialized) {
		return <div className="loading-container">Initializing database...</div>;
	}

	// If showing character selection, render that
	if (showCharacterSelection) {
		return (
			<div className="app-container">
				<div className="app-header">
					<div></div>
					<ThemeSwitcher />
				</div>
				<CharacterSelection
					onSelectCharacter={() => setShowCharacterSelection(false)}
				/>
			</div>
		);
	}

	// If we don't have a character, show character creation
	if (!character) {
		return (
			<div className="app-container">
				<div className="app-header">
					<div></div>
					<ThemeSwitcher />
				</div>
				<CharacterCreation
					onCreateCharacter={() => setShowCharacterSelection(false)}
				/>
			</div>
		);
	}

	// Otherwise show the main dashboard
	return (
		<div className="app-container">
			<div className="app-header">
				<div className="menu-actions">
					<button
						className="menu-button"
						onClick={() => setShowCharacterSelection(true)}
					>
						Switch Character
					</button>
					<button
						className="menu-button"
						onClick={() => {
							if (
								window.confirm(
									"Start a new character? Your current progress will remain saved."
								)
							) {
								startNewGame();
							}
						}}
					>
						New Character
					</button>
				</div>
				<SaveIndicator onSave={handleSaveGame} />
				<ThemeSwitcher />
			</div>
			<Dashboard />
		</div>
	);
};

const App: React.FC = () => {
	return (
		<ThemeProvider>
			<DatabaseCheck>
				<GameProvider>
					<AppContent />
				</GameProvider>
			</DatabaseCheck>
		</ThemeProvider>
	);
};

export default App;
