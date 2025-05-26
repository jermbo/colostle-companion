import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "@/components/CharacterView";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/characters")({
	component: Characters,
});

function Characters() {
	const navigate = useNavigate();

	return (
		<CharacterView
			onSelectCharacter={(character) => {
				navigate({
					to: "/characters/$characterId",
					params: { characterId: character.id },
				});
			}}
		/>
	);
}
