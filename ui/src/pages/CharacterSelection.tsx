import React, { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { Character } from "../context/GameContext";

interface CharacterListItem {
	id: string;
	character: Character;
	lastUpdated: Date;
}

interface CharacterSelectionProps {
	onSelectCharacter: () => void;
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
	onSelectCharacter,
}) => {
	const {
		loadCharacter,
		getAllCharacters,
		deleteCharacter,
		startNewGame,
		isDatabaseInitialized,
	} = useGame();
	const [characters, setCharacters] = useState<CharacterListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [initializing, setInitializing] = useState(true);

	// Set initializing status based on database
	useEffect(() => {
		if (isDatabaseInitialized) {
			setInitializing(false);
		}
	}, [isDatabaseInitialized]);

	// Load all characters from IndexedDB
	useEffect(() => {
		// Only fetch characters when the database is initialized
		if (!isDatabaseInitialized) {
			return;
		}

		const fetchCharacters = async () => {
			try {
				setLoading(true);
				const characterData = await getAllCharacters();
				setCharacters(
					characterData.map((data) => ({
						id: data.id,
						character: data.character,
						lastUpdated: new Date(data.lastUpdated),
					}))
				);
			} catch (err) {
				console.error("Error fetching characters:", err);
				setError("Failed to load characters");
			} finally {
				setLoading(false);
			}
		};

		fetchCharacters();
	}, [getAllCharacters, isDatabaseInitialized]);

	// Format the date for display
	const formatDate = (date: Date): string => {
		return new Date(date).toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Handle character selection
	const handleSelectCharacter = async (id: string) => {
		try {
			await loadCharacter(id);
			onSelectCharacter(); // Call the prop function to update parent state
		} catch (err) {
			setError("Failed to load character");
			console.error(err);
		}
	};

	// Handle character deletion
	const handleDeleteCharacter = async (id: string, event: React.MouseEvent) => {
		event.stopPropagation();

		if (
			window.confirm(
				"Are you sure you want to delete this character? This action cannot be undone."
			)
		) {
			try {
				await deleteCharacter(id);
				setCharacters(characters.filter((char) => char.id !== id));
			} catch (err) {
				setError("Failed to delete character");
				console.error(err);
			}
		}
	};

	// Handle creating a new character
	const handleCreateNewCharacter = () => {
		startNewGame();
		onSelectCharacter(); // Call the prop function to update parent state
	};

	if (initializing) {
		return <div className="loading-container">Initializing database...</div>;
	}

	if (loading) {
		return <div className="loading-container">Loading characters...</div>;
	}

	return (
		<main className="character-selection-container">
			<h1>Select Character</h1>

			{error && (
				<div className="error-message" role="alert">
					{error}
				</div>
			)}

			<div className="character-list">
				{characters.length > 0 ? (
					characters.map((char) => (
						<div
							key={char.id}
							className="character-card"
							onClick={() => handleSelectCharacter(char.id)}
						>
							<div className="character-avatar" aria-hidden="true">
								{char.character.name.charAt(0)}
							</div>

							<div className="character-details">
								<h2 className="character-name">{char.character.name}</h2>
								<p className="character-traits">
									{char.character.traits.join(" • ")}
								</p>
								<p className="last-played">
									Last played: {formatDate(char.lastUpdated)}
								</p>
							</div>

							<button
								className="delete-character-btn"
								onClick={(e) => handleDeleteCharacter(char.id, e)}
								aria-label={`Delete ${char.character.name}`}
							>
								X
							</button>
						</div>
					))
				) : (
					<p className="no-characters-message">
						No characters found. Create a new character to begin your journey.
					</p>
				)}
			</div>

			<button
				className="new-character-button"
				onClick={handleCreateNewCharacter}
			>
				+ Create New Character
			</button>
		</main>
	);
};
