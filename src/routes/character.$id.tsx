import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCharacters } from "@/lib/store/CharacterContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { NotFoundState } from "@/components/NotFoundState";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { characterStorage } from "@/lib/storage/characterStorage";
import CampaignManagement from "@/components/CampaignManagement";

export const Route = createFileRoute("/character/$id")({
	beforeLoad: async ({ params }) => {
		const character = await characterStorage.get(params.id);
		if (!character) {
			throw redirect({
				to: "/characters-list",
			});
		}
		return { character };
	},
	component: CharacterDetails,
});

function CharacterDetails() {
	const { id } = Route.useParams();
	const {
		characters,
		isLoading: isCharactersLoading,
		error: charactersError,
	} = useCharacters();
	const navigate = useNavigate();

	const character = characters.find((c) => c.id === id);

	if (isCharactersLoading) {
		return <LoadingState />;
	}

	if (charactersError) {
		return <ErrorState message={charactersError.message} />;
	}

	if (!character) {
		return <NotFoundState message="Character not found" />;
	}

	return (
		<ErrorBoundary>
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						onClick={() => navigate({ to: "/characters-list" })}
					>
						<ArrowLeft className="mr-2 h-4 w-4" /> Back to Characters
					</Button>
				</div>

				<CampaignManagement characterId={id} />
			</div>
		</ErrorBoundary>
	);
}
