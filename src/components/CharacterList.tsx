import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import type { Character } from "@/types/character";
import { CHARACTER_CLASSES } from "@/types/character";

interface CharacterListProps {
	characters: Character[];
	onSelectCharacter: (character: Character) => void;
}

const CharacterList = ({
	characters,
	onSelectCharacter,
}: CharacterListProps): React.ReactElement => {
	if (characters.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center">
					<p className="text-muted-foreground">No characters created yet</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{characters.map((character) => (
				<Card
					key={character.id}
					className="hover:bg-gray-50 cursor-pointer"
					onClick={() => onSelectCharacter(character)} // Make the whole card clickable
				>
					<CardHeader>
						<CardTitle>{character.name}</CardTitle>
						<CardDescription>
							{CHARACTER_CLASSES[character.class].displayName} - Level{" "}
							{character.level}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground line-clamp-3">
							{CHARACTER_CLASSES[character.class].description}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default CharacterList;
