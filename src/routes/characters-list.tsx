import { createFileRoute } from "@tanstack/react-router";
import { CharacterView } from "@/components/CharacterView";

export const Route = createFileRoute("/characters-list")({
	component: Characters,
});

function Characters() {
	return <CharacterView />;
}
