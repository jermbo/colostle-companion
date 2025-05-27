import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "@/components/CharacterView";

export const Route = createFileRoute("/characters")({
	component: Characters,
});

function Characters() {
	return <CharacterView />;
}
