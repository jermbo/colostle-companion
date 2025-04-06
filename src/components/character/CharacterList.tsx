import { ReactElement, useState } from "react";
import { useCharacterContext } from "../../context/CharacterContext";
import { Character } from "../../types/character";
import CharacterCard from "./CharacterCard";
import CharacterCreationForm from "./CharacterCreationForm";
import CompanionCreationForm from "./CompanionCreationForm";

const CharacterList = (): ReactElement => {
	const { characters } = useCharacterContext();
	const [isCreatingCharacter, setIsCreatingCharacter] =
		useState<boolean>(false);
	const [isCreatingCompanion, setIsCreatingCompanion] =
		useState<boolean>(false);
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null
	);

	const handleCreateCharacter = (): void => {
		setIsCreatingCharacter(true);
	};

	const handleCharacterCreated = (): void => {
		setIsCreatingCharacter(false);
	};

	const handleEditCharacter = (character: Character): void => {
		setSelectedCharacter(character);
		setIsCreatingCharacter(true);
	};

	const handleCreateCompanion = (character: Character): void => {
		setSelectedCharacter(character);
		setIsCreatingCompanion(true);
	};

	const handleCompanionCreated = (): void => {
		setIsCreatingCompanion(false);
		setSelectedCharacter(null);
	};

	return (
		<div className="character-list">
			<div className="character-list__header">
				<h2>Characters</h2>
				<button
					className="character-list__create-button"
					onClick={handleCreateCharacter}
				>
					Create New Character
				</button>
			</div>

			{isCreatingCharacter && (
				<div className="character-list__form">
					<CharacterCreationForm onComplete={handleCharacterCreated} />
				</div>
			)}

			{isCreatingCompanion && selectedCharacter && (
				<div className="character-list__form">
					<CompanionCreationForm
						characterId={selectedCharacter.id}
						onComplete={handleCompanionCreated}
					/>
				</div>
			)}

			{characters.length === 0 ? (
				<p className="character-list__empty">
					No characters found. Create your first character to get started!
				</p>
			) : (
				<div className="character-list__grid">
					{characters.map((character) => (
						<CharacterCard
							key={character.id}
							character={character}
							onEdit={handleEditCharacter}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CharacterList;
