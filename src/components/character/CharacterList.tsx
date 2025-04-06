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
	const [selectedCharacter, setSelectedCharacter] = useState<
		Character | undefined
	>(undefined);

	const handleCreateCharacter = (): void => {
		setSelectedCharacter(undefined);
		setIsCreatingCharacter(true);
	};

	const handleCharacterCreated = (): void => {
		setIsCreatingCharacter(false);
		setSelectedCharacter(undefined);
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
		setSelectedCharacter(undefined);
	};

	return (
		<div>
			<div className="action-bar">
				<button
					className="button button--primary"
					onClick={handleCreateCharacter}
				>
					Create New Character
				</button>
			</div>

			{isCreatingCharacter && (
				<div className="card">
					<CharacterCreationForm
						character={selectedCharacter}
						onComplete={handleCharacterCreated}
					/>
				</div>
			)}

			{isCreatingCompanion && selectedCharacter && (
				<div className="card">
					<CompanionCreationForm
						characterId={selectedCharacter.id}
						onComplete={handleCompanionCreated}
					/>
				</div>
			)}

			{characters.length === 0 ? (
				<div className="card">
					<p className="card__content">
						No characters found. Create your first character to get started!
					</p>
				</div>
			) : (
				<div className="grid grid--3-cols">
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
